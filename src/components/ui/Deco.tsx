import { cn } from '@/lib/utils'

/**
 * Texto puramente decorativo (índices, separadores) desenhado por
 * pseudo-elemento: fica fora da árvore de acessibilidade e pode usar os tons
 * mais baixos da paleta sem contar como texto para o contraste.
 */
export function Deco({ text, className }: { text: string; className?: string }) {
  return <span aria-hidden="true" data-deco={text} className={cn('before:content-[attr(data-deco)]', className)} />
}
