import { useEffect, useRef } from 'react'
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion'

/**
 * Iluminação localizada que segue o ponteiro. Publica `--mx` / `--my` (px) e
 * `data-lit` no elemento; o desenho fica no CSS (`.spotlight`). Escreve direto
 * no style, sem estado do React. Inerte em toque e com reduced motion.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !hasFinePointer() || prefersReducedMotion()) return

    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      frame = 0
      el.style.setProperty('--mx', `${x.toFixed(0)}px`)
      el.style.setProperty('--my', `${y.toFixed(0)}px`)
    }

    const handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      x = event.clientX - rect.left
      y = event.clientY - rect.top
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const handleEnter = (event: PointerEvent) => {
      handleMove(event)
      el.dataset.lit = 'true'
    }
    const handleLeave = () => {
      el.dataset.lit = 'false'
    }

    el.addEventListener('pointerenter', handleEnter)
    el.addEventListener('pointermove', handleMove, { passive: true })
    el.addEventListener('pointerleave', handleLeave)
    return () => {
      el.removeEventListener('pointerenter', handleEnter)
      el.removeEventListener('pointermove', handleMove)
      el.removeEventListener('pointerleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
