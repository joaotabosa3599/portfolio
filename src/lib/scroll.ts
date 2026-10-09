import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion'

gsap.registerPlugin(ScrollTrigger)

/** Altura da navbar fixa, usada como offset ao navegar por âncoras. */
export const NAV_OFFSET = 72

let lenis: Lenis | null = null
let tickerFn: ((time: number) => void) | null = null

/**
 * Liga o Lenis ao ticker do GSAP para que ScrollTrigger e scroll suave
 * compartilhem o mesmo relógio. Só no desktop com ponteiro fino e sem
 * `prefers-reduced-motion`: no toque o scroll nativo já é o melhor possível.
 */
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion() || !hasFinePointer()) return null

  lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    autoRaf: false,
    anchors: false,
  })

  lenis.on('scroll', ScrollTrigger.update)
  tickerFn = (time) => lenis?.raf(time * 1000)
  gsap.ticker.add(tickerFn)
  gsap.ticker.lagSmoothing(0)

  return lenis
}

export function stopSmoothScroll() {
  if (tickerFn) gsap.ticker.remove(tickerFn)
  lenis?.destroy()
  lenis = null
  tickerFn = null
}

export function getLenis() {
  return lenis
}

/**
 * Rola até um alvo (seletor, elemento ou topo). Passa pelo Lenis quando ele
 * está ativo; caso contrário usa o scroll nativo, suave ou instantâneo
 * conforme a preferência de motion.
 */
export function scrollTo(target: string | HTMLElement | number, options: { immediate?: boolean } = {}) {
  const immediate = options.immediate || prefersReducedMotion()

  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -NAV_OFFSET, immediate, force: true })
    return
  }

  const behavior: ScrollBehavior = immediate ? 'auto' : 'smooth'
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior })
}

export { gsap, ScrollTrigger }
