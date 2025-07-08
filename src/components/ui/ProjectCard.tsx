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
      className="group relative bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video relative overflow-hidden bg-gray-200 dark:bg-gray-700">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <CodeBracketIcon className="h-12 w-12 opacity-20" />
          </div>
        )}
        {project.featured && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium z-10">
            Featured
          </div>
        )}
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-md bg-emerald-100 dark:bg-emerald-900 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            {project.category}
          </span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Link
            href={`/projects/${project.slug}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            View Project
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </Link>

          <div className="flex items-center gap-2">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
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
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
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