'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import type { Project } from '@/lib/projects'

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity z-[9998]" />
        </Transition.Child>

        <div className="fixed inset-0 z-[9999] overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-xl bg-[var(--background)] dark:bg-[var(--background-secondary)] text-left shadow-xl transition-all my-8 w-full max-w-[95vw] sm:max-w-5xl max-h-[85vh] overflow-y-auto flex flex-col md:flex-row">
                {/* Close button - positioned at top right of entire modal */}
                <button
                  type="button"
                  className="absolute right-3 top-3 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full p-2 text-gray-900 dark:text-white/90 hover:bg-white dark:hover:bg-black/70 transition-all z-50 border border-gray-300 dark:border-white/20 shadow-lg flex items-center justify-center"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Content section - Left side on desktop */}
                <div className="w-full md:flex-1 p-5 sm:p-6 md:p-7 flex flex-col justify-between order-2 md:order-1">
                  <div className="flex-1 flex flex-col justify-center space-y-4">
                    {/* Title and Category */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full bg-[var(--primary-light)] dark:bg-[var(--primary)]/20 px-2.5 py-1 text-xs font-medium text-[var(--primary)] dark:text-[var(--info)]">
                          {project.category}
                        </span>
                        <span className="text-xs text-[var(--text-tertiary)]">
                          {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <Dialog.Title className="text-xl md:text-2xl font-bold text-[var(--text)] mb-2">
                        {project.title}
                      </Dialog.Title>
                      <p className="text-sm text-[var(--text-secondary)]">{project.subtitle}</p>
                    </div>

                    {/* Description */}
                    <div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-4 md:line-clamp-5">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack - Using columns for compact display */}
                    <div>
                      <h3 className="text-xs font-semibold text-[var(--text)] mb-2">Technologies</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 pt-4 mt-4 border-t border-[var(--border)]">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors"
                      >
                        <GlobeAltIcon className="h-4 w-4" />
                        View Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border-2 border-[var(--border)] bg-[var(--background-secondary)] px-4 py-2 text-sm font-semibold text-[var(--text)] shadow-sm hover:bg-[var(--background-tertiary)] hover:border-[var(--border-hover)] transition-colors"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>

                {/* Image section - Right side on desktop, square container */}
                <div className="relative w-full md:w-[50%] aspect-video md:aspect-square bg-[var(--background)] dark:bg-[var(--background-secondary)] overflow-visible flex-shrink-0 flex items-center justify-center order-1 md:order-2 p-6 md:p-8">
                  {project.image ? (
                    <div className="relative w-full aspect-video rounded-xl border-2 border-[var(--border)] dark:border-[var(--border)] shadow-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} - ${project.category} project featuring ${project.techStack.slice(0, 2).join(' and ')} for ${project.subtitle}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[var(--text-tertiary)]">
                        <CodeBracketIcon className="h-32 w-32" />
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}