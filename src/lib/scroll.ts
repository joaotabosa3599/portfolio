import { prefersReducedMotion } from '@/lib/motion'

/** Altura da navbar fixa, usada como offset ao navegar por âncoras. */
export const NAV_OFFSET = 72

/**
 * Rola até um alvo (seletor, elemento ou topo) com o scroll nativo do
 * navegador: suave por padrão, instantâneo com `prefers-reduced-motion`.
 * Não há scroll suavizado por JS — a roda do mouse continua do sistema.
 */
export function scrollTo(target: string | HTMLElement | number, options: { immediate?: boolean } = {}) {
  const behavior: ScrollBehavior = options.immediate || prefersReducedMotion() ? 'auto' : 'smooth'

  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior })
    return
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior })
}
