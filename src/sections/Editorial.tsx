import { useRef } from 'react'
import { Picture } from '@/components/ui/Picture'
import { FadeIn, RevealLines } from '@/components/ui/Reveal'
import { useGsap } from '@/hooks/useGsap'
import { GSAP_EASE, MEDIA } from '@/lib/motion'
import { gsap } from '@/lib/scroll'

/**
 * Pausa editorial entre os projetos e o restante da página.
 *
 * A imagem (picos acima de um mar de nuvens, tratada para a paleta do site) é
 * a metáfora do que os projetos acima têm em comum: uma camada decide o que a
 * seguinte enxerga. O scroll faz o papel de câmera — a foto assenta devagar
 * enquanto cruza a tela — e nada mais se move.
 */
export function Editorial() {
  const sectionRef = useRef<HTMLElement>(null)

  useGsap(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ reduced: MEDIA.reduced, motionOk: MEDIA.motionOk }, (context) => {
        const { reduced } = context.conditions as { reduced: boolean }
        if (reduced) return
        gsap.fromTo(
          '[data-editorial-image]',
          { scale: 1.12, yPercent: -3 },
          {
            scale: 1.04,
            yPercent: 3,
            ease: GSAP_EASE.none,
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
      return () => mm.revert()
    },
    [],
    sectionRef,
  )

  return (
    <section
      ref={sectionRef}
      aria-label="Cada camada decide o que a próxima pode ver"
      className="relative h-[72svh] min-h-[480px] overflow-hidden sm:h-[80vh]"
    >
      <div data-editorial-image className="absolute inset-0 will-change-transform">
        <Picture
          base="/editorial/strata"
          alt="Picos de montanha ao entardecer, acima de um mar de nuvens"
          widths={[960, 1600, 2400]}
          sizes="100vw"
          width={2400}
          height={1600}
          className="h-full w-full"
          imgClassName="object-center"
        />
      </div>

      {/* A foto entra e sai do preto da página: não há borda, só fusão. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, var(--color-bg) 0%, rgba(8,9,11,0.2) 26%, rgba(8,9,11,0.15) 60%, var(--color-bg) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 60%, transparent 40%, rgba(8,9,11,0.55) 100%)' }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-content flex-col justify-end px-6 pb-14 sm:px-8 sm:pb-20">
        <RevealLines
          as="p"
          lines={['Cada camada', 'decide o que', 'a próxima pode ver.']}
          className="display max-w-3xl text-[2.25rem] text-text sm:text-5xl lg:text-6xl"
        />
        <FadeIn delay={0.25}>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">
            RLS, RPCs e webhooks assinados: a fronteira de acesso fica no banco, não na tela. É assim que os sistemas
            acima foram construídos.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
