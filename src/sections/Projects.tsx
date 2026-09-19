import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'

export function Projects() {
  return (
    <section id="projetos" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <SectionHeading
          eyebrow="Trabalho selecionado"
          title="Projetos"
          description="Uma seleção de projetos que mostra como penso arquitetura, escrevo código e resolvo problemas reais de produto."
        />

        <div className="mt-16">
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </section>
  )
}
