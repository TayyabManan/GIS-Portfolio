'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectModal from '@/components/ui/ProjectModal'
import { getFeaturedProjects, type Project } from '@/lib/projects'

export default function FeaturedProjects() {
  const featuredProjects = getFeaturedProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300) // Clear after animation
  }

  return (
    <section id="projects" className="relative pt-20 pb-16 overflow-hidden">
      {/* Animated GIS-themed background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        {/* Animated geometric patterns */}
        <div className="absolute inset-0">
          {/* Floating hexagons - representing spatial data cells */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagon-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,1 45,13 45,39 30,51 15,39 15,13" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagon-pattern)" />
          </svg>
          
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
          
          {/* Floating data points */}
          {mounted && (
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    left: `${20 + (i * 10)}%`,
                    top: `${10 + (i * 12)}%`,
                    background: i % 2 === 0 ? '#3b82f6' : '#10b981',
                    boxShadow: `0 0 20px ${i % 2 === 0 ? '#3b82f6' : '#10b981'}`
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing innovative GIS solutions that demonstrate expertise in spatial analysis, 
            web development, and data visualization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} onClick={() => openModal(project)} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            View All Projects
          </Link>
        </motion.div>
      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />
    </section>
  )
}