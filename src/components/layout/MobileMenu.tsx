import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { site } from '@/data/site'
import { DUR, EASE } from '@/lib/motion'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  resolveHref: (href: string) => string
  activeId: string
}

export function MobileMenu({ open, onClose, resolveHref, activeId }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.component }}
          className="fixed inset-0 z-50 bg-bg/95 backdrop-blur-md md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          <div className="flex items-center justify-between px-6 py-5">
            <span className="font-mono text-sm text-text-secondary">Menu</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar menu"
              className="rounded-full border border-border p-2 text-text-secondary transition-colors hover:border-accent-light hover:text-text"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-6 pt-6">
            {site.nav.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.05, duration: DUR.reveal * 0.6, ease: EASE.outExpo }}
              >
                <Link
                  to={resolveHref(item.href)}
                  onClick={onClose}
                  className={`block border-b border-border py-4 text-2xl font-medium tracking-tight transition-colors ${
                    activeId === item.href.replace('#', '') ? 'text-accent-light' : 'text-text hover:text-accent-light'
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="mt-8 flex items-center gap-4 px-6">
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-border p-3 text-text-secondary transition-colors hover:border-accent-light hover:text-text"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-3 text-text-secondary transition-colors hover:border-accent-light hover:text-text"
            >
              <LinkedinIcon size={18} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
