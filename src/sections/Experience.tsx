import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'

const hasCase = (slug?: string) => Boolean(slug && projects.some((project) => project.slug === slug))

/**
 * Trajetória como narrativa: período em escala grande, organização, papel,
 * o que foi construído e com quê. Sem bolinhas nem linha vertical — a
 * hierarquia vem da tipografia e das réguas.
 */
export function Experience() {
  return (
    <section id="experiencia" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <SectionHeading index="04" eyebrow="Experiência" title={['Trajetória', 'até aqui.']} />

        <ol className="mt-16 border-t border-border">
          {experience.map((entry, index) => (
            <FadeIn as="li" key={entry.id} delay={index * 0.06} y={12}>
              <div className="grid grid-cols-1 gap-5 border-b border-border py-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)] lg:gap-10 lg:py-12">
                <div>
                  <span
                    className={cn(
                      'display text-3xl sm:text-4xl',
                      entry.status === 'current' ? 'text-text' : 'text-text-secondary',
                    )}
                  >
                    {entry.period}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="text-xl font-medium tracking-tight text-text sm:text-2xl">{entry.org}</h3>
                    <span className="font-mono text-xs text-text-muted">{entry.role}</span>
                  </div>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">{entry.summary}</p>

                  {entry.work && (
                    <p className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                      <span className="label text-text-muted">Trabalho</span>
                      {entry.work.map((item, i) => (
                        <span key={item.label} className="text-text">
                          {hasCase(item.slug) ? (
                            <Link to={`/projetos/${item.slug}`} className="link-draw">
                              {item.label}
                            </Link>
                          ) : (
                            item.label
                          )}
                          {i < entry.work!.length - 1 && <span className="ml-3 text-text-muted">·</span>}
                        </span>
                      ))}
                    </p>
                  )}
                  {entry.stack && (
                    <p className="mt-3 font-mono text-xs leading-relaxed text-text-muted">{entry.stack.join(' · ')}</p>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  )
}
