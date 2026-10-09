import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon } from '@/components/ui/BrandIcons'
import type { Project } from '@/types/project'
import { cn } from '@/lib/utils'

interface ProjectStepProps {
  project: Project
  index: number
  total: number
  active?: boolean
  className?: string
}

/**
 * Texto de um projeto no showcase: índice, nome, tipo, resumo compacto
 * (problema → contribuição → resultado), stack e links.
 */
export function ProjectStep({ project, index, total, active = true, className }: ProjectStepProps) {
  const caseHref = `/projetos/${project.slug}`
  const meta = [project.category, project.kindLabel, project.inProgress && 'Em desenvolvimento'].filter(Boolean)

  return (
    <div
      data-step-content
      className={cn(
        'transition-opacity duration-500 ease-out-quart',
        active ? 'opacity-100' : 'opacity-35',
        className,
      )}
    >
      <p className="label text-text-muted">
        {String(index + 1).padStart(2, '0')}
        <span className="mx-1.5 text-border-strong">/</span>
        {String(total).padStart(2, '0')}
      </p>

      <h3 className="display mt-4 text-[2rem] text-text sm:text-[2.5rem]">
        <Link to={caseHref} className="link-draw">
          {project.title}
        </Link>
      </h3>
      <p className="mt-2.5 font-mono text-xs text-text-muted">{meta.join(' · ')}</p>

      <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary">{project.tagline}</p>

      {project.brief && (
        <dl className="mt-7 space-y-3.5 border-t border-border pt-6">
          <BriefRow term="Problema">{project.brief.problem}</BriefRow>
          <BriefRow term="Contribuição">{project.brief.contribution}</BriefRow>
          <BriefRow term="Resultado">{project.brief.result}</BriefRow>
        </dl>
      )}

      <p className="mt-6 font-mono text-xs leading-relaxed text-text-muted">{project.tech.join(' · ')}</p>

      <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm">
        <Link to={caseHref} className="group inline-flex items-center gap-1.5 font-medium text-text">
          <span className="link-draw">Ver estudo de caso</span>
          <ArrowRight size={15} className="arrow-shift" />
        </Link>
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-text"
          >
            <span className="link-draw">Site</span>
            <ArrowUpRight size={14} className="arrow-shift-diag" />
          </a>
        )}
        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-text"
          >
            <GithubIcon size={14} />
            <span className="link-draw">Código</span>
          </a>
        )}
      </div>
    </div>
  )
}

function BriefRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4">
      <dt className="label sm:pt-[3px] text-text-muted">{term}</dt>
      <dd className="text-sm leading-relaxed text-text-secondary">{children}</dd>
    </div>
  )
}
