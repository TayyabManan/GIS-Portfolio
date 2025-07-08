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

export const projects: Project[] = [
  {
    slug: 'ev-analysis',
    title: 'EV Suitability Analysis',
    subtitle: 'Spatial Analysis of Electric Vehicle Infrastructure',
    description: 'Analyze EV infrastructure distribution and accessibility patterns across geographic regions.',
    category: 'Suitability Analysis',
    techStack: ['Python', 'QGIS', 'ArcGIS', 'Open Street Map', 'Demographic Data'],
    image: '/projects/image.png',
    demoUrl: 'https://ev-analysis.netlify.app/',
    githubUrl: 'https://github.com/TayyabManan/ev-suitability-analysis',
    featured: true,
    date: '2024-11-20'
  }
]

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}