import { Metadata } from 'next'
import ResumePageContent from './ResumePageContent'

export const metadata: Metadata = {
  title: 'Resume - GIS Analyst & Full Stack Developer',
  description: 'Professional resume of Tayyab Manan - GIS Analyst and Full Stack Developer with 4 years of experience in Python, React, Next.js, QGIS, ArcGIS, spatial analysis, and geospatial web development. Download PDF resume or view interactive online version.',
  keywords: [
    'GIS analyst resume',
    'full stack developer resume',
    'GIS developer CV',
    'geospatial analyst',
    'Python GIS developer',
    'React developer',
    'spatial analysis expert',
    'QGIS specialist',
    'ArcGIS professional',
    'web mapping developer',
    'remote sensing analyst',
    'Tayyab Manan resume'
  ],
  openGraph: {
    title: 'Resume - Tayyab Manan | GIS Analyst & Full Stack Developer',
    description: '4 years of experience building GIS-powered web applications. Expertise in React, Python, QGIS, ArcGIS, spatial analysis, and modern web technologies. View resume and download PDF.',
    url: 'https://tayyabmanan.vercel.app/resume',
    type: 'profile',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - GIS Analyst Resume',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume - Tayyab Manan | GIS Analyst & Full Stack Developer',
    description: '4 years of experience in GIS development, spatial analysis, and full-stack web applications.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/resume',
  },
}

export default function ResumePage() {
  return <ResumePageContent />
}
