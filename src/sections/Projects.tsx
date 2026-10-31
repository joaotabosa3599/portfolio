import { ProjectFeature, type FeatureLayout } from '@/components/projects/ProjectFeature'
import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { FadeIn } from '@/components/ui/Reveal'
import { SectionMarker, SectionTitle } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'
import { pad } from '@/lib/project'

const showcase = projects.filter((project) => project.showcase)
const others = projects.filter((project) => !project.showcase)

/**
 * Composição da galeria a partir da ordem dos dados: o primeiro é o destaque,
 * os dois últimos (com cinco ou mais) viram um par compacto e o meio alterna
 * o lado da mídia.
 */
function layoutFor(index: number, total: number): FeatureLayout {
  if (index === 0) return 'lead'
  if (total >= 5 && index >= total - 2) return 'compact'
  return 'split'
}

const lead = showcase.slice(0, 1)
const pairStart = showcase.length >= 5 ? showcase.length - 2 : showcase.length
const middle = showcase.slice(1, pairStart)
const pair = showcase.slice(pairStart)

export function Projects() {
  const total = showcase.length

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="section-y relative">
      <div className="shell">
        <SectionMarker index="01" label="Projetos" aside={`${pad(projects.length)} projetos`} />

        <div className="grid-editorial mt-12 gap-y-8 sm:mt-16">
          <div id="projetos-title" className="col-span-4 md:col-span-8 lg:col-span-8">
            <SectionTitle lines={['Sistemas reais,', 'do schema ao pixel.']} indent />
          </div>
          <FadeIn delay={0.15} className="col-span-4 self-end md:col-span-6 lg:col-span-4 lg:pb-3">
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              {total} estudos de caso com o problema, a minha contribuição, a decisão técnica que define cada um e o
              resultado. Os demais projetos estão no índice ao final.
            </p>
          </FadeIn>
        </div>

        <div className="mt-20 space-y-28 sm:mt-28 sm:space-y-36 lg:space-y-44">
          {lead.map((project) => (
            <ProjectFeature key={project.id} project={project} index={0} total={total} layout="lead" />
          ))}

          {middle.map((project, i) => {
            const index = i + 1
            return (
              <ProjectFeature
                key={project.id}
                project={project}
                index={index}
                total={total}
                layout={layoutFor(index, total)}
                reverse={index % 2 === 0}
              />
            )
          })}

          {pair.length > 0 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-24 lg:grid-cols-2 lg:gap-x-12">
              {pair.map((project, i) => (
                <div key={project.id} className={i === 1 ? 'lg:mt-32' : undefined}>
                  <ProjectFeature project={project} index={pairStart + i} total={total} layout="compact" />
                </div>
              ))}
            </div>
          )}
        </div>

        {others.length > 0 && (
          <div className="mt-32 sm:mt-44">
            <div className="flex items-end justify-between gap-6 pb-6">
              <FadeIn as="div">
                <h3 className="title text-3xl text-text sm:text-4xl">Outros projetos</h3>
                <p className="mt-2 text-sm text-text-secondary">Avaliações técnicas, processos seletivos e estudos.</p>
              </FadeIn>
              <FadeIn as="p" className="font-mono text-xs text-text-secondary">
                {pad(total + 1)}–{pad(projects.length)}
              </FadeIn>
            </div>
            <ProjectIndex projects={others} offset={total} />
          </div>
        )}
      </div>
    </section>
  )
}
