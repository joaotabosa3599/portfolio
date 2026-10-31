import { useEffect, useState } from 'react'

/**
 * Scrollspy: a seção ativa é a última cujo topo já passou de 40% da altura
 * da tela. Medido no scroll (agrupado por frame), não por interseção — assim
 * seções muito altas ou muito baixas se comportam igual. Devolve '' antes da
 * primeira seção (no hero), para que nenhum item apareça ativo ali.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    if (sectionIds.length === 0) return

    let frame = 0
    const measure = () => {
      frame = 0
      const line = window.innerHeight * 0.4
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      // No fim da página a última seção pode não alcançar a linha.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = sectionIds[sectionIds.length - 1]
      }
      setActiveId(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sectionIds])

  return sectionIds.length > 0 ? activeId : ''
}
