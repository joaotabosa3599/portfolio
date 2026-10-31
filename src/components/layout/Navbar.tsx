import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Deco } from '@/components/ui/Deco'
import { Monogram } from '@/components/ui/Monogram'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrolled } from '@/hooks/useScrolled'
import { SPRING } from '@/lib/motion'
import { cn } from '@/lib/utils'

const sectionIds = site.nav.map((item) => item.href.slice(1))

/**
 * No topo, integrada ao hero: transparente e mais alta. Ao rolar, assenta numa
 * superfície escura levemente elevada, encolhe 12px e ganha uma régua de
 * progresso de leitura. O header é fixo, então nenhuma dessas mudanças move
 * o conteúdo da página.
 *
 * O indicador ativo é um único elemento que desliza entre os itens
 * (layoutId) — acompanha tanto o scrollspy quanto o hover.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const scrolled = useScrolled(24)
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeId = useActiveSection(isHome ? sectionIds : noSections)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.4 })

  const resolveHref = (href: string) => (isHome ? href : `/${href}`)
  const marked = hovered ?? activeId

  return (
    <>
      <header
        className={cn(
          'nav-enter fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height,backdrop-filter] duration-[var(--dur-component)] ease-premium',
          'border-b',
          scrolled || menuOpen
            ? 'h-15 border-border/80 bg-bg/80 backdrop-blur-xl backdrop-saturate-150'
            : 'h-18 border-transparent bg-transparent',
        )}
      >
        <div className="shell flex h-full items-center justify-between gap-6">
          <Link
            to={resolveHref('#home')}
            onClick={() => setMenuOpen(false)}
            className="group -m-2 flex items-center gap-3 rounded-sm p-2"
          >
            <Monogram className="text-[1.375rem] transition-colors group-hover:text-brand-light" />
            <span
              className={cn(
                'hidden border-l border-border pl-3 text-[0.8125rem] leading-none text-text-secondary transition-opacity duration-[var(--dur-component)] xl:block',
                scrolled ? 'opacity-0' : 'opacity-100',
              )}
            >
              {site.name}
            </span>
            <span className="sr-only"> — página inicial</span>
          </Link>

          <nav aria-label="Navegação principal" className="hidden md:block">
            <ul className="flex items-center" onPointerLeave={() => setHovered(null)}>
              {site.nav.map((item) => {
                const id = item.href.slice(1)
                const active = isHome && activeId === id
                return (
                  <li key={item.href}>
                    <Link
                      to={resolveHref(item.href)}
                      aria-current={active ? 'location' : undefined}
                      onPointerEnter={() => setHovered(id)}
                      onFocus={() => setHovered(id)}
                      onBlur={() => setHovered(null)}
                      className={cn(
                        'relative flex h-10 items-center gap-2 rounded-sm px-3.5 text-sm transition-colors duration-[var(--dur-hover)]',
                        active || hovered === id ? 'text-text' : 'text-text-secondary',
                      )}
                    >
                      <Deco
                        text={item.index}
                        className={cn(
                          'font-mono text-[0.6875rem] transition-colors duration-[var(--dur-hover)]',
                          active ? 'text-brand-light' : 'text-text-muted',
                        )}
                      />
                      {item.label}
                      {isHome && marked === id && (
                        <motion.span
                          layoutId="nav-indicator"
                          transition={SPRING.indicator}
                          className={cn(
                            'absolute inset-x-3.5 -bottom-px h-px',
                            active ? 'bg-brand' : 'bg-text-muted',
                          )}
                        />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-1 md:flex">
            <SocialIcon href={site.social.github} label="GitHub">
              <GithubIcon size={17} />
            </SocialIcon>
            <SocialIcon href={site.social.linkedin} label="LinkedIn">
              <LinkedinIcon size={17} />
            </SocialIcon>
          </div>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="relative -mr-2 flex size-11 items-center justify-center rounded-full text-text md:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={cn(
                  'absolute left-0 top-0 h-px w-full bg-current transition-transform duration-[var(--dur-micro)] ease-premium',
                  menuOpen && 'translate-y-1.5 rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute bottom-0 right-0 h-px bg-current transition-[transform,width] duration-[var(--dur-micro)] ease-premium',
                  menuOpen ? 'w-full -translate-y-1.5 -rotate-45' : 'w-3/5',
                )}
              />
            </span>
          </button>
        </div>

        {/* Progresso de leitura: só aparece quando a barra já assentou. */}
        <motion.div
          aria-hidden="true"
          className={cn(
            'absolute inset-x-0 -bottom-px h-px origin-left bg-brand/70 transition-opacity duration-[var(--dur-component)]',
            scrolled && !menuOpen ? 'opacity-100' : 'opacity-0',
          )}
          style={{ scaleX: progress }}
        />
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        resolveHref={resolveHref}
        activeId={isHome ? activeId : ''}
        returnFocusRef={toggleRef}
      />
    </>
  )
}

const noSections: string[] = []

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full text-text-secondary transition-colors duration-[var(--dur-hover)] hover:bg-surface hover:text-text"
    >
      {children}
    </a>
  )
}
