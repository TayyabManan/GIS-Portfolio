'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon, CalendarIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { DynamicReactMarkdown } from '@/lib/dynamic-imports'
import { readingComponents, READING_BODY_CLASS } from '@/lib/reading-prose'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import ShareButtons from '@/components/ui/ShareButtons'
import BackToTop from '@/components/ui/BackToTop'

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

interface AdjacentProject {
  slug: string
  title: string
}

interface ProjectPageClientProps {
  project: Project
  adjacentProjects?: { prev: AdjacentProject | null; next: AdjacentProject | null }
}

export default function ProjectPageClient({ project, adjacentProjects }: ProjectPageClientProps) {
  const projectUrl = `https://tayyabmanan.com/projects/${project.slug}`
  const [showTech, setShowTech] = useState(false)

  return (
    <>
      <div className="min-h-[100dvh] py-16 sm:py-24 bg-[var(--background)]">
        {/* px-6 on mobile (not the site's usual px-4): reading pages get a wider
            24px gutter so the measure breathes at the edges. */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: project.category, current: true },
              ]}
              size="sm"
            />
          </div>

          <article>
            {/* Header */}
            <header className="mb-8">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)] mb-4">
                {project.title}
              </h1>

              {project.subtitle && (
                <p className="text-xl text-[var(--text-secondary)] mb-6">
                  {project.subtitle}
                </p>
              )}

              <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-6">
                {project.description}
              </p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)] pb-6 border-b border-[var(--border)]">
                {/* Primary tint, not amber - warning is reserved for status
                    semantics (DESIGN_SYSTEM §1), and "featured" is curation */}
                {project.featured && (
                  <span className="inline-flex items-center rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-medium text-[var(--primary)]">
                    Featured
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
                <button
                  onClick={() => setShowTech(!showTech)}
                  aria-expanded={showTech}
                  className="flex items-center gap-1 text-[var(--text-tertiary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
                >
                  <span>{project.techStack.length} technologies</span>
                  <ChevronDownIcon className={`h-3.5 w-3.5 transition-transform duration-200 ${showTech ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Tech Stack - collapsible (board: collapsed -> expanded -> collapsed).
                  grid-template-rows 0fr<->1fr morphs to natural height (the old
                  max-h-40 clipped past 160px and eased against the wrong height);
                  spacing lives inside as pt-4 so it animates with the track. */}
              <div
                data-state={showTech ? 'expanded' : 'collapsed'}
                className={`grid transition-[grid-template-rows,opacity] ${
                  showTech
                    ? 'grid-rows-[1fr] opacity-100 duration-morph ease-morph'
                    : 'grid-rows-[0fr] opacity-0 duration-200 ease-in'
                }`}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="flex flex-wrap gap-2 pt-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-[var(--background-secondary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)]"
                    >
                      {tech}
                    </span>
                  ))}
                  </div>
                </div>
              </div>
            </header>

            {/* The cover image (frontmatter `image`) is deliberately NOT
                rendered here: it repeats the header's title/subtitle/metric as
                pixels and pushed the real evidence (the in-body screenshot
                figure) below the fold. It remains the OG/social card via
                generateMetadata - identity in text, proof in the figure. */}

            {/* Action Buttons - before content */}
            {(project.demoUrl || project.githubUrl) && (
              <div className="flex flex-wrap gap-3 mb-12">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-[var(--primary)] text-[var(--on-primary)] px-6 py-3 rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 mr-2" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border border-[var(--border)] text-[var(--text)] px-6 py-3 rounded-lg text-sm font-medium hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    <CodeBracketIcon className="h-4 w-4 mr-2" />
                    Source Code
                  </a>
                )}
              </div>
            )}

            {/* Content */}
            <div className={READING_BODY_CLASS}>
              <DynamicReactMarkdown
                components={readingComponents()}
              >
                {project.content}
              </DynamicReactMarkdown>
            </div>

            {/* Previous / Next Project Navigation */}
            {adjacentProjects && (adjacentProjects.prev || adjacentProjects.next) && (
              <nav className="mt-12 pt-8 border-t border-[var(--border)]" aria-label="Adjacent projects">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {adjacentProjects.prev ? (
                    <Link
                      href={`/projects/${adjacentProjects.prev.slug}`}
                      className="group flex flex-col gap-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                    >
                      <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                        <ArrowLeftIcon className="h-3 w-3" /> Previous project
                      </span>
                      <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                        {adjacentProjects.prev.title}
                      </span>
                    </Link>
                  ) : <div />}
                  {adjacentProjects.next && (
                    <Link
                      href={`/projects/${adjacentProjects.next.slug}`}
                      className="group flex flex-col items-end gap-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors sm:col-start-2"
                    >
                      <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                        Next project <ArrowRightIcon className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-left">
                        {adjacentProjects.next.title}
                      </span>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            {/* Footer: Back + Share */}
            <div className="mt-8 pt-8 border-t border-[var(--border)]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors font-medium"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Back to all projects</span>
                </Link>
                <ShareButtons
                  title={project.title}
                  url={projectUrl}
                />
              </div>
            </div>
          </article>
        </div>
      </div>

      <BackToTop />
    </>
  )
}
