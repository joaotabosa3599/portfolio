import { cn } from '@/lib/utils'

/**
 * As 12 colunas do grid editorial desenhadas como guias de construção.
 * Alinhadas ao mesmo `shell` do conteúdo e esmaecidas nas bordas: é a
 * estrutura da página aparecendo, não um padrão de fundo.
 */
export function GridGuides({ className, columns = 12 }: { className?: string; columns?: number }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, #000 18%, #000 62%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, #000 18%, #000 62%, transparent)',
      }}
    >
      <div className="shell grid-editorial h-full">
        {Array.from({ length: columns }, (_, i) => (
          <div key={i} className="h-full border-l border-white/[0.035] last:border-r" />
        ))}
      </div>
    </div>
  )
}
