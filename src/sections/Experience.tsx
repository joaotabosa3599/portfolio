import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline } from '@/components/ui/Timeline'
import { experienceTimeline } from '@/data/experience'

export function Experience() {
  return (
    <section id="experiencia" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <SectionHeading
          eyebrow="Trajetória"
          title="Experiência"
          description="Início de carreira, construído com consistência: estudo, prática e projetos reais."
        />

        <div className="mt-16 max-w-2xl">
          <Timeline items={experienceTimeline} />
        </div>
      </div>
    </section>
  )
}
