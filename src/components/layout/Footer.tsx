import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-sm font-semibold text-text">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-text-secondary">{site.role}</p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-text-secondary transition-colors hover:text-text"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={site.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-text-secondary transition-colors hover:text-text"
          >
            <LinkedinIcon size={18} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className="text-text-secondary transition-colors hover:text-text">
            <Mail size={18} />
          </a>
        </div>

        <p className="font-mono text-xs text-text-muted">Desenhado e construído por mim · React · TypeScript · GSAP</p>
      </div>
    </footer>
  )
}
