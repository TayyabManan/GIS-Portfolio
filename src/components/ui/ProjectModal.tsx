'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Image from 'next/image'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { CodeBracketIcon, GlobeAltIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
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
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-[var(--background)] dark:bg-[var(--background-secondary)] text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                {/* Image section */}
                <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] overflow-hidden">
                  {/* Close button - positioned inside image section for proper alignment */}
                  <button
                    type="button"
                    className="absolute right-3 top-3 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white/90 hover:text-white hover:bg-black/70 transition-all z-20 border border-white/20 flex items-center justify-center"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} - ${project.category} project featuring ${project.techStack.slice(0, 2).join(' and ')} for ${project.subtitle}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white/20">
                        <CodeBracketIcon className="h-32 w-32" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Dialog.Title className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {project.title}
                      </Dialog.Title>
                      <p className="text-lg text-white/90 drop-shadow-md">{project.subtitle}</p>
                    </motion.div>
                  </div>
                </div>

                {/* Content section */}
                <div className="px-6 py-6 sm:px-8 sm:py-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6"
                  >
                    {/* Category and Date */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="inline-flex items-center rounded-full bg-[var(--primary-light)] dark:bg-[var(--primary)]/20 px-3 py-1 text-sm font-medium text-[var(--primary)] dark:text-[var(--info)]">
                        {project.category}
                      </span>
                      <span className="text-[var(--text-tertiary)]">
                        {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                      </span>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)] mb-2">Project Overview</h3>
                      <p className="text-[var(--text-secondary)] leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h3 className="text-lg font-semibold text-[var(--text)] mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] transition-colors"
                        >
                          <GlobeAltIcon className="h-5 w-5" />
                          View Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border-2 border-[var(--border)] bg-[var(--background-secondary)] px-4 py-3 text-sm font-semibold text-[var(--text)] shadow-sm hover:bg-[var(--background-tertiary)] hover:border-[var(--border-hover)] transition-colors"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                          View Source Code
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}