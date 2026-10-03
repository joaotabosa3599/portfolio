import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { HeroVisual } from '@/components/ui/HeroVisual'
import { SplitHeadline } from '@/components/ui/SplitHeadline'
import { useMagnetic } from '@/hooks/useMagnetic'
import { usePointerScene } from '@/hooks/usePointerScene'
import { site } from '@/data/site'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/**
 * A entrada é escalonada por função, não por ordem no DOM: o fundo assenta
 * primeiro, a headline é o evento principal, e o apoio chega depois dela.
 */
const BEAT = {
  badge: 0.3,
  intro: 0.42,
  headline: 0.52,
  role: 1,
  tagline: 1.12,
  actions: 1.26,
  scrollCue: 1.7,
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const magneticRef = useMagnetic<HTMLSpanElement>()
  const reducedMotion = useReducedMotion()

  usePointerScene(sectionRef)

  // A saída do hero é um movimento de câmera: o conteúdo sobe e some antes do
  // fundo, que fica para trás com um empurrão de escala.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.97])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 130])
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const visualOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4])

  return (
    <section ref={sectionRef} id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { y: visualY, scale: visualScale, opacity: visualOpacity }}
      >
        <HeroVisual />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-content px-6 sm:px-8"
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity, scale: contentScale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: BEAT.badge }}
        >
          <AvailabilityBadge label={site.status} />
        </motion.div>

        <motion.p
          className="mt-8 font-mono text-sm text-accent-light"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: BEAT.intro }}
        >
          Olá, eu sou
        </motion.p>

        <SplitHeadline
          text={site.name}
          delay={BEAT.headline}
          className="mt-2 text-5xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl xl:text-8xl xl:leading-[0.95]"
        />

        <motion.p
          className="mt-3 text-2xl font-medium text-text-secondary sm:text-3xl"
          initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: EASE, delay: BEAT.role }}
        >
          {site.role}
        </motion.p>

        <motion.p
          className="mt-6 max-w-lg text-balance text-base leading-relaxed text-text-secondary sm:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: BEAT.tagline }}
        >
          {site.tagline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: BEAT.actions }}
        >
          <span ref={magneticRef} className="inline-block will-change-transform">
            <Button href="#projetos" icon={<ArrowRight size={16} />} className="cta-sheen">
              Ver projetos
            </Button>
          </span>
          <Button href="#contato" variant="secondary">
            Entre em contato
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        style={reducedMotion ? undefined : { opacity: contentOpacity }}
      >
        <motion.a
          href="#projetos"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: BEAT.scrollCue, duration: 0.9, ease: EASE }}
          aria-label="Rolar para a seção de projetos"
          className="group flex flex-col items-center gap-3 text-text-muted transition-colors hover:text-accent-light"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
          <span className="hero-scroll-trail relative h-10 w-px overflow-hidden bg-border-strong transition-colors group-hover:bg-accent-light/40" />
        </motion.a>
      </motion.div>
    </section>
  )
}
