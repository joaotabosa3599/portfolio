import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface SharedProps {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
  className?: string
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-light shadow-[0_0_0_1px_rgba(127,90,245,0.4)] hover:shadow-[0_0_24px_-4px_rgba(127,90,245,0.55)]',
  secondary:
    'bg-transparent text-text border border-border-strong hover:border-accent-light hover:text-accent-light',
  ghost: 'bg-transparent text-text-secondary hover:text-text',
}

const sizeClasses: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-[0.95rem]',
}

const baseClasses =
  'group inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-out focus-visible:outline-accent-light disabled:cursor-not-allowed disabled:opacity-40'

function Content({ children, icon, iconPosition = 'right' }: Pick<SharedProps, 'children' | 'icon' | 'iconPosition'>) {
  return (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
      )}
    </>
  )
}

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
    to?: undefined
  }

type AnchorProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    to?: undefined
  }

type RouterLinkProps = SharedProps &
  Omit<LinkProps, 'className' | 'children'> & {
    to: string
    href?: undefined
  }

export function Button(props: ButtonProps | AnchorProps | RouterLinkProps) {
  const { variant = 'primary', size = 'md', icon, iconPosition, className, children } = props
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className)

  if ('to' in props && props.to) {
    const { to, variant: _v, size: _s, icon: _i, iconPosition: _ip, className: _c, children: _ch, ...rest } = props
    return (
      <Link to={to} className={classes} {...rest}>
        <Content icon={icon} iconPosition={iconPosition}>
          {children}
        </Content>
      </Link>
    )
  }

  if ('href' in props && props.href) {
    const { href, variant: _v, size: _s, icon: _i, iconPosition: _ip, className: _c, children: _ch, ...rest } = props
    return (
      <a href={href} className={classes} {...rest}>
        <Content icon={icon} iconPosition={iconPosition}>
          {children}
        </Content>
      </a>
    )
  }

  const { variant: _v, size: _s, icon: _i, iconPosition: _ip, className: _c, children: _ch, ...rest } =
    props as ButtonProps
  return (
    <button className={classes} {...rest}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  )
}
