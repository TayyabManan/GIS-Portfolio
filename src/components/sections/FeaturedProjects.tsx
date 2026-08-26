'use client'

import { useRef } from 'react'
import Link from 'next/link'
import ProjectCard from '@/components/ui/ProjectCard'
import Eyebrow from '@/components/ui/Eyebrow'
import { type Project } from '@/lib/projects'
import { useSectionReveal } from '@/components/effects/useSectionReveal'

interface FeaturedProjectsProps {
  projects: Project[]
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  // Cards are server-rendered from props, so the reveal can arm immediately -
  // triggers measure against the real grid that shipped in the initial HTML.
  useSectionReveal(sectionRef)

  return (
    <section ref={sectionRef} id="projects" data-reveal-group className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal="heading" className="mb-12 max-w-4xl">
          <Eyebrow index="01">Selected Work</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[var(--text)] mb-4">Featured Projects</h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            A few projects I&apos;ve taken from first model to live demo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {projects.map((project) => (
            <div key={project.slug} data-reveal="item">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Quiet section-end link on the grid's edge (premium pass) - the
            section header already announces the content; no filled CTA needed. */}
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
        >
          All projects
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
