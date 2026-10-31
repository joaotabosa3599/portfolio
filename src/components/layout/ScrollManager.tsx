import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollTo } from '@/lib/scroll'

/**
 * Dono da navegação por âncora:
 *  - `/#projetos` rola até a seção com o offset da navbar — suave dentro da
 *    mesma página, instantâneo ao chegar de outra rota;
 *  - trocar de página sem hash volta ao topo.
 */
export function ScrollManager() {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    const changedRoute = previousPath.current !== location.pathname
    previousPath.current = location.pathname

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      // Ao chegar de outra rota a seção pode ainda não existir (a home monta o
      // que está abaixo do hero numa transição): tenta de novo nos próximos frames.
      let tries = 0
      let frame = 0
      const attempt = () => {
        const el = document.getElementById(id)
        if (el) scrollTo(el, { immediate: changedRoute })
        else if (tries++ < 180) frame = requestAnimationFrame(attempt)
      }
      frame = requestAnimationFrame(attempt)
      return () => cancelAnimationFrame(frame)
    }

    if (changedRoute) scrollTo(0, { immediate: true })
  }, [location])

  return null
}
