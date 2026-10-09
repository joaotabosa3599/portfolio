import { cn } from '@/lib/utils'

interface PictureProps {
  /** Caminho sem extensão, ex.: `/projects/debrief`. */
  base: string
  alt: string
  /** Larguras geradas por scripts/optimize-images.sh. */
  widths?: number[]
  sizes: string
  /** Dimensões intrínsecas para reservar espaço (evita CLS). */
  width: number
  height: number
  className?: string
  imgClassName?: string
  /** Acima da dobra: carrega com prioridade em vez de lazy. */
  priority?: boolean
}

/**
 * Imagem responsiva: AVIF → WebP → JPG original, com `srcset`/`sizes`,
 * lazy por padrão e dimensões fixas para não deslocar layout.
 */
export function Picture({
  base,
  alt,
  widths = [720, 1200, 1800],
  sizes,
  width,
  height,
  className,
  imgClassName,
  priority = false,
}: PictureProps) {
  const set = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ')

  return (
    <picture className={cn('block', className)}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={`${base}.jpg`}
        srcSet={set('webp')}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', imgClassName)}
      />
    </picture>
  )
}
