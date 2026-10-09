import { useLayoutEffect, type DependencyList, type RefObject } from 'react'
import { gsap } from '@/lib/scroll'

type GsapCallback = (context: gsap.Context) => void | (() => void)

/**
 * Executa animações GSAP dentro de um `gsap.context` ligado ao escopo e as
 * reverte na desmontagem: tweens, ScrollTriggers e matchMedia criados aqui
 * dentro são limpos sem listeners duplicados (StrictMode incluso).
 *
 * `useLayoutEffect` garante que estados iniciais (`gsap.set`/`from`) sejam
 * aplicados antes da primeira pintura — sem piscar o estado final.
 */
export function useGsap(callback: GsapCallback, deps: DependencyList = [], scope?: RefObject<Element | null>) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback, scope?.current ?? undefined)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
