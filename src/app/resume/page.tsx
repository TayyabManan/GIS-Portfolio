import { Metadata } from 'next'
import ResumePageContent from './ResumePageContent'

export const metadata: Metadata = {
  title: 'Resume - Tayyab Manan | AI Engineering Student',
  description: 'AI Engineering graduate student resume - Building ML systems with PyTorch, TensorFlow & LangChain. Expertise in Computer Vision, NLP, and Geospatial AI. Currently pursuing MS in AI Engineering at COMSATS. Seeking Summer 2026 internships.',
  keywords: [
    'AI engineering student resume',
    'machine learning student CV',
    'AI graduate student resume',
    'computer vision student resume',
    'PyTorch student CV',
    'TensorFlow student resume',
    'NLP student CV',
    'ML internship resume',
    'deep learning student',
    'AI engineering COMSATS',
    'ML student Pakistan',
    'Tayyab Manan resume',
    'AI engineering resume'
  ],
  openGraph: {
    title: 'Resume - Tayyab Manan | AI Engineering Student',
    description: 'AI Engineering graduate student building ML systems with PyTorch, TensorFlow, LangChain. Specializing in Computer Vision, NLP & Geospatial AI. MS in AI Engineering at COMSATS. Seeking Summer 2026 internships.',
    url: 'https://tayyabmanan.com/resume',
    type: 'profile',
    images: [
      {
        url: '/images/profile-picture.webp',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - AI Engineering Student Resume',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume - AI Engineering Student | Tayyab Manan',
    description: 'AI Engineering graduate student. Computer Vision, NLP & Geospatial AI. PyTorch, TensorFlow & LangChain. Seeking Summer 2026 internships.',
    images: ['/images/profile-picture.webp'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.com/resume',
  },
}

export default function ResumePage() {
  return <ResumePageContent />
}
