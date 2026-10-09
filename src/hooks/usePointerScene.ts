import { useEffect, type RefObject } from 'react'

const SETTLE = 0.0008
const INERTIA = 0.07

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

function clamp(value: number) {
  return Math.min(1, Math.max(-1, value))
}

/**
 * Publica a posição do ponteiro como `--px` / `--py` (−1 a 1) no elemento,
 * com inércia. Escreve direto no style — nunca passa por estado do React,
 * para não re-renderizar a árvore a cada frame.
 *
 * Fica inerte em toque, em telas pequenas e com `prefers-reduced-motion`.
 */
export function usePointerScene(ref: RefObject<HTMLElement | null>, enabled = true) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0
    let onScreen = true
    let rect = el.getBoundingClientRect()

    const measure = () => {
      rect = el.getBoundingClientRect()
    }

    const tick = () => {
      currentX = lerp(currentX, targetX, INERTIA)
      currentY = lerp(currentY, targetY, INERTIA)
      el.style.setProperty('--px', currentX.toFixed(4))
      el.style.setProperty('--py', currentY.toFixed(4))

      const settled = Math.abs(targetX - currentX) < SETTLE && Math.abs(targetY - currentY) < SETTLE
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame && onScreen) frame = requestAnimationFrame(tick)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (!onScreen || rect.width === 0) return
      targetX = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1)
      targetY = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1)
      start()
    }

    // Fora da tela a cena volta ao repouso e o loop para de agendar frames.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting
        if (!onScreen) {
          targetX = 0
          targetY = 0
          start()
        }
      },
      { threshold: 0 },
    )
    observer.observe(el)

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      if (frame) cancelAnimationFrame(frame)
      el.style.removeProperty('--px')
      el.style.removeProperty('--py')
    }
  }, [ref, enabled])
}
