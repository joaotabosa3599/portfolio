import { motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { site } from '@/data/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrolled } from '@/hooks/useScrolled'
import { DUR, EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

const sectionIds = site.nav.map((item) => item.href.replace('#', ''))

/**
 * No topo, integrada ao hero (transparente). Depois, vidro moderado.
 * O indicador da seção atual desliza entre os itens (layout animation).
 */
export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled()
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const activeId = useActiveSection(isHome ? sectionIds : [])

  const resolveHref = (href: string) => (isHome ? href : `/${href}`)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,backdrop-filter] duration-500',
          scrolled ? 'border-border bg-bg/75 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-content items-center justify-between px-6 sm:px-8">
          <Link
            to={resolveHref('#home')}
            className="font-mono text-lg font-semibold tracking-tight text-text transition-colors hover:text-accent-light"
            aria-label="Início"
          >
            JT<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
            {site.nav.map((item) => {
              const id = item.href.replace('#', '')
              const active = isHome && activeId === id
              return (
                <Link
                  key={item.href}
                  to={resolveHref(item.href)}
                  aria-current={active ? 'location' : undefined}
                  className={cn(
                    'relative px-3.5 py-2 text-sm font-medium transition-colors',
                    active ? 'text-text' : 'text-text-secondary hover:text-text',
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ duration: DUR.component, ease: EASE.outQuart }}
                      className="absolute inset-x-3.5 -bottom-[1px] h-px bg-accent-light"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-text-secondary transition-colors hover:text-text"
            >
              <GithubIcon size={19} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary transition-colors hover:text-text"
            >
              <LinkedinIcon size={19} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={mobileOpen}
            className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-border-strong hover:text-text md:hidden"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        resolveHref={resolveHref}
        activeId={activeId}
      />
    </>
  )
}
