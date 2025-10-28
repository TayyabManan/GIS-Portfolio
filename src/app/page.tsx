import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Education from '@/components/sections/Education'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Skills from '@/components/sections/Skills'
import CurrentlyLearning from '@/components/sections/CurrentlyLearning'
import CallToAction from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: 'Tayyab Manan - AI Engineering Student | ML & Computer Vision',
  description: 'AI Engineering graduate student specializing in Computer Vision, NLP, and Geospatial AI. Building ML systems with PyTorch, TensorFlow, and LangChain through coursework and projects. Seeking Summer 2026 internships.',
  keywords: [
    'AI Engineering student',
    'machine learning student',
    'computer vision student',
    'AI graduate student',
    'PyTorch developer',
    'TensorFlow developer',
    'NLP student',
    'geospatial AI',
    'ML internship',
    'AI internship',
    'ML student Pakistan',
    'AI researcher',
    'deep learning student',
    'LangChain developer',
    'AI engineering masters'
  ],
  openGraph: {
    title: 'Tayyab Manan - AI Engineering Student | Computer Vision & Geospatial AI',
    description: 'AI Engineering graduate student building ML systems with PyTorch, TensorFlow & LangChain. Specializing in Computer Vision, NLP, and Geospatial AI. Seeking Summer 2026 internships.',
    url: 'https://tayyabmanan.vercel.app',
    siteName: 'Tayyab Manan Portfolio',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - AI Engineering Student & ML Developer',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayyab Manan - AI Engineering Student | Computer Vision',
    description: 'AI Engineering graduate student building ML systems with PyTorch, TensorFlow & LangChain. Computer Vision, NLP & Geospatial AI. Seeking internships.',
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
      <Education />
      <FeaturedProjects />
      <Skills />
      <CurrentlyLearning />
      <CallToAction />
    </>
  )
}