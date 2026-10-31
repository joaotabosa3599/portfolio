export interface Capability {
  id: 'data' | 'application' | 'interface'
  index: string
  /** Nome técnico da camada, em mono. */
  layer: string
  title: string
  /** Como essa camada é tratada nos projetos — a regra, não a ferramenta. */
  principle: string
  tech: string[]
  /** Projetos do portfólio em que a capacidade aparece de fato (slugs). */
  evidence: string[]
}

export interface StackSupport {
  title: string
  tech: string[]
}

/**
 * Capacidades, na mesma ordem das camadas da escultura do hero (01 → 03).
 * Só tecnologias usadas nos projetos do portfólio; a prova de cada grupo são
 * os projetos listados em `evidence`, não uma porcentagem.
 */
export const capabilities: Capability[] = [
  {
    id: 'data',
    index: '01',
    layer: 'Data & Infrastructure',
    title: 'Dados e infraestrutura',
    principle:
      'Schema modelado antes da tela. Permissões decididas no banco e testadas num Postgres descartável antes de qualquer deploy.',
    tech: ['PostgreSQL', 'Supabase', 'Row Level Security', 'Schemas isolados', 'Migrações', 'Vercel'],
    evidence: ['mapa-disc', 'central-chamados', 'connect-valley', 'debrief'],
  },
  {
    id: 'application',
    index: '02',
    layer: 'Application Development',
    title: 'Lógica e integração',
    principle:
      'Autorização na fronteira, não na tela: RPCs security definer, API keys com digest, webhooks assinados e sincronização entre sistemas.',
    tech: ['TypeScript', 'Node.js', 'APIs REST', 'Supabase Auth', 'RPCs security definer', 'HMAC-SHA256', 'Zustand'],
    evidence: ['mapa-disc', 'connect-valley', 'central-chamados', 'constela-orion'],
  },
  {
    id: 'interface',
    index: '03',
    layer: 'Interface Engineering',
    title: 'Interface e experiência',
    principle:
      'Componentes tipados, estado previsível e motion com propósito. Acessível por teclado e responsiva por padrão.',
    tech: ['React', 'Next.js (App Router)', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js', 'Canvas 2D'],
    evidence: ['debrief', 'constela-orion', 'site-loading', 'cinesol-cinema'],
  },
]

export const stackSupport: StackSupport[] = [
  {
    title: 'Qualidade',
    tech: ['Vitest', 'Testing Library', 'Playwright (E2E)', 'Testes de permissão em Postgres local'],
  },
  {
    title: 'Entrega',
    tech: ['Git · GitHub', 'Vercel', 'Capacitor (iOS/Android)', 'PWA'],
  },
]
