import { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact - GIS Analyst & Developer Services',
  description: 'Get in touch with Tayyab Manan for GIS consulting, spatial analysis projects, full-stack web development, and geospatial solutions. Available for remote work, freelance projects, and collaboration opportunities. Expert in QGIS, ArcGIS, Python, React, and modern web mapping technologies.',
  keywords: [
    'contact GIS analyst',
    'hire GIS developer',
    'GIS consulting services',
    'spatial analysis consultant',
    'web mapping developer',
    'freelance GIS developer',
    'geospatial consulting',
    'GIS project inquiry',
    'remote GIS work',
    'full stack developer hire'
  ],
  openGraph: {
    title: 'Contact Tayyab Manan - GIS & Development Services',
    description: 'Reach out for GIS consulting, spatial analysis, and full-stack web development services. Available for remote work and innovative geospatial solutions.',
    url: 'https://tayyabmanan.vercel.app/contact',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Tayyab Manan for GIS Services',
      }
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact - GIS & Development Services',
    description: 'Get in touch for GIS consulting, spatial analysis, and web development services.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/contact',
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}