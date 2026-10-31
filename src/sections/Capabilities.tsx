import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Schematic } from '@/components/stack/Schematic'
import { FadeIn } from '@/components/ui/Reveal'
import { SectionMarker, SectionTitle } from '@/components/ui/SectionHeading'
import { capabilities, stackSupport, type Capability } from '@/data/skills'
import { useSpotlight } from '@/hooks/useSpotlight'
import { findProject } from '@/lib/project'

/**
 * Stack como capacidades, não como vitrine de logos. Uma grade técnica de três
 * colunas — as mesmas três camadas da escultura do hero, na mesma ordem — em
 * que cada coluna traz o princípio, as ferramentas e os projetos onde a
 * capacidade foi exercida. Nada de barras de proficiência.
 */
export function Capabilities() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="section-y relative">
      <div className="shell">
        <SectionMarker index="03" label="Stack" aside="03 camadas" />

        <div className="grid-editorial mt-12 gap-y-8 sm:mt-16">
          <div id="stack-title" className="col-span-4 md:col-span-8 lg:col-span-6">
            <SectionTitle lines={['Como eu', 'construo.']} />
          </div>
          <FadeIn delay={0.15} className="col-span-4 self-end md:col-span-6 lg:col-span-5 lg:col-start-8 lg:pb-3">
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              Três camadas que se repetem em cada projeto, na mesma ordem da escultura lá em cima. A prova de cada uma
              está nos projetos onde ela aparece — não em porcentagens.
            </p>
          </FadeIn>
        </div>

        <div className="mt-16 grid grid-cols-1 border-y border-border sm:mt-20 lg:grid-cols-3">
          {capabilities.map((capability, i) => (
            <CapabilityColumn key={capability.id} capability={capability} order={i} />
          ))}
        </div>

        <div className="mt-px grid grid-cols-1 border-b border-border md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-cols-3">
          {stackSupport.map((group, i) => (
            <FadeIn key={group.title} delay={i * 0.08} className="border-border py-7 md:px-0 lg:px-8 lg:first:pl-0 lg:[&+&]:border-l">
              <h3 className="label text-text-secondary">{group.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text">{group.tech.join(' · ')}</p>
            </FadeIn>
          ))}
          <FadeIn delay={0.16} className="hidden border-l border-border py-7 pl-8 lg:block">
            <p className="text-sm leading-relaxed text-text-secondary">
              Testes antes do deploy, inclusive de permissão no banco: a camada de dados também tem suíte.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function CapabilityColumn({ capability, order }: { capability: Capability; order: number }) {
  const ref = useSpotlight<HTMLElement>()
  const evidence = capability.evidence.map(findProject).filter((project) => project !== undefined)

  return (
    <article
      ref={ref}
      aria-labelledby={`cap-${capability.id}`}
      className="capability spotlight group/cap relative border-border py-10 first:border-t-0 max-lg:border-t lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:py-12"
    >
      <FadeIn delay={order * 0.08} className="relative z-10 flex h-full flex-col">
        <Schematic id={capability.id} />

        <p className="mt-10 font-mono text-xs text-text-secondary">
          <span className="text-brand-light">{capability.index}</span>
          <span className="ml-3 uppercase tracking-[0.08em]">{capability.layer}</span>
        </p>
        <h3 id={`cap-${capability.id}`} className="title mt-4 text-[clamp(1.625rem,2.2vw,2rem)] text-text">
          {capability.title}
        </h3>
        <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-text-secondary">{capability.principle}</p>

        <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.8125rem] text-text">
          {capability.tech.map((tech) => (
            <li key={tech} className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1 bg-border-strong transition-colors duration-[var(--dur-micro)] group-hover/cap:bg-brand-muted" />
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-9">
          <p className="label text-text-secondary">Em projetos</p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {evidence.map((project) => (
              <li key={project.slug}>
                <Link
                  to={`/projetos/${project.slug}`}
                  className="group inline-flex items-center gap-1.5 text-text-secondary transition-colors hover:text-text"
                >
                  <span className="link-draw">{project.title}</span>
                  <ArrowUpRight
                    size={13}
                    aria-hidden="true"
                    className="opacity-0 transition-[opacity,translate] duration-[var(--dur-hover)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </article>
  )
}
