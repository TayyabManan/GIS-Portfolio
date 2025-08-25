'use client'

import { useState, useEffect } from 'react'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectModal from '@/components/ui/ProjectModal'
import { type Project } from '@/lib/projects'
import { motion } from 'framer-motion'
import { LoadingError } from '@/components/ui/ErrorState'
import { toast } from '@/components/ui/Toast'

const categories = ['All', 'Urban Planning', 'Environmental Monitoring', 'Business Intelligence', 'Suitability Analysis']

const PROJECTS_PER_PAGE = 6

export default function ProjectsPageContent() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  
  useEffect(() => {
    setMounted(true)
    // Fetch projects from API
    const loadProjects = async () => {
      try {
        const res = await fetch('/api/projects')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        const data = await res.json()
        setProjects(data)
        setError(null)
      } catch (err) {
        setError(err as Error)
        setProjects([])
        toast.error('Failed to load projects', 'Please try refreshing the page')
      } finally {
        setLoading(false)
      }
    }
    
    loadProjects()
  }, [])

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)
  
  // Paginate projects
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice(0, currentPage * PROJECTS_PER_PAGE)
  const hasMore = currentPage < totalPages
  
  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true)
      // Simulate loading delay for smooth UX
      setTimeout(() => {
        setCurrentPage(prev => prev + 1)
        setIsLoadingMore(false)
      }, 300)
    }
  }
  
  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="relative bg-[var(--background)] py-16 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--projects-gradient-start)] via-[var(--projects-gradient-mid)] to-[var(--projects-gradient-end)] opacity-50" />
        
        {/* Hexagon pattern */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagon-pattern-page" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,1 45,13 45,39 30,51 15,39 15,13" fill="none" stroke="var(--projects-pattern-stroke)" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagon-pattern-page)" />
        </svg>
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-[10%] right-[20%] w-72 h-72 bg-[var(--projects-orb-primary)] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[20%] w-64 h-64 bg-[var(--projects-orb-secondary)] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating data points */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  left: `${15 + (i * 8)}%`,
                  top: `${10 + (i * 9)}%`,
                  background: i % 2 === 0 ? 'var(--projects-float-color)' : 'var(--projects-float-color-alt)',
                  boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--projects-float-color)' : 'var(--projects-float-color-alt)'}`
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">Projects</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            A collection of GIS analysis projects, web applications, and spatial solutions 
            that demonstrate my expertise in transforming complex geographic data into actionable insights.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[var(--primary)] text-white'
                  : 'bg-[var(--background-secondary)] text-[var(--text)] hover:bg-[var(--background-tertiary)]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : error ? (
          <LoadingError 
            resource="projects" 
            onRetry={() => {
              setLoading(true)
              setError(null)
              fetch('/api/projects')
                .then(res => res.json())
                .then(data => {
                  setProjects(data)
                  setError(null)
                })
                .catch(err => {
                  setError(err)
                  toast.error('Failed to load projects')
                })
                .finally(() => setLoading(false))
            }}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} onClick={() => openModal(project)} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={isLoadingMore}
                  className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoadingMore ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      Load More Projects
                      <span className="text-sm opacity-75">
                        ({filteredProjects.length - paginatedProjects.length} remaining)
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredProjects.length === 0 && !error && (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)]">No projects found in this category.</p>
              </div>
            )}
          </>
        )}
        
        {/* Coming Soon Section */}
        <div className="text-center mt-16 bg-[var(--background-secondary)] rounded-2xl p-8 border border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">More Projects Coming Soon</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            I&apos;m continuously working on new projects and expanding my portfolio. 
            Check back regularly for updates, or follow my GitHub for the latest developments.
          </p>
        </div>
      </div>
      
      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={modalOpen} 
        onClose={closeModal} 
      />
    </div>
  )
}