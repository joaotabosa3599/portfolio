import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import { AssembledStack } from '@/components/atmosphere/AssembledStack'
import { GridGuides } from '@/components/atmosphere/GridGuides'
import { AvailabilityBadge } from '@/components/ui/AvailabilityBadge'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Button } from '@/components/ui/Button'
import { FadeIn, RevealLines } from '@/components/ui/Reveal'
import { SectionMarker } from '@/components/ui/SectionHeading'
import { site } from '@/data/site'
import { useMagnetic } from '@/hooks/useMagnetic'
import { cn } from '@/lib/utils'

/**
 * Encerramento editorial: a maior tipografia da página depois do hero, um
 * único gesto principal (email) e a escultura do início agora montada. A luz
 * do horizonte sobe um pouco quando o CTA está em foco — `:has()` no CSS
 * (`.contact-light`), sem JS.
 */
export function Contact() {
  const magneticRef = useMagnetic<HTMLSpanElement>()

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="section-y relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <GridGuides className="hidden opacity-70 lg:block" />
        <div
          className="contact-light absolute bottom-[-38vw] left-1/2 h-[64vw] w-[120vw] max-w-[1700px] -translate-x-1/2 rounded-[50%] opacity-70 transition-opacity duration-[var(--dur-component)] ease-ui"
          style={{ background: 'radial-gradient(closest-side, rgb(139 92 246 / 0.16), rgb(48 35 69 / 0.35) 45%, transparent)' }}
        />
      </div>

      <div className="shell">
        <SectionMarker index="05" label="Contato" />

        <RevealLines
          as="h2"
          id="contato-title"
          lines={['Uma boa ideia merece', <>uma execução <span className="text-brand-light">à altura.</span></>]}
          className="display mt-12 text-[clamp(2.75rem,7vw,6.5rem)] text-text sm:mt-16"
          lineClassName={(i) => (i === 1 ? 'lg:pl-[8.333%]' : undefined)}
        />

        <div className="grid-editorial mt-14 gap-y-14 sm:mt-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <FadeIn>
              <AvailabilityBadge label={site.status} />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
                Vaga, estágio, freelance ou uma conversa sobre produto e engenharia. O email é o caminho mais curto — e
                eu respondo.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
              <span ref={magneticRef} className="inline-block" data-cta>
                <Button href={`mailto:${site.email}`} size="lg" icon={<ArrowUpRight size={17} strokeWidth={1.75} />}>
                  Enviar email
                </Button>
              </span>
              <CopyEmail email={site.email} />
            </FadeIn>

            <FadeIn delay={0.16}>
              <dl className="mt-12 grid max-w-lg grid-cols-1 border-t border-border sm:grid-cols-[7rem_minmax(0,1fr)]">
                <ContactRow term="Email">
                  <a href={`mailto:${site.email}`} className="link-draw break-all text-text">
                    {site.email}
                  </a>
                </ContactRow>
                <ContactRow term="LinkedIn">
                  <SocialLink href={site.social.linkedin} icon={<LinkedinIcon size={14} />}>
                    /in/joaotabosa
                  </SocialLink>
                </ContactRow>
                <ContactRow term="GitHub">
                  <SocialLink href={site.social.github} icon={<GithubIcon size={14} />}>
                    /joaotabosa3599
                  </SocialLink>
                </ContactRow>
              </dl>
            </FadeIn>
          </div>

          <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-7 lg:-mt-6">
            <AssembledStack />
            <FadeIn delay={0.3} as="p" className="-mt-2 text-center font-mono text-xs text-text-secondary">
              01 + 02 + 03 <span aria-hidden="true">→</span> produto inteiro
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="contents">
      <dt className="pt-4 font-mono text-xs text-text-secondary sm:border-b sm:border-border sm:py-4">{term}</dt>
      <dd className="border-b border-border pb-4 pt-1.5 text-[0.9375rem] sm:py-3.5">{children}</dd>
    </div>
  )
}

function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const timeout = window.setTimeout(() => setState('idle'), 2200)
    return () => window.clearTimeout(timeout)
  }, [state])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setState('copied')
    } catch {
      // Sem clipboard (contexto inseguro): o mailto ao lado continua funcionando.
      setState('error')
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        'group inline-flex h-13 items-center gap-2.5 rounded-full border px-5 text-sm transition-[color,border-color,background-color] duration-[var(--dur-micro)] active:scale-[0.98]',
        state === 'copied'
          ? 'border-success/40 text-text'
          : 'border-border-strong text-text-secondary hover:border-text-muted hover:bg-surface-elevated hover:text-text',
      )}
    >
      {state === 'copied' ? (
        <Check size={15} aria-hidden="true" className="text-success" />
      ) : (
        <Copy size={15} aria-hidden="true" />
      )}
      <span aria-live="polite">
        {state === 'copied' ? 'Email copiado' : state === 'error' ? 'Não foi possível copiar' : 'Copiar email'}
      </span>
    </button>
  )
}

function SocialLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-text">
      <span className="text-text-secondary transition-colors group-hover:text-brand-light">{icon}</span>
      <span className="link-draw">{children}</span>
      <ArrowUpRight size={13} aria-hidden="true" className="arrow-diag text-text-secondary" />
    </a>
  )
}
