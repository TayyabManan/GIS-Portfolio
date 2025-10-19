import Link from 'next/link'
import Image from 'next/image'
import { ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

interface Project {
  slug: string
  title: string
  subtitle: string
  description: string
  category: string
  techStack: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  onClick?: () => void
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div 
      className="group relative bg-[var(--background)] dark:bg-[var(--background-secondary)] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-[var(--border)] cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden bg-[var(--border)] dark:bg-[var(--background-tertiary)]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} - ${project.category} GIS project screenshot showcasing ${project.techStack.slice(0, 3).join(', ')} implementation`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)]">
            <CodeBracketIcon className="h-12 w-12 opacity-20" />
          </div>
        )}
        {project.category === 'Full Stack' ? (
          <div className="absolute top-4 left-4 bg-[var(--primary)] text-white px-2 py-1 rounded-md text-xs font-medium z-10">
            Full Stack
          </div>
        ) : project.featured ? (
          <div className="absolute top-4 left-4 bg-[var(--primary)] text-white px-2 py-1 rounded-md text-xs font-medium z-10">
            Featured
          </div>
        ) : null}
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-md bg-[var(--accent)]/10 dark:bg-[var(--accent)]/20 px-2 py-1 text-xs font-medium text-[var(--accent)] dark:text-[var(--accent)]">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--primary)] transition-colors">
          {project.title}
        </h3>

        <p className="text-[var(--text-secondary)] mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-[var(--background-secondary)] dark:bg-[var(--background-tertiary)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-[var(--background-secondary)] dark:bg-[var(--background-tertiary)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)]">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[var(--primary)] hover:text-[var(--primary-hover)] font-medium text-sm inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
                title="Source Code"
                onClick={(e) => e.stopPropagation()}
              >
                <CodeBracketIcon className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}