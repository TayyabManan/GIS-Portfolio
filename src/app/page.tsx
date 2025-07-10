import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Skills from '@/components/sections/Skills'
import CallToAction from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: 'Tayyab Manan - GIS Analyst and Spatial Developer | Portfolio',
  description: 'Professional GIS analyst Tayyab Manan specializes in urban planning, environmental analysis, and geospatial solutions. Explore innovative mapping projects.',
  openGraph: {
    title: 'Tayyab Manan - GIS Analyst & Spatial Developer Portfolio',
    description: 'Explore innovative GIS projects, spatial analysis solutions, and geospatial technology implementations by Tayyab Manan.',
    url: 'https://tayyabmanan.vercel.app',
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