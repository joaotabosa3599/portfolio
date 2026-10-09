import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ProjectFrame } from '@/components/projects/ProjectFrame'
import { ProjectStep } from '@/components/projects/ProjectStep'
import { useCursorLabel } from '@/hooks/useCursorLabel'
import { useGsap } from '@/hooks/useGsap'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { DUR, EASE, GSAP_EASE, MEDIA, prefersReducedMotion, revealViewport } from '@/lib/motion'
import { gsap, ScrollTrigger } from '@/lib/scroll'
import type { Project } from '@/types/project'

interface ProjectShowcaseProps {
  projects: Project[]
}

/**
 * Showcase principal. No desktop a mídia fica presa (sticky) enquanto o texto
 * de cada projeto rola ao lado; quando um projeto entra em foco, a screenshot
 * seguinte revela a anterior por clip-path (de baixo para cima ao descer, de
 * cima para baixo ao voltar) e assenta com um leve zoom de câmera.
 *
 * No mobile não há sticky: cada projeto é um bloco (mídia + texto), e a mídia
 * revela uma vez ao entrar na viewport.
 */
export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const desktop = useMediaQuery(MEDIA.desktop)
  return desktop ? <StickyShowcase projects={projects} /> : <StackedShowcase projects={projects} />
}

function StickyShowcase({ projects }: ProjectShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const zoneRef = useRef<HTMLAnchorElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const frameRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)
  const previous = useRef(0)

  useCursorLabel(zoneRef, labelRef)

  // Um trigger por passo de texto: o projeto ativo é o que cruza o meio da tela.
  useGsap(
    () => {
      const steps = gsap.utils.selector(rootRef)<HTMLElement>('[data-step]')
      for (const step of steps) {
        const index = Number(step.dataset.step)
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 55%',
          onEnter: () => setActive(index),
          onEnterBack: () => setActive(index),
        })
      }
    },
    [projects.length],
    rootRef,
  )

  // Transição entre mídias — fora do fluxo do React, só transform/clip-path.
  useEffect(() => {
    const from = previous.current
    previous.current = active
    const frames = frameRefs.current
    const incoming = frames[active]
    if (!incoming) return

    const forward = active > from
    const reduced = prefersReducedMotion()
    const image = incoming.querySelector<HTMLElement>('img')
    const chip = incoming.querySelector<HTMLElement>('[data-frame-chip]')

    // Qualquer quadro que não seja o de saída nem o de entrada some já:
    // um scroll rápido pode ter interrompido a transição anterior no meio.
    for (const [i, frame] of frames.entries()) {
      if (frame && i !== active && i !== from) gsap.set(frame, { visibility: 'hidden', zIndex: 0 })
    }
    gsap.set(incoming, { visibility: 'visible', zIndex: 2, opacity: 1, scale: 1 })

    if (from === active || reduced) {
      gsap.set(incoming, { clipPath: 'inset(0% 0% 0% 0%)' })
      if (image) gsap.set(image, { scale: 1 })
      for (const [i, frame] of frames.entries()) {
        if (i !== active && frame) gsap.set(frame, { visibility: 'hidden', zIndex: 0 })
      }
      return
    }

    const outgoing = frames[from]
    const tl = gsap.timeline({
      defaults: { duration: DUR.editorial * 0.85, ease: GSAP_EASE.outExpo },
      onComplete: () => {
        if (outgoing && outgoing !== incoming) gsap.set(outgoing, { visibility: 'hidden', zIndex: 0 })
      },
    })

    tl.fromTo(
      incoming,
      { clipPath: forward ? 'inset(100% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)' },
      0,
    )
    if (image) tl.fromTo(image, { scale: 1.06 }, { scale: 1 }, 0)
    if (chip) tl.fromTo(chip, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: DUR.reveal }, 0.25)
    if (outgoing && outgoing !== incoming) {
      tl.set(outgoing, { zIndex: 1 }, 0).to(outgoing, { scale: 0.97, opacity: 0.4, ease: GSAP_EASE.outQuart }, 0)
    }

    return () => {
      tl.kill()
    }
  }, [active])

  const current = projects[active]

  return (
    <div ref={rootRef} className="grid grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-16">
      <div>
        {projects.map((project, index) => (
          <article
            key={project.id}
            data-step={index}
            className="flex min-h-[88vh] flex-col justify-center py-16 first:pt-0 last:min-h-0 last:pb-8"
          >
            <ProjectStep project={project} index={index} total={projects.length} active={index === active} />
          </article>
        ))}
      </div>

      <div>
        <div className="sticky" style={{ top: 'max(6rem, calc(50vh - 230px))' }}>
          <Link
            ref={zoneRef}
            to={`/projetos/${current.slug}`}
            aria-label={`Ver estudo de caso do projeto ${current.title}`}
            className="relative block w-full rounded-xl"
            style={{ paddingTop: 'calc(62.5% + 36px)' }}
          >
            {projects.map((project, index) => (
              <ProjectFrame
                key={project.id}
                ref={(node) => {
                  frameRefs.current[index] = node
                }}
                project={project}
                priority={index === 0}
                className="absolute inset-0"
              />
            ))}
            <span
              ref={labelRef}
              data-visible="false"
              className="pointer-events-none absolute left-0 top-0 z-20 whitespace-nowrap rounded-full bg-text px-4 py-2 text-xs font-medium text-bg opacity-0 transition-opacity duration-200 data-[visible=true]:opacity-100"
            >
              Ver caso ↗
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

const frameVariants: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: { clipPath: 'inset(0% 0% 0% 0%)' },
}
const imageVariants: Variants = {
  hidden: { scale: 1.06 },
  visible: { scale: 1 },
}

function StackedShowcase({ projects }: ProjectShowcaseProps) {
  return (
    <div className="space-y-20">
      {projects.map((project, index) => (
        <article key={project.id}>
          <motion.div initial="hidden" whileInView="visible" viewport={revealViewport}>
            <motion.div
              variants={frameVariants}
              transition={{ duration: DUR.editorial * 0.85, ease: EASE.outExpo }}
              className="will-change-[clip-path]"
            >
              <Link to={`/projetos/${project.slug}`} aria-label={`Ver estudo de caso do projeto ${project.title}`}>
                <motion.div variants={imageVariants} transition={{ duration: DUR.editorial, ease: EASE.outExpo }}>
                  <ProjectFrame project={project} priority={index === 0} className="relative" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          <ProjectStep project={project} index={index} total={projects.length} className="mt-8" />
        </article>
      ))}
    </div>
  )
}
