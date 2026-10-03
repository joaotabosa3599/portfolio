import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const REVEAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const CHAR_STAGGER = 0.028

const LIFT = 9
const FALLOFF = 90
const INERTIA = 0.12
const SETTLE = 0.05

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

interface SplitHeadlineProps {
  text: string
  /** Quando a revelação começa, em segundos. */
  delay?: number
  className?: string
}

/**
 * Revela a headline letra a letra (máscara por palavra + desfoque que resolve)
 * e, no desktop, deixa as letras reagirem à proximidade do ponteiro.
 *
 * A entrada anima o span externo (Framer) e o ponteiro move o span interno,
 * para que as duas transformações não disputem a mesma propriedade.
 */
export function SplitHeadline({ text, delay = 0, className }: SplitHeadlineProps) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const charsRef = useRef<(HTMLSpanElement | null)[]>([])

  // Índice corrido das letras, para o atraso da revelação não reiniciar a cada palavra.
  const layout = text.split(' ').reduce<{ word: string; start: number }[]>((acc, word) => {
    const previous = acc[acc.length - 1]
    acc.push({ word, start: previous ? previous.start + previous.word.length : 0 })
    return acc
  }, [])
  const total = layout.reduce((sum, { word }) => sum + word.length, 0)

  useEffect(() => {
    const root = rootRef.current
    const chars = charsRef.current.slice(0, total).filter((node): node is HTMLSpanElement => node !== null)
    if (!root || chars.length === 0) return

    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return

    const current = new Float32Array(chars.length)
    const target = new Float32Array(chars.length)
    let centers: number[] = []
    let frame = 0

    const measure = () => {
      centers = chars.map((char) => {
        const rect = char.getBoundingClientRect()
        return rect.left + rect.width / 2
      })
    }

    const tick = () => {
      let settled = true
      for (let i = 0; i < chars.length; i++) {
        current[i] = lerp(current[i], target[i], INERTIA)
        const amount = current[i]
        const char = chars[i]
        char.style.transform = `translate3d(0, ${(-amount * LIFT).toFixed(2)}px, 0)`
        char.style.textShadow =
          amount > 0.02 ? `0 0 ${(amount * 26).toFixed(1)}px rgba(164,139,251,${(amount * 0.5).toFixed(3)})` : ''
        if (Math.abs(target[i] - amount) > SETTLE) settled = false
      }
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (centers.length === 0) measure()
      const rect = root.getBoundingClientRect()
      const inside = event.clientY > rect.top - FALLOFF && event.clientY < rect.bottom + FALLOFF

      for (let i = 0; i < centers.length; i++) {
        if (!inside) {
          target[i] = 0
          continue
        }
        const distance = Math.abs(event.clientX - centers[i])
        target[i] = Math.max(0, 1 - distance / FALLOFF) ** 2
      }
      start()
    }

    measure()
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
      if (frame) cancelAnimationFrame(frame)
      for (const char of chars) {
        char.style.transform = ''
        char.style.textShadow = ''
      }
    }
  }, [total])

  return (
    <h1 ref={rootRef} aria-label={text} className={className}>
      {layout.map(({ word, start }, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block">
          {/* A máscara recorta a linha; o padding evita cortar acentos e descidas. */}
          <span
            className="-mx-[0.06em] -mb-[0.14em] inline-block overflow-hidden px-[0.06em] pb-[0.14em]"
            aria-hidden="true"
          >
            {[...word].map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                className="inline-block will-change-transform"
                initial={{ y: '115%', opacity: 0, filter: 'blur(14px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.05, ease: REVEAL_EASE, delay: delay + (start + i) * CHAR_STAGGER }}
              >
                <span
                  ref={(node) => {
                    charsRef.current[start + i] = node
                  }}
                  className="inline-block"
                >
                  {char}
                </span>
              </motion.span>
            ))}
          </span>
          {wordIndex < layout.length - 1 && <span aria-hidden="true">&nbsp;</span>}
        </span>
      ))}
    </h1>
  )
}
