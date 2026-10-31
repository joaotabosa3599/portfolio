import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/Reveal'
import { SectionMarker, SectionTitle } from '@/components/ui/SectionHeading'
import { experience, type ExperienceEntry } from '@/data/experience'
import { findProject } from '@/lib/project'
import { cn } from '@/lib/utils'

/**
 * Timeline: uma linha vertical fina que se preenche com o scroll e marcadores
 * próprios (losangos) que mudam de estado quando a linha os alcança. O título
 * fica preso à esquerda enquanto a trajetória rola ao lado.
 */
export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.5 })

  return (
    <section id="experiencia" aria-labelledby="experiencia-title" className="section-y border-y border-border bg-bg-secondary">
      <div className="shell">
        <SectionMarker index="04" label="Experiência" />

        <div className="grid-editorial mt-12 gap-y-16 sm:mt-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div id="experiencia-title">
                <SectionTitle lines={['Trajetória', 'até aqui.']} />
              </div>
              <FadeIn delay={0.12}>
                <p className="mt-8 max-w-sm text-base leading-relaxed text-text-secondary">
                  O que foi construído em cada lugar, e com quê. Da graduação ao estágio, com um projeto pessoal correndo
                  em paralelo.
                </p>
              </FadeIn>
              <FadeIn delay={0.18} className="mt-8 flex gap-6 font-mono text-xs text-text-secondary">
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-success" />
                  Atual
                </span>
                <span className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1.5 rounded-full border border-text-secondary" />
                  Concluído
                </span>
              </FadeIn>
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <ol ref={listRef} className="relative pl-10 sm:pl-14">
              <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-px bg-border" />
              <motion.span
                aria-hidden="true"
                className="absolute bottom-3 left-[7px] top-3 w-px origin-top bg-brand"
                style={{ scaleY: reduced ? 1 : progress }}
              />
              {experience.map((entry) => (
                <TimelineItem key={entry.id} entry={entry} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ entry }: { entry: ExperienceEntry }) {
  const ref = useRef<HTMLLIElement>(null)
  // Alcançado quando o topo do item passa do meio da tela (e volta ao subir).
  const reached = useInView(ref, { margin: '0px 0px -45% 0px' })
  const current = entry.status === 'current'

  return (
    <li ref={ref} className="relative pb-16 last:pb-0 sm:pb-20">
      <span
        aria-hidden="true"
        className="absolute -left-10 top-[0.3rem] flex size-[15px] items-center justify-center sm:-left-14"
      >
        <span
          className={cn(
            'size-[9px] rotate-45 border transition-[background-color,border-color,scale] duration-[var(--dur-component)] ease-premium',
            reached ? 'scale-125 border-brand bg-brand' : 'border-border-strong bg-bg-secondary',
          )}
        />
      </span>

      <FadeIn y={16}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-text-secondary">{entry.period}</p>
          <p className="flex items-center gap-2 font-mono text-xs text-text-secondary">
            <span
              aria-hidden="true"
              className={cn('size-1.5 rounded-full', current ? 'bg-success' : 'border border-text-secondary')}
            />
            {current ? 'Atual' : 'Concluído'}
          </p>
        </div>

        <h3 className="title mt-4 text-[clamp(1.75rem,2.8vw,2.5rem)] text-text">{entry.org}</h3>
        <p className="mt-1.5 text-base text-text-secondary">{entry.role}</p>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-text">{entry.summary}</p>

        {entry.work && (
          <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-sm">
            <span className="label text-text-secondary">Construído</span>
            {entry.work.map((item) =>
              item.slug && findProject(item.slug) ? (
                <Link key={item.label} to={`/projetos/${item.slug}`} className="link-draw text-text transition-colors hover:text-brand-light">
                  {item.label}
                </Link>
              ) : (
                <span key={item.label} className="text-text">
                  {item.label}
                </span>
              ),
            )}
          </div>
        )}
        {entry.stack && (
          <p className="mt-4 font-mono text-xs leading-relaxed text-text-secondary">
            <span className="sr-only">Stack: </span>
            {entry.stack.join(' · ')}
          </p>
        )}
      </FadeIn>
    </li>
  )
}
