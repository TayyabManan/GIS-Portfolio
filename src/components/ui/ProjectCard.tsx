import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CodeBracketIcon, ChevronDownIcon, ChevronUpIcon, LinkIcon } from '@heroicons/react/24/outline'
import { MetricSparkline, type MetricChart } from '@/components/effects/NotebookDoodles'
import { type Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

// Re-sketch the metric chip's micro-chart when the card is hovered. WAAPI, not
// CSS: it bypasses the global reduced-motion zeroing so the owner (who runs RM
// on) sees it too. Charts are fully drawn at rest, so no-WAAPI browsers just
// skip the flourish. Stroke paths [data-draw] redraw left-to-right (staggered
// for multi-bar charts); fills [data-pop] fade in just after.
function playChipDraw(card: HTMLElement) {
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

const ProjectCard = React.memo(function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [canExpand, setCanExpand] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const checkTextClamping = () => {
      if (textRef.current && !isExpanded) {
        // Only check when collapsed to determine if expand button is needed
        const isClamped = textRef.current.scrollHeight > textRef.current.clientHeight
        setCanExpand(isClamped)
      }
    }

    checkTextClamping()
    // Re-check on window resize
    window.addEventListener('resize', checkTextClamping)
    return () => window.removeEventListener('resize', checkTextClamping)
  }, [project.description, isExpanded])

  return (
    <article
      className="group relative bg-[var(--background)] rounded-xl shadow-sm overflow-hidden border border-[var(--border)] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--primary)]"
      style={{ willChange: 'transform' }}
      aria-label={`${project.title} - ${project.category} project`}
      onPointerEnter={(e) => playChipDraw(e.currentTarget)}
    >
      <div className="aspect-video relative overflow-hidden bg-[var(--border)]">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} - ${project.category} ML/AI project screenshot showcasing ${project.techStack.slice(0, 3).join(', ')} implementation`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY0Ii8+PC9zdmc+"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[var(--text-tertiary)]">
            <CodeBracketIcon className="h-12 w-12 opacity-20" aria-hidden="true" />
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
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--text)]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {/* Metric chip (data-decorative): a real published number in the
            annotation voice. Sibling of the Image, so it doesn't ride the
            hover scale; themed surface keeps it legible over any screenshot.
            The sparkline is decoration; the metric text is real content. */}
        {project.metric && (
          <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded border border-[var(--border)] bg-[var(--background)]/90 px-2 py-1 backdrop-blur-sm">
            <MetricSparkline variant={project.metricChart as MetricChart | undefined} className="h-2.5 w-auto text-[var(--accent-ink)]" />
            <span className="font-mono text-[11px] font-medium leading-none text-[var(--text)]">
              {project.metric}
            </span>
          </span>
        )}
      </div>

      <div className="p-6 sm:p-8 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          {/* accent-ink, not accent: raw lime text on light bg is ~2:1 */}
          <span className="inline-flex items-center rounded-md bg-[var(--accent)]/15 px-2 py-1 text-xs font-medium text-[var(--accent-ink)]">
            {project.category}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--primary)] transition-colors">
          {project.title}
        </h3>

        <div className="mb-4">
          <p
            ref={textRef}
            className={`text-sm text-[var(--text-secondary)] transition-all duration-300 ${isExpanded ? '' : 'line-clamp-2'}`}
          >
            {project.description}
          </p>
          {canExpand && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(!isExpanded)
              }}
              className="text-[var(--primary)] hover:text-[var(--primary-hover)] text-sm font-medium mt-1 inline-flex items-center gap-1 cursor-pointer"
            >
              {isExpanded ? (
                <>
                  Show less
                  <ChevronUpIcon className="h-4 w-4" />
                </>
              ) : (
                <>
                  Read more
                  <ChevronDownIcon className="h-4 w-4" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4 transition-all duration-300">
          {(isExpanded ? project.techStack : project.techStack.slice(0, 3)).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-[var(--background-secondary)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)]"
            >
              {tech}
            </span>
          ))}
          {!isExpanded && project.techStack.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-[var(--background-secondary)] px-2 py-1 text-xs font-medium text-[var(--text-secondary)]">
              +{project.techStack.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              aria-label={`View live demo of ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <LinkIcon className="h-5 w-5" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
              aria-label={`View source code of ${project.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
            >
              <CodeBracketIcon className="h-5 w-5" />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto px-3 py-2 min-h-[44px] inline-flex items-center text-[var(--primary)] hover:text-[var(--primary-hover)] hover:bg-[var(--primary)]/10 rounded-lg transition-all text-sm font-medium"
            onClick={(e) => e.stopPropagation()}
            aria-label={`View details of ${project.title} project`}
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  )
})

export default ProjectCard