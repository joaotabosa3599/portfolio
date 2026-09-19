export interface TimelineItem {
  id: string
  title: string
  description: string
  period: string
  status: 'completed' | 'current' | 'upcoming'
}

export const journeyTimeline: TimelineItem[] = [
  {
    id: 'engenharia',
    title: 'Engenharia da Computação',
    description: 'Formação acadêmica em andamento, com base sólida em lógica, algoritmos e fundamentos de computação.',
    period: 'Em andamento',
    status: 'current',
  },
  {
    id: 'estudos',
    title: 'Estudos de programação',
    description: 'Começou focado em front-end e expandiu para o ecossistema full-stack: bancos de dados, autenticação e APIs.',
    period: 'Contínuo',
    status: 'current',
  },
  {
    id: 'projetos-pessoais',
    title: 'Desenvolvimento de projetos pessoais',
    description: 'Aplicações reais construídas por conta própria, da modelagem do banco à interface final.',
    period: 'Contínuo',
    status: 'current',
  },
  {
    id: 'experiencia-pratica',
    title: 'Experiência prática',
    description: 'Prática constante com React, Next.js, Supabase/PostgreSQL e deploy de aplicações completas.',
    period: 'Contínuo',
    status: 'current',
  },
  {
    id: 'aprendizado-continuo',
    title: 'Sempre aprendendo, sempre melhorando',
    description: 'Aprendizado contínuo de novas tecnologias, boas práticas e arquitetura de software.',
    period: 'Contínuo',
    status: 'current',
  },
]

/**
 * Trajetória profissional. Estrutura pronta para receber futuras
 * experiências reais — basta adicionar novos itens ao array.
 */
export const experienceTimeline: TimelineItem[] = [
  {
    id: 'formacao',
    title: 'Engenharia da Computação',
    description: 'Estudante, com foco em fundamentos de computação, estruturas de dados e desenvolvimento de software.',
    period: 'Em andamento',
    status: 'current',
  },
  {
    id: 'loading-jr',
    title: 'Processo seletivo trainee na Loading Jr',
    description:
      'Desenvolvimento do CineSol Cinema em dupla, com Next.js e TypeScript, cobrindo todo o fluxo de bilheteria a partir de um design definido no Figma.',
    period: '2026',
    status: 'completed',
  },
  {
    id: 'goup-training',
    title: 'GoUp Training pela Loading Jr',
    description:
      'Contribuição no front-end da plataforma da GoUp Training, em equipe com o time da Loading Jr: área do dentista, painel administrativo e site institucional.',
    period: '2026',
    status: 'completed',
  },
  {
    id: 'projetos',
    title: 'Projetos pessoais Full-Stack',
    description:
      'Desenvolvimento contínuo do Liquid Journal, um SaaS financeiro com Next.js, Supabase e PostgreSQL, além de outros projetos com React e e-commerce.',
    period: 'Contínuo',
    status: 'current',
  },
  {
    id: 'estagio-rf-group',
    title: 'Estágio em Desenvolvimento na RF Group',
    description:
      'Estagiário na área de desenvolvimento, contribuindo para o Connect Valley 2026 em produção.',
    period: 'Atual',
    status: 'current',
  },
]
