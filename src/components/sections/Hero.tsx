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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Generate fewer dots on mobile for better performance
    const dotCount = window.innerWidth < 640 ? 10 : 30
    const dotsArray = Array.from({ length: dotCount }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }))
    setDots(dotsArray)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-[var(--hero-background)]">
      {/* Animated GIS Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hero-gradient-start)] via-[var(--hero-gradient-mid)] to-[var(--hero-gradient-end)] opacity-50" />
        
        {/* Floating orbs - use CSS animation on mobile for better performance */}
        {isMobile ? (
          <>
            <div className="absolute top-[10%] left-[10%] w-96 h-96 bg-[var(--hero-orb-primary)] rounded-full blur-3xl opacity-20" />
            <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-[var(--hero-orb-secondary)] rounded-full blur-3xl opacity-20" />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-[10%] left-[10%] w-96 h-96 bg-[var(--hero-orb-primary)] rounded-full blur-3xl opacity-20"
              animate={{
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-[var(--hero-orb-secondary)] rounded-full blur-3xl opacity-20"
              animate={{
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        )}
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--hero-grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--hero-grid-color)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        {/* Animated map contour lines - static on mobile */}
        {isMobile ? (
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contour-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <circle cx="100" cy="100" r="50" fill="none" stroke="var(--hero-pattern-stroke)" strokeWidth="0.5" opacity="0.2" />
                <circle cx="100" cy="100" r="80" fill="none" stroke="var(--hero-pattern-stroke-alt)" strokeWidth="0.5" opacity="0.2" />
                <circle cx="100" cy="100" r="110" fill="none" stroke="var(--hero-pattern-stroke)" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contour-pattern)" />
          </svg>
        ) : (
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="contour-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r={50}
                  fill="none" 
                  stroke="var(--hero-pattern-stroke)" 
                  strokeWidth="0.5" 
                  opacity="0.2"
                  initial={{ r: 50 }}
                  animate={{ r: [50, 55, 50] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r={80}
                  fill="none" 
                  stroke="var(--hero-pattern-stroke-alt)" 
                  strokeWidth="0.5" 
                  opacity="0.2"
                  initial={{ r: 80 }}
                  animate={{ r: [80, 85, 80] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="100" 
                  cy="100" 
                  r={110}
                  fill="none" 
                  stroke="var(--hero-pattern-stroke)" 
                  strokeWidth="0.5" 
                  opacity="0.1"
                  initial={{ r: 110 }}
                  animate={{ r: [110, 115, 110] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#contour-pattern)" />
          </svg>
        )}
        
        {/* Animated geometric shapes - static on mobile */}
        {!isMobile && (
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-[20%] right-[15%] w-32 h-32 border-2 border-[var(--hero-pattern-stroke)] opacity-10 rotate-45"
              animate={{
                rotate: [45, 90, 45],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-[25%] left-[20%] w-24 h-24 border-2 border-[var(--hero-pattern-stroke-alt)] opacity-10"
              animate={{
                rotate: [0, -45, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hero-overlay-start)] via-[var(--hero-overlay-mid)] to-[var(--hero-overlay-end)]" />
        
        {/* Animated dots representing data points - only render after mount */}
        {mounted && (
          <div className="absolute inset-0">
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-[var(--hero-dot-color)]"
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
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text)] sm:text-6xl drop-shadow-md">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="block"
            >
              GIS Analyst & 
              <span className="bg-gradient-to-r from-[var(--info)] to-[var(--accent)] bg-clip-text text-transparent"> Spatial Developer</span>
            </motion.span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg leading-8 text-[var(--text)] drop-shadow-sm font-medium"
          >
            Transforming spatial data into actionable insights through advanced analytics, 
            web development, and innovative GIS solutions. Specialized in urban planning, 
            environmental analysis, and real-time data visualization.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-[var(--text)] font-medium drop-shadow-sm"
          >
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-[var(--info)]" />
              <span>Islamabad, Pakistan</span>
            </div>
            <div className="flex items-center gap-2">
              <EnvelopeIcon className="h-4 w-4 text-[var(--accent)]" />
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
              className="bg-[var(--primary)] px-4 sm:px-8 py-2.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-[var(--primary-hover)] hover:shadow-xl rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
            >
              View Projects
            </a>
            <a
              href="/contact"
              className="text-sm sm:text-base font-semibold leading-6 text-[var(--text)] hover:text-[var(--primary)] transition-all duration-200 group border-2 border-[var(--border)] hover:border-[var(--primary)] px-4 sm:px-8 py-2.5 sm:py-4 rounded-lg bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)]"
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
          className="inline-block p-2 text-[var(--text-tertiary)] hover:text-[var(--text)] transition-colors cursor-pointer"
          aria-label="Scroll to projects section"
        >
          <ArrowDownIcon className="h-6 w-6 animate-bounce" />
        </a>
      </motion.div>
    </section>
  )
}