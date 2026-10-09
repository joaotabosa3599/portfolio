import { forwardRef } from 'react'
import { Picture } from '@/components/ui/Picture'
import type { Project } from '@/types/project'
import { cn, imageBase } from '@/lib/utils'

export const FRAME_SIZES = '(min-width: 1024px) 640px, (min-width: 640px) 90vw, 100vw'

function domainOf(project: Project) {
  if (project.links.live) return project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return project.inProgress ? 'privado · em desenvolvimento' : `${project.slug}.vercel.app`
}

interface ProjectFrameProps {
  project: Project
  className?: string
  priority?: boolean
}

/**
 * Moldura discreta de navegador: uma barra fina com o domínio e a screenshot
 * real. A interface do projeto é a protagonista — sem mockup de dispositivo.
 * O fragmento de UI (`highlight`) é HTML de verdade, não parte da imagem.
 */
export const ProjectFrame = forwardRef<HTMLDivElement, ProjectFrameProps>(function ProjectFrame(
  { project, className, priority = false },
  ref,
) {
  return (
    <div ref={ref} className={cn('overflow-hidden rounded-xl border border-border bg-bg-secondary', className)}>
      <div className="flex h-9 items-center justify-between border-b border-border px-4 font-mono text-[11px] text-text-muted">
        <span className="truncate">{domainOf(project)}</span>
        <span className="ml-4 shrink-0">
          {project.inProgress ? (
            <span className="text-accent-emerald">● em desenvolvimento</span>
          ) : (
            <span>● produção</span>
          )}
        </span>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        {project.image ? (
          <Picture
            base={imageBase(project.image)}
            alt={`Captura de tela do projeto ${project.title}`}
            sizes={FRAME_SIZES}
            width={1600}
            height={1000}
            priority={priority}
            className="absolute inset-0 h-full w-full"
            imgClassName="object-top will-change-transform"
          />
        ) : (
          <div className="absolute inset-0 bg-card" />
        )}

        {/* Grading leve: aproxima a screenshot da paleta do site sem escondê-la. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(8,9,11,0.55), rgba(8,9,11,0) 45%)' }}
        />

        {project.highlight && (
          <div
            data-frame-chip
            className="absolute bottom-3 left-3 max-w-[80%] rounded-lg border border-white/[0.12] bg-[#0c0d11]/90 px-3 py-2.5 font-mono text-[10px] leading-relaxed sm:bottom-4 sm:left-4 sm:px-3.5 sm:py-3 sm:text-[11px]"
          >
            <p className="label mb-1.5 text-[10px] text-accent-light">{project.highlight.label}</p>
            {project.highlight.lines.map((line) => (
              <p key={line} className="truncate text-text-secondary">
                {line}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})
