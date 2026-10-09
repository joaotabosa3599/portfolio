import { motion, type Variants } from 'framer-motion'
import type { ElementType, ReactNode } from 'react'
import { DUR, EASE, revealTransition, revealViewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

/*
 * O observador fica no wrapper que recorta, não no filho deslocado: um
 * elemento 100% fora do `overflow: hidden` do pai nunca "intersecta" a
 * viewport, então o reveal jamais dispararia. As variantes descem do pai.
 */
const lineVariants: Variants = {
  hidden: { y: '108%' },
  visible: { y: '0%' },
}

interface RevealLinesProps {
  /** Uma entrada por linha. Aceita nós para destacar palavras. */
  lines: ReactNode[]
  as?: ElementType
  className?: string
  delay?: number
}

/**
 * Reveal de headline: cada linha sobe de dentro de uma máscara. Reservado para
 * títulos importantes — corpo de texto usa `FadeIn`.
 */
export function RevealLines({ lines, as: Tag = 'h2', className, delay = 0 }: RevealLinesProps) {
  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className="block overflow-hidden pb-[0.1em] -mb-[0.1em]"
          initial="hidden"
          whileInView="visible"
          viewport={revealViewport}
        >
          <motion.span
            className="block will-change-transform"
            variants={lineVariants}
            transition={{ duration: DUR.editorial * 0.9, ease: EASE.outExpo, delay: delay + index * 0.09 }}
          >
            {line}
            {/* Espaço invisível no fim da linha: leitores de tela não emendam as linhas. */}{' '}
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
  as?: 'div' | 'p' | 'li' | 'span' | 'section' | 'figure'
}

/** Entrada simples para corpo de texto e blocos: opacidade + 10px. */
export function FadeIn({ children, className, delay = 0, y = 10, as = 'div' }: FadeInProps) {
  const Component = motion[as]
  return (
    <Component
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={revealTransition(delay)}
    >
      {children}
    </Component>
  )
}

/** Linha fina que se desenha da esquerda para a direita ao entrar. */
export function Rule({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      className={cn('h-px w-full origin-left bg-border', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={revealViewport}
      transition={{ duration: DUR.editorial, ease: EASE.outExpo, delay }}
    />
  )
}
