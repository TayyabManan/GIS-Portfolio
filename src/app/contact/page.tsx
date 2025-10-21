import { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact - ML Engineer & AI Developer Services',
  description: 'Contact ML Engineer for AI development, MLOps & Geospatial AI services. Available for remote work. Expert in PyTorch, TensorFlow, Computer Vision & NLP.',
  keywords: [
    'contact ML engineer',
    'hire AI developer',
    'ML consulting services',
    'machine learning consultant',
    'AI development services',
    'freelance ML engineer',
    'geospatial AI consulting',
    'MLOps services',
    'remote ML work',
    'AI developer hire',
    'predictive analytics consultant',
    'computer vision developer'
  ],
  openGraph: {
    title: 'Contact Tayyab Manan - ML & AI Development Services',
    description: 'Reach out for machine learning consulting, AI development, geospatial AI, and MLOps services. Available for remote work and innovative ML/AI solutions.',
    url: 'https://tayyabmanan.vercel.app/contact',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Tayyab Manan for ML & AI Services',
      }
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact - ML & AI Development Services',
    description: 'Get in touch for machine learning consulting, AI development, and geospatial AI services.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/contact',
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}