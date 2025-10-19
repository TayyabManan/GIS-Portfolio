import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About - GIS Analyst & Full Stack Developer',
  description: 'Meet Tayyab Manan, a professional GIS Analyst and Full Stack Developer with 4 years of experience in Python, React, QGIS, and ArcGIS. Specializing in spatial analysis, web mapping, environmental monitoring, and geospatial web development. Learn about my background, skills, and passion for solving geographic challenges.',
  keywords: [
    'about Tayyab Manan',
    'GIS analyst profile',
    'geospatial developer',
    'spatial analysis expert',
    'web mapping specialist',
    'GIS background',
    'Python developer',
    'React GIS developer',
    'environmental GIS',
    'urban planning GIS'
  ],
  openGraph: {
    title: 'About Tayyab Manan - GIS Analyst & Full Stack Developer',
    description: 'Professional GIS Analyst and Full Stack Developer specializing in spatial analysis, web mapping, and geospatial solutions. 4 years of experience building innovative GIS applications.',
    url: 'https://tayyabmanan.vercel.app/about',
    type: 'profile',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - GIS Analyst and Full Stack Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Tayyab Manan - GIS Analyst & Developer',
    description: 'GIS Analyst and Full Stack Developer with expertise in spatial analysis, web mapping, and modern geospatial technologies.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/about',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}