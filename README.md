# João Tabosa — Portfólio

Portfólio pessoal de João Tabosa, Full-Stack Developer. React 19 + TypeScript + Tailwind CSS v4, com Framer Motion para entradas, reveals e animações ligadas ao scroll, e CSS puro para hover e loops ambientes. Sem WebGL e sem scroll suavizado por JS.

## Rodando localmente

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção (roda type-check + Vite build)
- `npm run lint` — lint com oxlint
- `npm run preview` — preview local do build de produção
- `scripts/optimize-images.sh` — gera variantes AVIF/WebP responsivas das imagens (requer ImageMagick com AVIF/WebP)

## Estrutura

```
src/
  components/
    atmosphere/   # grão, guias do grid editorial, a pilha montada do contato
    hero/         # ArchitectureSculpture (três planos em CSS 3D) e as camadas
    layout/       # navbar, menu mobile, footer, ScrollManager
    projects/     # ProjectFeature (lead · split · compact), moldura, índice
    stack/        # diagramas técnicos das capacidades
    ui/           # Button, Reveal, SectionHeading, Picture, Deco, Monogram…
  sections/       # Hero, Projects, About, Capabilities, Experience, Contact
  pages/          # Home, estudo de caso (lazy), 404 (lazy)
  data/           # projetos, capacidades, experiência, site
  hooks/          # scrollspy, spotlight, magnético, cursor contextual, ponteiro
  lib/            # motion.ts (tokens de motion), scroll.ts, project.ts, utils
public/
  fonts/          # Space Grotesk, Geist e IBM Plex Mono (subset latin, auto-hospedadas)
  projects/       # screenshots (+ variantes -720/-1200/-1800 em AVIF e WebP)
```

## Design system

Tokens em `src/index.css`: os nomes do sistema (`--background-primary`, `--brand-primary`…) em `:root` e os mesmos valores como utilitários curtos do Tailwind (`bg-bg`, `text-brand-light`, `border-border`…).

- **Tipografia**: Space Grotesk (display), Geist (corpo e interface), IBM Plex Mono (índices e metadados). Escala em `--text-hero`, `--text-section`, `--text-project`, `--text-subtitle`.
- **Grid**: `shell` (container de 1320px) e `grid-editorial` (4 → 8 → 12 colunas).
- **Contraste**: `text-muted` (#747582, 4,4:1) só em texto decorativo, desenhado por pseudo-elemento via `<Deco>`; metadado informativo usa `text-secondary`. O CTA usa `brand-solid` (#7F55E2), o violeta aprofundado que deixa o texto branco em 4,9:1.

## Sistema de motion

Timings e curvas em `src/lib/motion.ts` (Framer) e nos tokens `--ease-*` / `--dur-*` (CSS).

| Escala  | Duração | Uso                                 |
| ------- | ------- | ----------------------------------- |
| `hover` | 200ms   | cor, sublinhado, setas              |
| `micro` | 280ms   | botões, microinterações             |
| `component` | 500ms | menu, indicador, estados          |
| `reveal` | 700ms  | blocos de conteúdo                  |
| `title` | 850ms   | headlines (máscara por linha)       |

Curvas: `premium` `cubic-bezier(0.22, 1, 0.36, 1)`, `ui` `cubic-bezier(0.4, 0, 0.2, 1)` e molas em `SPRING` para profundidade.

- **Hero**: entrada orquestrada em ~1,8s (`HERO_SEQUENCE`) e a escultura de arquitetura — três planos (dados, aplicação, experiência) com conteúdo real do Mapa DISC, inclinação pelo ponteiro, parallax por plano, flutuação e pulsos de requisição em CSS. A distância entre planos é a custom property registrada `--gap`, então abrir a pilha é uma transição de CSS. Os loops pausam fora da tela.
- **Performance**: o hero renderiza primeiro; a escultura e as seções abaixo da dobra montam em transições do React (render fatiado, sem tarefa longa).
- **Acessibilidade**: `MotionConfig reducedMotion="user"`, CSS zera animações com `prefers-reduced-motion`, menu mobile com foco preso e Esc, skip link, scrollspy com `aria-current`.

## Adicionando um novo projeto

Edite `src/data/projects.ts` e adicione um novo objeto ao array `projects`, seguindo o tipo `Project` em `src/types/project.ts`. Com `showcase: true` o projeto entra na galeria principal (com `brief` e `highlight`, que vira a ficha "Decisão"); o primeiro vira o destaque e, com cinco ou mais, os dois últimos formam o par compacto. Sem `showcase`, vai para o índice "Outros projetos". A página de estudo de caso (`/projetos/:slug`) é gerada automaticamente.

Coloque a screenshot em `public/projects/<slug>.jpg` (2560×1600) e rode `scripts/optimize-images.sh` para gerar as variantes responsivas.

## Pendências para substituir

- `src/data/projects.ts`: link `github` do Debrief (antigo Liquid Journal) quando o repositório sair do modo privado.
