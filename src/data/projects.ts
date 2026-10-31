import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: 'debrief',
    showcase: true,
    kindLabel: 'Projeto pessoal',
    brief: {
      problem: 'Traders controlam operações em planilhas manuais, sem visão de performance em tempo real.',
      contribution:
        'Ponta a ponta: modelagem no Postgres com RLS desde o schema, auth, cotações em tempo real (BRL/USD/EUR), dashboards e exportação em PDF.',
      result: 'No ar e em desenvolvimento ativo — o maior projeto pessoal até agora.',
    },
    highlight: {
      label: 'fluxo',
      lines: ['registrar o trade → métricas na hora', 'BRL · USD · EUR em tempo real', 'relatório → PDF'],
    },
    slug: 'debrief',
    previousSlugs: ['liquid-journal'],
    title: 'Debrief',
    tagline: 'SaaS de diário de trading: registro rápido das operações, métricas de performance calculadas na hora e feedback de IA sobre o histórico.',
    category: 'SaaS',
    featured: true,
    isPlaceholder: false,
    inProgress: true,
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Three.js'],
    links: {
      live: 'https://liquid-journal-trading-app.vercel.app/',
    },
    accent: 'emerald',
    visual: 'saas',
    image: '/projects/debrief.jpg',
    caseStudy: {
      overview:
        'Debrief (antes Liquid Journal) é um diário financeiro para traders: o registro de cada operação leva segundos, com a calculadora fechando o resultado, e as métricas de performance saem na hora, no lugar das planilhas manuais que a maioria dos traders ainda usa para controlar resultados.',
      problem:
        'Traders costumam controlar suas operações em planilhas manuais, propensas a erro e sem visão em tempo real de performance ou consistência. O objetivo era tirar o trabalho braçal desse controle, da modelagem do banco à última tela do produto.',
      process:
        'O desenvolvimento começou pela modelagem do banco relacional no Supabase/PostgreSQL, pensada para suportar alto volume de operações com Row Level Security desde a base. A partir daí entraram a autenticação, o consumo de APIs de cotação em tempo real para suporte multi-moeda (BRL/USD/EUR) e as camadas de visualização de métricas.',
      solution:
        'A aplicação, em Next.js e TypeScript, cobre o registro de operações com calculadora e câmbio, dashboards de performance com ECharts e calendário de PNL, feedback de IA sobre o histórico com a API do Claude, monitoramento dos trades em andamento com aviso por push, exportação em PDF e CSV, componentes construídos com Radix UI e shadcn, uma cena 3D com React Three Fiber e GSAP na página inicial e suporte a português e inglês.',
      technologies: [
        'Next.js',
        'TypeScript',
        'Supabase (Auth + PostgreSQL)',
        'Row Level Security',
        'Tailwind CSS',
        'Radix UI',
        'Framer Motion',
        'React Three Fiber',
        'GSAP',
        'ECharts',
        'Claude API',
        'Web Push',
        'jsPDF',
        'Vitest',
      ],
      challenges:
        'Modelar um banco relacional que suportasse alto volume de operações com segurança por linha (RLS) desde o schema, e sincronizar cotações de câmbio em tempo real para o suporte multi-moeda sem comprometer a performance da interface.',
      result:
        'Já está no ar e é meu maior projeto pessoal até agora: autenticação, modelagem de dados robusta e uma interface pensada do banco à tela final, com o desenvolvimento seguindo ativo.',
      gallerySteps: [
        'Registro de operações',
        'Dashboard de performance',
        'Suporte multi-moeda em tempo real',
        'Exportação de relatórios em PDF',
      ],
    },
  },
  {
    id: 'constela-orion',
    showcase: true,
    kindLabel: 'Projeto pessoal',
    brief: {
      problem:
        'Estudar para concurso se espalha entre planilhas, PDFs de edital e apps de flashcard soltos, sem motivo para voltar no dia seguinte.',
      contribution:
        'Ponta a ponta: produto, pixel art, motor de partículas em Canvas, flashcards com FSRS e sincronização local-first com o Supabase.',
      result: 'Em desenvolvimento, com 293 testes automatizados e domínio próprio chegando em breve.',
    },
    highlight: {
      label: 'local-first',
      lines: ['estuda offline → grava no aparelho', 'entra na conta → sincroniza em segundo plano', 'FSRS-6 agenda a próxima revisão'],
    },
    slug: 'constela-orion',
    title: 'Constela & Órion',
    tagline: 'Plataforma de estudos gamificada em pixel art, com dois universos trocáveis e tudo funcionando sem internet.',
    category: 'Web App',
    featured: true,
    isPlaceholder: false,
    inProgress: true,
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Zustand', 'Tailwind CSS', 'Canvas 2D'],
    links: {},
    accent: 'rose',
    image: '/projects/constela-orion.jpg',
    caseStudy: {
      overview:
        'Constela & Órion é uma plataforma de estudos gamificada em pixel art para concursos públicos: agenda semanal, edital com o progresso de cada assunto, quizzes com explicação, simulados no tempo da prova e flashcards com repetição espaçada. São dois universos trocáveis, Constela (rosa, com a abelhinha) e Órion (escuro, com o axolote Ori), cada um com mascote, paleta e céu animado próprios.',
      problem:
        'Quem estuda para concurso costuma dividir o plano entre planilhas, PDFs de edital e apps de flashcard soltos, sem visão do que já foi visto e sem motivo para voltar no dia seguinte. O objetivo era juntar tudo num lugar só e transformar a constância em jogo, sem punir o dia perdido.',
      process:
        'Comecei pelo modelo de dados local: cada tela lê e grava no aparelho, com Zustand e IndexedDB, para o app funcionar sem internet desde o primeiro acesso. Em cima disso veio um motor de sincronização próprio com o Supabase (Postgres com RLS), que roda em segundo plano quando há conta e nunca mistura dados de contas diferentes. A identidade visual nasceu junto: sprites em pixel art definidos em código, temas trocados por CSS e um motor de partículas em Canvas 2D para o céu de cada universo.',
      solution:
        'O app cobre agenda com arrastar e soltar, edital com progresso por assunto, banco de questões com quizzes e simulados cronometrados, flashcards agendados pelo FSRS-6, XP, conquistas e um feedback de desempenho gerado pelo Gemini. A abertura é uma intro de jogo com efeitos sonoros sintetizados em Web Audio, e trilhas chiptune de licença livre tocam em loop, com opção de desligar nas configurações.',
      technologies: [
        'Next.js 16 (App Router, Cache Components)',
        'React 19',
        'TypeScript',
        'Tailwind CSS 4',
        'Zustand + IndexedDB',
        'Supabase (Auth + PostgreSQL, RLS)',
        'FSRS-6',
        'Canvas 2D',
        'Web Audio API',
        'Gemini',
        'Vitest',
      ],
      challenges:
        'Sincronizar dados que nascem offline sem perder nada nem misturar contas, e manter o app leve apesar das animações: troquei as bibliotecas de animação e de gráfico por CSS e SVG próprios e passei a carregar o Supabase, os formulários e as telas secundárias sob demanda, o que cortou de 35% a 61% do JavaScript de cada tela.',
      result:
        'Os dois universos estão completos, com 293 testes automatizados e JavaScript inicial entre 210 e 275 KB por tela. Os próximos passos são o domínio próprio e, depois, levar o app também para o ENEM.',
      gallerySteps: [
        'Intro de jogo e escolha do universo',
        'Agenda e edital com o progresso de cada assunto',
        'Quizzes, simulados e flashcards com FSRS',
        'Sincronização local-first com a conta',
      ],
    },
  },
  {
    id: 'connect-valley',
    showcase: true,
    kindLabel: 'RF Group',
    brief: {
      problem:
        'Site, credenciamento, patrocínio, networking e operação interna numa única plataforma — com o mesmo login servindo quatro públicos.',
      contribution:
        'Full-Stack no time: App Router + Supabase (Postgres multi-schema, Auth e RLS decidindo no banco), apps iOS/Android via Capacitor, PWA e crons de sincronização.',
      result: 'Cobre o evento de ponta a ponta, com centenas de testes automatizados; segue em desenvolvimento ativo.',
    },
    highlight: {
      label: 'um login, quatro públicos',
      lines: ['participante · patrocinador · operação · site', 'RLS decide, no banco, o que cada um vê'],
    },
    slug: 'connect-valley',
    title: 'Connect Valley 2026',
    tagline: 'Plataforma completa para o evento Connect Valley 2026: site público, app do participante, portal do patrocinador e painel de operação.',
    category: 'Web App',
    featured: false,
    isPlaceholder: false,
    inProgress: true,
    kind: 'corporate',
    role: 'Estagiário de Desenvolvimento na RF Group',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Capacitor', 'Tailwind CSS'],
    links: {
      live: 'https://connect-valley-app.vercel.app/',
    },
    accent: 'sky',
    image: '/projects/connect-valley.jpg',
    caseStudy: {
      overview:
        'Connect Valley 2026 é uma plataforma de evento com quatro frentes no mesmo código: site público, app do participante, portal do patrocinador e um painel de operação interno, com apps nativos iOS/Android, PWA instalável e a mesma identidade de login para todos os públicos.',
      problem:
        'O evento precisava unificar site público, credenciamento, gestão de patrocinadores, networking e operação interna em uma única plataforma, com o mesmo login servindo públicos completamente diferentes e sincronização automática com as ferramentas externas de ingressos e operação.',
      process:
        'Atuo como desenvolvedor Full-Stack no time, no App Router do Next.js integrado ao Supabase: Postgres com múltiplos schemas, Auth e RLS decidindo, no próprio banco, o que cada público enxerga. A base é empacotada como app nativo iOS/Android via Capacitor e também como PWA instalável, com cron jobs sincronizando ingressos da Doity e operação via Notion.',
      solution:
        'A plataforma cobre site público com venda de patrocínio em autoatendimento, um app de participante completo (agenda, networking, ranking com gamificação, ingresso digital por QR, check-in de sessão), um portal do patrocinador (gestão de estande, leitura de QR para leads, banco de talentos) e um painel de operação com dezenas de módulos, do credenciamento à esteira comercial em kanban.',
      technologies: [
        'Next.js 14 (App Router)',
        'React 18',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion',
        'Supabase (Postgres multi-schema, Auth, RLS)',
        'Capacitor (iOS/Android)',
        'PWA',
        'Vitest + Testing Library',
        'Integrações com Doity e Notion',
      ],
      challenges:
        'Manter uma identidade única em que o mesmo login serve quatro públicos diferentes, com autorização decidida por RLS no banco em vez de lógica de tela, e sincronizar automaticamente ingressos e operação sem intervenção manual.',
      result:
        'Centenas de testes automatizados, apps nativos via Capacitor, PWA instalável e integrações automáticas de ingressos e operação: a plataforma já cobre o Connect Valley 2026 do início ao fim e segue em desenvolvimento ativo.',
      gallerySteps: [
        'Site público e patrocínio em autoatendimento',
        'App do participante (agenda, networking, ingresso QR)',
        'Portal do patrocinador',
        'Painel de operação',
      ],
    },
  },
  {
    id: 'mapa-disc',
    showcase: true,
    kindLabel: 'RF Group',
    brief: {
      problem: 'Três sistemas do grupo precisavam da mesma avaliação comportamental sem triplicar questionário e cálculo.',
      contribution:
        'Desenhei o serviço como bounded context: schema isolado, acesso só por RPC, API keys, webhook assinado (HMAC) à prova de replay. Decisão registrada em ADR.',
      result: 'Em produção com dois consumidores (Atlas RH e Connect Valley), provado de ponta a ponta.',
    },
    highlight: {
      label: 'contrato',
      lines: ['emit → /teste/<token>', 'webhook · HMAC-SHA256 · ±300s · dedupe', 'resposta 200 · resultado disponível'],
    },
    slug: 'mapa-disc',
    title: 'Mapa DISC',
    tagline:
      'Serviço central de inventários comportamentais do grupo: aplica o teste, calcula o perfil e entrega o resultado a vários sistemas consumidores via API e webhook assinado.',
    category: 'Web App',
    featured: false,
    isPlaceholder: false,
    kind: 'corporate',
    role: 'Estagiário de Desenvolvimento na RF Group',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Webhooks', 'HMAC'],
    links: {
      live: 'https://mapa-disc.vercel.app',
    },
    accent: 'violet',
    image: '/projects/mapa-disc.jpg',
    caseStudy: {
      overview:
        'O Mapa DISC aplica inventários comportamentais (DISC, motivadores de Spranger e forças), calcula o perfil de cada pessoa e devolve o resultado tanto a quem respondeu quanto ao sistema que pediu a avaliação. Não é um módulo de um app só: é uma capacidade compartilhada do grupo, hoje atendendo Atlas RH e Connect Valley.',
      problem:
        'Cada sistema do grupo precisava de avaliação comportamental, e replicar o questionário e o cálculo em cada um levaria a três versões divergentes da mesma regra. O desafio era expor isso como um serviço único, sem que o DISC precisasse conhecer o vocabulário de nenhum consumidor nem ser reescrito a cada novo sistema plugado.',
      process:
        'Desenhei o DISC como um bounded context fechado: todo o dado e o cálculo moram em um schema próprio no Postgres, sem nenhum GRANT de tabela para fora — acesso direto responde 42501, por desenho. Os consumidores falam apenas por RPCs, e a identidade externa viaja opaca (uma referência como pessoa:<uuid>), então o serviço nunca passa a conhecer o domínio de quem o chama. A decisão de arquitetura (hub-and-spoke, DISC como provider) está registrada em ADR no repositório.',
      solution:
        'Cada avaliação nasce de uma emissão server-to-server autenticada por API key e gera um link único (/teste/<token>) com validade de 1 a 90 dias. A pessoa responde sem login — o token é a única credencial e o banco guarda apenas o hash. Na conclusão, o servidor apura os scores em escala 0–100 por dimensão, devolve a leitura do próprio estilo ao respondente e o mapa com fit ao cargo ao operador, e dispara um webhook assinado para o sistema de origem puxar o resultado.',
      technologies: [
        'Next.js',
        'TypeScript',
        'Supabase (Postgres + Vault)',
        'Schema isolado com acesso só por RPC',
        'API keys com digest SHA-256',
        'Webhook assinado (HMAC-SHA256)',
        'Dedupe por evento, backoff e dead-letter',
        'Vercel',
      ],
      challenges:
        'Fechar a fronteira do contexto sem travar a integração: nenhum consumidor lê tabela do DISC, então todo o contrato (emissão, leitura, conclusão) precisou caber em RPCs versionadas e em um webhook à prova de replay — assinatura HMAC sobre timestamp e corpo, janela de ±300s, dedupe por evento e retentativa com backoff e dead-letter. E manter a página do respondente aberta sem login com o token como única credencial, armazenando apenas o hash.',
      result:
        'Em produção e operacional, com dois consumidores integrados: Atlas RH e Connect Valley, este último provado de ponta a ponta (emissão → resposta → webhook 200 → leitura). A ponte é fina e padronizada o bastante para plugar o CRM e futuros consumidores sem reescrita.',
      gallerySteps: [
        'Emissão do convite com link e token',
        'Teste respondido sem login',
        'Cálculo do perfil e fit ao cargo',
        'Webhook assinado para o sistema de origem',
      ],
    },
  },
  {
    id: 'central-chamados',
    showcase: true,
    kindLabel: 'RF Group',
    brief: {
      problem: 'Abrir um chamado tinha que levar menos de um minuto, sem login, e ainda gerar prazo, rastreio e indicadores.',
      contribution:
        'React + Vite sem framework de UI; regras de negócio em funções puras com 47 testes; superfície pública inteira em funções security definer — anon não lê tabela nenhuma.',
      result: 'Em produção no grupo, integrado ao Atlas Hub, com a fila do time em tempo real.',
    },
    highlight: {
      label: 'chamado',
      lines: ['protocolo · urgência alta', 'dois prazos congelados na abertura', 'anon → 0 tabelas legíveis'],
    },
    slug: 'central-chamados',
    title: 'Central de Chamados RFG',
    tagline:
      'Sistema interno de chamados do R. Feitosa Group: abertura sem login, prazos por urgência, painel do time e indicadores, acionável de dentro de qualquer sistema do grupo.',
    category: 'Web App',
    featured: false,
    isPlaceholder: false,
    kind: 'corporate',
    role: 'Estagiário de Desenvolvimento na RF Group',
    tech: ['React', 'TypeScript', 'Vite', 'Supabase', 'PostgreSQL', 'Vitest'],
    links: {
      live: 'https://chamado-jdc5.vercel.app',
    },
    accent: 'cyan',
    image: '/projects/central-chamados.jpg',
    caseStudy: {
      overview:
        'A Central de Chamados é o canal interno de suporte do R. Feitosa Group: qualquer colaborador abre um chamado quando um sistema ou equipamento dá problema, e o time de desenvolvimento e suporte assume e resolve com prazos acordados e indicadores de atendimento.',
      problem:
        'Abrir um chamado precisava ser imediato — sem login, sem cadastro, em menos de um minuto — e ao mesmo tempo gerar registro rastreável, prazo acordado e indicadores para o time. Além disso, o chamado precisava poder nascer de dentro de qualquer sistema do grupo, já sabendo quem é a pessoa e de onde ela veio.',
      process:
        'Construí em React 18 com Vite e TypeScript, sem framework de UI: CSS próprio com tema claro/escuro. Toda a regra de negócio vive em funções puras cobertas por testes (prazos, ordenação da fila, indicadores, validação de anexos, leitura do token de convite), e as permissões do banco são testadas em um Postgres descartável antes de qualquer envio. No Supabase, nenhuma tabela é legível por quem não está logado: a superfície pública inteira são funções security definer.',
      solution:
        'Sem login, o colaborador escolhe setor e nome, aponta onde está o problema, descreve, anexa até três prints e define a urgência — e recebe um protocolo com os dois prazos já congelados. A aba Acompanhar consulta pelo protocolo e devolve situação, responsável e prazos, nunca a descrição. O time tem painel com fila ordenada pelo prazo que está correndo, ações de assumir, resolver e reabrir, marcação de atrasados e percentual no prazo, além de uma tela de indicadores por técnico, sistema e setor. Um botão "Abrir chamado" instalado no Atlas Hub emite um token que já traz nome, setor e sistema de origem preenchidos.',
      technologies: [
        'React 18',
        'TypeScript',
        'Vite',
        'Supabase (Postgres, Auth, Storage, Realtime)',
        'RPCs security definer + RLS',
        'Storage privado com link assinado',
        'Vitest (47 testes)',
        'Testes de permissão em Postgres local',
        'Vercel',
      ],
      challenges:
        'Deixar a porta aberta sem deixar o banco exposto: como qualquer pessoa abre chamado sem autenticar, anon não lê tabela nenhuma — tudo passa por funções com limite de abertura por pessoa e no total, prints vão para um bucket privado e a consulta por protocolo nunca devolve a descrição. Os prazos, calculados por gatilho a partir da urgência e do grupo responsável, ficam congelados na abertura para que o indicador seja auditável depois.',
      result:
        'Em produção atendendo o grupo, com o botão de abertura já integrado ao Atlas Hub e a fila do time rodando sobre atualizações em tempo real. As regras críticas — prazos, ordenação da fila e indicadores — são cobertas por 47 testes automatizados, e as permissões do banco têm sua própria suíte.',
      gallerySteps: [
        'Abertura em menos de um minuto, sem login',
        'Protocolo e prazos por urgência',
        'Painel do time com fila e SLA',
        'Indicadores por técnico, sistema e setor',
      ],
    },
  },
  {
    id: 'site-loading',
    showcase: true,
    kindLabel: 'Redesign · Loading Jr',
    brief: {
      problem:
        'O site da empresa júnior tinha cara de template: ilustrações genéricas, muito espaço vazio e nenhuma página para os projetos que o time entrega.',
      contribution:
        'Redesign e desenvolvimento do site inteiro: identidade nova a partir do Figma da marca, intro em GSAP, cenas 3D geradas por código, portfólio com uma página por projeto, time, 404 e cursor próprios.',
      result: 'Pronto e no ar em prévia, aguardando a aprovação final para ir para o domínio oficial.',
    },
    highlight: {
      label: '3D com plano B',
      lines: ['WebGL2 por hardware → cena 3D', 'sem GPU → desenho em CSS', 'reduzir movimento → intro pulada'],
    },
    slug: 'site-loading',
    title: 'Site da Loading Jr',
    tagline: 'Redesign completo do site da empresa júnior de desenvolvimento da UFC em Sobral: identidade nova, intro animada e cenas 3D geradas por código.',
    category: 'Landing Page',
    featured: false,
    isPlaceholder: false,
    inProgress: true,
    kind: 'corporate',
    role: 'Desenvolvedor do redesign na Loading Jr',
    tech: ['Next.js', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind CSS', 'Playwright'],
    links: {
      live: 'https://site-loading-nextjs-eight.vercel.app',
    },
    accent: 'violet',
    image: '/projects/site-loading.jpg',
    caseStudy: {
      overview:
        'A Loading Desenvolvimento Jr. é a empresa júnior de desenvolvimento da UFC em Sobral, que faz sites, sistemas e aplicativos para micro e pequenas empresas. O redesign refez o site de ponta a ponta: home com intro animada e cenas 3D, portfólio com uma página para cada projeto, página do time, Sobre, Links e uma 404 própria.',
      problem:
        'O site antigo tinha grandes áreas brancas sem propósito, ilustrações de template, títulos sem personalidade e serviços apresentados em blocos de texto. O roxo da marca aparecia sem um sistema por trás, e os projetos entregues pelo time não tinham onde ser mostrados.',
      process:
        'Comecei pela direção: os tokens de cor e a tipografia do arquivo de rebranding no Figma, um diagnóstico do site antigo e regras que não podiam ser quebradas, como não inventar clientes, números ou cases. O desenvolvimento foi feito com um agente de IA (Claude Code) executando esse briefing, com cada etapa verificada por build, testes de ponta a ponta e screenshots em várias larguras. Os dados do portfólio vieram dos repositórios reais dos clientes.',
      solution:
        'O site tem uma intro em GSAP em que a barra de carregamento vira o logo, cenas 3D em Three.js e React Three Fiber feitas inteiramente por código (símbolos em texto 3D e o anel do logo extrudado do vetor da marca), transições entre páginas com a View Transitions API, um cursor neon próprio e uma 404 em que o carregamento trava em 40,4%. Aparelhos sem GPU recebem um desenho em CSS no lugar do 3D.',
      technologies: [
        'Next.js 16 (App Router)',
        'React 19',
        'TypeScript',
        'Tailwind CSS 4',
        'Three.js + React Three Fiber',
        'GSAP',
        'View Transitions API',
        'Playwright (E2E)',
        'Claude Code',
      ],
      challenges:
        'Manter o 3D e as animações sem pesar no celular. As cenas montam uma por vez, só perto da tela, e liberam o WebGL quando ficam longe; com isso o bloqueio da thread principal no carregamento da home caiu de ~650 para ~340 ms num Pixel 7 simulado, sem mudar o visual. Depois, uma auditoria de 300 a 2560 px deixou todas as páginas sem estouro horizontal, inclusive no celular deitado.',
      result:
        'O site está pronto, com 41 testes de ponta a ponta no computador e no celular, e no ar em prévia enquanto aguarda a aprovação final para substituir a versão atual no domínio oficial.',
      gallerySteps: [
        'Intro animada e banner com 3D',
        'Serviços, processo e diferenciais',
        'Portfólio com uma página por projeto',
        'Time, Sobre, Links e 404',
      ],
    },
  },
  {
    id: 'goup-training',
    showcase: true,
    kindLabel: 'Front-end em equipe · Loading Jr',
    brief: {
      problem:
        'Unir numa única plataforma frentes bem diferentes — cursos e pós-graduação, área do dentista, painel administrativo, planejamento e aluguel — sem perder consistência visual e de navegação.',
      contribution:
        'Front-end em equipe com o time da Loading Jr: área do dentista (autenticação, pacientes, pedidos), painel administrativo e páginas institucionais, em Next.js App Router, integrando com a API feita por outra parte do time.',
      result:
        'Em produção: site, área do dentista e painel administrativo no ar para a primeira pós-graduação em Odontologia de Sobral e região.',
    },
    highlight: {
      label: 'frentes',
      lines: ['site · área do dentista · painel admin', 'E2E: Postgres descartável → migrações → login e CRUDs'],
    },
    slug: 'goup-training',
    title: 'GoUp Training',
    tagline: 'Ecossistema multi-vertical de educação continuada, mentoria e gestão clínica em odontologia.',
    category: 'Web App',
    featured: false,
    isPlaceholder: false,
    kind: 'corporate',
    collaboration: 'Contribuí apenas no front-end, em equipe com o time da Loading Jr.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Playwright'],
    links: {
      live: 'https://gouptraining.com.br',
    },
    accent: 'rose',
    image: '/projects/goup-training.jpg',
    caseStudy: {
      overview:
        'GoUp Training é a primeira instituição de pós-graduação em Odontologia de Sobral e região, com um ecossistema que vai além dos cursos: mentoria 1:1, atendimento clínico, planejamento cirúrgico guiado, aluguel de equipamentos e uma rede de parceiros.',
      problem:
        'O desafio era unir, em uma única plataforma, frentes bem diferentes: cursos e pós-graduação, a área do dentista (login, pacientes, pedidos), um painel administrativo completo e módulos de planejamento e aluguel, mantendo consistência visual e de navegação entre todas elas.',
      process:
        'Atuei apenas no front-end, em equipe com o time da Loading Jr, construindo a área do dentista (autenticação, cadastro de pacientes, gestão de pedidos), o painel administrativo e páginas do site institucional, em Next.js com o App Router.',
      solution:
        'A plataforma cobre o site institucional multi-vertical, autenticação e área do dentista com gestão de pacientes e pedidos, um painel administrativo, e módulos de planejamento e catálogo de aluguel de equipamentos. Tudo isso coberto por uma suíte de testes end-to-end que sobe um Postgres descartável, aplica migrações e testa login e CRUDs pelo navegador.',
      technologies: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Lucide Icons', 'Playwright (E2E)'],
      challenges:
        'Manter consistência de UI e navegação entre frentes tão diferentes (site institucional, área do dentista, painel administrativo), trabalhando em equipe e integrando com uma API desenvolvida por outra parte do time.',
      result:
        'A GoUp Training, primeira pós-graduação em Odontologia de Sobral e região, já está em produção, com site público, área do dentista e painel administrativo no ar.',
      gallerySteps: [
        'Site institucional multi-vertical',
        'Área do dentista (login e pacientes)',
        'Painel administrativo',
        'Planejamento e aluguel de equipamentos',
      ],
    },
  },
  {
    id: 'ana-bijus',
    kindLabel: 'Avaliação técnica',
    slug: 'ana-bijus',
    title: 'Ana Bijus',
    tagline: 'E-commerce de joias e semijoias com autenticação, carrinho e histórico de pedidos.',
    category: 'E-commerce',
    featured: false,
    isPlaceholder: false,
    tech: ['React', 'React Router', 'LocalStorage', 'Vite', 'Vercel'],
    links: {
      github: 'https://github.com/joaotabosa3599/anabijus-ecommerce',
      live: 'https://anabijus-ecommerce.vercel.app',
    },
    accent: 'violet',
    image: '/projects/ana-bijus.jpg',
    caseStudy: {
      overview:
        'AnaBijus é um e-commerce de joias e semijoias construído em React, simulando uma jornada de compra completa (do catálogo ao checkout) com autenticação, carrinho persistente e histórico de pedidos.',
      problem:
        'O desafio, proposto como avaliação técnica, era construir uma aplicação de e-commerce completa sem back-end real: autenticação de usuários, rotas protegidas, carrinho persistente e um fluxo de compra coerente, mantendo o código pronto para evoluir para uma API de verdade.',
      process:
        'O catálogo parte de um mock de dados (Products.json) consumido de forma abstrata, para que uma API real possa substituí-lo sem reescrever a lógica de consumo. A partir daí, o desenvolvimento seguiu por autenticação com redirecionamento condicional, carrinho em sidebar e uma página de perfil com histórico de pedidos.',
      solution:
        'O resultado é uma SPA em React com React Router, rotas protegidas que redirecionam usuários deslogados para o login e os devolvem à página de interesse original após autenticar, busca global de produtos, carrinho persistente em LocalStorage com cálculo de total em tempo real, e um painel de perfil com histórico de pedidos concluídos.',
      technologies: ['React', 'Vite', 'React Router DOM', 'LocalStorage API', 'Font Awesome', 'CSS3 (Flexbox/Grid)', 'Vercel'],
      challenges:
        'Persistir sessão, carrinho e histórico de pedidos apenas no navegador, sem back-end, exigiu desenhar uma camada de dados coerente em LocalStorage e sincronizar os redirecionamentos de rotas protegidas sem quebrar a experiência do usuário.',
      result:
        'Publicada na Vercel, com fluxo de compra completo (catálogo, carrinho, checkout e histórico de pedidos) e arquitetura pronta para receber uma API real sem retrabalho.',
      gallerySteps: [
        'Login com redirecionamento inteligente',
        'Catálogo com busca global',
        'Carrinho persistente',
        'Checkout',
        'Histórico de pedidos no perfil',
      ],
    },
  },
  {
    id: 'cinesol-cinema',
    kindLabel: 'Em dupla · Loading Jr',
    slug: 'cinesol-cinema',
    title: 'CineSol Cinema',
    tagline: 'Sistema de bilheteria digital com escolha de poltronas, combos e checkout com múltiplos pagamentos.',
    category: 'Web App',
    featured: false,
    isPlaceholder: false,
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Zod'],
    links: {
      github: 'https://github.com/joaotabosa3599/cinesol-cinema',
      live: 'https://cinesol-cinema.vercel.app',
    },
    accent: 'cyan',
    image: '/projects/cinesol-cinema.jpg',
    collaboration: 'Desenvolvido em dupla com Antonio Breno Oliveira Magalhães, como parte do processo seletivo trainee da Loading Jr.',
    caseStudy: {
      overview:
        'CineSol Cinema é uma aplicação de bilheteria digital construída durante o processo seletivo trainee da Loading Jr, simulando um fluxo real de compra de ingressos e itens de bomboniere.',
      problem:
        'O desafio era entregar, em dupla e a partir de um design definido no Figma, uma aplicação Next.js completa e polida: da vitrine de filmes até a confirmação da compra, passando por autenticação, escolha de poltronas e pagamento.',
      process:
        'O trabalho foi dividido por páginas e fluxos dentro do App Router do Next.js: catálogo de filmes, detalhes, escolha de poltronas com modais, seleção de combos, checkout com cartão ou Pix e confirmação com recibo por download ou e-mail, com formulários validados via React Hook Form e Zod.',
      solution:
        'O resultado é uma aplicação Next.js com TypeScript cobrindo o fluxo completo de bilheteria: login/registro, seleção de poltronas, combos, múltiplas formas de pagamento, confirmação de compra e recibo, além de páginas de recompensas e suporte.',
      technologies: ['Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'React Hook Form', 'Zod', 'Lucide React'],
      challenges:
        'Coordenar um fluxo de compra em várias etapas (poltronas, combos, pagamento, confirmação) entre dois desenvolvedores, mantendo consistência visual e de estado ao longo de todas as páginas.',
      result:
        'Uma aplicação publicada na Vercel que reflete um fluxo de compra real de cinema, entregue dentro do processo seletivo trainee da Loading Jr.',
      gallerySteps: [
        'Vitrine de filmes',
        'Escolha de poltronas',
        'Combos de bomboniere',
        'Pagamento (cartão ou Pix)',
        'Confirmação e recibo',
      ],
    },
  },
  {
    id: 'jogo-da-velha',
    kindLabel: 'JavaScript puro',
    slug: 'jogo-da-velha',
    title: 'Jogo da Velha',
    tagline: 'Jogo da velha SPA com lógica de vitória, histórico de jogadas e placar persistente na sessão.',
    category: 'Jogo',
    featured: false,
    isPlaceholder: false,
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    links: {
      github: 'https://github.com/joaotabosa3599/js-jogo-da-velha',
      live: 'https://joaotabosa3599.github.io/js-jogo-da-velha/',
    },
    accent: 'amber',
    image: '/projects/jogo-da-velha.jpg',
    caseStudy: {
      overview:
        'Jogo da velha desenvolvido para fixar lógica de programação e manipulação do DOM com JavaScript puro, sem frameworks.',
      problem:
        'O objetivo era praticar fundamentos (verificação de vitória em uma matriz, controle de estado do jogo e atualização do DOM) sem depender de bibliotecas.',
      process:
        'O tabuleiro foi modelado como uma matriz em JavaScript, com uma função de verificação percorrendo linhas, colunas e diagonais a cada jogada para detectar vitória ou empate.',
      solution:
        'O resultado é uma SPA em JavaScript ES6+ com HTML5 e CSS3 (Flexbox/Grid), incluindo histórico visual das jogadas e placar persistente durante a sessão.',
      technologies: ['JavaScript (ES6+)', 'HTML5', 'CSS3 (Flexbox/Grid)', 'GitHub Pages'],
      challenges:
        'Implementar o algoritmo de verificação de vitória (linhas, colunas e diagonais) de forma limpa e reutilizável, sem duplicar lógica para cada combinação possível.',
      result:
        'Um projeto pequeno, mas completo, publicado no GitHub Pages, que reforçou fundamentos de lógica de programação e manipulação do DOM sem frameworks.',
      gallerySteps: ['Tabuleiro interativo', 'Detecção de vitória/empate', 'Histórico de jogadas', 'Placar da sessão'],
    },
  },
]
