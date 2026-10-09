/**
 * Sistema de motion — fonte única de verdade para timings e curvas.
 * As mesmas curvas estão declaradas como tokens CSS em src/index.css.
 *
 * Escalas (em segundos, para Framer Motion e GSAP):
 *   micro      feedback de interface (hover, foco)
 *   component  transições de componente (menus, abas, botões)
 *   reveal     entrada de conteúdo (texto, imagens, métricas)
 *   editorial  movimentos de câmera e transições de seção
 *   ambient    fundo, névoa, luz — quase imperceptível
 */
export const DUR = {
  micro: 0.15,
  component: 0.28,
  reveal: 0.6,
  editorial: 1,
  ambient: 28,
} as const

/** Curvas como arrays cubic-bezier (Framer Motion). */
export const EASE = {
  outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  outQuart: [0.25, 1, 0.5, 1] as [number, number, number, number],
  inOutQuart: [0.76, 0, 0.24, 1] as [number, number, number, number],
} as const

/** Curvas equivalentes para o GSAP. */
export const GSAP_EASE = {
  outExpo: 'expo.out',
  outQuart: 'power3.out',
  inOutQuart: 'power3.inOut',
  none: 'none',
} as const

/** Transição padrão de reveal para o Framer (`whileInView`). */
export const revealTransition = (delay = 0) => ({ duration: DUR.reveal, ease: EASE.outExpo, delay })

/** Viewport padrão para reveals: dispara uma vez, um pouco antes de entrar. */
export const revealViewport = { once: true, margin: '0px 0px -12% 0px' } as const

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
}

/** Breakpoints usados pelo gsap.matchMedia — espelham o Tailwind. */
export const MEDIA = {
  desktop: '(min-width: 1024px)',
  mobile: '(max-width: 1023px)',
  reduced: '(prefers-reduced-motion: reduce)',
  motionOk: '(prefers-reduced-motion: no-preference)',
  finePointer: '(pointer: fine)',
} as const
