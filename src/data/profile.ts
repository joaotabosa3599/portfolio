/**
 * Conteúdo próprio da página /perfil. O resto do currículo vem dos mesmos
 * dados da home (experiência, capacidades, projetos), então as duas nunca
 * divergem. Nada aqui afirma mais do que o portfólio já registra.
 */
export const profile = {
  photo: {
    /** Caminho sem extensão; variantes geradas por scripts/optimize-images.sh. */
    base: '/profile/joao-tabosa',
    widths: [480, 720, 920],
    width: 920,
    height: 1150,
    alt: 'Retrato de João Tabosa de perfil, sorrindo e olhando para a esquerda, de camiseta amarela e crachá.',
  },
  /** Primeiro parágrafo em destaque; os demais em corpo. */
  summary: [
    'Full-Stack Developer e estudante de Engenharia da Computação na UFC. Construo produtos inteiros: da modelagem do schema e das permissões no banco até a última animação da interface.',
    'Comecei pelo front-end. Construir aplicações do zero — banco, autenticação, APIs em tempo real e a interface — me levou ao full-stack de verdade. Hoje, no estágio na RF Group, faço serviços compartilhados pelo grupo inteiro, com a fronteira de acesso decidida no banco.',
    'Em paralelo mantenho o Debrief, um SaaS de diário de trading que uso como laboratório de arquitetura e produto antes de levar as ideias para o trabalho.',
  ],
  /** Princípios de trabalho, no formato de lista curta de currículo. */
  principles: [
    'Schema modelado antes da tela; permissões testadas num Postgres descartável antes do deploy.',
    'Autorização na fronteira, não na interface: RLS, RPCs security definer e webhooks assinados.',
    'Componentes tipados, estado previsível e motion com propósito, acessível por teclado.',
  ],
} as const
