# João Tabosa — Portfólio

Portfólio pessoal de João Tabosa, Full-Stack Developer. React + TypeScript + Tailwind CSS v4, com GSAP/ScrollTrigger para a narrativa de scroll, Framer Motion para motion de componente e Lenis para scroll suave no desktop.

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
    atmosphere/   # grão, névoa e luz ambiente
    hero/         # a cena 3D em DOM (SystemStrata)
    layout/       # navbar, menu mobile, footer, ScrollManager
    projects/     # showcase sticky, moldura, passo de texto, índice
    ui/           # primitivos: Button, Picture, Reveal, SectionHeading
  sections/       # seções da home (Hero, Projects, Editorial, About, Skills, Experience, Contact)
  pages/          # páginas roteadas (Home, estudo de caso, 404)
  data/           # dados que alimentam o site (projetos, stack, experiência, site)
  hooks/          # useGsap, useMediaQuery, useCursorLabel, usePointerScene, useMagnetic…
  lib/            # motion.ts (tokens de timing/easing), scroll.ts (Lenis + ScrollTrigger), utils
  types/          # tipos compartilhados
public/
  fonts/          # Instrument Sans, Geist e Geist Mono (variáveis, subset latin, auto-hospedadas)
  projects/       # screenshots dos projetos (+ variantes -720/-1200/-1800 em AVIF e WebP)
  editorial/      # imagem da pausa editorial (+ variantes -960/-1600/-2400)
```

## Sistema de motion

Timings e curvas vivem em um lugar só: `src/lib/motion.ts` (JS) e os tokens em `src/index.css` (CSS).

| Escala      | Duração | Uso                                   |
| ----------- | ------- | ------------------------------------- |
| `micro`     | 150ms   | hover, foco, setas                    |
| `component` | 280ms   | menus, indicador da navbar, botões    |
| `reveal`    | 600ms   | entrada de texto e blocos             |
| `editorial` | 1000ms  | headlines, transições de mídia, câmera |
| `ambient`   | 28s+    | névoa, luz, ponto da arquitetura      |

- **GSAP + ScrollTrigger**: timeline de entrada do hero, saída por scroll, transições do showcase, câmera da imagem editorial, montagem da stack. No hero, a cena 3D (`SystemStrata`) tem ambiente próprio (flutuação dos planos e um pulso de requisição que percorre as guias) e interação com o ponteiro (a pilha abre, cada plano tem parallax próprio e o plano em foco sobe com legenda; no toque, um tap foca). Tudo dentro de `gsap.context` via `useGsap`, com `gsap.matchMedia` para desktop/mobile e `prefers-reduced-motion`.
- **Framer Motion**: reveals em viewport (`RevealLines`, `FadeIn`), indicador da navbar (`layoutId`), menu mobile.
- **Lenis**: só com ponteiro fino e sem `prefers-reduced-motion`; âncoras passam por `ScrollManager`.
- **Abertura** (`src/components/intro/Intro.tsx` + `src/lib/intro.ts`): a cena do hero se monta em 3D (CSS, sem WebGL) enquanto a câmera orbita, e no desktop voa para o lugar exato dela no hero. ~2,8 s, pulável (clique, Esc ou botão), uma vez por sessão, só na home sem hash, nunca com reduced motion ou economia de dados. `?intro` na URL força a reprodução.

## Adicionando um novo projeto

Edite `src/data/projects.ts` e adicione um novo objeto ao array `projects`, seguindo o tipo `Project` em `src/types/project.ts`. Com `showcase: true` o projeto entra no showcase principal (com `brief` e `highlight`); sem isso, vai para o índice "Outros projetos". A página de estudo de caso (`/projetos/:slug`) é gerada automaticamente.

Coloque a screenshot em `public/projects/<slug>.jpg` (2560×1600) e rode `scripts/optimize-images.sh` para gerar as variantes responsivas.

## Pendências para substituir

- `src/data/projects.ts`: link `github` do Debrief (antigo Liquid Journal) quando o repositório sair do modo privado.
