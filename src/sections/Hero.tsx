import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { startTransition, useEffect, useRef, useState } from 'react'
import { ArchitectureSculpture } from '@/components/hero/ArchitectureSculpture'
import { LAYERS, SCULPTURE_SOURCE } from '@/components/hero/layers'
import { GridGuides } from '@/components/atmosphere/GridGuides'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { Button } from '@/components/ui/Button'
import { Deco } from '@/components/ui/Deco'
import { site } from '@/data/site'
import { useMagnetic } from '@/hooks/useMagnetic'
import { usePointerScene } from '@/hooks/usePointerScene'
import { DUR, EASE, HERO_SEQUENCE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const enter = (delay: number, y = 14, from = 0) => ({
  initial: { opacity: from, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DUR.reveal, ease: EASE.premium, delay },
})

/**
 * Primeira dobra. Texto dominante à esquerda, a escultura de arquitetura à
 * direita e a grade editorial no fundo. A entrada é uma sequência só, contida
 * em ~1,8s e sem bloquear nada: fundo → navbar (CSS) → rótulo → headline →
 * descrição → CTAs → planos da escultura, de baixo para cima.
 *
 * Os índices discretos ao lado de "banco" (01) e "interface" (03) ligam a
 * headline às camadas da escultura e à legenda abaixo dela.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const magneticRef = useMagnetic<HTMLSpanElement>()
  const [focus, setFocus] = useState<number | null>(null)
  const reduced = useReducedMotion()
  // A escultura (~250 nós) monta logo depois do texto, numa transição: o
  // primeiro quadro mostra a headline sem esperar por ela. O espaço já fica
  // reservado, então nada se desloca quando ela chega.
  const [artReady, setArtReady] = useState(false)
  useEffect(() => startTransition(() => setArtReady(true)), [])

  usePointerScene(sectionRef)

  // Saída ligada ao scroll: o texto sobe um pouco, a escultura afunda e recua.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -70])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const artY = useTransform(scrollYProgress, [0, 1], [0, 110])
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const artOpacity = useTransform(scrollYProgress, [0.15, 0.9], [1, 0])

  const focused = focus !== null ? LAYERS[focus] : null

  return (
    <section ref={sectionRef} id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE.ui, delay: HERO_SEQUENCE.backdrop }}
      >
        <GridGuides className="hidden lg:block" />
        <div
          className="absolute right-[-12%] top-[-8%] h-[110%] w-[70%]"
          style={{ background: 'radial-gradient(closest-side, rgb(48 35 69 / 0.5), transparent)' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </motion.div>

      <div className="shell grid-editorial min-h-[100svh] content-center gap-y-14 pb-20 pt-28 sm:pt-32 lg:items-center lg:gap-y-0 lg:pb-24">
        <motion.div
          className="relative z-10 col-span-4 md:col-span-8 lg:col-span-7"
          style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
        >
          <motion.div {...enter(HERO_SEQUENCE.label, 8)} className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <AvailabilityBadge label={site.status} />
            <p className="font-mono text-xs text-text-secondary">
              <span className="text-text">{site.name}</span>
              <span aria-hidden="true"> / </span>
              <span className="sr-only">, </span>
              {site.role}
            </p>
          </motion.div>

          <h1 id="hero-title" className="mt-9 sm:mt-11">
            <HeadlineLine index={0} className="font-display text-[clamp(1.375rem,5.4vw,2rem)] font-normal leading-tight tracking-[-0.025em] text-text-secondary lg:text-[clamp(1.75rem,2.3vw,2.5rem)]">
              Produtos inteiros,
            </HeadlineLine>
            <HeadlineLine index={1} className="display mt-2 text-hero text-text lg:text-hero-lg">
              do banco<LayerTag>01</LayerTag>
            </HeadlineLine>
            <HeadlineLine index={2} className="display text-hero text-text lg:text-hero-lg">
              à <span className="text-brand-light">interface</span>.<LayerTag>03</LayerTag>
            </HeadlineLine>
          </h1>

          {/* Elemento de LCP. Parte de 0,01 e não de 0: o Chrome ignora o que é
              pintado com opacidade zero, e o fade roda no compositor — sem isso
              o LCP só seria registrado quando a animação terminasse. */}
          <motion.p
            {...enter(HERO_SEQUENCE.body, 10, 0.01)}
            className="mt-8 max-w-[34rem] text-base leading-relaxed text-text-secondary sm:mt-10 sm:text-lg"
          >
            Estudante de Engenharia da Computação na UFC e estagiário de desenvolvimento na RF Group. Modelo o schema,
            fecho a fronteira de acesso no banco e levo o produto até a última interação da interface.
          </motion.p>

          <motion.div {...enter(HERO_SEQUENCE.actions, 10)} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <span ref={magneticRef} className="inline-block">
              <Button to="#projetos" size="lg" icon={<ArrowRight size={17} strokeWidth={1.75} />}>
                Explorar projetos
              </Button>
            </span>
            <Button to="#contato" variant="secondary" size="lg">
              Entrar em contato
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:-mr-[8%] lg:-ml-[4%]"
          style={reduced ? undefined : { y: artY, scale: artScale, opacity: artOpacity }}
        >
          {artReady ? (
            <ArchitectureSculpture focus={focus} onFocusChange={setFocus} className="max-md:-mx-[8%] max-md:w-[116%]" />
          ) : (
            <div className="aspect-square w-full max-md:-mx-[8%] max-md:w-[116%]" />
          )}

          <motion.div {...enter(HERO_SEQUENCE.connectors, 6)} className="relative mt-2 px-1">
            <ol className="flex items-stretch justify-between gap-2 border-t border-border pt-3">
              {[...LAYERS].reverse().map((layer) => {
                const index = LAYERS.indexOf(layer)
                const active = focus === index
                return (
                  <li key={layer.id} className="min-w-0 flex-1">
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setFocus(active ? null : index)}
                      onPointerEnter={(event) => event.pointerType === 'mouse' && setFocus(index)}
                      onPointerLeave={(event) => event.pointerType === 'mouse' && setFocus(null)}
                      className={cn(
                        'group flex w-full flex-col items-start gap-1 rounded-sm py-1 text-left transition-colors duration-[var(--dur-hover)]',
                        active ? 'text-text' : 'text-text-secondary hover:text-text',
                      )}
                    >
                      <Deco
                        text={layer.index}
                        className={cn('font-mono text-[0.6875rem]', active ? 'text-brand-light' : 'text-text-muted')}
                      />
                      <span className="text-[0.8125rem] leading-tight">{layer.name}</span>
                    </button>
                  </li>
                )
              })}
            </ol>
            <p className="mt-3 min-h-[2.75rem] max-w-md text-[0.8125rem] leading-snug text-text-secondary" aria-live="polite">
              {focused ? focused.caption : `${SCULPTURE_SOURCE}. Passe o cursor ou toque numa camada.`}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function HeadlineLine({ index, className, children }: { index: number; className?: string; children: React.ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
      <motion.span
        className={cn('block', className)}
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: DUR.title, ease: EASE.premium, delay: HERO_SEQUENCE.headline + index * HERO_SEQUENCE.headlineStagger }}
      >
        {children}{' '}
      </motion.span>
    </span>
  )
}

/** Índice da camada, discreto, sobrescrito à palavra que ela representa. */
function LayerTag({ children }: { children: string }) {
  return (
    <Deco
      text={children}
      className="ml-[0.12em] inline-block pt-[0.16em] align-top font-mono text-[max(0.6875rem,0.1em)] font-normal leading-none tracking-normal text-brand-muted"
    />
  )
}
