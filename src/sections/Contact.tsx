import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/ui/BrandIcons'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'

const links = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, icon: Mail },
  { label: 'LinkedIn', value: 'Ver perfil', href: site.social.linkedin, icon: LinkedinIcon },
  { label: 'GitHub', value: 'Ver perfil', href: site.social.github, icon: GithubIcon },
]

export function Contact() {
  return (
    <section id="contato" className="relative border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent-light">Contato</span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Vamos construir algo?
          </h2>
          <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
            Sempre aberto a novas conversas sobre produto e engenharia. Se você tem um projeto, uma vaga ou só quer
            trocar uma ideia, ficarei feliz em conversar.
          </p>

          <div className="mt-10 flex justify-center">
            <Button href={`mailto:${site.email}`} size="lg" icon={<ArrowUpRight size={18} />}>
              Enviar email
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-20 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {links.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors duration-300 hover:border-accent-light/40"
            >
              <Icon size={18} className="text-accent-light" />
              <div>
                <p className="text-sm font-medium text-text">{label}</p>
                <p className="mt-0.5 truncate text-xs text-text-secondary">{value}</p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
