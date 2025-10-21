import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About - ML Engineer & AI Developer',
  description: 'ML Engineer with 2 years experience in PyTorch, TensorFlow & LangChain. Specializing in Computer Vision, NLP, MLOps & Geospatial AI. MS in AI Engineering.',
  keywords: [
    'about Tayyab Manan',
    'ML engineer profile',
    'AI developer background',
    'machine learning expert',
    'computer vision specialist',
    'NLP developer',
    'MLOps engineer',
    'Python ML developer',
    'PyTorch developer',
    'geospatial AI'
  ],
  openGraph: {
    title: 'About Tayyab Manan - ML Engineer & AI Developer',
    description: 'ML Engineer specializing in Computer Vision, NLP, and MLOps. 2 years of experience building production AI systems with PyTorch, TensorFlow, and LangChain.',
    url: 'https://tayyabmanan.vercel.app/about',
    type: 'profile',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - ML Engineer and AI Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Tayyab Manan - ML Engineer & AI Developer',
    description: 'ML Engineer with expertise in Computer Vision, NLP, MLOps, and Geospatial AI. Expert in PyTorch, TensorFlow, and LangChain.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/about',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}