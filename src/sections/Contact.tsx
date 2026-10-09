import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { FadeIn, RevealLines } from '@/components/ui/Reveal'
import { site } from '@/data/site'

/**
 * Encerramento: tipografia grande, uma luz ambiente que nasce de baixo e o
 * email como o único gesto. Copiar é a interação; o resto fica parado.
 */
export function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden pb-20 pt-28 sm:pb-28 sm:pt-40">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* A luz final vem do horizonte da página, não de trás de um título. */}
        <div
          className="breathe absolute bottom-[-46vw] left-1/2 h-[70vw] w-[120vw] max-w-[1600px] rounded-[50%]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(127,90,245,0.22), rgba(127,90,245,0.09) 40%, rgba(127,90,245,0.02) 70%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-content px-6 sm:px-8">
        <FadeIn className="flex items-center gap-3">
          <span className="label text-text-muted">05</span>
          <span className="label text-accent-light">Contato</span>
        </FadeIn>

        <RevealLines
          lines={['Tem algo que vale', 'a pena construir?']}
          className="display mt-6 max-w-5xl text-[2.25rem] text-text sm:text-6xl lg:text-[5.5rem]"
        />

        <FadeIn delay={0.2}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            Vaga, estágio, freelance ou só uma conversa sobre produto e engenharia. O email está aberto — e eu respondo.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} className="mt-12 sm:mt-16">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-5">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex min-w-0 items-center gap-2 font-display text-[1.375rem] font-medium tracking-tight text-text sm:gap-3 sm:text-3xl lg:text-4xl"
            >
              <span className="link-draw break-all">{site.email}</span>
              <ArrowUpRight className="arrow-shift-diag h-5 w-5 shrink-0 text-text-secondary sm:h-7 sm:w-7" />
            </a>
            <CopyEmail email={site.email} />
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <SocialLink href={site.social.linkedin} label="LinkedIn" icon={<LinkedinIcon size={15} />} />
            <SocialLink href={site.social.github} label="GitHub" icon={<GithubIcon size={15} />} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timeout = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch {
      // Sem clipboard (contexto inseguro): o mailto ao lado continua funcionando.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-full border border-border-strong px-4 py-2 text-xs font-medium text-text-secondary transition-[border-color,color,background-color] hover:border-text/40 hover:text-text"
    >
      {copied ? <Check size={13} className="text-accent-emerald" /> : <Copy size={13} />}
      {copied ? 'Copiado' : 'Copiar email'}
    </button>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text"
    >
      <span className="text-text-muted transition-colors group-hover:text-accent-light">{icon}</span>
      <span className="link-draw">{label}</span>
      <ArrowUpRight size={13} className="arrow-shift-diag text-text-muted" />
    </a>
  )
}
