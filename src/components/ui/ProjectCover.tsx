import { CoverChart, COVER_CAPTIONS, type MetricChart } from '@/components/effects/NotebookDoodles'
import { type Project } from '@/lib/projects'

/**
 * Art-directed card cover - replaces the raw screenshot in ProjectCard.
 * Composed DOM in the site's own system (server-renderable, theme-aware,
 * zero image bytes): category in the mono annotation voice, the project's
 * notebook cover chart as the art, and the real published metric with its
 * axis caption. Detail heroes / blog headers / OG cards use the matching
 * generated cover IMAGES (scripts/generate-covers.mjs); raw screenshots
 * live in git history and, where one earns its place, inside markdown
 * bodies - never as a cover.
 *
 * The chart's data ink is the card's slot in the closed lime budget (it
 * absorbed the metric-chip sparkline). The metric is real content - never
 * aria-hidden; the chart is decorative and hides itself in print and
 * high-contrast via data-doodle, leaving a clean typographic cover.
 */
export default function ProjectCover({ project }: { project: Project }) {
  const variant = (project.metricChart as MetricChart | undefined) ?? 'line'

  return (
    <div className="relative flex aspect-video flex-col border-b border-[var(--border)] bg-[var(--background-secondary)] p-5 sm:p-6">
      {/* Annotation text on this surface is 11px + secondary ink: tertiary on
          --background-secondary computes ~4.4:1, just under WCAG AA. */}
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--text-secondary)]">
        {project.category}
      </p>

      {/* The plot. min-h-0 lets the chart shrink instead of overflowing the
          fixed-ratio cover; the svg centers itself (preserveAspectRatio). */}
      <div className="min-h-0 flex-1 py-2 text-[var(--accent-ink)]">
        <CoverChart variant={variant} className="h-full w-full" />
      </div>

      {/* flex-wrap + ml-auto: on the narrowest 3-column band (~1024px) the
          longer baselined metrics can meet the caption; the caption then wraps
          under, staying right-aligned, instead of overflowing the cover. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        {project.metric && (
          <span className="font-mono text-xs font-medium tabular-nums leading-none text-[var(--text)]">
            {project.metric}
          </span>
        )}
        <span aria-hidden="true" className="ml-auto font-mono text-[11px] leading-none tracking-[0.08em] text-[var(--text-secondary)]">
          {COVER_CAPTIONS[variant]}
        </span>
      </div>
    </div>
  )
}
