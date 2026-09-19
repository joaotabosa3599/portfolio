export interface SkillCategory {
  title: string
  description: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    description: 'Construção de interfaces e experiências web.',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: 'Back-end & Dados',
    description: 'Modelagem de dados, autenticação e APIs.',
    skills: ['Node.js', 'PostgreSQL', 'Supabase', 'APIs REST', 'Row Level Security'],
  },
  {
    title: 'Ferramentas',
    description: 'Fluxo de trabalho e publicação.',
    skills: ['Git', 'GitHub', 'VS Code', 'Vercel'],
  },
  {
    title: 'Fundamentos',
    description: 'Base sólida para construir produtos de qualidade.',
    skills: ['Estruturas de Dados', 'Responsividade', 'Componentização', 'UI/UX'],
  },
]
