# João Tabosa — Portfólio

Portfólio pessoal de João Tabosa, Full-Stack Developer. React + TypeScript + Tailwind CSS + Framer Motion.

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

## Estrutura

```
src/
  components/   # componentes reutilizáveis (ui, layout, projects)
  sections/     # seções da home (Hero, Projects, About, Skills, Experience, Contact)
  pages/        # páginas roteadas (Home, estudo de caso, 404)
  data/         # dados que alimentam o site (projetos, skills, experiência)
  hooks/        # hooks customizados
  lib/          # utilitários
  types/        # tipos compartilhados
```

## Adicionando um novo projeto

Edite `src/data/projects.ts` e adicione um novo objeto ao array `projects`, seguindo o tipo `Project` em `src/types/project.ts`. O card na listagem e a página de estudo de caso (`/projetos/:slug`) são gerados automaticamente a partir desses dados — nenhum componente precisa ser alterado manualmente.

Cada projeto pode ter uma screenshot real (`image`, servida de `public/projects/`) ou, na ausência dela, um visual abstrato gerado por `visual` em `ProjectVisual.tsx`.

## Pendências para substituir

- `src/data/projects.ts`: links (`live`/`github`) do Liquid Journal quando ele sair do modo privado.
