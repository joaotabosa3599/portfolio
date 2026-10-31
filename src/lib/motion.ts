import type { Transition } from 'framer-motion'

/**
 * Sistema de motion — fonte única de verdade para timings e curvas.
 * As mesmas curvas existem como tokens CSS em src/index.css (--ease-*, --dur-*).
 *
 * Divisão de trabalho:
 *  - CSS: hover, foco e loops ambientes (flutuação, pulsos) — compositor puro.
 *  - Framer Motion: entradas, reveals em viewport, layout e animações ligadas
 *    ao scroll (useScroll/useTransform). Uma biblioteca só para o JS.
 *
 * Durações em segundos (Framer).
 */
export const DUR = {
  /** Hover simples */
  hover: 0.2,
  /** Botões e microinterações */
  micro: 0.28,
  /** Transições de componente (menu, indicador, estados) */
  component: 0.5,
  /** Reveal de blocos */
  reveal: 0.7,
  /** Reveal de títulos */
  title: 0.85,
} as const

type Bezier = [number, number, number, number]

export const EASE = {
  /** Ease-out premium: rápido na intenção, longo na parada. */
  premium: [0.22, 1, 0.36, 1] as Bezier,
  /** Transição de interface. */
  ui: [0.4, 0, 0.2, 1] as Bezier,
  /** Entrada e saída simétricas, para loops e câmera. */
  inOut: [0.65, 0, 0.35, 1] as Bezier,
} as const

/** Molas para movimento de profundidade e resposta física. */
export const SPRING = {
  /** Planos da escultura e elementos com massa. */
  depth: { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 } satisfies Transition,
  /** Indicadores que seguem a seleção (navbar). */
  indicator: { type: 'spring', stiffness: 420, damping: 38, mass: 0.6 } satisfies Transition,
} as const

/**
 * Sequência de entrada do hero, em segundos a partir da montagem.
 * Total contido em ~1,8s e nada bloqueia a navegação.
 */
export const HERO_SEQUENCE = {
  backdrop: 0,
  label: 0.2,
  headline: 0.3,
  headlineStagger: 0.09,
  body: 0.5,
  actions: 0.62,
  planes: 0.5,
  planesStagger: 0.14,
  connectors: 1.15,
} as const

export const revealTransition = (delay = 0): Transition => ({ duration: DUR.reveal, ease: EASE.premium, delay })

/** Viewport padrão para reveals: dispara uma vez, um pouco antes de entrar. */
export const revealViewport = { once: true, margin: '0px 0px -10% 0px' } as const

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function hasFinePointer() {
  return typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

/** Breakpoints — espelham o Tailwind. */
export const MEDIA = {
  desktop: '(min-width: 1024px)',
  finePointer: '(hover: hover) and (pointer: fine)',
  reduced: '(prefers-reduced-motion: reduce)',
} as const
