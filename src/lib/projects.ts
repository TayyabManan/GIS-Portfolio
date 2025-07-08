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
    slug: 'urbanflow-analytics',
    title: 'UrbanFlow Analytics',
    subtitle: 'Real-time Urban Mobility Intelligence Platform',
    description: 'Advanced web platform combining transit APIs, weather data, and machine learning for predictive urban mobility analysis. The platform processes millions of data points daily to provide actionable insights for city planners and transportation authorities.',
    category: 'Urban Planning',
    techStack: ['React.js', 'Node.js', 'PostGIS', 'Python', 'Machine Learning', 'Docker', 'AWS'],
    image: '/projects/placeholder.svg',
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/your-username/urbanflow',
    featured: true,
    date: '2024-01-15'
  },
  {
    slug: 'geoinsight-platform',
    title: 'GeoInsight Platform',
    subtitle: 'Environmental Monitoring & Analysis System',
    description: 'Comprehensive environmental monitoring platform that integrates satellite imagery, IoT sensors, and weather data to track deforestation, air quality, and climate patterns in real-time.',
    category: 'Environmental Analysis',
    techStack: ['Vue.js', 'FastAPI', 'PostgreSQL', 'GDAL', 'Leaflet', 'TensorFlow'],
    image: '/projects/placeholder.svg',
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/your-username/geoinsight',
    featured: true,
    date: '2023-11-20'
  },
  {
    slug: 'smartcity-dashboard',
    title: 'SmartCity Dashboard',
    subtitle: 'Interactive Urban Infrastructure Visualization',
    description: 'Real-time dashboard for monitoring and managing city infrastructure including traffic flow, energy consumption, waste management, and emergency services with predictive analytics.',
    category: 'Smart Cities',
    techStack: ['Angular', 'Express.js', 'MongoDB', 'D3.js', 'MapboxGL', 'Redis'],
    image: '/projects/placeholder.svg',
    demoUrl: 'https://your-demo-url.com',
    featured: true,
    date: '2023-09-10'
  }
]

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured)
}