import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollTo, startSmoothScroll, stopSmoothScroll, ScrollTrigger } from '@/lib/scroll'

/**
 * Dono do scroll da aplicação:
 *  - inicia/encerra o scroll suave (Lenis) uma vez;
 *  - resolve navegação por âncora (`/#projetos`) com offset da navbar,
 *    suave dentro da mesma página e instantânea ao trocar de rota;
 *  - volta ao topo ao trocar de página sem hash;
 *  - pede ao ScrollTrigger que recalcule depois de cada troca de rota.
 */
export function ScrollManager() {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    startSmoothScroll()
    return () => stopSmoothScroll()
  }, [])

  useEffect(() => {
    const changedRoute = previousPath.current !== location.pathname
    previousPath.current = location.pathname

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      const el = document.getElementById(id)
      if (el) {
        // Ao chegar de outra rota, a página acabou de montar: pular direto evita
        // uma animação de scroll sobre um layout que ainda está assentando.
        scrollTo(el, { immediate: changedRoute })
      }
    } else if (changedRoute) {
      scrollTo(0, { immediate: true })
    }

    // Página nova, triggers novos. Só ao trocar de rota: um refresh no meio de
    // um scroll suave nativo (sem Lenis, no toque) restaura a posição anterior
    // e cancela a animação de scroll antes de ela chegar à âncora.
    if (!changedRoute) return
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [location])

  return null
}
