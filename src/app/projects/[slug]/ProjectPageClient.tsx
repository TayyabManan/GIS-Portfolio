'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeftIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon, CalendarIcon, TagIcon } from '@heroicons/react/24/outline'
import ReactMarkdown from 'react-markdown'

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
  date: string
  content: string
}

interface ProjectPageClientProps {
  project: Project
}

export default function ProjectPageClient({ project }: ProjectPageClientProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-800 dark:to-emerald-800">
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
                <polygon points="30,1 45,13 45,39 30,51 15,39 15,13" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />
              Back to Portfolio
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1 order-2 lg:order-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-white">
                    <TagIcon className="h-4 w-4 mr-1" />
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center rounded-full bg-yellow-400/20 backdrop-blur-sm px-3 py-1 text-sm font-medium text-yellow-100">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                
                {project.subtitle && (
                  <p className="text-lg sm:text-xl text-white/90 mb-6">
                    {project.subtitle}
                  </p>
                )}
                
                <p className="text-base sm:text-lg text-white/80 mb-8">
                  {project.description}
                </p>
                
                <div className="flex items-center gap-4 text-white/70 mb-8">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span className="text-sm sm:text-base">{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-colors text-center"
                    >
                      <CodeBracketIcon className="h-5 w-5 mr-2" />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
              
              {project.image && (
                <div className="w-full lg:w-80 order-1 lg:order-2">
                  <div className="relative rounded-xl overflow-hidden shadow-2xl mx-auto max-w-sm lg:max-w-none">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={320}
                      height={240}
                      className="object-cover w-full h-48 sm:h-60"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative py-16">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          {/* Floating hexagon pattern */}
          <svg className="absolute inset-0 h-full w-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="content-hexagon" x="0" y="0" width="80" height="69" patternUnits="userSpaceOnUse">
                <polygon points="40,1 60,18 60,52 40,69 20,52 20,18" fill="none" stroke="#3b82f6" strokeWidth="0.3" opacity="0.1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#content-hexagon)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Tech Stack
                  </h3>
                  <div className="space-y-3">
                    {project.techStack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                        className="flex items-center w-full bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 px-4 py-3 rounded-lg text-sm font-medium border border-blue-100 dark:border-gray-600 hover:shadow-md transition-all duration-200"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mr-3"></div>
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                
                {/* Project Links - Desktop only */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hidden lg:block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    Project Links
                  </h3>
                  <div className="space-y-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md"
                      >
                        <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-3" />
                        <span className="font-medium">Live Demo</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-gray-50 dark:bg-gray-700/20 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md"
                      >
                        <CodeBracketIcon className="h-5 w-5 mr-3" />
                        <span className="font-medium">Source Code</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="col-span-1 lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700/50 overflow-hidden"
              >
                <div className="p-6 sm:p-8 lg:p-12">
                  <div className="prose prose-lg dark:prose-invert max-w-none 
                    prose-headings:text-gray-900 dark:prose-headings:text-white 
                    prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:pb-3 prose-h1:border-b prose-h1:border-gradient-to-r prose-h1:from-blue-200 prose-h1:to-emerald-200 dark:prose-h1:from-blue-800 dark:prose-h1:to-emerald-800
                    prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-blue-800 dark:prose-h2:text-blue-300
                    prose-h3:text-lg sm:prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-emerald-700 dark:prose-h3:text-emerald-400
                    prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                    prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-pre:bg-gray-100 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-lg
                    prose-ul:space-y-2 prose-li:text-gray-700 dark:prose-li:text-gray-300
                    prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                  >
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-2xl sm:text-3xl font-bold mb-6 pb-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xl sm:text-2xl font-semibold mt-10 mb-4 text-blue-800 dark:text-blue-300 flex items-center">
                            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full mr-3"></div>
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-lg sm:text-xl font-semibold mt-8 mb-3 text-emerald-700 dark:text-emerald-400 flex items-center">
                            <div className="w-1 h-5 bg-emerald-500 rounded-full mr-3"></div>
                            {children}
                          </h3>
                        ),
                        ul: ({ children }) => (
                          <ul className="space-y-3 my-6">
                            {children}
                          </ul>
                        ),
                        li: ({ children }) => (
                          <li className="flex items-start text-gray-700 dark:text-gray-300">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span>{children}</span>
                          </li>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {children}
                          </p>
                        ),
                        strong: ({ children }) => (
                          <strong className="font-semibold text-gray-900 dark:text-white">
                            {children}
                          </strong>
                        ),
                      }}
                    >
                      {project.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile Project Links - At the bottom */}
          <div className="lg:hidden mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                Project Links
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg border border-blue-200 dark:border-blue-800 hover:shadow-md"
                  >
                    <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-3" />
                    <span className="font-medium">Live Demo</span>
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-gray-50 dark:bg-gray-700/20 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md"
                  >
                    <CodeBracketIcon className="h-5 w-5 mr-3" />
                    <span className="font-medium">Source Code</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}