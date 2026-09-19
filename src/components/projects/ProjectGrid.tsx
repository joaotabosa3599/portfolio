import { ProjectCard } from '@/components/projects/ProjectCard'
import type { Project } from '@/types/project'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-x-8 md:gap-y-20">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
