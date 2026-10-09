import { ProjectIndex } from '@/components/projects/ProjectIndex'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'
import { FadeIn, Rule } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'

const showcase = projects.filter((project) => project.showcase)
const others = projects.filter((project) => !project.showcase)

export function Projects() {
  return (
    <section id="projetos" className="relative pb-28 pt-8 sm:pb-36 lg:pt-4">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        {/* A linha que o hero deixou: a cena deitou e virou esta régua. */}
        <Rule />

        <div className="pt-20 sm:pt-24">
          <SectionHeading
            index="01"
            eyebrow="Projetos"
            title={['Sistemas reais,', 'em produção.']}
            description="Cinco produtos em uso. Cada um com o problema, a minha contribuição e o resultado — e, abaixo, os demais."
          />
        </div>

        <div className="mt-20 sm:mt-28">
          <ProjectShowcase projects={showcase} />
        </div>

        <div className="mt-28 sm:mt-36">
          <FadeIn className="mb-8 flex items-baseline justify-between gap-6">
            <h3 className="display text-2xl text-text sm:text-3xl">Outros projetos</h3>
            <span className="label text-text-muted">
              {String(showcase.length + 1).padStart(2, '0')}–{String(projects.length).padStart(2, '0')}
            </span>
          </FadeIn>
          <ProjectIndex projects={others} offset={showcase.length} />
        </div>
      </div>
    </section>
  )
}
