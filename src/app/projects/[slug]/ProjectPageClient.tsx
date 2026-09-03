'use client'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon, ArrowTopRightOnSquareIcon, CodeBracketIcon } from '@heroicons/react/24/outline'
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
  const projectDate = new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

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
                // The page itself, not its category - the category leads
                // the eyebrow one line below.
                { label: project.title, current: true },
              ]}
              size="sm"
            />
          </div>

          <article>
            {/* Header - the SAME grammar as the blog-post header (the two
                long-form templates cross-link, so they must read as one
                site): mono annotation eyebrow (category · date),
                title, one lede, then the rule. The old version stacked
                subtitle + description (the description repeats the body's
                Overview paragraph almost verbatim - it stays SEO metadata
                only), a "Featured" pill, a calendar icon and an
                "N technologies" disclosure - the icon-meta generation the
                blog header already retired. The stack is a plain mono line
                now (nothing to click to learn what a project is built with),
                and the demo/source actions close the header above the rule. */}
            <header className="mb-8 border-b border-[var(--border)] pb-6">
              <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                {project.category} &middot; <time dateTime={project.date}>{projectDate}</time>
              </p>

              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)] mb-4">
                {project.title}
              </h1>

              {project.subtitle && (
                <p className="text-xl text-[var(--text-secondary)]">
                  {project.subtitle}
                </p>
              )}

              {project.techStack.length > 0 && (
                <p className="mt-5 font-mono text-xs tracking-[0.04em] text-[var(--text-tertiary)]">
                  <span className="sr-only">Built with </span>
                  {project.techStack.join(' · ')}
                </p>
              )}

              {/* Actions - the header's last row, above the rule */}
              {(project.demoUrl || project.githubUrl) && (
                <div className="mt-6 flex flex-wrap gap-3">
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
            </header>

            {/* The cover image (frontmatter `image`) is deliberately NOT
                rendered here: it repeats the header's title/subtitle/metric as
                pixels and pushed the real evidence (the in-body screenshot
                figure) below the fold. It remains the OG/social card via
                generateMetadata - identity in text, proof in the figure. */}

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
