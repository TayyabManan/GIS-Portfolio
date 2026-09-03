import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'
import { aboutFaqs, faqPageSchema } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'About',
  description: 'AI/ML Engineer in Computer Vision, NLP & Geospatial AI. From a GIS degree to an MS in AI Engineering at COMSATS; Junior AI Developer at Cointegration.',
  keywords: [
    'about Tayyab Manan',
    'AI ML engineer',
    'machine learning engineer',
    'computer vision engineer',
    'Python ML developer',
    'PyTorch developer',
    'geospatial AI engineer',
    'multi-agent systems'
  ],
  openGraph: {
    title: 'About Tayyab Manan - AI/ML Engineer',
    description: 'From a GIS degree to production ML: computer vision, multi-agent systems, and geospatial AI. MS in AI Engineering at COMSATS; AI Developer at Cointegration.',
    url: 'https://tayyabmanan.com/about',
    type: 'profile',
    images: [
      {
        url: '/images/profile-picture.webp',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - AI/ML Engineer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Tayyab Manan - AI/ML Engineer',
    description: 'From a GIS degree to production ML. MS in AI Engineering at COMSATS; AI Developer at Cointegration.',
    images: ['/images/profile-picture.webp'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.com/about',
  },
}

export default function AboutPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tayyabmanan.com' },
      { '@type': 'ListItem', position: 2, name: 'About', item: 'https://tayyabmanan.com/about' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, faqPageSchema(aboutFaqs)]) }}
      />
      <AboutPageContent />
    </>
  )
}