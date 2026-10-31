import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Picture } from '@/components/ui/Picture'
import { useSpotlight } from '@/hooks/useSpotlight'
import { projectDomain, projectStatus } from '@/lib/project'
import { cn, imageBase } from '@/lib/utils'
import type { Project } from '@/types/project'

interface ProjectFrameProps {
  project: Project
  className?: string
  /** Proporção da área da screenshot. */
  aspect?: string
  sizes?: string
  priority?: boolean
  /** A screenshot desliza alguns % dentro da moldura conforme o scroll. */
  parallax?: boolean
}

/**
 * Moldura discreta de navegador com a screenshot real: barra fina com domínio
 * e status, borda que acende com o ponteiro (spotlight) e zoom mínimo no
 * hover do grupo `media`. A interface do projeto é a protagonista.
 */
export function ProjectFrame({
  project,
  className,
  aspect = 'aspect-[16/10]',
  sizes = '(min-width: 1024px) 60vw, 100vw',
  priority = false,
  parallax = false,
}: ProjectFrameProps) {
  const spotRef = useSpotlight<HTMLDivElement>()
  const viewportRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: viewportRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const status = projectStatus(project)

  return (
    <div ref={spotRef} className={cn('spotlight overflow-hidden rounded-xl border border-border bg-surface', className)}>
      <div className="flex h-9 items-center justify-between gap-4 border-b border-border px-3.5 font-mono text-[0.6875rem] text-text-secondary">
        <span className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="flex shrink-0 gap-1.5">
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
          </span>
          <span className="truncate">{projectDomain(project)}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <span aria-hidden="true" className={cn('size-1.5 rounded-full', status.live ? 'bg-success' : 'bg-warm')} />
          <span className="max-sm:sr-only">{status.label}</span>
        </span>
      </div>

      <div ref={viewportRef} className={cn('relative overflow-hidden bg-bg-secondary', aspect)}>
        <motion.div className="absolute inset-x-0 -inset-y-[5%]" style={parallax && !reduced ? { y } : undefined}>
          <div className="h-full w-full transition-transform duration-700 ease-premium group-hover/media:scale-[1.025]">
            {project.image ? (
              <Picture
                base={imageBase(project.image)}
                alt={`Captura de tela do projeto ${project.title}`}
                sizes={sizes}
                width={1600}
                height={1000}
                priority={priority}
                className="h-full w-full"
                imgClassName="object-top"
              />
            ) : (
              <div className="h-full w-full bg-surface-elevated" />
            )}
          </div>
        </motion.div>
        {/* Grading leve: aproxima a screenshot da paleta sem escondê-la. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgb(9 9 13 / 0.45), transparent 40%)' }}
        />
      </div>
    </div>
  )
}
