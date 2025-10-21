import { Metadata } from 'next'
import ResumePageContent from './ResumePageContent'

export const metadata: Metadata = {
  title: 'Resume - ML Engineer & AI Developer | Tayyab Manan',
  description: 'ML Engineer resume - 2+ years building production AI systems with PyTorch, TensorFlow & LangChain. Expertise in Computer Vision, NLP, MLOps, and Geospatial AI. Currently pursuing MS in AI Engineering at COMSATS.',
  keywords: [
    'ML engineer resume',
    'machine learning engineer CV',
    'AI developer resume',
    'computer vision engineer resume',
    'PyTorch developer CV',
    'TensorFlow engineer resume',
    'NLP engineer CV',
    'MLOps engineer resume',
    'deep learning engineer',
    'LangChain developer',
    'ML engineer Pakistan',
    'remote ML engineer resume',
    'Tayyab Manan resume',
    'AI engineering resume'
  ],
  openGraph: {
    title: 'Resume - Tayyab Manan | ML Engineer & AI Developer',
    description: '2+ years building production ML systems. Expert in PyTorch, TensorFlow, LangChain, Computer Vision, NLP & MLOps. MS in AI Engineering student at COMSATS.',
    url: 'https://tayyabmanan.vercel.app/resume',
    type: 'profile',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - ML Engineer Resume',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume - ML Engineer & AI Developer | Tayyab Manan',
    description: '2+ years in ML engineering, Computer Vision, NLP & MLOps. PyTorch, TensorFlow & LangChain expert.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/resume',
  },
}

export default function ResumePage() {
  return <ResumePageContent />
}
