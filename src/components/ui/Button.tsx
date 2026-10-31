import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface SharedProps {
  variant?: Variant
  size?: Size
  /** Ícone à direita. No primário ele faz o loop de saída/entrada no hover. */
  icon?: ReactNode
  /** Ícone à esquerda, estático (ex.: marca do GitHub). */
  leadingIcon?: ReactNode
  className?: string
  children: ReactNode
}

/*
 * Estados: default · hover · active (afunda 2%) · focus-visible (anel
 * brand-light) · disabled. Sem glow: o feedback é preenchimento, borda e
 * movimento do conteúdo.
 *
 * Primário: preenchimento brand-solid (o violeta aprofundado que deixa o texto
 * branco em AA) com um brilho de borda superior que sobe no hover.
 * Secundário: contorno que recebe uma superfície vinda de baixo.
 */
const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-solid text-on-brand shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(0_0_0/0.4)] hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.32),0_8px_24px_-12px_rgb(139_92_246/0.45)]',
  secondary:
    'text-text border border-border-strong hover:border-text-muted before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:bg-surface-elevated before:transition-transform before:duration-[var(--dur-micro)] before:ease-premium hover:before:scale-y-100 focus-visible:before:scale-y-100',
  ghost: 'text-text-secondary hover:text-text',
}

const sizeClasses: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-6 text-[0.9375rem]',
}

const baseClasses =
  'group relative isolate inline-flex select-none items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[color,border-color,box-shadow,scale] duration-[var(--dur-micro)] ease-ui active:scale-[0.98] disabled:pointer-events-none disabled:text-text-disabled disabled:opacity-60'

function Content({ children, icon, leadingIcon, variant }: Pick<SharedProps, 'children' | 'icon' | 'leadingIcon' | 'variant'>) {
  return (
    <>
      {leadingIcon && <span className="shrink-0">{leadingIcon}</span>}
      <span>{children}</span>
      {icon &&
        (variant === 'primary' ? (
          <span className="arrow-loop shrink-0" aria-hidden="true">
            <span>{icon}</span>
            <span>{icon}</span>
          </span>
        ) : (
          <span className="arrow-shift shrink-0" aria-hidden="true">
            {icon}
          </span>
        ))}
    </>
  )
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }
type AnchorProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }
type RouterLinkProps = SharedProps & Omit<LinkProps, 'className' | 'children'> & { to: string; href?: undefined }

export function Button(props: ButtonProps | AnchorProps | RouterLinkProps) {
  const { variant = 'primary', size = 'md', icon, leadingIcon, className, children } = props
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)
  const content = (
    <Content icon={icon} leadingIcon={leadingIcon} variant={variant}>
      {children}
    </Content>
  )

  if ('to' in props && props.to) {
    const { to, variant: _v, size: _s, icon: _i, leadingIcon: _l, className: _c, children: _ch, ...rest } = props
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, icon: _i, leadingIcon: _l, className: _c, children: _ch, ...rest } = props
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  const { variant: _v, size: _s, icon: _i, leadingIcon: _l, className: _c, children: _ch, type = 'button', ...rest } =
    props as ButtonProps
  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  )
}
