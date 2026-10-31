import { motion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { DUR, EASE, revealTransition, revealViewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

/*
 * O observador fica no wrapper que recorta, não no filho deslocado: um
 * elemento 100% fora do `overflow: hidden` do pai nunca intersecta a
 * viewport, e o reveal jamais dispararia. As variantes descem do pai.
 */
const lineVariants: Variants = {
  hidden: { y: '105%' },
  visible: { y: '0%' },
}

interface RevealLinesProps {
  /** Uma entrada por linha. Aceita nós para destacar palavras. */
  lines: ReactNode[]
  as?: ElementType
  id?: string
  className?: string
  /** Classe aplicada a cada linha (ex.: recuo editorial da segunda linha). */
  lineClassName?: (index: number) => string | undefined
  delay?: number
  /** Dispara na montagem em vez de esperar a viewport (acima da dobra). */
  immediate?: boolean
}

/**
 * Reveal de headline: cada linha sobe de dentro de uma máscara. O layout é
 * reservado desde o primeiro quadro (só transform anima), então não há salto.
 */
export function RevealLines({ lines, as: Tag = 'h2', id, className, lineClassName, delay = 0, immediate = false }: RevealLinesProps) {
  const trigger = immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: revealViewport }
  return (
    <Tag id={id} className={className}>
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className={cn('block overflow-hidden pb-[0.12em] -mb-[0.12em]', lineClassName?.(index))}
          initial="hidden"
          {...trigger}
        >
          <motion.span
            className="block"
            variants={lineVariants}
            transition={{ duration: DUR.title, ease: EASE.premium, delay: delay + index * 0.08 }}
          >
            {line}
            {/* Espaço no fim da linha: leitores de tela não emendam as palavras. */}{' '}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}

interface FadeInProps {
  children: ReactNode
  className?: string
  delay?: number
  /** Deslocamento vertical de entrada, em px. Pequeno por padrão. */
  y?: number
  x?: number
  as?: 'div' | 'p' | 'li' | 'span' | 'section' | 'figure' | 'dl' | 'ul' | 'ol' | 'article'
}

/** Entrada para corpo e blocos: opacidade + deslocamento mínimo. */
export function FadeIn({ children, className, delay = 0, y = 12, x = 0, as = 'div' }: FadeInProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={revealViewport}
      transition={revealTransition(delay)}
    >
      {children}
    </Component>
  )
}

/** Linha fina que se desenha ao entrar. Horizontal por padrão. */
export function Rule({
  className,
  delay = 0,
  vertical = false,
}: {
  className?: string
  delay?: number
  vertical?: boolean
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn(vertical ? 'w-px origin-top' : 'h-px w-full origin-left', 'bg-border', className)}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={revealViewport}
      transition={{ duration: DUR.title * 1.3, ease: EASE.premium, delay }}
    />
  )
}
