import { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'
import { contactFaqs, faqPageSchema } from '@/lib/faqs'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch about AI/ML roles or collaboration. Islamabad-based, open to remote work, and I reply within 24 hours.',
  keywords: [
    'contact AI engineer',
    'ML engineer collaboration',
    'AI project collaboration',
    'machine learning engineer contact',
    'geospatial AI engineer',
    'computer vision engineer',
    'AI engineering COMSATS',
    'AI research collaboration'
  ],
  openGraph: {
    title: 'Contact Tayyab Manan - AI/ML Engineer',
    description: 'Reach out for collaboration opportunities or AI/ML project inquiries. Specializing in Computer Vision, Multi-Agent Systems & Geospatial AI.',
    url: 'https://tayyabmanan.com/contact',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Tayyab Manan - AI/ML Engineer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Tayyab Manan - AI/ML Engineer',
    description: 'Get in touch for collaboration opportunities or AI/ML project discussions.',
    images: ['/images/profile-picture.webp'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.com/contact',
  },
}

export default function ContactPage() {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tayyabmanan.com' },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://tayyabmanan.com/contact' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbJsonLd, faqPageSchema(contactFaqs)]) }}
      />
      <ContactPageContent />
    </>
  )
}