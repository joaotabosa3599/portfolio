export type ProjectCategory = 'E-commerce' | 'Web App' | 'SaaS' | 'Landing Page' | 'Ferramenta' | 'Jogo'

export interface ProjectLinks {
  github?: string
  live?: string
}

export interface CaseStudy {
  overview: string
  problem: string
  process: string
  solution: string
  technologies: string[]
  challenges: string
  result: string
  gallerySteps: string[]
}

/** Resumo compacto para o showcase: três linhas que fazem o projeto parecer trabalho real. */
export interface ProjectBrief {
  problem: string
  contribution: string
  result: string
}

/** Fragmento de interface real (HTML/CSS) que acompanha a screenshot no showcase. */
export interface ProjectHighlight {
  label: string
  lines: string[]
}

export interface Project {
  id: string
  slug: string
  /** Slugs antigos que ainda podem estar em links por aí; redirecionam para `slug`. */
  previousSlugs?: string[]
  title: string
  tagline: string
  category: ProjectCategory
  featured: boolean
  isPlaceholder: boolean
  tech: string[]
  links: ProjectLinks
  accent: 'violet' | 'cyan' | 'amber' | 'emerald' | 'sky' | 'rose'
  /** Usado como fallback visual quando não há `image`. */
  visual?: 'ecommerce' | 'cinema' | 'saas' | 'placeholder'
  /** Screenshot real do projeto (caminho em /public). Tem prioridade sobre `visual`. */
  image?: string
  /** Nota de colaboração, quando o projeto foi construído com outra pessoa. */
  collaboration?: string
  /** Projeto corporativo/de terceiros em que atuo como desenvolvedor, não um projeto pessoal. */
  kind?: 'corporate'
  /** Como me descrevo dentro de um projeto corporativo (ex.: "Desenvolvedor Full-Stack no time"). */
  role?: string
  /** Projeto real e com case study, mas ainda sem repositório público ou deploy. */
  inProgress?: boolean
  /** Entra no showcase principal da home (os demais vão para o índice). */
  showcase?: boolean
  /** Rótulo curto do tipo de trabalho, exibido junto da categoria. */
  kindLabel?: string
  brief?: ProjectBrief
  highlight?: ProjectHighlight
  caseStudy?: CaseStudy
}
