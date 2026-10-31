import { useEffect, useRef } from 'react'
import { hasFinePointer } from '@/lib/motion'

/** Raio da lente que acende os pontos perto do cursor, em px. */
const LENS = 240

/**
 * Fundo da página: uma matriz de pontos nas interseções das colunas do grid
 * editorial (4 → 8 → 12 colunas) com um passo vertical fixo. É a estrutura
 * do layout aparecendo, como um papel de projeto — rola junto com o conteúdo.
 *
 * Com mouse, uma lente ao redor do cursor revela a subgrade fina (¼ do
 * passo) e acende os pontos principais em violeta. A
 * lente é um elemento pequeno movido por transform; o padrão dentro dela é
 * deslocado para coincidir com a matriz, então só ~480px são repintados por
 * movimento. A matriz em si é um background estático (rasterizado uma vez).
 *
 * Seções com fundo próprio (Sobre, Experiência) cobrem a matriz: o papel
 * aparece nas seções abertas e some nas de pausa.
 */
export function BlueprintField() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const lensRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const field = fieldRef.current
    const lens = lensRef.current
    if (!field || !lens) return

    // Passo horizontal = largura de uma coluna + gap, medido do layout real.
    const measure = () => {
      const styles = getComputedStyle(field)
      const columns = Number(styles.getPropertyValue('--bp-cols')) || 12
      const gap = parseFloat(styles.getPropertyValue('--bp-gap')) || 24
      field.style.setProperty('--bp-pitch', `${(field.clientWidth + gap) / columns}px`)
    }
    const resize = new ResizeObserver(measure)
    resize.observe(field)
    measure()

    if (!hasFinePointer()) return () => resize.disconnect()

    let clientX = -1
    let clientY = -1
    let frame = 0

    const paint = () => {
      frame = 0
      const rect = field.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const inside = clientX >= 0 && x > -LENS && x < rect.width + LENS
      lens.style.opacity = inside ? '1' : '0'
      if (!inside) return
      const left = x - LENS
      const top = y - LENS
      lens.style.transform = `translate3d(${left.toFixed(1)}px, ${top.toFixed(1)}px, 0)`
      // As duas camadas (malha principal e subgrade) seguem a mesma origem da matriz.
      const position = `${(-left - 1.5).toFixed(1)}px ${(-top - 1.5).toFixed(1)}px`
      lens.style.backgroundPosition = `${position}, ${(-left - 1).toFixed(1)}px ${(-top - 1).toFixed(1)}px`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      clientX = event.clientX
      clientY = event.clientY
      schedule()
    }
    const handleLeave = () => {
      clientX = -1
      schedule()
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    document.documentElement.addEventListener('pointerleave', handleLeave)
    return () => {
      resize.disconnect()
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('scroll', schedule)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden print:hidden">
      <div className="shell h-full">
        <div ref={fieldRef} className="blueprint-field relative h-full">
          <div
            ref={lensRef}
            className="blueprint-lens absolute left-0 top-0 opacity-0 transition-opacity duration-[var(--dur-component)]"
            style={{ width: LENS * 2, height: LENS * 2 }}
          />
        </div>
      </div>
    </div>
  )
}
