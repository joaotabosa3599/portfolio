import { motion } from 'framer-motion'
import { EASE, revealViewport } from '@/lib/motion'
import type { Capability } from '@/data/skills'

function rect(x: number, y: number, w: number, h: number, r = 3) {
  return `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`
}

interface Drawing {
  /** Estrutura: desenha uma vez ao entrar. */
  structure: string[]
  /** Detalhes internos, mais apagados. */
  detail: string[]
  /** Caminho por onde o fluxo corre quando a coluna está em foco. */
  flow: string
}

const DRAWINGS: Record<Capability['id'], Drawing> = {
  data: {
    structure: [rect(8, 14, 64, 82), rect(88, 14, 64, 58), rect(168, 40, 64, 58)],
    detail: [
      'M8 30 H72', 'M16 44 H52', 'M16 56 H60', 'M16 68 H48', 'M16 80 H56',
      'M88 30 H152', 'M96 44 H136', 'M96 56 H128',
      'M168 56 H232', 'M176 70 H212', 'M176 82 H220',
    ],
    flow: 'M72 44 H80 V44 H88 M152 56 H160 V70 H168',
  },
  application: {
    structure: [rect(8, 42, 48, 28, 14), rect(96, 42, 48, 28), rect(184, 42, 48, 28), rect(96, 86, 48, 20)],
    detail: ['M20 56 H44', 'M108 56 H132', 'M196 56 H220', 'M108 96 H132', 'M120 8 V42', 'M108 8 H132'],
    flow: 'M56 56 H96 M144 56 H184 M120 70 V86',
  },
  interface: {
    structure: [rect(8, 8, 224, 98, 5), 'M8 24 H232', 'M48 24 V106'],
    detail: [
      rect(60, 34, 50, 26), rect(118, 34, 50, 26), rect(176, 34, 46, 26),
      'M16 36 H40', 'M16 48 H36', 'M16 60 H40',
      'M14 16 H18', 'M22 16 H26', 'M30 16 H34',
    ],
    flow: 'M60 94 L84 82 L108 88 L134 72 L160 78 L188 64 L222 70',
  },
}

/**
 * Diagrama técnico de uma camada: a estrutura se desenha ao entrar na tela,
 * e o caminho de fluxo corre (tracejado em movimento) quando a coluna está
 * sob o ponteiro ou em foco. Decorativo: o texto ao lado diz o mesmo.
 */
export function Schematic({ id }: { id: Capability['id'] }) {
  const drawing = DRAWINGS[id]
  return (
    <motion.svg
      viewBox="0 0 240 112"
      fill="none"
      aria-hidden="true"
      className="h-auto w-full max-w-[280px]"
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {drawing.structure.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--border-emphasis)"
          strokeWidth="1"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
          transition={{ duration: 1.1, ease: EASE.premium, delay: i * 0.12 }}
        />
      ))}
      {drawing.detail.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="var(--border-emphasis)"
          strokeOpacity="0.7"
          strokeWidth="1"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          transition={{ duration: 0.5, ease: EASE.ui, delay: 0.5 + i * 0.03 }}
        />
      ))}
      <motion.path
        d={drawing.flow}
        stroke="var(--brand-muted)"
        strokeWidth="1.25"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 1, ease: EASE.premium, delay: 0.7 }}
      />
      <path d={drawing.flow} className="schematic-flow" stroke="var(--brand-light)" strokeWidth="1.25" />
    </motion.svg>
  )
}
