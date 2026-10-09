import { useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { HeroAtmosphere } from '@/components/atmosphere/HeroAtmosphere'
import { SystemStrata } from '@/components/hero/SystemStrata'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'
import { useGsap } from '@/hooks/useGsap'
import { useMagnetic } from '@/hooks/useMagnetic'
import { usePointerScene } from '@/hooks/usePointerScene'
import { intro, useIntroStatus, type IntroStatus } from '@/lib/intro'
import { GSAP_EASE, MEDIA } from '@/lib/motion'
import { gsap } from '@/lib/scroll'

/**
 * Entrada em uma timeline só, escalonada por função: a atmosfera assenta,
 * a headline é o evento principal, o apoio chega depois dela e a cena 3D
 * se monta em paralelo, de baixo para cima (dados → fronteira → interface).
 *
 * Com a abertura no ar, o hero espera: o texto fica escondido e a cena
 * também — a cópia da abertura ocupa o lugar dela. Quando a abertura pousa,
 * o texto entra; quando ela some, a cena do hero aparece no mesmo quadro.
 *
 * A saída é um movimento de câmera dirigido pelo scroll: o texto sobe e some,
 * a cena deita e recua até virar uma linha — que a seção seguinte retoma.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const magneticRef = useMagnetic<HTMLSpanElement>()
  const introStatus = useIntroStatus()
  const introSettled = introStatus === 'done' || introStatus === 'skipped'
  // Decidido uma vez: o ambiente da cena começa depois da abertura, se houver.
  const [introPlaying] = useState(() => intro.status === 'playing')

  usePointerScene(sectionRef, introSettled)

  useGsap(
    () => {
      const q = gsap.utils.selector(sectionRef)
      const planes = q<HTMLElement>('[data-plane]')

      // Posição de repouso dos planos: definida aqui, e não no CSS, para que o
      // GSAP seja o único dono do transform desses elementos.
      for (const plane of planes) gsap.set(plane, { z: Number(plane.dataset.planeZ) })

      const mm = gsap.matchMedia()

      mm.add({ reduced: MEDIA.reduced, motionOk: MEDIA.motionOk, desktop: MEDIA.desktop }, (context) => {
        const { reduced, desktop } = context.conditions as { reduced: boolean; desktop: boolean }
        let unsubscribe: (() => void) | undefined

        if (!reduced) {
          const copy = gsap
            .timeline({ defaults: { ease: GSAP_EASE.outExpo }, paused: true })
            .from(q('[data-hero-eyebrow]'), { opacity: 0, y: 8, duration: 0.8 }, 0)
            .from(q('[data-hero-line]'), { yPercent: 110, duration: 1.1, stagger: 0.1 }, 0.1)
            .from(q('[data-hero-body]'), { opacity: 0, y: 10, duration: 0.9 }, 0.55)
            .from(q('[data-hero-actions]'), { opacity: 0, y: 10, duration: 0.8 }, 0.7)
            .from(q('[data-hero-cue]'), { opacity: 0, duration: 0.8 }, 1.5)

          const scene = gsap
            .timeline({ defaults: { ease: GSAP_EASE.outExpo }, paused: true })
            .from(planes, { z: '-=140', opacity: 0, duration: 1.3, stagger: 0.14 }, 0)
            .from(q('[data-guide]'), { scaleY: 0, duration: 0.9 }, 0.55)
            .from(q('[data-row]'), { opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out' }, 0.6)
            .from(q('[data-bar]'), { scaleX: 0, duration: 0.9, stagger: 0.07, ease: GSAP_EASE.outQuart }, 0.85)

          const status = intro.status
          if (status === 'playing' || status === 'landing') {
            // Visibilidade direto no DOM, sem tween: o listener abaixo roda a
            // partir de callbacks do GSAP, e animações criadas ali herdariam o
            // contexto da abertura — e seriam revertidas quando ela desmontasse.
            const strata = q<HTMLElement>('[data-hero-strata]')
            for (const el of strata) el.style.visibility = 'hidden'
            const show = () => {
              for (const el of strata) el.style.visibility = ''
            }
            const react = (next: IntroStatus) => {
              if (next === 'landing') copy.delay(0.1).play()
              if (next === 'done') {
                scene.progress(1)
                show()
              }
              if (next === 'skipped') {
                show()
                if (copy.progress() === 0) copy.delay(0.1).play()
                scene.delay(0.2).play()
              }
            }
            if (status === 'landing') react('landing')
            unsubscribe = intro.subscribe(react)
          } else {
            gsap.from(q('[data-hero-atmo]'), { opacity: 0, duration: 1.6, ease: 'power2.out' })
            copy.delay(0.2).play()
            scene.delay(0.45).play()
          }
        }

        if (desktop) {
          // Saída: scrub preso ao scroll, do topo do hero até ele sair da tela.
          gsap
            .timeline({
              scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
              defaults: { ease: GSAP_EASE.none },
            })
            .to(q('[data-hero-copy]'), { y: -90, opacity: 0 }, 0)
            .to(q('[data-strata-scroll]'), { rotateX: 34, y: 160, scale: 0.84 }, 0)
            .to(q('[data-strata-outer]'), { opacity: 0 }, 0.15)
            .to(q('[data-hero-grid]'), { opacity: 0 }, 0)
            .to(q('[data-hero-cue]'), { opacity: 0 }, 0)
        }

        return () => unsubscribe?.()
      })

      return () => mm.revert()
    },
    [],
    sectionRef,
  )

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pb-20 lg:pt-20"
    >
      <HeroAtmosphere />

      <div className="relative z-10 mx-auto grid w-full max-w-content grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
        <div data-hero-copy>
          <div data-hero-eyebrow className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <AvailabilityBadge label={site.status} />
            <p className="font-mono text-xs text-text-secondary">
              <span className="text-text">{site.name}</span>
              <span className="text-text-muted"> — </span>
              {site.role}
            </p>
          </div>

          <h1 className="display mt-8 text-text">
            <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
              <span
                data-hero-line
                className="block font-sans text-[1.375rem] font-normal tracking-[-0.01em] text-text-secondary sm:text-2xl lg:text-[1.75rem]"
              >
                Produtos inteiros,{' '}
              </span>
            </span>
            <span className="mt-2 block overflow-hidden pb-[0.1em] -mb-[0.1em] sm:mt-3">
              <span data-hero-line className="block text-[clamp(3.25rem,10vw,6.5rem)]">
                do banco{' '}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
              <span data-hero-line className="block text-[clamp(3.25rem,10vw,6.5rem)]">
                à <span className="text-accent-light">interface</span>.
              </span>
            </span>
          </h1>

          <p
            data-hero-body
            className="mt-8 max-w-[34rem] text-balance text-base leading-relaxed text-text-secondary sm:text-lg"
          >
            Estudante de Engenharia da Computação na UFC e estagiário de desenvolvimento na RF Group. Modelo o schema,
            fecho a fronteira no banco e levo o produto até a última animação da interface.
          </p>

          <div data-hero-actions className="mt-10 flex flex-wrap items-center gap-4">
            <span ref={magneticRef} className="inline-block will-change-transform">
              <Button to="#projetos" icon={<ArrowRight size={16} />}>
                Ver projetos
              </Button>
            </span>
            <Button to="#contato" variant="secondary">
              Entre em contato
            </Button>
          </div>
        </div>

        <div data-hero-strata className="w-full max-w-[420px] lg:max-w-none">
          <SystemStrata ambientDelay={introPlaying ? 4.6 : 2.6} />
        </div>
      </div>

      <a
        data-hero-cue
        href="#projetos"
        aria-label="Rolar para a seção de projetos"
        className="group absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-text-muted transition-colors hover:text-accent-light lg:flex"
      >
        <span className="label">Scroll</span>
        <span className="hero-scroll-trail relative h-10 w-px overflow-hidden bg-border-strong transition-colors group-hover:bg-accent-light/40" />
      </a>
    </section>
  )
}
