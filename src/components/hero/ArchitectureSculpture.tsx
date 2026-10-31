import { motion } from 'framer-motion'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { LAYERS, type Layer } from '@/components/hero/layers'
import { EASE, HERO_SEQUENCE, hasFinePointer } from '@/lib/motion'
import { cn } from '@/lib/utils'

/* Geometria no espaço do plano, em px (antes da inclinação). */
const STAGE = 560
const W = 344
const H = 224
/** Coluna de portas à direita de cada plano: por onde o canal atravessa. */
const PORT = { x: 316, y: 112 }
/** Parallax por plano em px no espaço da cena: o mais alto responde mais. */
const PARALLAX = [5, 11, 17]
/** Atraso dos pulsos: começam depois que a entrada assentou. */
const PULSE_START = 2.2

interface ArchitectureSculptureProps {
  /** Animação de entrada (hero). Desligada, os planos já nascem no lugar. */
  entrance?: boolean
  className?: string
  /** Plano em foco controlado de fora (legenda). */
  focus?: number | null
  onFocusChange?: (index: number | null) => void
}

/**
 * Escultura de arquitetura: três planos suspensos — dados, aplicação,
 * experiência — ligados por um canal por onde uma requisição desce e a
 * resposta sobe. Construída em DOM com CSS 3D: nada aqui precisa de WebGL.
 *
 * Camadas de transform que nunca disputam a mesma propriedade:
 *  - grupo:       inclinação base + resposta ao ponteiro (--px/--py, ±3–4°);
 *  - profundidade: translateZ(var(--gap) × i) + parallax via `translate`;
 *  - entrada:     motion (z + opacidade), uma vez;
 *  - foco:        o plano sob o ponteiro sobe 14px (transition CSS);
 *  - flutuação:   loop CSS de 7px em Z, defasado por plano.
 * `--gap` é uma custom property registrada: abrir a pilha no hover é uma
 * transição de CSS, sem JS por frame.
 */
export function ArchitectureSculpture({ entrance = true, className, focus = null, onFocusChange }: ArchitectureSculptureProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [open, setOpen] = useState(false)

  // A cena é desenhada em 560px e escalada para a largura disponível.
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const resize = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE))
    resize.observe(root)
    // Fora da tela, os loops CSS (flutuação, pulsos) ficam pausados.
    const visibility = new IntersectionObserver(([entry]) => {
      root.dataset.paused = entry.isIntersecting ? 'false' : 'true'
    })
    visibility.observe(root)
    return () => {
      resize.disconnect()
      visibility.disconnect()
    }
  }, [])

  const fine = typeof window !== 'undefined' && hasFinePointer()

  return (
    <div ref={rootRef} className={cn('relative aspect-square w-full select-none', className)} aria-hidden="true">
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{ width: STAGE, height: STAGE, transform: `scale(${scale})`, perspective: '1700px', perspectiveOrigin: '50% 38%' }}
        onPointerEnter={(event) => event.pointerType === 'mouse' && setOpen(true)}
        onPointerLeave={(event) => {
          if (event.pointerType !== 'mouse') return
          setOpen(false)
          onFocusChange?.(null)
        }}
      >
        {/* Luz ambiente: uma massa violeta baixa, atrás da pilha. */}
        <div
          className="absolute left-1/2 top-[55%] h-[70%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-[50%]"
          style={{ background: 'radial-gradient(closest-side, rgb(48 35 69 / 0.9), rgb(48 35 69 / 0.35) 55%, transparent)' }}
        />

        <div
          className="preserve-3d absolute left-1/2 top-[52%] h-0 w-0"
          style={
            {
              '--gap': open ? '146px' : '116px',
              transition: '--gap 700ms var(--ease-premium)',
              transform:
                'rotateX(calc(56deg + var(--py, 0) * -3deg)) rotateZ(calc(-38deg + var(--px, 0) * 4deg)) translateZ(calc(var(--gap) * -1))',
            } as CSSProperties
          }
        >
          <Floor />

          {/* Pilares de construção nas quinas e o canal de requisição. */}
          <Riser x={-W / 2 + 14} y={H / 2 - 14} from={2} span={2} entrance={entrance} dashed />
          <Riser x={W / 2 - 14} y={-H / 2 + 14} from={2} span={2} entrance={entrance} dashed />
          <Riser x={PORT.x - W / 2} y={PORT.y - H / 2} from={2} span={1} entrance={entrance} pulses={[0, 3.0]} />
          <Riser x={PORT.x - W / 2} y={PORT.y - H / 2} from={1} span={1} entrance={entrance} pulses={[0.95, 2.05]} />

          {LAYERS.map((layer, index) => (
            <Plane
              key={layer.id}
              layer={layer}
              index={index}
              entrance={entrance}
              focused={focus === index}
              dimmed={focus !== null && focus !== index}
              onEnter={() => onFocusChange?.(index)}
              onTap={fine ? undefined : () => onFocusChange?.(focus === index ? null : index)}
            >
              {index === 0 && <DataContent />}
              {index === 1 && <ApplicationContent />}
              {index === 2 && <ExperienceContent />}
            </Plane>
          ))}
        </div>
      </div>
    </div>
  )
}

interface PlaneProps {
  layer: Layer
  index: number
  entrance: boolean
  focused: boolean
  dimmed: boolean
  onEnter: () => void
  onTap?: () => void
  children: ReactNode
}

/** Momento em que o pulso chega a cada plano (s, dentro do ciclo de 6,4s). */
const HITS: Record<number, number[]> = { 0: [1.85], 1: [0.9, 2.95], 2: [3.9] }

function Plane({ layer, index, entrance, focused, dimmed, onEnter, onTap, children }: PlaneProps) {
  const top = index === 2
  return (
    <div
      className="preserve-3d absolute left-0 top-0"
      style={{
        transform: `translateZ(calc(var(--gap) * ${index}))`,
        translate: `calc(var(--px, 0) * ${PARALLAX[index]}px) calc(var(--py, 0) * ${PARALLAX[index]}px)`,
      }}
    >
      <motion.div
        className="preserve-3d"
        initial={entrance ? { opacity: 0, z: -150 } : false}
        animate={{ opacity: 1, z: 0 }}
        transition={{
          duration: 1.1,
          ease: EASE.premium,
          delay: HERO_SEQUENCE.planes + index * HERO_SEQUENCE.planesStagger,
        }}
      >
        <div
          className="preserve-3d transition-transform duration-500 ease-premium"
          style={{ transform: `translateZ(${focused ? 14 : 0}px)` }}
        >
          <div className="plane-float preserve-3d" style={{ animationDelay: `${-index * 2.4}s` }}>
            {/* Espessura: uma lâmina escura 5px abaixo dá corpo ao plano. */}
            <div
              className="absolute rounded-[14px] border border-[#1e1f2a] bg-[#0b0b10]"
              style={{ left: -W / 2, top: -H / 2, width: W, height: H, transform: 'translateZ(-5px)' }}
            />
            <div
              onPointerEnter={(event) => event.pointerType === 'mouse' && onEnter()}
              onClick={onTap}
              className={cn(
                'absolute overflow-hidden rounded-[14px] border transition-[opacity,border-color] duration-500 ease-premium',
                top ? 'border-border-strong' : 'border-border',
                focused && 'border-brand-muted',
                dimmed ? 'opacity-45' : 'opacity-100',
              )}
              style={{
                left: -W / 2,
                top: -H / 2,
                width: W,
                height: H,
                background: 'linear-gradient(155deg, #1d1e2a 0%, #15161e 46%, #111219 100%)',
                boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.07)',
              }}
            >
              <header className="flex h-8 items-center justify-between border-b border-white/[0.06] px-3.5 font-mono text-[9px] uppercase tracking-[0.12em]">
                <span className="text-text-secondary">
                  <span className="text-brand-light">{layer.index}</span>
                  <span className="ml-2">{layer.name}</span>
                </span>
                <span className="normal-case tracking-normal text-text-secondary/80">{layer.meta}</span>
              </header>

              <div className="relative h-[calc(100%-2rem)] pr-[56px]">
                {children}
                {/* Coluna de portas: o canal atravessa o plano aqui. */}
                <div className="absolute inset-y-0 right-0 w-[56px] border-l border-white/[0.06]">
                  <Port hits={HITS[index]} />
                </div>
              </div>

              {/* Reflexo controlado: uma faixa que acompanha o ponteiro. */}
              {top && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[14px]">
                  <div
                    className="absolute -inset-y-10 left-[18%] w-[34%] rotate-[18deg]"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgb(255 255 255 / 0.045), transparent)',
                      translate: 'calc(var(--px, 0) * 60px) 0',
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

function Port({ hits }: { hits: number[] }) {
  // Posição relativa à área de conteúdo (abaixo do header de 32px).
  const top = PORT.y - 32
  return (
    <span className="absolute left-1/2 size-[11px] -translate-x-1/2 -translate-y-1/2" style={{ top }}>
      <span className="absolute inset-0 rotate-45 border border-brand-muted bg-bg" />
      {hits.map((delay) => (
        <span
          key={delay}
          className="node-hit absolute -inset-[3px] rotate-45 border border-brand-light bg-brand/60 opacity-0"
          style={{ animationDelay: `${PULSE_START + delay}s` }}
        />
      ))}
    </span>
  )
}

interface RiserProps {
  x: number
  y: number
  /** Índice do plano de onde o conector desce. */
  from: number
  /** Quantos intervalos ele atravessa. */
  span: number
  entrance: boolean
  dashed?: boolean
  /** Atrasos (s) do pulso que desce e do que sobe, dentro do ciclo. */
  pulses?: [number, number]
}

/**
 * Conector vertical entre planos: um elemento de 1px deitado em Z
 * (rotateX −90°) que desce a partir do plano `from`.
 */
function Riser({ x, y, from, span, entrance, dashed = false, pulses }: RiserProps) {
  return (
    <div
      className="absolute w-[1.5px] origin-top overflow-hidden"
      style={{
        left: x,
        top: y,
        height: `calc(var(--gap) * ${span})`,
        transform: `translateZ(calc(var(--gap) * ${from})) rotateX(-90deg)`,
      }}
    >
      <motion.div
        className={cn('absolute inset-0 origin-top', dashed ? 'opacity-60' : 'bg-brand-muted/55')}
        style={
          dashed
            ? { backgroundImage: 'linear-gradient(to bottom, rgb(164 165 176 / 0.35) 50%, transparent 50%)', backgroundSize: '100% 6px' }
            : undefined
        }
        initial={entrance ? { scaleY: 0 } : false}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: EASE.premium, delay: HERO_SEQUENCE.connectors }}
      />
      {pulses && (
        <>
          <span
            className="pulse-down absolute -left-px top-0 h-7 w-[3.5px] opacity-0"
            style={{
              background: 'linear-gradient(to bottom, transparent, #b79aff, transparent)',
              animationDelay: `${PULSE_START + pulses[0]}s`,
            }}
          />
          <span
            className="pulse-up absolute -left-px top-0 h-7 w-[3.5px] opacity-0"
            style={{
              background: 'linear-gradient(to bottom, transparent, #91a7d8, transparent)',
              animationDelay: `${PULSE_START + pulses[1]}s`,
            }}
          />
        </>
      )}
    </div>
  )
}

/** Piso técnico: grade fina sob a pilha, com sombra e a luz que se acumula. */
function Floor() {
  const size = 640
  return (
    <div
      className="absolute"
      style={{ left: -size / 2, top: -size / 2, width: size, height: size, transform: 'translateZ(calc(var(--gap) * -0.55))' }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '-1px -1px',
          maskImage: 'radial-gradient(closest-side, #000 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(closest-side, #000 30%, transparent 100%)',
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[46%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[30%]"
        style={{ background: 'radial-gradient(closest-side, rgb(0 0 0 / 0.55), transparent)' }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[40%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-[30%]"
        style={{ background: 'radial-gradient(closest-side, rgb(139 92 246 / 0.13), transparent)' }}
      />
    </div>
  )
}

/* ---------------------------------------------------------------------------
 * Conteúdo dos planos — artefatos reais do Mapa DISC, em escala de miniatura.
 * ------------------------------------------------------------------------- */

function Table({ name, columns, x, y, highlight }: { name: string; columns: string[]; x: number; y: number; highlight?: boolean }) {
  return (
    <div
      className={cn('absolute w-[82px] rounded-[5px] border bg-[#101118]', highlight ? 'border-brand-muted/70' : 'border-white/[0.09]')}
      style={{ left: x, top: y }}
    >
      <p className={cn('border-b border-white/[0.07] px-1.5 py-1 font-mono text-[7.5px]', highlight ? 'text-brand-light' : 'text-text-secondary')}>
        {name}
      </p>
      <ul className="space-y-[3px] px-1.5 py-1.5">
        {columns.map((column, i) => (
          <li key={column} className="flex items-center gap-1 font-mono text-[6.5px] leading-none text-text-secondary/80">
            <span className={cn('size-[3px] rounded-[1px]', i === 0 ? 'bg-warm/80' : 'bg-white/20')} />
            {column}
          </li>
        ))}
      </ul>
    </div>
  )
}

function DataContent() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 288 192" fill="none">
        <path d="M96 52 H112 V44 H120" stroke="rgb(145 167 216 / 0.45)" strokeWidth="1" />
        <path d="M206 52 H214 V98 H96 V112" stroke="rgb(145 167 216 / 0.45)" strokeWidth="1" strokeDasharray="2 3" />
      </svg>
      <Table name="assessments" columns={['id', 'token_hash', 'expires_at']} x={14} y={16} />
      <Table name="responses" columns={['assessment_id', 'answers']} x={122} y={16} />
      <Table name="results" columns={['assessment_id', 'd · i · s · c', 'fit']} x={14} y={104} highlight />
      <div className="absolute bottom-3.5 right-3.5 w-[96px] font-mono text-[7px] leading-[1.6]">
        <p className="text-text-secondary/80">grants</p>
        <p className="text-brand-light">nenhum</p>
        <p className="text-text-secondary/80">só por rpc</p>
      </div>
    </>
  )
}

function Service({ name, detail, x, y, accent }: { name: string; detail: string; x: number; y: number; accent?: boolean }) {
  return (
    <div className="absolute rounded-[5px] border border-white/[0.09] bg-[#101118] px-2 py-1.5" style={{ left: x, top: y }}>
      <p className={cn('font-mono text-[8px] leading-none', accent ? 'text-brand-light' : 'text-text')}>{name}</p>
      <p className="mt-1 font-mono text-[6.5px] leading-none text-text-secondary/80">{detail}</p>
    </div>
  )
}

function ApplicationContent() {
  return (
    <>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 288 192" fill="none">
        <path d="M72 34 H122" stroke="rgb(164 165 176 / 0.35)" strokeWidth="1" />
        <path d="M196 34 H232 V96 H288" stroke="rgb(120 103 173 / 0.7)" strokeWidth="1" />
        <path d="M160 48 V84" stroke="rgb(164 165 176 / 0.35)" strokeWidth="1" />
      </svg>
      <Service name="auth" detail="api key · sha-256" x={14} y={18} />
      <Service name="rpc" detail="security definer" x={124} y={18} accent />
      <Service name="webhook" detail="hmac · ±300s" x={124} y={86} />
      <div className="absolute inset-x-3.5 bottom-3 space-y-[5px] font-mono text-[7px] leading-none">
        <p className="text-text-secondary">
          <span className="text-cool">rpc</span> emit_assessment(api_key, person_ref)
        </p>
        <p className="text-text-secondary">
          <span className="text-cool">post</span> /webhooks · dedupe · backoff
        </p>
      </div>
    </>
  )
}

const DISC = [
  { letter: 'D', value: 54, strong: true },
  { letter: 'I', value: 17 },
  { letter: 'S', value: 21 },
  { letter: 'C', value: 8 },
]

function ExperienceContent() {
  return (
    <div className="flex h-full flex-col px-4 pb-3.5 pt-3">
      <p className="font-mono text-[7px] text-text-secondary/80">resultado · perfil comportamental</p>
      <p className="mt-1.5 font-display text-[15px] font-medium leading-tight tracking-[-0.02em] text-text">
        Seu perfil é <span className="text-brand-light">Dominância</span>
      </p>
      <ul className="mt-3 space-y-[6px]">
        {DISC.map((bar) => (
          <li key={bar.letter} className="flex items-center gap-2 font-mono text-[7.5px] leading-none">
            <span className={cn('w-2', bar.strong ? 'text-brand-light' : 'text-text-secondary/80')}>{bar.letter}</span>
            <span className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-white/[0.07]">
              <span
                className={cn('absolute inset-y-0 left-0 rounded-full', bar.strong ? 'bg-brand' : 'bg-text-muted/70')}
                style={{ width: `${bar.value}%` }}
              />
            </span>
            <span className="w-4 text-right text-text-secondary/80">{bar.value}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between">
        <span className="rounded-full bg-brand-solid px-2.5 py-1 text-[7.5px] font-medium text-on-brand">Ver leitura completa</span>
        <span className="font-mono text-[6.5px] text-text-secondary/80">sem login · token</span>
      </div>
    </div>
  )
}
