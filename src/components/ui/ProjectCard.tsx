import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import ProjectCover from '@/components/ui/ProjectCover'
import { type Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

// Re-sketch the cover chart when the card is pointed at. WAAPI, not CSS: it
// bypasses the global reduced-motion zeroing so the owner (who runs RM on)
// sees it too. Charts are fully drawn at rest, so no-WAAPI browsers just skip
// the flourish. Stroke paths [data-draw] redraw left-to-right (staggered for
// multi-bar charts); fills [data-pop] fade in just after.
function playCoverSketch(card: HTMLElement) {
  const chart = card.querySelector('.metric-chart')
  if (!chart) return
  chart.querySelectorAll<SVGPathElement>('[data-draw]').forEach((path, i) => {
    if (typeof path.animate !== 'function') return
    path.animate(
      [{ strokeDashoffset: 100 }, { strokeDashoffset: 0 }],
      { duration: 480, delay: i * 60, easing: 'ease-out', fill: 'backwards' }
    )
  })
  chart.querySelectorAll<SVGElement>('[data-pop]').forEach((el) => {
    if (typeof el.animate !== 'function') return
    el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 480, delay: 120, easing: 'ease-out', fill: 'backwards' })
  })
}

/**
 * One surface, one affordance, one hover gesture. The whole card is a single
 * link to the project page (stretched-link ::after on the title); demo/GitHub
 * links, the tech stack, and the full description live there. Hover is the
 * border hairline turning primary while the cover's pen re-sketches - no
 * lift, no shadow, no zoom.
 */
const ProjectCard = React.memo(function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      onPointerEnter={(e) => playCoverSketch(e.currentTarget)}
      className="group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] transition-[border-color] duration-200 hover:border-[var(--primary)] has-[a:focus-visible]:border-[var(--primary)] has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-[var(--primary)] has-[a:focus-visible]:outline-offset-2"
      aria-label={`${project.title} - ${project.category} project`}
    >
      <ProjectCover project={project} />

      <div className="p-6">
        <h3 className="flex items-baseline justify-between gap-3 text-lg font-semibold text-[var(--text)] sm:text-xl">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {project.title}
          </Link>
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 shrink-0 self-center text-[var(--text-tertiary)] transition-colors duration-200 group-hover:text-[var(--primary)]"
          />
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
          {project.description}
        </p>
      </div>
    </article>
  )
})

export default ProjectCard
