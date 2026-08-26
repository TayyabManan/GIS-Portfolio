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
  /** Terse headline metric shown in the mono voice on the card cover,
      e.g. "80% accuracy". Optional - covers without one render no metric. */
  metric?: string
  /** Which notebook chart the card cover draws (see CoverChart):
      'scatter-fit' | 'bars-up' | 'bars-down' | 'hbars' | 'accuracy' |
      'coverage' | 'roc' | 'line'. Defaults to 'line' when unset. */
  metricChart?: string
}

// Temporary static data - will be replaced with API fetch
export const projects: Project[] = []

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}