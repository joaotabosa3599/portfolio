import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUpRight, Briefcase, Lock, Users } from 'lucide-react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProjectVisual } from '@/components/projects/ProjectVisual'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { Button } from '@/components/ui/Button'
import { projects } from '@/data/projects'

const caseSections = [
  { key: 'overview', label: 'Overview' },
  { key: 'problem', label: 'Problema & objetivo' },
  { key: 'process', label: 'Processo' },
  { key: 'solution', label: 'Solução' },
  { key: 'challenges', label: 'Principais desafios' },
  { key: 'result', label: 'Resultado' },
] as const

export function ProjectCasePage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <Navigate to="/" replace />

  const { caseStudy } = project

  return (
    <article className="pb-28 pt-32 sm:pt-36">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <Link
          to="/#projetos"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent-light"
        >
          <ArrowLeft size={15} />
          Voltar para projetos
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light">{project.category}</span>
            {project.kind === 'corporate' && (
              <span className="rounded-full border border-border-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary">
                Projeto corporativo
              </span>
            )}
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">{project.tagline}</p>

          {project.collaboration && (
            <p className="mt-3 flex items-center gap-2 text-sm text-text-muted">
              <Users size={15} />
              {project.collaboration}
            </p>
          )}

          {project.role && (
            <p className="mt-3 flex items-center gap-2 text-sm text-text-muted">
              <Briefcase size={15} />
              {project.role}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.links.live && (
              <Button href={project.links.live} size="md" icon={<ArrowUpRight size={16} />}>
                Ver projeto
              </Button>
            )}
            {project.links.github && (
              <Button href={project.links.github} variant="secondary" size="md" icon={<GithubIcon size={16} />} iconPosition="left">
                Ver código
              </Button>
            )}
            {project.inProgress && !project.links.live && !project.links.github && (
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-4 py-2 text-sm text-accent-emerald">
                <Lock size={14} />
                {project.kind === 'corporate' ? 'Projeto corporativo em desenvolvimento' : 'Projeto privado em desenvolvimento'}
              </span>
            )}
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14"
        >
          <ProjectVisual project={project} />
        </motion.div>

        {caseStudy ? (
          <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,1.35fr)]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Tecnologias</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {caseStudy.technologies.map((tech) => (
                  <li key={tech} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-text-secondary">
                    {tech}
                  </li>
                ))}
              </ul>

              <h2 className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Fluxo do produto</h2>
              <ol className="mt-4 space-y-3">
                {caseStudy.gallerySteps.map((step, index) => (
                  <li key={step} className="flex items-center gap-3 text-sm text-text-secondary">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-strong font-mono text-[11px] text-text-muted">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </aside>

            <div className="space-y-14">
              {caseSections.map(({ key, label }, index) => (
                <motion.section
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.03, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-light">{label}</h2>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                    {caseStudy[key]}
                  </p>
                </motion.section>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-2xl border border-dashed border-border-strong p-12 text-center">
            <p className="text-base text-text-secondary">
              O estudo de caso deste projeto ainda está em construção. Volte em breve para ver os detalhes completos.
            </p>
          </div>
        )}
      </div>
    </article>
  )
}
