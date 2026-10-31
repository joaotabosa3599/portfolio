import { ArrowUp, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { Deco } from '@/components/ui/Deco'
import { Monogram } from '@/components/ui/Monogram'
import { site } from '@/data/site'
import { scrollTo } from '@/lib/scroll'

/**
 * Footer como colofão: monograma, navegação, contato e o crédito técnico.
 * O "voltar ao topo" é um botão de verdade (rola até o início).
 */
export function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-bg">
      <div className="shell grid-editorial gap-y-12 pb-10 pt-16 sm:pt-20">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <Monogram className="text-5xl sm:text-6xl" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-text-secondary">
            {site.name} — {site.role}. Produtos inteiros, do banco de dados à interface.
          </p>
        </div>

        <nav aria-label="Rodapé" className="col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-7">
          <h2 className="label text-text-secondary">Índice</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  to={isHome ? item.href : `/${item.href}`}
                  className="group inline-flex items-baseline gap-3 text-text-secondary transition-colors hover:text-text"
                >
                  <Deco text={item.index} className="font-mono text-[0.6875rem] text-text-muted" />
                  <span className="link-draw">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 md:col-span-3 lg:col-span-3">
          <h2 className="label text-text-secondary">Contato</h2>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="link-draw text-text-secondary transition-colors hover:text-text">
                Email
              </a>
            </li>
            <li>
              <ExternalLink href={site.social.linkedin}>LinkedIn</ExternalLink>
            </li>
            <li>
              <ExternalLink href={site.social.github}>GitHub</ExternalLink>
            </li>
          </ul>
        </div>

        <div className="col-span-4 flex flex-col-reverse gap-6 border-t border-border pt-6 md:col-span-8 sm:flex-row sm:items-center sm:justify-between lg:col-span-12">
          <p className="font-mono text-xs text-text-secondary">
            © {year} {site.name} · Desenhado e construído por mim · React, TypeScript, Framer Motion
          </p>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            className="group inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.08em] text-text-secondary transition-colors hover:text-text sm:self-auto"
          >
            Voltar ao topo
            <ArrowUp size={14} aria-hidden="true" className="transition-transform duration-[var(--dur-hover)] group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-text"
    >
      <span className="link-draw">{children}</span>
      <ArrowUpRight size={13} aria-hidden="true" className="arrow-diag" />
    </a>
  )
}
