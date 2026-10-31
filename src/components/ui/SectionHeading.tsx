import type { ReactNode } from 'react'
import { FadeIn, RevealLines, Rule } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

interface SectionMarkerProps {
  index: string
  label: string
  /** Texto técnico alinhado à direita da régua (ex.: contagem). */
  aside?: ReactNode
  className?: string
}

/**
 * Marcador editorial de seção: índice, nome e uma régua que se desenha até
 * a borda do grid. É a única peça repetida entre seções — o resto da
 * composição muda de seção para seção.
 */
export function SectionMarker({ index, label, aside, className }: SectionMarkerProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <FadeIn as="p" y={6} className="label flex shrink-0 items-center gap-3 text-text-secondary">
        <span aria-hidden="true" className="text-brand-light">
          {index}
        </span>
        <span>{label}</span>
      </FadeIn>
      <Rule className="flex-1" delay={0.1} />
      {aside && (
        <FadeIn as="p" y={6} delay={0.2} className="label shrink-0 text-text-secondary">
          {aside}
        </FadeIn>
      )}
    </div>
  )
}

interface SectionTitleProps {
  lines: ReactNode[]
  className?: string
  /** Recuo editorial nas linhas a partir da segunda (só desktop). */
  indent?: boolean
}

export function SectionTitle({ lines, className, indent = false }: SectionTitleProps) {
  return (
    <RevealLines
      lines={lines}
      className={cn('display text-section text-text', className)}
      lineClassName={indent ? (i) => (i > 0 ? 'lg:pl-[8.333%]' : undefined) : undefined}
    />
  )
}
