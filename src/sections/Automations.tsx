import { ProjectFeature } from '@/components/projects/ProjectFeature'
import { FadeIn } from '@/components/ui/Reveal'
import { SectionMarker, SectionTitle } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'
import { isAutomation, pad } from '@/lib/project'

const automations = projects.filter((project) => isAutomation(project) && project.showcase)

/**
 * Segunda metade do portfólio: bots e robôs que tiram trabalho repetido da
 * equipe. Mesma composição dos estudos de caso, sempre em split alternado.
 * As imagens vêm de modos de demonstração, com dados fictícios.
 */
export function Automations() {
  const total = automations.length

  return (
    <section id="automacoes" aria-labelledby="automacoes-title" className="section-y relative border-y border-border bg-bg-secondary">
      <div className="shell">
        <SectionMarker index="02" label="Automações" aside={`${pad(total)} bots`} />

        <div className="grid-editorial mt-12 gap-y-8 sm:mt-16">
          <div id="automacoes-title" className="col-span-4 md:col-span-8 lg:col-span-8">
            <SectionTitle lines={['Robôs que tiram', <>o trabalho <span className="text-brand-light">repetido</span>.</>]} indent />
          </div>
          <FadeIn delay={0.15} className="col-span-4 self-end md:col-span-6 lg:col-span-4 lg:pb-3">
            <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
              Bots de WhatsApp e robôs de leitura em uso ou em teste com equipes de verdade. As telas são de
              demonstração, com dados fictícios: nada de cliente aparece aqui.
            </p>
          </FadeIn>
        </div>

        <div className="mt-20 space-y-28 sm:mt-28 sm:space-y-36 lg:space-y-44">
          {automations.map((project, i) => (
            <ProjectFeature
              key={project.id}
              project={project}
              index={i}
              total={total}
              layout="split"
              reverse={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
