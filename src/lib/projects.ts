export interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  category: string
  techStack: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  date: string
}

// Temporary static data - will be replaced with API fetch
export const projects: Project[] = []

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}