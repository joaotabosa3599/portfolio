import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Timeline } from '@/components/ui/Timeline'
import { journeyTimeline } from '@/data/experience'

export function About() {
  return (
    <section id="sobre" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <SectionHeading eyebrow="Sobre mim" title="Quem constrói esses produtos" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 space-y-4 text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              <p>
                João Tabosa é desenvolvedor Full-Stack e estudante de Engenharia da Computação na UFC. Começou focado
                em front-end, mas construir aplicações do zero (banco de dados, autenticação, APIs em tempo real e a
                interface) o levou para o full-stack de verdade. Hoje pensa em produto de ponta a ponta, da
                modelagem do schema até a última animação da UI.
              </p>
              <p>
                Gosta de unir design minimalista com engenharia sólida: código fácil de ler tanto quanto de usar.
              </p>
            </motion.div>
          </div>

          <div>
            <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Trajetória</h3>
            <Timeline items={journeyTimeline} />
          </div>
        </div>
      </div>
    </section>
  )
}
