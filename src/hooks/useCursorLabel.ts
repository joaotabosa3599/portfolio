import { useEffect, type RefObject } from 'react'
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion'

const INERTIA = 0.2
const SETTLE = 0.2

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

/**
 * Faz um rótulo seguir o ponteiro dentro de uma zona (a mídia de um projeto),
 * com inércia. O cursor nativo some só ali, via `.cursor-label-zone`; botões
 * e links fora da zona continuam com o cursor do sistema.
 *
 * Inerte em toque e com `prefers-reduced-motion` — a zona continua clicável.
 */
export function useCursorLabel(zoneRef: RefObject<HTMLElement | null>, labelRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const zone = zoneRef.current
    const label = labelRef.current
    if (!zone || !label || !hasFinePointer() || prefersReducedMotion()) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0
    let rect = zone.getBoundingClientRect()

    const render = () => {
      label.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`
    }

    const tick = () => {
      currentX = lerp(currentX, targetX, INERTIA)
      currentY = lerp(currentY, targetY, INERTIA)
      render()
      const settled = Math.abs(targetX - currentX) < SETTLE && Math.abs(targetY - currentY) < SETTLE
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const handleEnter = (event: PointerEvent) => {
      rect = zone.getBoundingClientRect()
      targetX = currentX = event.clientX - rect.left
      targetY = currentY = event.clientY - rect.top
      render()
      zone.classList.add('cursor-label-zone')
      label.dataset.visible = 'true'
    }

    const handleMove = (event: PointerEvent) => {
      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
      start()
    }

    const handleLeave = () => {
      zone.classList.remove('cursor-label-zone')
      label.dataset.visible = 'false'
    }

    zone.addEventListener('pointerenter', handleEnter)
    zone.addEventListener('pointermove', handleMove, { passive: true })
    zone.addEventListener('pointerleave', handleLeave)

    return () => {
      zone.removeEventListener('pointerenter', handleEnter)
      zone.removeEventListener('pointermove', handleMove)
      zone.removeEventListener('pointerleave', handleLeave)
      zone.classList.remove('cursor-label-zone')
      if (frame) cancelAnimationFrame(frame)
    }
  }, [zoneRef, labelRef])
}
