import { cn } from '@/lib/utils'

/**
 * Monograma JT. — Space Grotesk em peso médio, tracking fechado e o ponto
 * final na cor da marca: o único violeta da navbar em repouso.
 */
export function Monogram({ className }: { className?: string }) {
  return (
    <span className={cn('font-display font-semibold tracking-[-0.06em] text-text', className)}>
      JT<span className="text-brand">.</span>
    </span>
  )
}
