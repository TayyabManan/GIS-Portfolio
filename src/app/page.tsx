import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import Skills from '@/components/sections/Skills'
import CallToAction from '@/components/sections/CallToAction'

export const metadata: Metadata = {
  title: 'Tayyab Manan - GIS Analyst & Full Stack Developer | Portfolio',
  description: 'Tayyab Manan - Professional GIS Analyst and Full Stack Developer building innovative web applications and geospatial solutions using modern technologies like React, Next.js, Python, and GIS tools.',
  openGraph: {
    title: 'Tayyab Manan - GIS Analyst & Full Stack Developer Portfolio',
    description: 'Explore innovative web applications, GIS projects, and full-stack development solutions showcasing modern technologies and spatial analysis by Tayyab Manan.',
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