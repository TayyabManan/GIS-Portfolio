import { Metadata } from 'next'
import ProjectsPageContent from './ProjectsPageContent'

export const metadata: Metadata = {
  title: 'GIS Projects & Portfolio',
  description: 'Explore innovative GIS projects, web mapping applications, and spatial analysis solutions. Full-stack development portfolio featuring React, Python, QGIS, ArcGIS, and modern geospatial technologies for environmental monitoring, urban planning, and data visualization.',
  keywords: [
    'GIS projects',
    'geospatial portfolio',
    'web mapping applications',
    'spatial analysis projects',
    'GIS developer portfolio',
    'React GIS applications',
    'Python GIS projects',
    'environmental monitoring GIS',
    'urban planning analysis',
    'QGIS projects',
    'ArcGIS solutions',
    'full stack GIS developer'
  ],
  openGraph: {
    title: 'GIS Projects & Spatial Analysis Portfolio - Tayyab Manan',
    description: 'Browse cutting-edge GIS projects including groundwater monitoring systems, EV infrastructure planning, and interactive web mapping applications built with React, Python, and modern geospatial technologies.',
    url: 'https://tayyabmanan.vercel.app/projects',
    type: 'website',
    images: [
      {
        url: '/projects/watertrace.png',
        width: 1200,
        height: 630,
        alt: 'GIS Projects Portfolio - WaterTrace Pakistan',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GIS Projects Portfolio - Tayyab Manan',
    description: 'Innovative GIS projects featuring web mapping, spatial analysis, and full-stack development solutions.',
    images: ['/projects/watertrace.png'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/projects',
  },
}

export default function ProjectsPage() {
  return <ProjectsPageContent />
}