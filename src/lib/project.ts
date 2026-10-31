import { projects } from '@/data/projects'
import type { Project } from '@/types/project'

/** Domínio exibido na barra da moldura — o real, quando há deploy público. */
export function projectDomain(project: Project) {
  if (project.links.live) return project.links.live.replace(/^https?:\/\//, '').replace(/\/$/, '')
  return 'privado · em desenvolvimento'
}

/** Status a partir dos dados: nada é afirmado além do que o projeto registra. */
export function projectStatus(project: Project) {
  if (project.inProgress && project.links.live) return { label: 'No ar · em desenvolvimento', live: true }
  if (project.inProgress) return { label: 'Em desenvolvimento', live: false }
  if (project.links.live) return { label: 'No ar', live: true }
  return { label: 'Concluído', live: false }
}

export function projectMeta(project: Project) {
  return [project.category, project.kindLabel].filter(Boolean).join(' · ')
}

export function pad(value: number) {
  return String(value).padStart(2, '0')
}

export function findProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
