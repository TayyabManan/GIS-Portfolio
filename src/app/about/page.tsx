import { Metadata } from 'next'
import AboutPageContent from './AboutPageContent'

export const metadata: Metadata = {
  title: 'About - AI Engineering Student & ML Developer',
  description: 'AI Engineering graduate student specializing in Computer Vision, NLP, and Geospatial AI. Building ML systems with PyTorch, TensorFlow & LangChain through coursework and projects.',
  keywords: [
    'about Tayyab Manan',
    'AI Engineering student',
    'ML student profile',
    'machine learning student',
    'computer vision student',
    'NLP student',
    'AI graduate student',
    'Python ML developer',
    'PyTorch developer',
    'geospatial AI student'
  ],
  openGraph: {
    title: 'About Tayyab Manan - AI Engineering Student & ML Developer',
    description: 'AI Engineering graduate student specializing in Computer Vision, NLP, and Geospatial AI. Building ML systems through coursework and projects. Seeking Summer 2026 internships.',
    url: 'https://tayyabmanan.com/about',
    type: 'profile',
    images: [
      {
        url: '/images/profile-picture.webp',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - AI Engineering Student and ML Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Tayyab Manan - AI Engineering Student & ML Developer',
    description: 'AI Engineering graduate student with expertise in Computer Vision, NLP, and Geospatial AI. Building ML systems with PyTorch, TensorFlow, and LangChain.',
    images: ['/images/profile-picture.webp'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.com/about',
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}