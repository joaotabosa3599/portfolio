import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, FileDown } from 'lucide-react'
import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Button } from '@/components/ui/Button'
import { Picture } from '@/components/ui/Picture'
import { FadeIn, RevealLines } from '@/components/ui/Reveal'
import { experience, type ExperienceEntry } from '@/data/experience'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { site } from '@/data/site'
import { capabilities, stackSupport } from '@/data/skills'
import { useActiveSection } from '@/hooks/useActiveSection'
import { DUR, EASE } from '@/lib/motion'
import { findProject, pad, projectMeta } from '@/lib/project'
import { cn } from '@/lib/utils'

const sections = [
  { id: 'resumo', label: 'Resumo' },
  { id: 'experiencia', label: 'Experiência' },
  { id: 'formacao', label: 'Formação' },
  { id: 'competencias', label: 'Competências' },
  { id: 'projetos', label: 'Outros projetos' },
] as const
const sectionIds = sections.map((section) => section.id)

const work = experience.filter((entry) => !entry.education)
const education = experience.filter((entry) => entry.education)
/** Projetos que a seção de experiência ainda não citou: nada aparece duas vezes. */
const cited = new Set(work.flatMap((entry) => entry.work?.map((item) => item.slug) ?? []))
const otherProjects = projects.filter((project) => project.caseStudy && !cited.has(project.slug))

/** Por extenso no currículo: a sigla sozinha não diz nada fora do Ceará. */
const institutions: Record<string, string> = { UFC: 'Universidade Federal do Ceará' }

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.reveal, ease: EASE.premium, delay },
})

/**
 * Perfil / currículo. A home conta a trajetória como narrativa; aqui ela vira
 * documento: denso, escaneável e com a mesma fonte de dados. O retrato entra
 * por uma cortina (a imagem já está pintada por baixo, então o LCP não espera
 * a animação). Ao imprimir, a página vira um A4 claro — o "Salvar em PDF" é o
 * diálogo de impressão do navegador, sem gerar arquivo no servidor.
 */
export function ProfilePage() {
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const previousDescription = meta?.content
    document.title = `Perfil e currículo · ${site.name}`
    if (meta) meta.content = `${site.name}, ${site.role}. Experiência, formação, competências e projetos.`
    return () => {
      document.title = previousTitle
      if (meta && previousDescription) meta.content = previousDescription
    }
  }, [])

  return (
    <article className="profile-doc pb-24 pt-28 sm:pt-36 print:p-0">
      <div className="shell print:max-w-none print:px-0">
        <motion.nav
          {...enter(0)}
          aria-label="Trilha"
          className="flex items-center gap-3 font-mono text-xs text-text-secondary print:hidden"
        >
          <Link to="/" className="group inline-flex items-center gap-2 transition-colors hover:text-text">
            <ArrowLeft size={14} aria-hidden="true" className="transition-transform duration-[var(--dur-hover)] group-hover:-translate-x-0.5" />
            <span className="link-draw">Início</span>
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-text" aria-current="page">
            Perfil
          </span>
        </motion.nav>

        <header className="grid-editorial mt-10 gap-y-12 sm:mt-14 print:mt-0 print:flex print:items-start print:justify-between print:gap-10">
          <div className="col-span-4 md:col-span-5 lg:col-span-7 print:flex-1">
            <motion.p {...enter(0.05)} className="font-mono text-xs text-text-secondary">
              <span className="text-brand-light">Perfil</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              Currículo
            </motion.p>

            <RevealLines
              as="h1"
              immediate
              delay={0.1}
              lines={['João', 'Tabosa']}
              lineClassName={(i) => (i === 1 ? 'lg:pl-[8.333%] print:pl-0' : undefined)}
              className="display mt-5 text-[clamp(3.5rem,10vw,8.5rem)] text-text print:mt-2 print:text-[34pt] print:leading-none"
            />

            <motion.div {...enter(0.3)} className="mt-8 max-w-xl print:mt-3">
              <p className="text-subtitle text-text print:text-[13pt]">{site.role}</p>
              <p className="mt-2 text-base leading-relaxed text-text-secondary print:text-[10pt]">{site.tagline}</p>
            </motion.div>

            <motion.div {...enter(0.4)} className="mt-8 print:hidden">
              <AvailabilityBadge label={site.status} />
            </motion.div>

            <motion.dl
              {...enter(0.45)}
              className="mt-10 grid max-w-xl grid-cols-1 border-t border-border sm:grid-cols-2 sm:gap-x-8 print:mt-5 print:max-w-none print:grid-cols-2"
            >
              <ContactItem term="Email">
                <a href={`mailto:${site.email}`} className="link-draw break-all">
                  {site.email}
                </a>
              </ContactItem>
              <ContactItem term="Base">{site.location}</ContactItem>
              <ContactItem term="LinkedIn">
                <ExternalLink href={site.social.linkedin} icon={<LinkedinIcon size={13} />}>
                  linkedin.com/in/joaotabosa
                </ExternalLink>
              </ContactItem>
              <ContactItem term="GitHub">
                <ExternalLink href={site.social.github} icon={<GithubIcon size={13} />}>
                  github.com/joaotabosa3599
                </ExternalLink>
              </ContactItem>
            </motion.dl>

            <motion.div {...enter(0.55)} className="mt-8 flex flex-wrap items-center gap-3 print:hidden">
              <Button onClick={() => window.print()} leadingIcon={<FileDown size={16} strokeWidth={1.75} />}>
                Salvar em PDF
              </Button>
              <Button href={`mailto:${site.email}`} variant="secondary" icon={<ArrowUpRight size={16} />}>
                Enviar email
              </Button>
            </motion.div>
          </div>

          <div className="order-first col-span-4 max-w-[19rem] md:order-none md:col-span-3 md:max-w-none lg:col-span-4 lg:col-start-9 print:w-[36mm] print:max-w-none print:shrink-0">
            <Portrait />
          </div>
        </header>

        <div className="grid-editorial mt-20 gap-y-14 sm:mt-28 print:mt-8 print:block">
          <aside className="col-span-4 hidden md:col-span-8 lg:col-span-3 lg:block print:hidden">
            <nav aria-label="Seções do perfil" className="lg:sticky lg:top-28">
              <p className="label text-text-secondary">Neste perfil</p>
              <ol className="mt-4 border-l border-border">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <Link
                      to={`#${section.id}`}
                      aria-current={active === section.id ? 'location' : undefined}
                      className={cn(
                        '-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors duration-[var(--dur-hover)]',
                        active === section.id ? 'border-brand text-text' : 'border-transparent text-text-secondary hover:text-text',
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
          </aside>

          <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
            <Section index={0}>
              <p className="max-w-[42rem] text-subtitle text-text print:text-[11.5pt] print:leading-snug">{profile.summary[0]}</p>
              <div className="mt-6 max-w-[42rem] space-y-4 text-base leading-relaxed text-text-secondary sm:text-[1.0625rem] print:mt-3 print:space-y-2 print:text-[10pt]">
                {profile.summary.slice(1).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 print:mt-4 print:rounded-none print:border-0 print:bg-transparent print:gap-0">
                {profile.principles.map((principle, i) => (
                  <li key={principle} className="bg-bg p-5 print:bg-transparent print:p-0 print:pr-4">
                    <p aria-hidden="true" className="font-mono text-[0.6875rem] text-brand-light">
                      {pad(i + 1)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-text print:mt-1 print:text-[9pt]">{principle}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section index={1}>
              <ol className="border-t border-border">
                {work.map((entry) => (
                  <Entry key={entry.id} entry={entry} />
                ))}
              </ol>
            </Section>

            <Section index={2}>
              <ol className="border-t border-border">
                {education.map((entry) => (
                  <Entry key={entry.id} entry={entry} />
                ))}
              </ol>
            </Section>

            <Section index={3}>
              <dl className="border-t border-border">
                {capabilities.map((capability) => (
                  <SkillRow key={capability.id} index={capability.index} title={capability.title} detail={capability.layer} tech={capability.tech} />
                ))}
                {stackSupport.map((group) => (
                  <SkillRow key={group.title} title={group.title} tech={group.tech} />
                ))}
              </dl>
            </Section>

            <Section index={4} last>
              <ul className="border-t border-border">
                {otherProjects.map((project) => (
                  <li key={project.slug} className="cv-entry border-b border-border">
                    <Link
                      to={`/projetos/${project.slug}`}
                      className="group -mx-3 grid gap-x-8 gap-y-2 rounded-lg px-3 py-5 transition-colors duration-[var(--dur-hover)] hover:bg-surface/50 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)_auto] print:mx-0 print:px-0 print:py-2.5"
                    >
                      <div>
                        <p className="title text-xl text-text transition-colors group-hover:text-brand-light print:text-[11pt]">
                          {project.title}
                        </p>
                        <p className="mt-1 font-mono text-xs text-text-secondary print:text-[8pt]">{projectMeta(project)}</p>
                      </div>
                      <div>
                        <p className="text-sm leading-relaxed text-text-secondary print:text-[9pt]">{project.tagline}</p>
                        <p className="mt-2 font-mono text-xs text-text-secondary print:mt-1 print:text-[8pt]">
                          <span className="sr-only">Stack: </span>
                          {project.tech.join(' · ')}
                        </p>
                      </div>
                      <ArrowRight
                        size={18}
                        aria-hidden="true"
                        className="arrow-shift mt-1 hidden text-text-secondary transition-colors group-hover:text-text sm:block print:hidden"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <Closing />
      </div>
    </article>
  )
}

/**
 * Retrato com marcas de registro nos cantos, como uma prancha. A cortina
 * (cor do fundo) recolhe para cima por cima da imagem, que vai assentando de
 * uma escala levemente maior.
 */
function Portrait() {
  return (
    <figure className="relative">
      <div className="relative">
        {(['-left-2 -top-2 border-l border-t', '-right-2 -top-2 border-r border-t', '-bottom-2 -left-2 border-b border-l', '-bottom-2 -right-2 border-b border-r'] as const).map(
          (position, i) => (
            <motion.span
              key={position}
              aria-hidden="true"
              className={cn('absolute size-3.5 border-brand-muted print:hidden', position)}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: DUR.component, ease: EASE.premium, delay: 0.9 + i * 0.06 }}
            />
          ),
        )}

        <div className="relative overflow-hidden rounded-[3px] bg-surface print:rounded-none">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: EASE.premium, delay: 0.15 }}
          >
            <Picture
              base={profile.photo.base}
              widths={[...profile.photo.widths]}
              width={profile.photo.width}
              height={profile.photo.height}
              alt={profile.photo.alt}
              sizes="(min-width: 1320px) 400px, (min-width: 1024px) 30vw, (min-width: 768px) 34vw, 19rem"
              priority
              className="aspect-[4/5]"
            />
          </motion.div>
          {/* Vinheta inferior: assenta o retrato no fundo da página. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/55 to-transparent print:hidden"
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 origin-top bg-bg print:hidden"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.1, ease: EASE.inOut, delay: 0.15 }}
          />
        </div>
      </div>

      <motion.figcaption
        {...enter(1)}
        className="mt-4 flex items-center justify-between font-mono text-[0.6875rem] text-text-secondary print:hidden"
      >
        <span>Fig. 01</span>
        <span>{site.name}</span>
      </motion.figcaption>
    </figure>
  )
}

function Section({ index, last = false, children }: { index: number; last?: boolean; children: ReactNode }) {
  const { id, label } = sections[index]
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn('scroll-mt-28 pb-16 sm:pb-20 print:pb-6', !last && 'print:break-inside-auto')}
    >
      <FadeIn>
        <p aria-hidden="true" className="font-mono text-xs text-brand-light print:hidden">
          {pad(index + 1)}
        </p>
        <h2
          id={`${id}-title`}
          className="title mt-3 text-[clamp(1.625rem,2.4vw,2.25rem)] text-text print:mt-0 print:text-[13pt] print:uppercase print:tracking-[0.06em] print:break-after-avoid"
        >
          {label}
        </h2>
      </FadeIn>
      <div className="mt-8 print:mt-2.5">{children}</div>
    </section>
  )
}

/** Uma linha do currículo: período à esquerda, o que foi feito à direita. */
function Entry({ entry }: { entry: ExperienceEntry }) {
  const current = entry.status === 'current'
  const org = institutions[entry.org] ? `${institutions[entry.org]} (${entry.org})` : entry.org
  // Projeto próprio: o nome do projeto é o título e o título linka o estudo de
  // caso, em vez de repetir o projeto como item da lista.
  const title = entry.personal ? entry.role : org
  const subtitle = entry.personal ? entry.org : entry.role
  const titleProject = entry.work?.find((item) => item.label === title && item.slug)
  const items = entry.work?.filter((item) => item !== titleProject)

  return (
    <li className="cv-entry border-b border-border py-8 print:py-3">
      <FadeIn className="grid gap-x-8 gap-y-3 sm:grid-cols-[9rem_minmax(0,1fr)] print:grid-cols-[24mm_minmax(0,1fr)]">
        <div className="flex items-center gap-3 sm:block">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary print:text-[8pt]">{entry.period}</p>
          <p className="flex items-center gap-2 font-mono text-xs text-text-secondary sm:mt-2 print:hidden">
            <span aria-hidden="true" className={cn('size-1.5 rounded-full', current ? 'bg-success' : 'border border-text-secondary')} />
            {current ? 'Atual' : 'Concluído'}
          </p>
        </div>

        <div>
          <h3 className="title text-[clamp(1.375rem,2vw,1.75rem)] text-text print:text-[12pt]">
            {titleProject?.slug ? (
              <Link to={`/projetos/${titleProject.slug}`} className="link-draw transition-colors hover:text-brand-light">
                {title}
              </Link>
            ) : (
              title
            )}
          </h3>
          <p className="mt-1 text-base text-text-secondary print:mt-0 print:text-[10pt]">{subtitle}</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text print:mt-1.5 print:text-[9.5pt] print:leading-snug">
            {entry.summary}
          </p>

          {items && items.length > 0 && (
            <ul className="mt-6 space-y-3 print:mt-2 print:space-y-1">
              {items.map((item) => {
                const project = item.slug ? findProject(item.slug) : undefined
                return (
                  <li key={item.label} className="grid grid-cols-[0.75rem_minmax(0,1fr)] gap-2 text-sm leading-relaxed print:text-[9pt] print:leading-snug">
                    <span aria-hidden="true" className="mt-[0.6rem] block size-1 rotate-45 bg-brand-muted" />
                    <p className="text-text-secondary">
                      {project ? (
                        <Link to={`/projetos/${project.slug}`} className="link-draw font-medium text-text transition-colors hover:text-brand-light">
                          {item.label}
                        </Link>
                      ) : (
                        <span className="font-medium text-text">{item.label}</span>
                      )}
                      {project && <> — {project.tagline}</>}
                    </p>
                  </li>
                )
              })}
            </ul>
          )}

          {entry.stack && (
            <p className="mt-5 font-mono text-xs leading-relaxed text-text-secondary print:mt-2 print:text-[8pt]">
              <span className="sr-only">Stack: </span>
              {entry.stack.join(' · ')}
            </p>
          )}
        </div>
      </FadeIn>
    </li>
  )
}

function SkillRow({ index, title, detail, tech }: { index?: string; title: string; detail?: string; tech: string[] }) {
  return (
    <FadeIn className="cv-entry grid gap-x-8 gap-y-2 border-b border-border py-5 sm:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] print:grid-cols-[46mm_minmax(0,1fr)] print:py-2">
      <dt>
        <span className="flex items-baseline gap-3 text-[0.9375rem] text-text print:text-[10pt]">
          {index && (
            <span aria-hidden="true" className="font-mono text-[0.6875rem] text-brand-light print:hidden">
              {index}
            </span>
          )}
          {title}
        </span>
        {detail && <span className="mt-1 block font-mono text-[0.6875rem] text-text-secondary print:hidden">{detail}</span>}
      </dt>
      <dd className="text-sm leading-relaxed text-text-secondary print:text-[9pt]">{tech.join(' · ')}</dd>
    </FadeIn>
  )
}

function ContactItem({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="border-b border-border py-3.5 print:py-1.5">
      <dt className="font-mono text-xs text-text-secondary print:text-[8pt]">{term}</dt>
      <dd className="mt-1 text-[0.9375rem] text-text print:mt-0 print:text-[9.5pt]">{children}</dd>
    </div>
  )
}

function ExternalLink({ href, icon, children }: { href: string; icon: ReactNode; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2">
      <span className="text-text-secondary transition-colors group-hover:text-brand-light print:hidden">{icon}</span>
      <span className="link-draw">{children}</span>
      <ArrowUpRight size={13} aria-hidden="true" className="arrow-diag text-text-secondary print:hidden" />
    </a>
  )
}

/** Fecho de tela (não sai na impressão): o próximo passo, nos dois sentidos. */
function Closing() {
  return (
    <FadeIn className="mt-8 grid gap-10 border-t border-border pt-10 sm:mt-12 md:grid-cols-2 print:hidden">
      <Link to="/#projetos" className="group block">
        <p className="label text-text-secondary">Continuar</p>
        <p className="mt-4 flex items-center gap-5">
          <span className="display text-[clamp(2.25rem,4.6vw,4rem)] text-text transition-colors duration-[var(--dur-micro)] group-hover:text-brand-light">
            Ver os projetos
          </span>
          <ArrowRight
            size={32}
            strokeWidth={1.25}
            aria-hidden="true"
            className="shrink-0 text-text-secondary transition-[translate,color] duration-[var(--dur-micro)] ease-premium group-hover:translate-x-2 group-hover:text-text"
          />
        </p>
        <p className="mt-3 max-w-sm text-sm text-text-secondary">Cada um com estudo de caso: problema, arquitetura e decisões.</p>
      </Link>
      <div className="md:justify-self-end md:text-right">
        <p className="label text-text-secondary">Contato</p>
        <a
          href={`mailto:${site.email}`}
          className="link-draw mt-4 inline-block break-all text-[clamp(1.125rem,1.6vw,1.375rem)] text-text transition-colors hover:text-brand-light"
        >
          {site.email}
        </a>
        <p className="mt-3 text-sm text-text-secondary">O email é o caminho mais curto.</p>
      </div>
    </FadeIn>
  )
}
