import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Skills from '@/components/sections/Skills'
import CallToAction from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: 'Tayyab Manan - ML Engineer & Computer Vision Specialist',
  description: 'ML Engineer specializing in Computer Vision, NLP, and Geospatial AI. Building production ML systems with PyTorch, TensorFlow, and LangChain. 2+ years deploying AI solutions serving 100+ daily users.',
  keywords: [
    'ML engineer',
    'machine learning engineer',
    'computer vision engineer',
    'AI developer',
    'PyTorch developer',
    'TensorFlow engineer',
    'NLP specialist',
    'geospatial AI',
    'MLOps engineer',
    'ML engineer Pakistan',
    'remote ML engineer',
    'Islamabad AI developer',
    'deep learning engineer',
    'LangChain developer',
    'multi-agent AI systems'
  ],
  openGraph: {
    title: 'Tayyab Manan - ML Engineer | Computer Vision & Geospatial AI',
    description: 'ML Engineer building production AI systems with PyTorch, TensorFlow & LangChain. Specialized in Computer Vision, NLP, MLOps, and Geospatial AI solutions.',
    url: 'https://tayyabmanan.vercel.app',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - ML Engineer & AI Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayyab Manan - ML Engineer | Computer Vision Specialist',
    description: 'Building production ML systems with PyTorch, TensorFlow & LangChain. Computer Vision, NLP, MLOps & Geospatial AI.',
    images: ['/images/profile-picture.jpg'],
    creator: '@tayyabmanan',
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Skills />
      <CallToAction />
    </>
  )
}