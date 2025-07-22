'use client'

import { useState, useEffect } from 'react'
import ProjectCard from '@/components/ui/ProjectCard'
import ProjectModal from '@/components/ui/ProjectModal'
import { type Project } from '@/lib/projects'

const categories = ['All', 'Suitability Analysis', 'Machine Learning', 'Environmental Monitoring', 'Transportation']

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading projects:', err)
        setLoading(false)
      })
  }, [])

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory)

  const openModal = (project: Project) => {
    setSelectedProject(project)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  return (
    <div className="bg-[var(--background)] py-16 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} onClick={() => openModal(project)} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[var(--text-secondary)]">No projects found in this category.</p>
              </div>
            )}
          </>
        )}

        {/* Coming Soon Section */}
        <div className="text-center mt-16 bg-[var(--background-secondary)] rounded-2xl p-8">
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