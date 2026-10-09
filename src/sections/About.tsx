import { FadeIn } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'

/**
 * Composição editorial e quase parada: headline forte, texto curto e três
 * fatos. É o silêncio depois do showcase — o próximo movimento vem na stack.
 */
export function About() {
  return (
    <section id="sobre" className="py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading index="02" eyebrow="Sobre" title={['Penso o produto', 'inteiro.']} />

          <div className="lg:pt-14">
            <FadeIn>
              <p className="text-lg leading-relaxed text-text sm:text-xl">
                Comecei pelo front-end. Construir aplicações do zero — banco, autenticação, APIs em tempo real e a
                interface — me levou ao full-stack de verdade. Hoje penso em produto de ponta a ponta: da modelagem
                do schema até a última animação da UI.
              </p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-base leading-relaxed text-text-secondary">
                Gosto de unir design minimalista com engenharia sólida: código fácil de ler tanto quanto de usar.
              </p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <dl className="mt-12 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-3">
                <Fact term="Formação">Engenharia da Computação, UFC</Fact>
                <Fact term="Hoje">Estágio em Desenvolvimento, RF Group</Fact>
                <Fact term="Base">{site.location}</Fact>
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fact({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label text-text-muted">{term}</dt>
      <dd className="mt-2 text-sm leading-snug text-text">{children}</dd>
    </div>
  )
}
