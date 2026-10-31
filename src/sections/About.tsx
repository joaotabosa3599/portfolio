import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn, Rule } from '@/components/ui/Reveal'
import { SectionMarker, SectionTitle } from '@/components/ui/SectionHeading'
import { LAYERS } from '@/components/hero/layers'
import { site } from '@/data/site'
import { DUR, EASE, revealViewport } from '@/lib/motion'

const facts: { term: string; value: string; detail?: string }[] = [
  { term: 'Formação', value: 'Engenharia da Computação', detail: 'UFC · em andamento' },
  { term: 'Hoje', value: 'Estágio em Desenvolvimento', detail: 'RF Group' },
  { term: 'Projeto pessoal', value: 'Debrief', detail: 'SaaS em desenvolvimento ativo' },
  { term: 'Base', value: site.location },
]

/**
 * Editorial e quase parado depois da galeria: uma ficha técnica à esquerda
 * presa por uma linha de construção, e o texto à direita com uma citação que
 * resume a tese. A cota no fim mede o que o trabalho atravessa — as mesmas
 * três camadas da escultura do hero.
 */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section-y relative border-y border-border bg-bg-secondary">
      <div className="shell">
        <SectionMarker index="02" label="Sobre" />

        <div className="grid-editorial mt-12 gap-y-14 sm:mt-16">
          <aside className="relative order-2 col-span-4 md:col-span-8 lg:order-none lg:col-span-4 lg:pr-10">
            <div className="lg:sticky lg:top-28">
              <FadeIn as="p" className="label text-text-secondary">
                Ficha
              </FadeIn>
              <dl className="mt-6 grid grid-cols-1 gap-x-6 border-t border-border sm:grid-cols-2 lg:grid-cols-1">
                {facts.map((fact, i) => (
                  <FadeIn key={fact.term} delay={i * 0.06} className="border-b border-border py-4">
                    <dt className="font-mono text-xs text-text-secondary">{fact.term}</dt>
                    <dd className="mt-1.5">
                      <span className="block text-[0.9375rem] text-text">{fact.value}</span>
                      {fact.detail && <span className="block text-sm text-text-secondary">{fact.detail}</span>}
                    </dd>
                  </FadeIn>
                ))}
              </dl>
              <FadeIn delay={facts.length * 0.06}>
                <Link to="/perfil" className="group mt-6 inline-flex items-center gap-2 text-sm text-text transition-colors hover:text-brand-light">
                  <span className="link-draw">Currículo completo</span>
                  <ArrowRight size={14} aria-hidden="true" className="arrow-shift" />
                </Link>
              </FadeIn>
            </div>
            {/* Linha de construção que separa ficha e texto. */}
            <Rule vertical className="absolute -right-3 top-0 hidden h-full lg:block" />
          </aside>

          <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <div id="sobre-title">
              <SectionTitle lines={['Penso o produto', 'inteiro.']} />
            </div>

            <FadeIn delay={0.1}>
              <p className="mt-10 text-subtitle text-text sm:mt-12">
                Comecei pelo front-end. Construir aplicações do zero — banco, autenticação, APIs em tempo real e a
                interface — me levou ao full-stack de verdade.
              </p>
            </FadeIn>

            <div className="mt-8 grid gap-6 text-base leading-relaxed text-text-secondary md:grid-cols-2 md:gap-8">
              <FadeIn delay={0.15} as="p">
                Hoje penso em produto de ponta a ponta: da modelagem do schema até a última animação da interface. Na RF
                Group, isso são serviços compartilhados pelo grupo inteiro, com a fronteira de acesso decidida no banco.
              </FadeIn>
              <FadeIn delay={0.2} as="p">
                Gosto de unir design minimalista com engenharia sólida: código fácil de ler tanto quanto de usar. O
                Debrief é o laboratório onde testo arquitetura e produto antes de levar para o trabalho.
              </FadeIn>
            </div>

            <FadeIn as="figure" delay={0.1} className="mt-16 border-l border-brand pl-6 sm:mt-20 sm:pl-8">
              <blockquote className="display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.05] tracking-[-0.035em] text-text">
                Cada camada <span className="text-brand-light">decide</span> o que a próxima pode ver.
              </blockquote>
              <figcaption className="mt-4 font-mono text-xs text-text-secondary">
                RLS, RPCs e webhooks assinados: a fronteira fica no banco, não na tela.
              </figcaption>
            </FadeIn>

            <Dimension />
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Cota de desenho técnico: uma régua com marcas que mede o trabalho de ponta
 * a ponta — dados, aplicação, experiência.
 */
function Dimension() {
  return (
    <motion.div
      className="mt-16 sm:mt-20"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      aria-label="Atuação nas três camadas: dados, aplicação e experiência"
      role="img"
    >
      <div className="flex items-center justify-between font-mono text-[0.6875rem] text-text-secondary">
        <span>do banco</span>
        <span>à interface</span>
      </div>
      <div className="relative mt-3 h-3">
        <motion.span
          className="absolute inset-x-0 top-1/2 h-px origin-left bg-border-strong"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
          transition={{ duration: 1.1, ease: EASE.premium }}
        />
        {[0, 1 / 3, 2 / 3, 1].map((at, i) => (
          <motion.span
            key={at}
            className="absolute top-0 h-3 w-px bg-text-secondary"
            style={{ left: `calc(${at * 100}% - ${at === 1 ? 1 : 0}px)` }}
            variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
            transition={{ duration: DUR.micro, ease: EASE.premium, delay: 0.3 + i * 0.15 }}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3">
        {LAYERS.map((layer, i) => (
          <motion.p
            key={layer.id}
            className="text-[0.8125rem] text-text-secondary"
            variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: DUR.reveal, ease: EASE.premium, delay: 0.45 + i * 0.12 }}
          >
            <span className="mr-2 font-mono text-[0.6875rem] text-brand-light">{layer.index}</span>
            {layer.name.replace(' layer', '')}
          </motion.p>
        ))}
      </div>
    </motion.div>
  )
}
