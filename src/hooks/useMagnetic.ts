import { useEffect, useRef } from 'react'

const RADIUS = 110
const PULL = 0.32
const INERTIA = 0.14
const SETTLE = 0.05

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

/**
 * Aproxima o elemento do ponteiro quando ele chega perto, com inércia.
 * O deslocamento é pequeno de propósito: a intenção é o botão parecer ter
 * peso, não perseguir o cursor.
 */
export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0

    const tick = () => {
      currentX = lerp(currentX, targetX, INERTIA)
      currentY = lerp(currentY, targetY, INERTIA)
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`

      const settled = Math.abs(targetX - currentX) < SETTLE && Math.abs(targetY - currentY) < SETTLE
      if (settled) {
        frame = 0
        if (targetX === 0 && targetY === 0) el.style.transform = ''
        return
      }
      frame = requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const dx = event.clientX - (rect.left + rect.width / 2)
      const dy = event.clientY - (rect.top + rect.height / 2)
      const near = Math.hypot(dx, dy) < RADIUS + Math.max(rect.width, rect.height) / 2

      targetX = near ? dx * PULL : 0
      targetY = near ? dy * PULL : 0
      start()
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (frame) cancelAnimationFrame(frame)
      el.style.transform = ''
    }
  }, [])

  return ref
}
