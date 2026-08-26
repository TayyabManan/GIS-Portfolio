import type { ReactNode } from 'react'
import Image from 'next/image'
import type { Components } from 'react-markdown'
import CodeBlock from '@/components/ui/CodeBlock'

/**
 * The site's ONE reading voice - shared by every markdown-rendered body
 * (blog posts AND project pages), so the two surfaces can never drift apart
 * again. Reading is Hanken Grotesk, same as the UI (owner call, Aug 2026:
 * the serif experiment was retired - one family for prose and chrome reads
 * more coherent to them), tuned for long-form: 17px -> 18px on lg, leading
 * 1.7 (large-x-height sans wants the top of the band), the reading ink, a
 * 65ch measure. See DESIGN_SYSTEM.md "Reading typography".
 *
 * The wrapper class carries the whole cascade; children inherit and only
 * override what genuinely differs (headings -> Bricolage via globals,
 * code -> mono).
 */
export const READING_BODY_CLASS =
  'article-body max-w-[65ch] text-[1.0625rem] leading-[1.7] text-[var(--text-reading)] lg:text-lg'

/** Ink-link grammar: the underline is the affordance (same-ink links). */
export const READING_LINK_CLASS =
  'font-medium text-[var(--text)] underline decoration-[var(--text)]/30 underline-offset-[0.15em] transition-[text-decoration-color] duration-200 hover:decoration-[var(--text)]'

interface ReadingComponentOptions {
  /** When provided (blog TOC), headings get anchor ids. */
  headingId?: (children: ReactNode) => string
}

export function readingComponents({ headingId }: ReadingComponentOptions = {}): Partial<Components> {
  const id = (children: ReactNode) => (headingId ? headingId(children) : undefined)

  return {
    // The styled page <header> owns the sole <h1>; a stray `#` in a body
    // renders as <h2> so the document keeps a single-H1 outline.
    h1: ({ children }) => (
      <h2 id={id(children)} className="text-3xl font-semibold tracking-tight text-[var(--text)] mt-8 mb-4">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h2 id={id(children)} className="text-2xl font-semibold tracking-tight text-[var(--text)] mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={id(children)} className="text-xl font-semibold tracking-tight text-[var(--text)] mt-6 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="mb-4">{children}</p>,
    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-[var(--text)]">{children}</strong>,
    code: ({ children, className }) => {
      const isInline = !className
      return isInline ? (
        <code className="px-1.5 py-0.5 bg-[var(--background-secondary)] text-[var(--text)] rounded text-[0.85em] font-mono">
          {children}
        </code>
      ) : (
        <code className="block p-4 bg-[var(--background-secondary)] text-[var(--text)] rounded-lg overflow-x-auto text-sm font-mono mb-4">
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <CodeBlock className="bg-[var(--background-secondary)] p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </CodeBlock>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--primary)] pl-4 italic text-[var(--text-secondary)] my-4">
        {children}
      </blockquote>
    ),
    // Internal links stay in-tab; only external ones open a new tab.
    a: ({ href, children }) => {
      const external = typeof href === 'string' && /^https?:/i.test(href)
      return (
        <a
          href={href}
          className={READING_LINK_CLASS}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
    img: ({ src, alt }) => (
      <Image
        src={typeof src === 'string' ? src : ''}
        alt={typeof alt === 'string' ? alt : ''}
        width={800}
        height={450}
        className="rounded-lg my-6 w-full h-auto"
        unoptimized
      />
    ),
    // Tables read as data, not prose - back to the UI sans
    table: ({ children }) => (
      <div className="overflow-x-auto my-6 rounded-lg border border-[var(--border)]">
        <table className="w-full font-sans text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-[var(--background-tertiary)]">{children}</thead>,
    th: ({ children }) => (
      <th className="px-4 py-3 text-left font-semibold text-[var(--text)] border-b border-[var(--border)]">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-3 text-[var(--text-secondary)] border-b border-[var(--border)]">{children}</td>
    ),
  }
}
