import { motion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/** O parallax fica num elemento só dele, para não disputar o `transform` com a entrada do Framer. */
function parallax(x: number, y: number) {
  return { transform: `translate3d(calc(var(--px, 0) * ${x}px), calc(var(--py, 0) * ${y}px), 0)` }
}

/**
 * Cena de fundo do hero, em camadas.
 *
 * Cada camada responde a `--px` / `--py` (publicados pelo `usePointerScene` na
 * section) com um multiplicador diferente: o que está longe quase não se mexe,
 * o que está perto responde mais. Tudo em `transform`, sem reflow.
 */
export function HeroVisual() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 1. Grade — a camada mais distante, quase imóvel. */}
      <motion.div
        className="absolute -inset-16"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <div className="absolute inset-0 will-change-transform" style={parallax(7, 7)}>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.09) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>
      </motion.div>

      {/* 2. Atmosfera — vinheta que apaga a grade nas bordas. */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 55% 55% at 50% 25%, transparent 0%, var(--color-bg) 78%)' }}
      />

      {/* 3. Luzes — ambiente fixo. Deslocar uma camada desfocada obriga a
             re-rasterizar o blur a cada frame, então a profundidade do ponteiro
             fica por conta das camadas nítidas abaixo. */}
      <motion.div
        className="absolute left-1/2 top-[6%] h-[420px] w-[620px] -translate-x-1/2"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: EASE, delay: 0.1 }}
      >
        <div className="h-full w-full rounded-full bg-accent/25 blur-[100px]" />
      </motion.div>

      <motion.div
        className="absolute right-[10%] top-[22%] h-[200px] w-[200px]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.25 }}
      >
        <div className="h-full w-full rounded-full bg-accent-cyan/15 blur-[90px]" />
      </motion.div>

      {/* 4. Holofote do ponteiro — a cena ganha uma fonte de luz que o visitante move.
             É um elemento deslocado por transform, e não um gradiente reposicionado:
             assim a camada é composta, em vez de repintada a cada frame. */}
      <div className="absolute left-1/2 top-[42%] hidden h-[820px] w-[820px] -translate-x-1/2 -translate-y-1/2 lg:block">
        <div className="h-full w-full will-change-transform" style={parallax(300, 240)}>
          <div
            className="h-full w-full rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(127,90,245,0.14), transparent 68%)' }}
          />
        </div>
      </div>

      {/* 5. Anel — o elemento mais próximo, o que mais responde. */}
      <motion.div
        className="absolute -right-16 top-24 hidden w-[420px] lg:block"
        initial={{ opacity: 0, rotate: -14 }}
        animate={{ opacity: 0.7, rotate: 0 }}
        transition={{ duration: 2.4, ease: EASE, delay: 0.35 }}
      >
        <div className="will-change-transform" style={parallax(52, 34)}>
          <svg viewBox="0 0 400 400" fill="none" className="w-full text-border-strong">
            <circle cx="200" cy="200" r="199" stroke="currentColor" strokeDasharray="2 8" />
            <path d="M200 1V60" stroke="currentColor" />
            <path d="M200 340V399" stroke="currentColor" />
            <circle cx="200" cy="200" r="140" stroke="currentColor" strokeOpacity="0.6" />
          </svg>
        </div>
      </motion.div>

      {/* 6. Grão — tira o aspecto chapado dos gradientes. Sem blend mode: em tela
             cheia ele custa uma recomposição por frame e não compensa. */}
      <div className="bg-noise absolute inset-0 opacity-50" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
    </div>
  )
}
