import { motion } from 'framer-motion'
import { ArrowUpRight, Briefcase, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectVisual } from '@/components/projects/ProjectVisual'
import { GithubIcon } from '@/components/ui/BrandIcons'
import type { Project } from '@/types/project'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const caseHref = `/projetos/${project.slug}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={cn('group relative', project.featured && 'md:col-span-2')}
    >
      <Link
        to={caseHref}
        className="block overflow-hidden rounded-2xl"
        aria-label={`Ver estudo de caso do projeto ${project.title}`}
      >
        <div className="overflow-hidden rounded-2xl transition-shadow duration-500 group-hover:shadow-[0_0_0_1px_rgba(127,90,245,0.35)]">
          <div className="scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <ProjectVisual project={project} />
          </div>
        </div>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              <span>{project.category}</span>
              {project.isPlaceholder && (
                <span className="rounded-full border border-border-strong px-2 py-0.5 text-[10px] text-text-secondary">
                  Em breve
                </span>
              )}
              {project.inProgress && (
                <span className="rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-2 py-0.5 text-[10px] text-accent-emerald">
                  Em desenvolvimento
                </span>
              )}
              {project.kind === 'corporate' && (
                <span className="rounded-full border border-border-strong px-2 py-0.5 text-[10px] text-text-secondary">
                  Projeto corporativo
                </span>
              )}
            </div>
            <h3 className="mt-2 inline-flex items-center gap-1.5 text-xl font-semibold tracking-tight text-text transition-colors group-hover:text-accent-light sm:text-2xl">
              {project.title}
              <ArrowUpRight
                size={20}
                className="translate-y-0 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </h3>
          </div>
        </div>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary sm:text-base">{project.tagline}</p>

        {project.collaboration && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
            <Users size={13} />
            {project.collaboration}
          </p>
        )}

        {project.role && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-text-muted">
            <Briefcase size={13} />
            {project.role}
          </p>
        )}
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {project.tech.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-text-secondary"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : (
          <span className="text-xs text-text-muted">Tecnologias a definir</span>
        )}

        {project.links.github && (
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`Repositório no GitHub de ${project.title}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-accent-light"
          >
            <GithubIcon size={16} />
            Código
          </a>
        )}
      </div>
    </motion.article>
  )
}
