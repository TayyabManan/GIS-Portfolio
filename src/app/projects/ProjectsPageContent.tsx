'use client'

import { useState, useEffect } from 'react'
import ProjectCard from '@/components/ui/ProjectCard'
import { type Project } from '@/lib/projects'
import { useGridFlip } from '@/components/effects/useGridFlip'
import CategoryFilter from '@/components/ui/CategoryFilter'

const categories = ['All', 'Geospatial AI', 'Computer Vision', 'Natural Language Processing', 'Machine Learning & MLOps', 'Web Application']

const PROJECTS_PER_PAGE = 6

interface ProjectsPageContentProps {
  projects: Project[]
}

export default function ProjectsPageContent({ projects }: ProjectsPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  // Paginate projects
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE)
  const paginatedProjects = filteredProjects.slice(0, currentPage * PROJECTS_PER_PAGE)
  const hasMore = currentPage < totalPages

  // FLIP morph on filter change / load-more (desktop only; no-op hard swap on mobile)
  const { gridRef, capture } = useGridFlip(paginatedProjects.map((p) => p.slug).join('|'))

  const loadMore = () => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true)
      // Simulate loading delay for smooth UX
      setTimeout(() => {
        capture() // append-only: Flip degenerates to the enter stagger on new cards
        setCurrentPage(prev => prev + 1)
        setIsLoadingMore(false)
      }, 300)
    }
  }

  const selectCategory = (category: string) => {
    if (category === selectedCategory) return
    capture() // snapshot positions before React swaps the list
    setSelectedCategory(category)
    setCurrentPage(1) // same commit as the category change so Flip sees the final list
  }

  // Reset pagination when category changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory])

  return (
    <div className="relative py-16 sm:py-24 min-h-[100dvh] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Left aligned */}
        <div className="mb-12 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-4">ML & AI Projects</h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)]">
            A collection of machine learning and AI projects demonstrating expertise in computer vision,
            NLP, geospatial AI, and MLOps, turning complex data into production-ready systems.
          </p>
        </div>

        {/* Category Filter - Left aligned */}
        <CategoryFilter categories={categories} selected={selectedCategory} onSelect={selectCategory} />

        {/* Projects Grid */}
        <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedProjects.map((project) => (
            <div key={project.slug} data-flip-id={project.slug}>
              <ProjectCard project={project} />
            </div>
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
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--text-secondary)] mb-4">No projects in this category yet.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="text-[var(--primary)] font-medium hover:underline"
            >
              Show all projects
            </button>
          </div>
        )}

        {/* Coming Soon */}
        <div className="mt-16 bg-[var(--background-secondary)] rounded-2xl p-8 lg:p-12 border border-[var(--border)]">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-4">More Projects Coming Soon</h2>
          <p className="text-[var(--text-secondary)] text-base sm:text-lg max-w-2xl">
            I&apos;m continuously working on new machine learning and AI projects, including RAG systems,
            computer vision applications, and MLOps platforms. Follow my{' '}
            <a href="https://github.com/TayyabManan" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] hover:underline">GitHub</a>
            {' '}for the latest developments.
          </p>
        </div>
      </div>
    </div>
  )
}
