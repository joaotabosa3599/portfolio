import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGsap } from '@/hooks/useGsap'
import { DUR, GSAP_EASE, MEDIA, hasFinePointer, prefersReducedMotion } from '@/lib/motion'
import { gsap } from '@/lib/scroll'
import { cn } from '@/lib/utils'

/* Geometria da cena, em px, no espaço do plano (antes da inclinação). */
const STRATA = {
  width: 352,
  height: 212,
  gap: 88,
} as const

/** Quanto a pilha se abre quando o ponteiro está sobre ela. */
const EXPLODE = 1.38
/** Elevação do plano em foco, em px no eixo Z. */
const LIFT = 16
/** Parallax por plano (px no espaço do plano): o mais próximo responde mais. */
const PARALLAX = [5, 11, 18] as const

type PlaneId = 'dados' | 'fronteira' | 'interface'

const PLANES: { id: PlaneId; index: string; meta: string; z: number; caption: string }[] = [
  {
    id: 'dados',
    index: '01',
    meta: 'schema disc · postgres',
    z: 0,
    caption: 'Schema próprio no Postgres, sem GRANT para fora: acesso direto responde 42501, por desenho.',
  },
  {
    id: 'fronteira',
    index: '02',
    meta: 'auth · rls · rpc',
    z: STRATA.gap,
    caption: 'Consumidores só falam por RPC: API key na emissão, webhook assinado na conclusão, replay bloqueado.',
  },
  {
    id: 'interface',
    index: '03',
    meta: '/teste/<token>',
    z: STRATA.gap * 2,
    caption: 'A pessoa responde sem login — o token do link é a única credencial. O resultado volta para ela e para o sistema de origem.',
  },
]

const DEFAULT_CAPTION = 'Mapa DISC · corte do sistema'

const DISC_BARS = [
  { letter: 'D', label: 'Dominância', value: 54, strong: true },
  { letter: 'I', label: 'Influência', value: 17 },
  { letter: 'S', label: 'Estabilidade', value: 21 },
  { letter: 'C', label: 'Conformidade', value: 8 },
]

interface SystemStrataProps {
  className?: string
  /** Quando o pulso de requisição começa (depois da entrada do hero), em segundos. */
  ambientDelay?: number
  /** Parallax, abrir a pilha e foco por plano. Desligado na abertura. */
  interactive?: boolean
  /** Flutuação e pulso de requisição em loop. Desligado na abertura. */
  ambient?: boolean
  /** Legenda abaixo da cena. */
  caption?: boolean
}

/**
 * Corte transversal de um sistema real (o Mapa DISC), em três planos:
 * dados → fronteira → interface. É a tese do portfólio em forma visual:
 * o produto inteiro, com a fronteira de acesso decidida no banco.
 *
 * Construído em DOM com CSS 3D — não há nada aqui que precise de WebGL.
 *
 * Movimento em camadas que nunca disputam a mesma propriedade:
 *  - `[data-plane]`        posição Z da pilha (entrada, abrir ao passar o ponteiro, parallax x/y);
 *  - `[data-plane-float]`  flutuação ambiente em Z, lenta e defasada por plano;
 *  - `[data-plane-card]`   elevação e foco do plano sob o ponteiro.
 * O pulso que percorre as guias é a narrativa: toda requisição desce pela
 * fronteira até os dados, e a resposta volta assinada até a interface.
 *
 * `--rx` / `--rz` somam à inclinação base: é por eles que a abertura orbita a
 * câmera. A abertura renderiza este mesmo componente (sem interação, sem
 * ambiente, sem legenda) para que o encaixe final seja pixel a pixel.
 */
export function SystemStrata({
  className,
  ambientDelay = 2.6,
  interactive = true,
  ambient = true,
  caption = true,
}: SystemStrataProps) {
  const { width, height, gap } = STRATA
  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [hover, setHover] = useState(false)
  const [focus, setFocus] = useState<PlaneId | null>(null)
  const exploded = hover || focus !== null

  // Ambiente: flutuação dos planos e o pulso de requisição, em loop.
  useGsap(
    () => {
      if (!ambient) return
      const mm = gsap.matchMedia()
      mm.add({ reduced: MEDIA.reduced, motionOk: MEDIA.motionOk }, (context) => {
        const { reduced } = context.conditions as { reduced: boolean }
        if (reduced) return

        const q = gsap.utils.selector(rootRef)

        q<HTMLElement>('[data-plane-float]').forEach((float, i) => {
          gsap.to(float, {
            z: 5,
            duration: 5.2 + i * 1.1,
            delay: ambientDelay + i * 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })

        const request = q('[data-pulse="request"]')
        const response = q('[data-pulse="response"]')
        const hit = (name: string) => q(`[data-hit="${name}"] [data-hit-glow]`)
        const travel = gap * 2

        gsap
          .timeline({ delay: ambientDelay, repeat: -1, repeatDelay: 3.4, defaults: { ease: GSAP_EASE.inOutQuart } })
          // Requisição: interface → fronteira → dados.
          .set(request, { y: 0, opacity: 0 })
          .to(request, { opacity: 1, duration: 0.25, ease: 'power2.out' }, 0)
          .to(request, { y: travel / 2, duration: 0.8 }, 0.1)
          .to(hit('rpc'), { opacity: 1, duration: 0.2, ease: 'power2.out' }, 0.85)
          .to(hit('rpc'), { opacity: 0, duration: 0.7 }, 1.5)
          .to(request, { y: travel, duration: 0.8 }, 1.1)
          .to(hit('results'), { opacity: 1, duration: 0.2, ease: 'power2.out' }, 1.85)
          .to(hit('results'), { opacity: 0, duration: 0.7 }, 2.5)
          .to(request, { opacity: 0, duration: 0.25 }, 2.0)
          // Resposta: dados → fronteira (assinada) → interface.
          .set(response, { y: travel, opacity: 0 }, 2.25)
          .to(response, { opacity: 1, duration: 0.25, ease: 'power2.out' }, 2.3)
          .to(response, { y: travel / 2, duration: 0.8 }, 2.4)
          .to(hit('signature'), { opacity: 1, duration: 0.2, ease: 'power2.out' }, 3.15)
          .to(hit('signature'), { opacity: 0, duration: 0.7 }, 3.8)
          .to(response, { y: 0, duration: 0.8 }, 3.4)
          .to(response, { opacity: 0, duration: 0.25 }, 4.2)
          // A interface recebe o resultado: as barras se refazem.
          .fromTo(
            q('[data-bar]'),
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, stagger: 0.07, ease: GSAP_EASE.outQuart },
            4.15,
          )
          .fromTo(hit('title'), { opacity: 1 }, { opacity: 0, duration: 0.9 }, 4.2)
      })
      return () => mm.revert()
    },
    [ambientDelay, ambient],
    rootRef,
  )

  // Ponteiro fino: parallax por plano, com inércia (quickTo). Nada no toque.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !interactive || !hasFinePointer() || prefersReducedMotion()) return

    const planes = gsap.utils.selector(stage)<HTMLElement>('[data-plane]')
    const movers = planes.map((plane) => ({
      x: gsap.quickTo(plane, 'x', { duration: 0.7, ease: 'power3.out' }),
      y: gsap.quickTo(plane, 'y', { duration: 0.7, ease: 'power3.out' }),
    }))

    const handleMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
      movers.forEach((mover, i) => {
        const amount = PARALLAX[i] ?? 0
        mover.x(nx * amount)
        mover.y(ny * amount)
      })
    }
    const handleLeave = () => {
      for (const mover of movers) {
        mover.x(0)
        mover.y(0)
      }
    }

    stage.addEventListener('pointermove', handleMove, { passive: true })
    stage.addEventListener('pointerleave', handleLeave)
    return () => {
      stage.removeEventListener('pointermove', handleMove)
      stage.removeEventListener('pointerleave', handleLeave)
      for (const plane of planes) gsap.set(plane, { x: 0, y: 0 })
    }
  }, [interactive])

  // Abrir/fechar a pilha: os planos se afastam em Z para mostrar a separação.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !interactive || prefersReducedMotion()) return
    for (const plane of gsap.utils.selector(stage)<HTMLElement>('[data-plane]')) {
      const base = Number(plane.dataset.planeZ)
      gsap.to(plane, {
        z: exploded ? base * EXPLODE : base,
        duration: DUR.editorial * 0.7,
        ease: GSAP_EASE.outExpo,
        overwrite: 'auto',
      })
    }
  }, [exploded, interactive])

  // Foco: o plano sob o ponteiro sobe; os outros recuam na opacidade.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || !interactive || prefersReducedMotion()) return
    for (const card of gsap.utils.selector(stage)<HTMLElement>('[data-plane-card]')) {
      const mine = card.dataset.planeCard === focus
      gsap.to(card, {
        z: mine ? LIFT : 0,
        opacity: focus && !mine ? 0.5 : 1,
        duration: DUR.reveal * 0.8,
        ease: GSAP_EASE.outExpo,
        overwrite: 'auto',
      })
    }
  }, [focus, interactive])

  const isMouse = (event: ReactPointerEvent) => event.pointerType !== 'touch'
  const focused = focus ? PLANES.find((plane) => plane.id === focus) : undefined

  return (
    <div
      ref={rootRef}
      data-strata-outer
      className={cn(
        'relative mx-auto w-full select-none [--strata-scale:0.68] sm:[--strata-scale:0.9] lg:[--strata-scale:1]',
        className,
      )}
      style={{ perspective: '1500px' }}
      aria-hidden="true"
    >
      <div data-strata-scroll className="relative [transform-style:preserve-3d]">
        <div
          ref={stageRef}
          data-strata-stage
          className={cn('relative aspect-[1/1] w-full [transform-style:preserve-3d]', !interactive && 'pointer-events-none')}
          onPointerEnter={interactive ? (event) => isMouse(event) && setHover(true) : undefined}
          onPointerLeave={
            interactive
              ? (event) => {
                  if (!isMouse(event)) return
                  setHover(false)
                  setFocus(null)
                }
              : undefined
          }
        >
          <div
            className="absolute left-1/2 top-1/2 h-0 w-0 [transform-style:preserve-3d]"
            style={{
              transform:
                'scale(var(--strata-scale, 1)) rotateX(calc(57deg + var(--rx, 0deg) + var(--py, 0) * -3deg)) rotateZ(calc(-29deg + var(--rz, 0deg) + var(--px, 0) * 2.5deg)) translateZ(-60px)',
            }}
          >
            {/* 01 · dados */}
            <Plane
              plane={PLANES[0]}
              focused={focus === 'dados'}
              onEnter={(event) => isMouse(event) && setFocus('dados')}
              onTap={() => setFocus((current) => (current === 'dados' ? null : 'dados'))}
            >
              <div className="mt-2 space-y-[7px] font-mono text-[10px] leading-none">
                <TableRow name="assessments" columns="id · token_hash · expires_at" />
                <TableRow name="responses" columns="assessment_id · answers" />
                <TableRow name="results" columns="d · i · s · c · 0–100" hit="results" />
              </div>
              <div
                data-row
                className="mt-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5 font-mono text-[10px] leading-none"
              >
                <span className="text-text-muted">grants</span>
                <span className="text-accent-light">nenhum · acesso só por rpc</span>
              </div>
            </Plane>

            {/* 02 · fronteira */}
            <Plane
              plane={PLANES[1]}
              focused={focus === 'fronteira'}
              onEnter={(event) => isMouse(event) && setFocus('fronteira')}
              onTap={() => setFocus((current) => (current === 'fronteira' ? null : 'fronteira'))}
            >
              <div className="mt-2 space-y-[7px] font-mono text-[10px] leading-none">
                <CodeRow kind="rpc" code="emit_assessment(api_key, person_ref)" hit="rpc" />
                <CodeRow kind="rpc" code="read_result(token)" />
                <CodeRow kind="hook" code="POST /webhooks/disc" />
              </div>
              <div
                data-row
                data-hit="signature"
                className="relative mt-3 flex items-center justify-between border-t border-white/[0.07] pt-2.5 font-mono text-[10px] leading-none"
              >
                <HitGlow />
                <span className="text-text-muted">assinatura</span>
                <span className="text-text-secondary">HMAC-SHA256 · ±300s · dedupe</span>
              </div>
            </Plane>

            {/* 03 · interface */}
            <Plane
              plane={PLANES[2]}
              focused={focus === 'interface'}
              top
              onEnter={(event) => isMouse(event) && setFocus('interface')}
              onTap={() => setFocus((current) => (current === 'interface' ? null : 'interface'))}
            >
              <p data-row data-hit="title" className="relative mt-2 font-sans text-[13px] font-medium leading-tight text-text">
                <HitGlow />
                Seu perfil é <span className="text-accent-light">Dominância</span>
              </p>
              <ul className="mt-2.5 space-y-[6px]">
                {DISC_BARS.map((bar) => (
                  <li key={bar.letter} className="flex items-center gap-2 font-mono text-[10px] leading-none">
                    <span className={cn('w-2.5', bar.strong ? 'text-accent-light' : 'text-text-muted')}>{bar.letter}</span>
                    <span className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <span
                        data-bar
                        className={cn(
                          'absolute inset-y-0 left-0 origin-left rounded-full',
                          bar.strong ? 'bg-accent' : 'bg-white/25',
                        )}
                        style={{ width: `${bar.value}%` }}
                      />
                    </span>
                    <span className="w-7 text-right text-text-muted">{bar.value}%</span>
                  </li>
                ))}
              </ul>
            </Plane>

            {/* Guias verticais ligando os três planos; o pulso viaja por elas. */}
            <Guide x={-width / 2 + 14} y={-height / 2 + 14} height={gap * 2} pulse="request" />
            <Guide x={width / 2 - 14} y={height / 2 - 14} height={gap * 2} pulse="response" />
          </div>
        </div>
      </div>

      {/* Legenda: o que a camada sob o ponteiro faz. Fica fora da cena 3D. */}
      {caption && (
      <div className="mx-auto -mt-6 min-h-[2.75rem] max-w-[22rem] text-center font-mono text-[11px] leading-relaxed text-text-muted sm:-mt-4 lg:-mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={focus ?? 'default'}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: DUR.micro * 1.4 }}
            className={cn(focused && 'text-text-secondary')}
          >
            {focused && <span className="text-accent-light">{focused.index} · </span>}
            {focused ? focused.caption : DEFAULT_CAPTION}
          </motion.p>
        </AnimatePresence>
      </div>
      )}
    </div>
  )
}

interface PlaneProps {
  plane: (typeof PLANES)[number]
  focused: boolean
  top?: boolean
  onEnter: (event: ReactPointerEvent<HTMLDivElement>) => void
  onTap: () => void
  children: React.ReactNode
}

function Plane({ plane, focused, top, onEnter, onTap, children }: PlaneProps) {
  const { width, height } = STRATA
  return (
    <div
      data-plane
      data-plane-z={plane.z}
      className="absolute [transform-style:preserve-3d]"
      style={{ width, height, left: -width / 2, top: -height / 2 }}
    >
      <div data-plane-float className="h-full w-full [transform-style:preserve-3d]">
        <div
          data-plane-card={plane.id}
          data-focused={focused}
          onPointerEnter={onEnter}
          onClick={onTap}
          className={cn(
            'h-full w-full cursor-default rounded-xl border px-4 py-3 transition-[border-color,background-color] duration-300',
            top ? 'border-white/[0.16] bg-[#14161c]/95' : 'border-white/[0.1] bg-[#111319]/92',
            'data-[focused=true]:border-accent-light/50 data-[focused=true]:bg-[#161822]',
          )}
          style={{
            boxShadow: top
              ? 'inset 0 1px 0 rgba(164,139,251,0.28), 0 30px 60px -28px rgba(0,0,0,0.9)'
              : 'inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 60px -28px rgba(0,0,0,0.9)',
          }}
        >
          <div className="flex items-center justify-between font-mono text-[10px] leading-none">
            <span className="flex items-center gap-2">
              <span className={cn(top ? 'text-accent-light' : 'text-text-muted')}>{plane.index}</span>
              <span className="text-text">{plane.id}</span>
            </span>
            <span className="text-text-muted">{plane.meta}</span>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

/** Realce por trás de uma linha quando o pulso passa por ela. */
function HitGlow() {
  return (
    <span
      data-hit-glow
      aria-hidden="true"
      className="pointer-events-none absolute -inset-x-2 -inset-y-[3px] rounded-md bg-accent/15 opacity-0"
    />
  )
}

function TableRow({ name, columns, hit }: { name: string; columns: string; hit?: string }) {
  return (
    <div data-row data-hit={hit} className="relative flex items-center gap-3">
      {hit && <HitGlow />}
      <span className="w-[86px] shrink-0 text-text-secondary">{name}</span>
      <span className="truncate text-text-muted">{columns}</span>
    </div>
  )
}

function CodeRow({ kind, code, hit }: { kind: 'rpc' | 'hook'; code: string; hit?: string }) {
  return (
    <div data-row data-hit={hit} className="relative flex items-center gap-3">
      {hit && <HitGlow />}
      <span className={cn('w-[34px] shrink-0', kind === 'hook' ? 'text-accent-cyan' : 'text-accent-light')}>{kind}</span>
      <span className="truncate text-text-secondary">{code}</span>
    </div>
  )
}

/** Linha fina em pé no eixo Z, ligando o plano de baixo ao de cima, com um pulso que a percorre. */
function Guide({ x, y, height, pulse }: { x: number; y: number; height: number; pulse: 'request' | 'response' }) {
  return (
    <div
      data-guide
      className="absolute w-px origin-bottom bg-gradient-to-t from-white/[0.18] via-white/[0.1] to-transparent"
      style={{ left: x, top: y - height, height, transform: 'rotateX(-90deg)' }}
    >
      <span
        data-pulse={pulse}
        className={cn(
          'absolute h-[7px] w-[7px] rounded-full opacity-0',
          pulse === 'request' ? 'bg-accent-light' : 'bg-accent-cyan',
        )}
        style={{
          left: -3,
          top: -3,
          boxShadow: pulse === 'request' ? '0 0 10px 2px rgba(164,139,251,0.55)' : '0 0 10px 2px rgba(94,234,212,0.5)',
        }}
      />
    </div>
  )
}
