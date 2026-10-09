import { useEffect, useRef } from 'react'
import { FadeIn } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { stackLayers, stackSupport } from '@/data/skills'
import { useGsap } from '@/hooks/useGsap'
import { GSAP_EASE, MEDIA } from '@/lib/motion'
import { gsap } from '@/lib/scroll'

/**
 * A stack como arquitetura, não como parede de logos: três camadas (interface,
 * fronteira, dados) ligadas por um caminho de requisição. Ao entrar, as
 * camadas se alinham e o caminho se desenha; depois, um ponto percorre o
 * caminho em loop lento — toda requisição passa pela fronteira.
 */
export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)

  // Distância que o ponto percorre = altura real do caminho (muda com o layout).
  useEffect(() => {
    const path = pathRef.current
    const dot = dotRef.current
    if (!path || !dot) return
    const observer = new ResizeObserver(([entry]) => {
      dot.style.setProperty('--travel', `${Math.max(0, entry.contentRect.height - 8).toFixed(0)}px`)
    })
    observer.observe(path)
    return () => observer.disconnect()
  }, [])

  useGsap(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ reduced: MEDIA.reduced, motionOk: MEDIA.motionOk }, (context) => {
        const { reduced } = context.conditions as { reduced: boolean }
        if (reduced) return
        gsap
          .timeline({
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
            defaults: { ease: GSAP_EASE.outExpo },
          })
          .from('[data-layer]', { x: -14, opacity: 0, duration: 0.9, stagger: 0.12 }, 0)
          .from('[data-path]', { scaleY: 0, duration: 1.1 }, 0.1)
          .from('[data-dot]', { opacity: 0, duration: 0.4 }, 1.0)
      })
      return () => mm.revert()
    },
    [],
    sectionRef,
  )

  return (
    <section ref={sectionRef} id="skills" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <SectionHeading
          index="03"
          eyebrow="Stack"
          title={['Como eu', 'construo.']}
          description="Não é uma lista de logos: é a arquitetura que se repete em cada projeto, de cima para baixo. Toda requisição passa pela fronteira."
        />

        <div className="mt-16 grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:gap-20">
          <div className="relative pl-9 sm:pl-12">
            {/* Caminho da requisição: desce da interface aos dados e volta. */}
            <div
              ref={pathRef}
              data-path
              aria-hidden="true"
              className="absolute left-[5px] top-3 bottom-3 w-px origin-top bg-border-strong sm:left-[7px]"
            />
            <span
              ref={dotRef}
              data-dot
              aria-hidden="true"
              className="request-dot absolute left-[5.5px] top-3 h-2 w-2 rounded-full bg-accent-light shadow-[0_0_0_3px_rgba(127,90,245,0.18)] sm:left-[7.5px]"
            />

            <ol className="space-y-10 sm:space-y-12">
              {stackLayers.map((layer) => (
                <li key={layer.id} data-layer className="relative">
                  <span
                    aria-hidden="true"
                    className="absolute -left-9 top-[9px] h-[9px] w-[9px] rounded-full border border-border-strong bg-bg sm:-left-12 sm:ml-[3px]"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="label text-text-muted">{layer.index}</span>
                    <h3 className="display text-2xl text-text sm:text-3xl">{layer.title}</h3>
                  </div>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-text-secondary">{layer.principle}</p>
                  <p className="mt-3 font-mono text-xs leading-relaxed text-text-muted">{layer.tech.join(' · ')}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:pt-2">
            {stackSupport.map((group, index) => (
              <FadeIn key={group.title} delay={index * 0.08} className="border-t border-border py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
                <h3 className="label text-text-muted">{group.title}</h3>
                <ul className="mt-4 space-y-2">
                  {group.tech.map((item) => (
                    <li key={item} className="text-sm text-text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
