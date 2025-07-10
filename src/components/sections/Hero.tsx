'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/solid'

export default function Hero() {
  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      // Scroll to show projects section at the very top (under the header)
      const headerHeight = 64 // h-16 = 64px
      const y = projectsSection.getBoundingClientRect().top + window.pageYOffset - headerHeight
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }
  const [mounted, setMounted] = useState(false)
  const [dots, setDots] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([])

  useEffect(() => {
    setMounted(true)
    // Generate random positions only on client side
    const dotsArray = Array.from({ length: 30 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
    setDots(dotsArray)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-gray-900">
      {/* Animated GIS Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Animated map contour lines */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contour-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="50" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.2" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#10b981" strokeWidth="0.5" opacity="0.2" />
              <circle cx="100" cy="100" r="110" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contour-pattern)" />
        </svg>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-gray-900/95 to-emerald-900/90" />
        
        {/* Animated dots representing data points - only render after mount */}
        {mounted && (
          <div className="absolute inset-0">
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-blue-400"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  delay: dot.delay,
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="relative flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center py-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="block"
            >
              GIS Analyst & 
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"> Spatial Developer</span>
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-gray-300"
          >
            Transforming spatial data into actionable insights through advanced analytics, 
            web development, and innovative GIS solutions. Specialized in urban planning, 
            environmental analysis, and real-time data visualization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-300"
          >
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-blue-400" />
              <span>Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 text-emerald-400" />
              <span>Available for Remote Work</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:from-blue-700 hover:to-blue-800 rounded-md transition-all duration-200 transform hover:scale-105 cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="text-sm font-semibold leading-6 text-white hover:text-blue-400 transition-colors group"
            >
              Get in touch <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

        </div>
      </div>
      
      {/* Down arrow positioned at the bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a
          href="#projects"
          onClick={scrollToProjects}
          className="inline-block p-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll to projects section"
        >
          <ArrowDownIcon className="h-6 w-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}