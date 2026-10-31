import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ProjectFrame } from '@/components/projects/ProjectFrame'
import { ProjectVisual } from '@/components/projects/ProjectVisual'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/Reveal'
import { projects } from '@/data/projects'
import { useActiveSection } from '@/hooks/useActiveSection'
import { DUR, EASE } from '@/lib/motion'
import { pad, projectMeta, projectStatus } from '@/lib/project'
import { cn } from '@/lib/utils'
import type { CaseStudy, Project } from '@/types/project'

const caseSections: { key: keyof Omit<CaseStudy, 'technologies' | 'gallerySteps'>; id: string; label: string }[] = [
  { key: 'overview', id: 'visao-geral', label: 'Visão geral' },
  { key: 'problem', id: 'problema', label: 'Problema e objetivo' },
  { key: 'process', id: 'processo', label: 'Processo e arquitetura' },
  { key: 'solution', id: 'solucao', label: 'Solução' },
  { key: 'challenges', id: 'desafios', label: 'Desafios técnicos' },
  { key: 'result', id: 'resultado', label: 'Resultado' },
]
const sectionIds = caseSections.map((section) => section.id)
const noSections: string[] = []
const withCase = projects.filter((project) => project.caseStudy)

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.reveal, ease: EASE.premium, delay },
})

export function ProjectCasePage() {
  const { slug } = useParams<{ slug: string }>()
  const project = projects.find((p) => p.slug === slug)
  const renamed = project ? undefined : projects.find((p) => p.previousSlugs?.includes(slug ?? ''))
  const active = useActiveSection(project?.caseStudy ? sectionIds : noSections)

  // Título e descrição por página: o que aparece na aba e no compartilhamento.
  useEffect(() => {
    if (!project) return
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = `${project.title} — Estudo de caso · João Tabosa`
    if (meta) meta.content = project.tagline
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [project])

  if (renamed) return <Navigate to={`/projetos/${renamed.slug}`} replace />
  if (!project) return <Navigate to="/" replace />

  const { caseStudy } = project
  const status = projectStatus(project)
  const position = withCase.indexOf(project)
  const next = position >= 0 ? withCase[(position + 1) % withCase.length] : withCase[0]

  return (
    <article className="pb-24 pt-28 sm:pt-36">
      <div className="shell">
        <motion.nav {...enter(0)} aria-label="Trilha" className="flex items-center gap-3 font-mono text-xs text-text-secondary">
          <Link to="/#projetos" className="group inline-flex items-center gap-2 transition-colors hover:text-text">
            <ArrowLeft size={14} aria-hidden="true" className="transition-transform duration-[var(--dur-hover)] group-hover:-translate-x-0.5" />
            <span className="link-draw">Projetos</span>
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text" aria-current="page">
            {project.title}
          </span>
        </motion.nav>

        <header className="grid-editorial mt-12 gap-y-10 sm:mt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <motion.p {...enter(0.05)} className="font-mono text-xs text-text-secondary">
              <span className="text-brand-light">Estudo de caso</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              {projectMeta(project)}
            </motion.p>
            <h1 className="display mt-5 text-[clamp(3rem,7.4vw,7rem)] text-text">
              <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
                <motion.span
                  className="block"
                  initial={{ y: '105%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: DUR.title, ease: EASE.premium, delay: 0.1 }}
                >
                  {project.title}
                </motion.span>
              </span>
            </h1>
            <motion.p {...enter(0.25)} className="mt-6 max-w-2xl text-subtitle text-text-secondary">
              {project.tagline}
            </motion.p>
          </div>

          <motion.div {...enter(0.35)} className="col-span-4 self-end md:col-span-6 lg:col-span-4">
            <dl className="border-t border-border text-sm">
              <Meta term="Status">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className={cn('size-1.5 rounded-full', status.live ? 'bg-success' : 'bg-warm')} />
                  {status.label}
                </span>
              </Meta>
              {project.role && <Meta term="Papel">{project.role}</Meta>}
              {project.collaboration && <Meta term="Colaboração">{project.collaboration}</Meta>}
              <Meta term="Stack">{project.tech.join(' · ')}</Meta>
            </dl>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.links.live && (
                <Button href={project.links.live} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={16} />}>
                  Ver projeto
                </Button>
              )}
              {project.links.github && (
                <Button
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  leadingIcon={<GithubIcon size={15} />}
                >
                  Ver código
                </Button>
              )}
              {!project.links.live && !project.links.github && (
                <p className="inline-flex items-center gap-2 text-sm text-text-secondary">
                  <Lock size={14} aria-hidden="true" />
                  {project.kind === 'corporate' ? 'Projeto corporativo, sem acesso público' : 'Repositório privado, em desenvolvimento'}
                </p>
              )}
            </div>
          </motion.div>
        </header>

        <motion.div {...enter(0.3)} className="mt-14 sm:mt-20">
          {project.image ? (
            <ProjectFrame project={project} priority sizes="(min-width: 1320px) 1320px, 100vw" />
          ) : (
            <ProjectVisual project={project} />
          )}
        </motion.div>

        {caseStudy ? (
          <div className="grid-editorial mt-20 gap-y-14 sm:mt-28">
            <aside className="col-span-4 md:col-span-8 lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <nav aria-label="Seções do estudo de caso" className="hidden lg:block">
                  <p className="label text-text-secondary">Neste estudo</p>
                  <ol className="mt-4 border-l border-border">
                    {caseSections.map((section, i) => (
                      <li key={section.id}>
                        <Link
                          to={`#${section.id}`}
                          aria-current={active === section.id ? 'location' : undefined}
                          className={cn(
                            '-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-[var(--dur-hover)]',
                            active === section.id
                              ? 'border-brand text-text'
                              : 'border-transparent text-text-secondary hover:text-text',
                          )}
                        >
                          <span aria-hidden="true" className="font-mono text-[0.6875rem] leading-5">
                            {pad(i + 1)}
                          </span>
                          {section.label}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </nav>

                <h2 className="label text-text-secondary lg:mt-12">Tecnologias</h2>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.8125rem] text-text lg:block lg:space-y-1.5">
                  {caseStudy.technologies.map((tech) => (
                    <li key={tech} className="flex items-baseline gap-2">
                      <span aria-hidden="true" className="size-1 shrink-0 translate-y-[-2px] bg-border-strong" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
              {caseSections.map((section, i) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className="scroll-mt-28 border-t border-border pb-14 pt-8 first:border-t-0 first:pt-0 sm:pb-16"
                >
                  <FadeIn>
                    <p aria-hidden="true" className="font-mono text-xs text-brand-light">
                      {pad(i + 1)}
                    </p>
                    <h2 id={`${section.id}-title`} className="title mt-3 text-[clamp(1.625rem,2.4vw,2.25rem)] text-text">
                      {section.label}
                    </h2>
                    <p
                      className={cn(
                        'mt-5 max-w-[42rem] leading-relaxed',
                        i === 0 ? 'text-subtitle text-text' : 'text-base text-text-secondary sm:text-[1.0625rem]',
                      )}
                    >
                      {caseStudy[section.key]}
                    </p>
                  </FadeIn>
                  {section.key === 'solution' && <Flow steps={caseStudy.gallerySteps} />}
                </section>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-20 max-w-xl border-t border-border pt-8 text-base text-text-secondary">
            O estudo de caso deste projeto ainda está em construção.
          </p>
        )}

        {next && next !== project && <NextProject project={next} />}
      </div>
    </article>
  )
}

function Meta({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-4 border-b border-border py-3">
      <dt className="font-mono text-xs leading-5 text-text-secondary">{term}</dt>
      <dd className="leading-5 text-text">{children}</dd>
    </div>
  )
}

/** Fluxo do produto como diagrama: etapas numeradas ligadas por uma linha. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <FadeIn className="mt-10 rounded-xl border border-border bg-surface/50 p-5 sm:p-7">
      <p className="label text-text-secondary">Fluxo do produto</p>
      <ol className="relative mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <span aria-hidden="true" className="absolute left-[5px] top-2 hidden h-px w-[calc(100%-10px)] bg-border-strong lg:block" />
        {steps.map((step, i) => (
          <li key={step} className="relative">
            <span aria-hidden="true" className="relative block size-[11px] rotate-45 border border-brand-muted bg-bg" />
            <p className="mt-4 font-mono text-[0.6875rem] text-brand-light">{pad(i + 1)}</p>
            <p className="mt-1.5 text-sm leading-snug text-text">{step}</p>
          </li>
        ))}
      </ol>
    </FadeIn>
  )
}

function NextProject({ project }: { project: Project }) {
  return (
    <FadeIn className="mt-16 border-t border-border pt-10 sm:mt-24">
      <Link to={`/projetos/${project.slug}`} className="group block">
        <p className="label text-text-secondary">Próximo estudo</p>
        <p className="mt-4 flex items-center justify-between gap-6">
          <span className="display text-[clamp(2.5rem,6vw,5.5rem)] text-text transition-colors duration-[var(--dur-micro)] group-hover:text-brand-light">
            {project.title}
          </span>
          <ArrowRight
            size={40}
            strokeWidth={1.25}
            aria-hidden="true"
            className="shrink-0 text-text-secondary transition-[translate,color] duration-[var(--dur-micro)] ease-premium group-hover:translate-x-2 group-hover:text-text"
          />
        </p>
        <p className="mt-3 max-w-xl text-sm text-text-secondary">{project.tagline}</p>
      </Link>
    </FadeIn>
  )
}
