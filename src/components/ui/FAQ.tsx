import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import Eyebrow from '@/components/ui/Eyebrow'
import type { FaqItem } from '@/lib/faqs'

interface FAQProps {
  items: FaqItem[]
  title?: string
  /** Optional supporting line under the heading. */
  description?: string
  /** Optional mono annotation above the heading (home sections only). */
  eyebrow?: { index?: string; label: string }
  /**
   * 'stacked' (default): heading on top, accordion below (for a narrow column).
   * 'aside': heading in a sticky left column, accordion in a wider right column
   * (fills horizontal space when the FAQ has no companion beside it).
   */
  layout?: 'stacked' | 'aside'
  /** Merged onto the <section> (e.g. spacing like `mt-16`). */
  className?: string
}

function FaqHeader({ title, description, eyebrow }: { title: string; description?: string; eyebrow?: FAQProps['eyebrow'] }) {
  return (
    <>
      {eyebrow && <Eyebrow index={eyebrow.index}>{eyebrow.label}</Eyebrow>}
      <h2 id="faq-heading" className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text)]">
        {title}
      </h2>
      <div className="mt-4 h-1 w-12 rounded-full bg-[var(--primary)]" />
      {description && (
        <p className="mt-5 text-base leading-relaxed text-[var(--text-secondary)]">{description}</p>
      )}
    </>
  )
}

function FaqList({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn('grid gap-3 sm:gap-4', className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group rounded-xl border border-[var(--border)] bg-[var(--background)] transition-[border-color,background-color,box-shadow] duration-200 hover:border-[var(--border-hover)] open:border-[var(--primary)] open:bg-[var(--background-secondary)] open:shadow-sm"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <span className="text-base font-medium text-[var(--text)] sm:text-lg">{item.question}</span>
            <span
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[var(--border)] text-[var(--text-tertiary)] transition-[transform,color,border-color] duration-200 group-open:rotate-180 group-open:border-[var(--primary)] group-open:text-[var(--primary)]"
            >
              <ChevronDownIcon className="h-4 w-4" />
            </span>
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            {/* fade + 4px slide reads better on body text than fadeIn's scale
                zoom; the height morph itself is the @supports
                interpolate-size progressive enhancement in globals.css. */}
            <p className="animate-in fade-in slide-in-from-top-1 duration-200 ease-out border-t border-[var(--border)] pt-4 text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {item.answer}
            </p>
          </div>
        </details>
      ))}
    </div>
  )
}

/**
 * Accessible FAQ accordion built on native <details>/<summary> so every answer
 * ships in the HTML (crawlable, works with JS disabled) and matches the FAQPage
 * schema. Styled as cards to sit as a first-class section on the page.
 */
export default function FAQ({
  items,
  title = 'Frequently Asked Questions',
  description,
  eyebrow,
  layout = 'stacked',
  className,
}: FAQProps) {
  if (!items || items.length === 0) return null

  if (layout === 'aside') {
    return (
      <section aria-labelledby="faq-heading" className={cn(className)}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:items-start lg:gap-14">
          <div className="max-w-md lg:sticky lg:top-24">
            <FaqHeader title={title} description={description} eyebrow={eyebrow} />
          </div>
          <FaqList items={items} />
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="faq-heading" className={cn(className)}>
      <div className="mb-8 max-w-2xl">
        <FaqHeader title={title} description={description} eyebrow={eyebrow} />
      </div>
      <FaqList items={items} className="max-w-3xl" />
    </section>
  )
}
