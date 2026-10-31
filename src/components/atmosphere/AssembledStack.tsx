import { motion } from 'framer-motion'
import { LAYERS } from '@/components/hero/layers'
import { EASE, revealViewport } from '@/lib/motion'

/**
 * O fechamento da escultura do hero: as mesmas três camadas, no mesmo ângulo,
 * agora juntas. No começo da página o sistema aparece explodido em planos;
 * no fim, montado — um produto inteiro. Ao entrar na tela, os planos descem
 * até se encostarem; depois, uma luz atravessa a peça de tempos em tempos.
 */
export function AssembledStack() {
  return (
    <motion.div
      aria-hidden="true"
      className="relative aspect-[4/3] w-full select-none"
      style={{ perspective: '1400px' }}
      initial="apart"
      whileInView="together"
      viewport={revealViewport}
    >
      <div
        className="preserve-3d absolute left-1/2 top-1/2 h-0 w-0"
        style={{ transform: 'rotateX(56deg) rotateZ(-38deg)' }}
      >
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer.id}
            className="absolute left-[-150px] top-[-97px] h-[194px] w-[300px] overflow-hidden rounded-[12px] border"
            style={{
              borderColor: i === 2 ? 'var(--border-emphasis)' : 'var(--border-subtle)',
              background: 'linear-gradient(155deg, #1d1e2a, #14151d 50%, #111219)',
              boxShadow: 'inset 0 1px 0 rgb(255 255 255 / 0.06)',
            }}
            variants={{
              apart: { z: i * 70, opacity: 0.5 },
              together: { z: i * 9, opacity: 1 },
            }}
            transition={{ duration: 1.4, ease: EASE.premium, delay: (2 - i) * 0.08 }}
          >
            <span className="absolute left-3 top-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary/80">
              <span className="text-brand-light">{layer.index}</span> {layer.name}
            </span>
            {i === 2 && (
              <span
                className="sheen-pass absolute inset-y-0 left-0 w-1/3"
                style={{ background: 'linear-gradient(90deg, transparent, rgb(183 154 255 / 0.12), transparent)' }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
