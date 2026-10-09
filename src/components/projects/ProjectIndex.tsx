import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { FadeIn } from '@/components/ui/Reveal'
import { Picture } from '@/components/ui/Picture'
import { hasFinePointer, prefersReducedMotion } from '@/lib/motion'
import type { Project } from '@/types/project'
import { cn, imageBase } from '@/lib/utils'

interface ProjectIndexProps {
  projects: Project[]
  /** Deslocamento do índice exibido (continua a numeração do showcase). */
  offset: number
}

const PREVIEW_W = 280
const INERTIA = 0.16

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount
}

/**
 * Índice dos demais projetos: linhas densas (número, nome, tipo, stack).
 * No desktop, passar o ponteiro sobre uma linha mostra a screenshot numa
 * prévia que acompanha o cursor; no toque, cada linha traz a miniatura.
 */
export function ProjectIndex({ projects, offset }: ProjectIndexProps) {
  const listRef = useRef<HTMLOListElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    const list = listRef.current
    const preview = previewRef.current
    if (!list || !preview || !hasFinePointer() || prefersReducedMotion()) return

    let targetY = 0
    let currentY = 0
    let frame = 0

    const tick = () => {
      currentY = lerp(currentY, targetY, INERTIA)
      preview.style.transform = `translate3d(0, ${currentY.toFixed(1)}px, 0)`
      frame = Math.abs(targetY - currentY) < 0.3 ? 0 : requestAnimationFrame(tick)
    }

    const handleMove = (event: PointerEvent) => {
      const rect = list.getBoundingClientRect()
      targetY = event.clientY - rect.top - (PREVIEW_W * 0.625) / 2
      if (!preview.dataset.visible || preview.dataset.visible === 'false') currentY = targetY
      if (!frame) frame = requestAnimationFrame(tick)
    }

    list.addEventListener('pointermove', handleMove, { passive: true })
    return () => {
      list.removeEventListener('pointermove', handleMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const previewProject = hovered !== null ? projects[hovered] : null

  return (
    <div className="relative">
      <ol ref={listRef} onPointerLeave={() => setHovered(null)} className="border-b border-border">
        {projects.map((project, index) => (
          <FadeIn as="li" key={project.id} delay={index * 0.05} y={8}>
            <Link
              to={`/projetos/${project.slug}`}
              onPointerEnter={() => setHovered(index)}
              onFocus={() => setHovered(index)}
              onBlur={() => setHovered(null)}
              className={cn(
                'group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 border-t border-border py-5 transition-colors duration-300 sm:grid-cols-[2.5rem_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,0.9fr)_1.5rem] sm:gap-x-6',
                hovered !== null && hovered !== index && 'opacity-50',
              )}
            >
              {/* Miniatura: só no toque/telas pequenas. No desktop a prévia flutua. */}
              <span className="label hidden text-text-muted sm:block">{String(offset + index + 1).padStart(2, '0')}</span>
              <span className="relative block h-12 w-[4.5rem] shrink-0 overflow-hidden rounded-md border border-border sm:hidden">
                {project.image && (
                  <Picture
                    base={imageBase(project.image)}
                    alt=""
                    widths={[720]}
                    sizes="72px"
                    width={1600}
                    height={1000}
                    className="h-full w-full"
                    imgClassName="object-top"
                  />
                )}
              </span>

              <span className="min-w-0">
                <span className="block truncate text-lg font-medium tracking-tight text-text transition-colors group-hover:text-accent-light sm:text-xl">
                  {project.title}
                </span>
                <span className="mt-0.5 block truncate text-xs text-text-muted sm:hidden">
                  {[project.category, project.kindLabel].filter(Boolean).join(' · ')}
                </span>
              </span>

              <span className="hidden truncate text-sm text-text-secondary sm:block">
                {[project.category, project.kindLabel].filter(Boolean).join(' · ')}
              </span>
              <span className="hidden truncate font-mono text-xs text-text-muted sm:block">
                {project.tech.slice(0, 3).join(' · ')}
              </span>

              <ArrowUpRight size={18} className="arrow-shift-diag justify-self-end text-text-muted group-hover:text-text" />
            </Link>
          </FadeIn>
        ))}
      </ol>

      {/* Prévia flutuante (desktop, ponteiro fino). */}
      <div
        ref={previewRef}
        data-visible={previewProject ? 'true' : 'false'}
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] top-0 z-10 hidden overflow-hidden rounded-lg border border-border-strong bg-bg-secondary opacity-0 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] transition-opacity duration-300 data-[visible=true]:opacity-100 lg:block"
        style={{ width: PREVIEW_W, aspectRatio: '16 / 10' }}
      >
        {projects.map((project, index) =>
          project.image ? (
            <Picture
              key={project.id}
              base={imageBase(project.image)}
              alt=""
              widths={[720]}
              sizes={`${PREVIEW_W}px`}
              width={1600}
              height={1000}
              className={cn(
                'absolute inset-0 transition-opacity duration-300',
                hovered === index ? 'opacity-100' : 'opacity-0',
              )}
              imgClassName="object-top"
            />
          ) : null,
        )}
      </div>
    </div>
  )
}
