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
  /** Terse headline metric shown as a mono chip on the card, e.g. "80% accuracy".
      Optional - cards without one render no chip. */
  metric?: string
  /** Which micro-chart doodle sits next to the metric (see MetricSparkline):
      'scatter-fit' | 'bars-up' | 'bars-down' | 'hbars' | 'accuracy' |
      'coverage' | 'roc' | 'line'. Defaults to 'line' when unset. */
  metricChart?: string
}

// Temporary static data - will be replaced with API fetch
export const projects: Project[] = []

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}