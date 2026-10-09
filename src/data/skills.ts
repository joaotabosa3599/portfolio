export interface StackLayer {
  id: string
  index: string
  title: string
  /** Como essa camada é tratada nos projetos — a regra, não a ferramenta. */
  principle: string
  tech: string[]
}

export interface StackSupport {
  title: string
  tech: string[]
}

/**
 * A arquitetura que se repete em cada projeto, de cima para baixo.
 * Só tecnologias realmente usadas nos projetos do portfólio.
 */
export const stackLayers: StackLayer[] = [
  {
    id: 'interface',
    index: '03',
    title: 'Interface',
    principle: 'Componentes tipados, estado previsível e motion com propósito. Acessível por teclado, responsiva por padrão.',
    tech: ['React', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'HTML · CSS · JavaScript'],
  },
  {
    id: 'fronteira',
    index: '02',
    title: 'Fronteira',
    principle:
      'Autorização decidida no banco, não na tela: RLS, RPCs security definer, API keys com digest e webhooks assinados.',
    tech: ['Supabase Auth', 'Row Level Security', 'RPCs security definer', 'APIs REST', 'HMAC-SHA256', 'Node.js'],
  },
  {
    id: 'dados',
    index: '01',
    title: 'Dados',
    principle: 'Schema modelado antes da tela. Permissões testadas num Postgres descartável antes de qualquer deploy.',
    tech: ['PostgreSQL', 'Supabase', 'Migrações', 'Schemas isolados', 'Estruturas de dados'],
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
