import type { ReactNode } from 'react'
import { FadeIn, RevealLines } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow: string
  /** Título em linhas: cada entrada sobe de uma máscara própria. */
  title: ReactNode[]
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Índice da seção, em mono, ao lado do eyebrow. */
  index?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'left', className, index }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <FadeIn className="flex items-center gap-3">
        {index && <span className="label text-text-muted">{index}</span>}
        <span className="label text-accent-light">{eyebrow}</span>
      </FadeIn>
      <RevealLines
        lines={title}
        className="display mt-4 text-balance text-[2.5rem] text-text sm:text-5xl lg:text-[3.5rem]"
      />
      {description && (
        <FadeIn delay={0.15}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">{description}</p>
        </FadeIn>
      )}
    </div>
  )
}
