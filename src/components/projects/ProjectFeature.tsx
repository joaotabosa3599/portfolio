import { motion, type Variants } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ProjectFrame } from '@/components/projects/ProjectFrame'
import { GithubIcon } from '@/components/ui/BrandIcons'
import { Deco } from '@/components/ui/Deco'
import { FadeIn } from '@/components/ui/Reveal'
import { useCursorLabel } from '@/hooks/useCursorLabel'
import { DUR, EASE, revealViewport } from '@/lib/motion'
import { pad, projectMeta } from '@/lib/project'
import { cn } from '@/lib/utils'
import type { Project } from '@/types/project'

export type FeatureLayout = 'lead' | 'split' | 'compact'

interface ProjectFeatureProps {
  project: Project
  index: number
  total: number
  layout: FeatureLayout
  /** No layout split: mídia à direita. */
  reverse?: boolean
}

/**
 * Um estudo de caso na home. Três composições para a mesma informação, para
 * que a galeria tenha ritmo em vez de uma grade de cards iguais:
 *  - lead:    título largo, mídia em largura total e uma ficha em 4 colunas;
 *  - split:   mídia em 7 colunas e texto em 5, alternando o lado;
 *  - compact: par lado a lado, só o essencial.
 */
export function ProjectFeature({ project, index, total, layout, reverse = false }: ProjectFeatureProps) {
  if (layout === 'lead') return <LeadFeature project={project} index={index} total={total} />
  if (layout === 'compact') return <CompactFeature project={project} index={index} total={total} />
  return <SplitFeature project={project} index={index} total={total} reverse={reverse} />
}

type Props = Omit<ProjectFeatureProps, 'layout'>

function LeadFeature({ project, index, total }: Props) {
  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <div className="grid-editorial gap-y-6">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <Kicker project={project} index={index} total={total} />
          <FadeIn as="div" delay={0.05}>
            <h3 id={`${project.slug}-title`} className="display mt-5 text-[clamp(2.75rem,6vw,5.5rem)] text-text">
              {project.title}
            </h3>
          </FadeIn>
        </div>
        <FadeIn
          delay={0.12}
          className="col-span-4 self-end md:col-span-6 lg:col-span-4 lg:col-start-9 lg:pb-3"
        >
          <p className="text-base leading-relaxed text-text-secondary sm:text-lg">{project.tagline}</p>
        </FadeIn>
      </div>

      <Media project={project} className="mt-10 sm:mt-14" aspect="aspect-[16/10] lg:aspect-[16/8.4]" sizes="(min-width: 1320px) 1320px, 100vw" />

      <dl className="grid-editorial mt-10 gap-y-8 sm:mt-14">
        {project.brief && (
          <>
            <Spec term="Problema" className="col-span-4 lg:col-span-3" delay={0}>
              {project.brief.problem}
            </Spec>
            <Spec term="Contribuição" className="col-span-4 lg:col-span-3" delay={0.06}>
              {project.brief.contribution}
            </Spec>
            <Spec term="Resultado" className="col-span-4 lg:col-span-3" delay={0.12}>
              {project.brief.result}
            </Spec>
          </>
        )}
        {project.highlight && (
          <Spec term={`Decisão · ${project.highlight.label}`} className="col-span-4 lg:col-span-3" delay={0.18}>
            <DecisionLines lines={project.highlight.lines} />
          </Spec>
        )}
      </dl>

      <Footer project={project} className="mt-10 border-t border-border pt-6" />
    </article>
  )
}

function SplitFeature({ project, index, total, reverse }: Props) {
  return (
    <article aria-labelledby={`${project.slug}-title`} className="grid-editorial items-start gap-y-10">
      <div
        className={cn(
          'col-span-4 md:col-span-8 lg:sticky lg:top-24 lg:col-span-7',
          reverse ? 'lg:order-2 lg:col-start-6' : 'lg:col-start-1',
        )}
      >
        <Media project={project} sizes="(min-width: 1024px) 58vw, 100vw" />
      </div>

      <div
        className={cn(
          'col-span-4 md:col-span-7 lg:col-span-4 lg:pt-2',
          reverse ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-9',
        )}
      >
        <Kicker project={project} index={index} total={total} />
        <FadeIn delay={0.05}>
          <h3 id={`${project.slug}-title`} className="title mt-5 text-project text-text">
            {project.title}
          </h3>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-text-secondary">{project.tagline}</p>
        </FadeIn>

        {project.brief && (
          <FadeIn as="dl" delay={0.14} className="mt-8 divide-y divide-border border-y border-border">
            <Row term="Problema">{project.brief.problem}</Row>
            <Row term="Contribuição">{project.brief.contribution}</Row>
            <Row term="Resultado">{project.brief.result}</Row>
          </FadeIn>
        )}

        <Decision project={project} className="mt-8" delay={0.18} />
        <Footer project={project} className="mt-8" stacked />
      </div>
    </article>
  )
}

function CompactFeature({ project, index, total }: Props) {
  return (
    <article aria-labelledby={`${project.slug}-title`}>
      <Media project={project} sizes="(min-width: 1024px) 45vw, 100vw" />
      <div className="mt-7">
        <Kicker project={project} index={index} total={total} />
        <FadeIn delay={0.05}>
          <h3 id={`${project.slug}-title`} className="title mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)] text-text">
            {project.title}
          </h3>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary">{project.tagline}</p>
          {project.brief && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
              <span className="label mr-2 text-text">Contribuição</span>
              {project.brief.contribution}
            </p>
          )}
        </FadeIn>
        <Footer project={project} className="mt-6" stacked />
      </div>
    </article>
  )
}

/* ------------------------------------------------------------------------- */

function Kicker({ project, index, total }: { project: Project; index: number; total: number }) {
  return (
    <FadeIn as="p" y={6} className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-text-secondary">
      <span className="text-brand-light">{pad(index + 1)}</span>
      <span className="sr-only">de {total}</span>
      <Deco text={`/ ${pad(total)}`} className="text-text-muted" />
      <span aria-hidden="true" className="h-px w-6 bg-border-strong" />
      <span>{projectMeta(project)}</span>
    </FadeIn>
  )
}

const frameReveal: Variants = {
  hidden: { clipPath: 'inset(8% 6% 8% 6% round 12px)', opacity: 0 },
  visible: { clipPath: 'inset(0% 0% 0% 0% round 12px)', opacity: 1 },
}

/**
 * Mídia clicável com rótulo contextual que segue o cursor. É um atalho para
 * o mouse: no teclado, o caminho é o link "Estudo de caso" do texto.
 */
function Media({
  project,
  className,
  aspect,
  sizes,
}: {
  project: Project
  className?: string
  aspect?: string
  sizes?: string
}) {
  const zoneRef = useRef<HTMLAnchorElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  useCursorLabel(zoneRef, labelRef)

  return (
    <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} className={className}>
      <motion.div variants={frameReveal} transition={{ duration: DUR.title * 1.2, ease: EASE.premium }}>
        <Link
          ref={zoneRef}
          to={`/projetos/${project.slug}`}
          tabIndex={-1}
          aria-hidden="true"
          className="group/media relative block rounded-xl"
        >
          <ProjectFrame project={project} aspect={aspect} sizes={sizes} parallax />
          <span
            ref={labelRef}
            data-visible="false"
            className="pointer-events-none absolute left-0 top-0 z-20 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-text px-3.5 py-2 text-xs font-medium text-bg opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100"
          >
            Ver estudo de caso <ArrowUpRight size={13} />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

function Spec({ term, children, className, delay }: { term: string; children: ReactNode; className?: string; delay: number }) {
  return (
    <FadeIn delay={delay} className={cn('border-t border-border pt-4', className)}>
      <dt className="label text-text-secondary">{term}</dt>
      <dd className="mt-3 text-[0.9375rem] leading-relaxed text-text">{children}</dd>
    </FadeIn>
  )
}

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5 py-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
      <dt className="label pt-0.5 text-text-secondary">{term}</dt>
      <dd className="text-[0.9375rem] leading-relaxed text-text">{children}</dd>
    </div>
  )
}

/** A decisão técnica do projeto, como ficha: os `highlight` reais dos dados. */
function Decision({ project, className, delay }: { project: Project; className?: string; delay: number }) {
  if (!project.highlight) return null
  return (
    <FadeIn delay={delay} className={cn('rounded-lg border border-border bg-surface/60 p-4', className)}>
      <p className="label flex items-center gap-2 text-text-secondary">
        <span aria-hidden="true" className="size-1.5 rotate-45 bg-brand" />
        Decisão · {project.highlight.label}
      </p>
      <DecisionLines lines={project.highlight.lines} className="mt-3" />
    </FadeIn>
  )
}

function DecisionLines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <ul className={cn('space-y-1.5 font-mono text-[0.8125rem] leading-snug text-text', className)}>
      {lines.map((line) => (
        <li key={line} className="flex gap-2">
          <Deco text="›" className="text-brand-muted" />
          {line}
        </li>
      ))}
    </ul>
  )
}

function Footer({ project, className, stacked = false }: { project: Project; className?: string; stacked?: boolean }) {
  return (
    <FadeIn
      delay={0.2}
      className={cn('flex flex-col gap-5', !stacked && 'lg:flex-row lg:items-center lg:justify-between', className)}
    >
      <p className="font-mono text-xs leading-relaxed text-text-secondary">
        <span className="sr-only">Stack: </span>
        {project.tech.join(' · ')}
      </p>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
        <Link to={`/projetos/${project.slug}`} className="group inline-flex items-center gap-2 font-medium text-text">
          <span className="link-draw">
            Estudo de caso<span className="sr-only">: {project.title}</span>
          </span>
          <ArrowRight size={15} aria-hidden="true" className="arrow-shift text-brand-light" />
        </Link>
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-text"
          >
            <span className="link-draw">
              Site<span className="sr-only"> de {project.title} (abre em nova aba)</span>
            </span>
            <ArrowUpRight size={14} aria-hidden="true" className="arrow-diag" />
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
            <span className="link-draw">
              Código<span className="sr-only"> de {project.title} (abre em nova aba)</span>
            </span>
          </a>
        )}
      </div>
    </FadeIn>
  )
}
