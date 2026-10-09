import { useRef } from 'react'
import { SystemStrata } from '@/components/hero/SystemStrata'
import { useGsap } from '@/hooks/useGsap'
import { intro } from '@/lib/intro'
import { GSAP_EASE } from '@/lib/motion'
import { getLenis, gsap } from '@/lib/scroll'

const LABELS = ['01 · dados', '02 · fronteira', '03 · interface']
const FINAL_LABEL = 'do banco à interface.'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/**
 * Abertura: o sistema do hero se monta em 3D, camada por camada, enquanto a
 * câmera orbita até o ângulo final. No desktop, a cena então voa para o lugar
 * exato dela no hero (FLIP) e a overlay se dissolve — a cena da abertura e a
 * do hero são o mesmo componente, no mesmo tamanho, então o encaixe é perfeito.
 * No mobile (a cena do hero fica abaixo da dobra) a overlay apenas se dissolve.
 *
 * ~2,8 s, pulável por clique, Esc ou botão. Scroll travado enquanto roda.
 */
export function Intro() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const skipRef = useRef<() => void>(() => {})

  useGsap(
    () => {
      const overlay = overlayRef.current
      const stage = stageRef.current
      if (!overlay || !stage) return

      // A cena da abertura tem exatamente o tamanho da cena do hero: assim o
      // FLIP do final é um simples translate + scale, sem distorção de perspectiva.
      const heroStage = document.querySelector<HTMLElement>('[data-hero-strata] [data-strata-stage]')
      const size = heroStage?.getBoundingClientRect().width || Math.min(window.innerWidth * 0.86, 440)
      const vw = window.innerWidth
      const vh = window.innerHeight
      const scale = clamp((Math.min(vw, vh) * 0.8) / size, 1, 1.5)
      gsap.set(stage, { width: size, height: size, x: (vw - size) / 2, y: (vh - size) / 2, scale })

      const lenis = getLenis()
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
      const unlock = () => {
        lenis?.start()
        document.documentElement.style.overflow = ''
      }

      const q = gsap.utils.selector(overlay)
      const outer = q('[data-strata-outer]')
      const planes = q<HTMLElement>('[data-plane]')
      const base = planes.map((plane) => Number(plane.dataset.planeZ))
      const labels = q<HTMLElement>('[data-intro-label]')
      const hairline = q('[data-intro-hairline]')

      // Estado inicial: câmera mais de cima e mais girada, planos fora de lugar.
      gsap.set(outer, { '--rx': '24deg', '--rz': '-44deg' })
      gsap.set(planes[0], { z: base[0] - 40, rotateX: 72, opacity: 0 })
      gsap.set(planes[1], { z: base[1] + 300, rotateX: -18, opacity: 0 })
      gsap.set(planes[2], { z: base[2] + 380, rotateX: -18, opacity: 0 })
      gsap.set(q('[data-guide]'), { scaleY: 0 })
      gsap.set(q('[data-row]'), { opacity: 0 })
      gsap.set(q('[data-bar]'), { scaleX: 0 })
      gsap.set(labels, { opacity: 0, y: 6 })
      gsap.set(hairline, { scaleX: 0 })

      const showLabel = (tl: gsap.core.Timeline, index: number, at: number) => {
        if (index > 0) tl.to(labels[index - 1], { opacity: 0, y: -8, duration: 0.18, ease: 'power2.in' }, at)
        tl.to(labels[index], { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, at + 0.18)
      }

      let handoff: gsap.core.Timeline | null = null

      // Despachado fora do callback do GSAP: callbacks rodam com o contexto da
      // animação ativa, e qualquer tween criado pelos ouvintes nasceria dentro
      // do contexto desta overlay — e morreria com ela.
      const finish = (next: 'done' | 'skipped') => {
        unlock()
        queueMicrotask(() => intro.set(next))
      }

      // Montagem: a linha vira o plano de dados; fronteira e interface descem.
      const assembly = gsap.timeline({
        defaults: { ease: GSAP_EASE.outExpo },
        onComplete: () => {
          intro.set('landing')
          const rect = heroStage?.getBoundingClientRect()
          const canFlip =
            rect !== undefined &&
            window.innerWidth >= 1024 &&
            rect.top > -size * 0.25 &&
            rect.bottom < window.innerHeight + size * 0.25

          handoff = gsap.timeline({ onComplete: () => finish('done') })
          handoff.to([labels, q('[data-intro-skip]')], { opacity: 0, duration: 0.3 }, 0)
          if (canFlip && rect) {
            handoff.to(stage, { x: rect.left, y: rect.top, scale: 1, duration: 0.95, ease: GSAP_EASE.inOutQuart }, 0)
          } else {
            handoff.to(stage, { scale: scale * 1.06, opacity: 0, duration: 0.7, ease: 'power2.inOut' }, 0)
          }
          handoff.to(q('[data-intro-bg]'), { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 0.15)
        },
      })

      assembly
        .to(hairline, { scaleX: 1, duration: 0.45 }, 0)
        .to(outer, { '--rx': '0deg', '--rz': '0deg', duration: 2.1 }, 0.2)
        .to(planes[0], { z: base[0], rotateX: 0, opacity: 1, duration: 1 }, 0.3)
        .to(hairline, { opacity: 0, duration: 0.3, ease: 'power2.out' }, 0.5)
        .to(planes[1], { z: base[1], rotateX: 0, opacity: 1, duration: 1 }, 0.7)
        .to(planes[2], { z: base[2], rotateX: 0, opacity: 1, duration: 1 }, 1.05)
        .to(q('[data-guide]'), { scaleY: 1, duration: 0.6 }, 1.2)
        .to(q('[data-row]'), { opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, 1.2)
        .to(q('[data-bar]'), { scaleX: 1, duration: 0.7, stagger: 0.06, ease: GSAP_EASE.outQuart }, 1.3)
      showLabel(assembly, 0, 0.35)
      showLabel(assembly, 1, 0.75)
      showLabel(assembly, 2, 1.1)
      showLabel(assembly, 3, 1.55)

      // Pular: só durante a montagem (no pouso, deixar terminar é mais suave).
      const skip = () => {
        if (intro.status !== 'playing') return
        assembly.kill()
        gsap.to(overlay, { opacity: 0, duration: 0.35, ease: 'power2.out', onComplete: () => finish('skipped') })
      }
      skipRef.current = skip
      const onKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') skip()
      }
      window.addEventListener('keydown', onKey)

      return () => {
        window.removeEventListener('keydown', onKey)
        assembly.kill()
        handoff?.kill()
        unlock()
      }
    },
    [],
    overlayRef,
  )

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[55] overflow-hidden"
      role="presentation"
      onClick={() => skipRef.current()}
    >
      <div data-intro-bg className="absolute inset-0 bg-bg">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[60vh] w-[90vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(127,90,245,0.16), rgba(127,90,245,0.05) 50%, transparent 100%)',
          }}
        />
      </div>

      <div
        data-intro-hairline
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-px w-[min(240px,50vw)] -translate-x-1/2 origin-center bg-white/35"
      />

      <div ref={stageRef} className="absolute left-0 top-0 will-change-transform" aria-hidden="true">
        <SystemStrata interactive={false} ambient={false} caption={false} />
      </div>

      <div className="absolute inset-x-0 bottom-9 flex items-end justify-between gap-6 px-6 sm:bottom-10 sm:px-8">
        <div className="relative h-7 min-w-[16rem]">
          {LABELS.map((label) => (
            <span key={label} data-intro-label className="label absolute left-0 top-1 text-text-secondary">
              {label}
            </span>
          ))}
          <span data-intro-label className="display absolute left-0 top-0 text-xl text-text">
            {FINAL_LABEL}
          </span>
        </div>
        <button
          type="button"
          data-intro-skip
          onClick={(event) => {
            event.stopPropagation()
            skipRef.current()
          }}
          className="label shrink-0 text-text-muted transition-colors hover:text-text"
        >
          Pular abertura
        </button>
      </div>
    </div>
  )
}
