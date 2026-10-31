import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { site } from '@/data/site'
import { DUR, EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  resolveHref: (href: string) => string
  activeId: string
  /** Botão que abriu o menu: faz parte do ciclo de foco e recebe o foco ao fechar. */
  returnFocusRef: RefObject<HTMLButtonElement | null>
}

const panel: Variants = {
  closed: { clipPath: 'inset(0% 0% 100% 0%)' },
  open: { clipPath: 'inset(0% 0% 0% 0%)' },
}

const line: Variants = {
  closed: { y: '110%' },
  open: (i: number) => ({ y: '0%', transition: { duration: DUR.component, ease: EASE.premium, delay: 0.12 + i * 0.05 } }),
}

const FOCUSABLE = 'a[href], button:not([disabled])'

/**
 * Menu mobile: uma folha que desce de cima (clip-path), com os itens em
 * tipografia display revelados por máscara, um a um. Esc fecha, o foco fica
 * preso entre o botão do header e os links, e o scroll da página trava.
 */
export function MobileMenu({ open, onClose, resolveHref, activeId, returnFocusRef }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const toggle = returnFocusRef.current
    const root = document.documentElement
    root.style.overflow = 'hidden'

    const focusFirst = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    }, 80)

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return
      const items = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el): el is HTMLElement => el !== null,
      )
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      window.clearTimeout(focusFirst)
      document.removeEventListener('keydown', handleKey)
      root.style.overflow = ''
      toggle?.focus({ preventScroll: true })
    }
  }, [open, onClose, returnFocusRef])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
          variants={panel}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ duration: DUR.component, ease: EASE.premium }}
          className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-bg pt-15 md:hidden"
        >
          <nav aria-label="Navegação principal" className="shell flex-1 pt-8">
            <ul>
              {site.nav.map((item, index) => {
                const active = activeId === item.href.slice(1)
                return (
                  <li key={item.href} className="border-b border-border">
                    <Link
                      to={resolveHref(item.href)}
                      onClick={onClose}
                      aria-current={active ? 'location' : undefined}
                      className="group flex items-baseline gap-4 overflow-hidden py-4"
                    >
                      <motion.span custom={index} variants={line} className="flex items-baseline gap-4">
                        <span aria-hidden="true" className="w-6 font-mono text-xs text-text-secondary">
                          {item.index}
                        </span>
                        <span
                          className={cn(
                            'display text-[2.5rem] transition-colors',
                            active ? 'text-brand-light' : 'text-text group-active:text-brand-light',
                          )}
                        >
                          {item.label}
                        </span>
                      </motion.span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4, duration: DUR.component } }}
            exit={{ opacity: 0, transition: { duration: DUR.hover } }}
            className="shell space-y-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-10"
          >
            <AvailabilityBadge label={site.status} />
            <a href={`mailto:${site.email}`} className="block break-all text-lg text-text">
              {site.email}
            </a>
            <div className="flex gap-6 text-sm text-text-secondary">
              <a href={site.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
              </a>
              <a href={site.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                GitHub <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
