export interface ExperienceWork {
  label: string
  /** Slug de um projeto do portfólio, quando houver estudo de caso. */
  slug?: string
}

export interface ExperienceEntry {
  id: string
  /** Período em texto, exibido em escala grande. Sem datas inventadas. */
  period: string
  org: string
  role: string
  summary: string
  work?: ExperienceWork[]
  stack?: string[]
  status: 'current' | 'completed'
}

/**
 * Trajetória, da mais recente para a mais antiga. Cada entrada traz o que foi
 * construído e com quê — é isso que diferencia uma trajetória de uma lista.
 */
export const experience: ExperienceEntry[] = [
  {
    id: 'rf-group',
    period: 'Atual',
    org: 'RF Group',
    role: 'Estágio em Desenvolvimento',
    summary:
      'Serviços compartilhados pelo grupo inteiro, com a fronteira de acesso decidida no banco: schemas isolados, RPCs security definer, RLS e webhooks assinados. Do schema ao app nativo.',
    work: [
      { label: 'Connect Valley 2026', slug: 'connect-valley' },
      { label: 'Mapa DISC', slug: 'mapa-disc' },
      { label: 'Central de Chamados RFG', slug: 'central-chamados' },
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS', 'Capacitor', 'Vitest'],
    status: 'current',
  },
  {
    id: 'loading-jr',
    period: '2026',
    org: 'Loading Jr',
    role: 'Trainee · Front-end',
    summary:
      'Processo seletivo com o CineSol Cinema, em dupla e a partir de um design no Figma. Depois, o front-end da GoUp Training em equipe: área do dentista, painel administrativo e site institucional.',
    work: [
      { label: 'GoUp Training', slug: 'goup-training' },
      { label: 'CineSol Cinema', slug: 'cinesol-cinema' },
    ],
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Playwright'],
    status: 'completed',
  },
  {
    id: 'debrief',
    period: 'Contínuo',
    org: 'Projeto pessoal',
    role: 'Debrief',
    summary:
      'SaaS de diário financeiro para traders, do banco com RLS à interface. É o laboratório onde testo arquitetura e produto antes de levar para o trabalho.',
    work: [{ label: 'Debrief', slug: 'debrief' }],
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'React Three Fiber', 'Recharts'],
    status: 'current',
  },
  {
    id: 'ufc',
    period: 'Em andamento',
    org: 'UFC',
    role: 'Engenharia da Computação',
    summary: 'Fundamentos de computação, estruturas de dados e arquitetura de software — a base de tudo acima.',
    status: 'current',
  },
]
