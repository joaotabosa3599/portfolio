import { Clock } from 'lucide-react'
import type { Project } from '@/types/project'
import { cn } from '@/lib/utils'

const accentMap = {
  violet: {
    glow: 'bg-accent/25',
    chip: 'bg-accent/15 text-accent-light',
    bar: 'from-accent/70 to-accent/10',
  },
  cyan: {
    glow: 'bg-accent-cyan/20',
    chip: 'bg-accent-cyan/10 text-accent-cyan',
    bar: 'from-accent-cyan/60 to-accent-cyan/10',
  },
  amber: {
    glow: 'bg-accent-amber/20',
    chip: 'bg-accent-amber/10 text-accent-amber',
    bar: 'from-accent-amber/60 to-accent-amber/10',
  },
  emerald: {
    glow: 'bg-accent-emerald/20',
    chip: 'bg-accent-emerald/10 text-accent-emerald',
    bar: 'from-accent-emerald/60 to-accent-emerald/10',
  },
  sky: {
    glow: 'bg-accent-sky/20',
    chip: 'bg-accent-sky/10 text-accent-sky',
    bar: 'from-accent-sky/60 to-accent-sky/10',
  },
  rose: {
    glow: 'bg-accent-rose/20',
    chip: 'bg-accent-rose/10 text-accent-rose',
    bar: 'from-accent-rose/60 to-accent-rose/10',
  },
} as const

interface ProjectVisualProps {
  project: Project
}

export function ProjectVisual({ project }: ProjectVisualProps) {
  const accent = accentMap[project.accent]

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-bg-secondary">
      <div className={cn('absolute -top-10 right-0 h-40 w-40 rounded-full blur-[70px]', accent.glow)} aria-hidden="true" />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-text-muted/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-text-muted/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-text-muted/30" />
          </div>
          <div className="ml-2 flex-1 truncate rounded-full bg-bg px-3 py-1 font-mono text-[10px] text-text-muted">
            {project.isPlaceholder
              ? 'em-breve.dev'
              : project.links.live
                ? project.links.live.replace(/^https?:\/\//, '')
                : project.inProgress
                  ? 'privado · em desenvolvimento'
                  : `${project.slug}.vercel.app`}
          </div>
        </div>

        {project.image ? (
          <div className="relative flex-1 overflow-hidden">
            <img
              src={project.image}
              alt={`Captura de tela do projeto ${project.title}`}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>
        ) : (
          <div className="relative flex-1 p-4">
            {project.visual === 'ecommerce' && <EcommercePreview accent={accent} />}
            {project.visual === 'cinema' && <CinemaPreview accent={accent} />}
            {project.visual === 'saas' && <SaasPreview accent={accent} />}
            {project.visual === 'placeholder' && <PlaceholderPreview accent={accent} />}
          </div>
        )}
      </div>
    </div>
  )
}

type Accent = (typeof accentMap)[keyof typeof accentMap]

function EcommercePreview({ accent }: { accent: Accent }) {
  return (
    <div className="grid h-full grid-cols-[minmax(0,56px)_1fr] gap-3 sm:grid-cols-[minmax(0,72px)_1fr]">
      <div className="flex flex-col gap-2">
        <div className={cn('h-6 rounded-md', accent.chip)} />
        <div className="h-5 rounded-md bg-white/5" />
        <div className="h-5 rounded-md bg-white/5" />
        <div className="h-5 rounded-md bg-white/5" />
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-1.5 rounded-lg border border-white/[0.06] bg-card p-1.5">
            <div className={cn('aspect-square rounded bg-gradient-to-br', accent.bar)} />
            <div className="h-1.5 w-4/5 rounded bg-white/10" />
            <div className="h-1.5 w-2/5 rounded bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  )
}

const SELECTED_SEATS = new Set([10, 11, 18, 19])

function CinemaPreview({ accent }: { accent: Accent }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <div className={cn('h-1.5 w-3/5 rounded-full bg-gradient-to-r opacity-80', accent.bar)} />
      <div className="grid grid-cols-8 gap-1.5">
        {Array.from({ length: 32 }).map((_, i) => (
          <span
            key={i}
            className={cn('h-2.5 w-2.5 rounded-[3px]', SELECTED_SEATS.has(i) ? accent.chip : 'bg-white/10')}
          />
        ))}
      </div>
      <div className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] text-text-muted">
        4 poltronas selecionadas
      </div>
    </div>
  )
}

function SaasPreview({ accent }: { accent: Accent }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3">
      <div className="grid grid-cols-3 gap-2">
        {['BRL', 'USD', 'EUR'].map((currency) => (
          <div key={currency} className="rounded-lg border border-white/[0.06] bg-card p-2">
            <p className="font-mono text-[9px] text-text-muted">{currency}</p>
            <div className={cn('mt-1.5 h-1.5 w-4/5 rounded-full', accent.chip)} />
          </div>
        ))}
      </div>

      <div className="flex-1 rounded-lg border border-white/[0.06] bg-card p-3">
        <svg viewBox="0 0 200 70" className="h-full w-full" preserveAspectRatio="none" fill="none">
          <title>Performance ao longo do tempo</title>
          <path
            d="M0 55 L28 40 L56 48 L84 22 L112 30 L140 12 L168 18 L200 4"
            stroke="var(--color-accent-emerald)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0 55 L28 40 L56 48 L84 22 L112 30 L140 12 L168 18 L200 4 L200 70 L0 70 Z"
            fill="var(--color-accent-emerald)"
            fillOpacity="0.08"
          />
        </svg>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-white/5" />
        <div className="h-1.5 flex-1 rounded-full bg-white/5" />
        <div className="h-1.5 w-8 rounded-full bg-white/5" />
      </div>
    </div>
  )
}

function PlaceholderPreview({ accent }: { accent: Accent }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border-strong text-center">
      <div className={cn('flex h-9 w-9 items-center justify-center rounded-full', accent.chip)}>
        <Clock size={16} />
      </div>
      <p className="font-mono text-xs text-text-muted">Estudo de caso em construção</p>
    </div>
  )
}
