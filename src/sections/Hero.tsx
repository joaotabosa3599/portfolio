import { type Variants, motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { HeroVisual } from '@/components/ui/HeroVisual'
import { site } from '@/data/site'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center pt-24">
      <HeroVisual />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-content px-6 sm:px-8"
      >
        <motion.div variants={item}>
          <AvailabilityBadge label={site.status} />
        </motion.div>

        <motion.p variants={item} className="mt-8 font-mono text-sm text-accent-light">
          Olá, eu sou
        </motion.p>

        <motion.h1
          variants={item}
          className="mt-2 text-5xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl xl:text-8xl xl:leading-[0.95]"
        >
          {site.name}
        </motion.h1>

        <motion.p variants={item} className="mt-3 text-2xl font-medium text-text-secondary sm:text-3xl">
          {site.role}
        </motion.p>

        <motion.p variants={item} className="mt-6 max-w-lg text-balance text-base leading-relaxed text-text-secondary sm:text-lg">
          {site.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#projetos" icon={<ArrowRight size={16} />}>
            Ver projetos
          </Button>
          <Button href="#contato" variant="secondary">
            Entre em contato
          </Button>
        </motion.div>
      </motion.div>

      <motion.a
        href="#projetos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-label="Rolar para a seção de projetos"
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-muted transition-colors hover:text-accent-light sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown size={14} className="motion-safe:animate-bounce" />
      </motion.a>
    </section>
  )
}
