import { Metadata } from 'next'
import ContactPageContent from './ContactPageContent'

export const metadata: Metadata = {
  title: 'Contact - AI Engineering Student',
  description: 'Get in touch with AI Engineering student for collaboration opportunities, internship inquiries, or project discussions. Specializing in Computer Vision, NLP & Geospatial AI with PyTorch and TensorFlow.',
  keywords: [
    'contact AI engineering student',
    'ML internship inquiry',
    'AI student collaboration',
    'machine learning student contact',
    'AI project collaboration',
    'ML student Pakistan',
    'geospatial AI student',
    'computer vision student',
    'AI engineering COMSATS',
    'ML student projects',
    'AI research collaboration'
  ],
  openGraph: {
    title: 'Contact Tayyab Manan - AI Engineering Student',
    description: 'Reach out for collaboration opportunities, internship discussions, or AI/ML project inquiries. AI Engineering graduate student at COMSATS specializing in Computer Vision, NLP & Geospatial AI.',
    url: 'https://tayyabmanan.com/contact',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.webp',
        width: 1200,
        height: 630,
        alt: 'Contact Tayyab Manan - AI Engineering Student',
      }
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Contact - AI Engineering Student',
    description: 'Get in touch for collaboration opportunities, internship inquiries, or AI/ML project discussions.',
    images: ['/images/profile-picture.webp'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.com/contact',
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}