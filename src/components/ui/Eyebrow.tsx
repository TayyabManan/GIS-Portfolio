/**
 * Mono annotation label above a section heading (personality layer).
 * A <p>, never a heading - it must not alter the document outline. The index
 * numeral is decorative wayfinding (aria-hidden); screen readers hear only
 * the label. Home sections use the numbered form: 01 / SELECTED WORK.
 * The numeral is part of the site's closed lime budget.
 */
interface EyebrowProps {
  children: React.ReactNode
  /** Decorative order numeral, e.g. "01" */
  index?: string
  className?: string
}

export default function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-tertiary)] mb-3 ${className ?? ''}`}
    >
      {index && (
        <span aria-hidden="true">
          <span className="text-[var(--accent-ink)]">{index}</span>
          <span className="mx-2 text-[var(--border-hover)]">/</span>
        </span>
      )}
      {children}
    </p>
  )
}
