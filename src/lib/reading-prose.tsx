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
 * Block rhythm (typography audit, Aug 2026): every block element closes with
 * mb-6 (24px) - paragraphs, lists, code, blockquotes, and the my-6 figures and
 * tables. The gap used to be mb-4 (16px), only 0.55x the 28.9px line-height,
 * so paragraph breaks read as line wraps. Headings then step ABOVE that gap
 * (h2 mt-12 = 48px, h3 mt-8 = 32px) and stay tight below it (mb-4 / mb-3), so
 * a heading sits closer to the text it introduces than two paragraphs sit to
 * each other. Keep the ladder intact: heading-top > block gap > heading-bottom.
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
      <h2 id={id(children)} className="text-3xl font-semibold tracking-tight text-[var(--text)] mt-12 mb-4">
        {children}
      </h2>
    ),
    h2: ({ children }) => (
      <h2 id={id(children)} className="text-2xl font-semibold tracking-tight text-[var(--text)] mt-12 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={id(children)} className="text-xl font-semibold tracking-tight text-[var(--text)] mt-8 mb-3">
        {children}
      </h3>
    ),
    // A paragraph whose ONLY child is an image unwraps: the img renderer
    // returns a <figure>, and figure-in-p is invalid HTML (the browser
    // auto-closes the <p> when parsing SSR output, then hydration mismatches).
    // Authors keep images on their own markdown line, which is already the
    // convention.
    p: ({ node, children }) => {
      const only = node && node.children.length === 1 ? node.children[0] : null
      if (only && only.type === 'element' && only.tagName === 'img') return <>{children}</>
      return <p className="mb-6">{children}</p>
    },
    // Hanging markers (book style): the marker sits in the padding and wrapped
    // lines align with the first line's text, not under the bullet.
    ul: ({ children }) => <ul className="list-disc list-outside pl-[1.625em] space-y-2 mb-6">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-outside pl-[1.625em] space-y-2 mb-6">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-[var(--text)]">{children}</strong>,
    code: ({ children, className }) => {
      const isInline = !className
      return isInline ? (
        <code className="px-1.5 py-0.5 bg-[var(--background-secondary)] text-[var(--text)] rounded text-[0.85em] font-mono">
          {children}
        </code>
      ) : (
        <code className="block p-4 bg-[var(--background-secondary)] text-[var(--text)] rounded-lg overflow-x-auto text-sm font-mono mb-6">
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <CodeBlock className="bg-[var(--background-secondary)] p-4 rounded-lg overflow-x-auto mb-6">
        {children}
      </CodeBlock>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--primary)] pl-4 italic text-[var(--text-secondary)] my-6">
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
    // Product-evidence figure (the ink mat): every body image renders inside
    // a stone-surface frame with a hairline border and the alt text repeated
    // as a mono annotation caption (aria-hidden - the img alt already speaks
    // for screen readers). A markdown title of "app" adds the browser-chrome
    // dot row for live-product screenshots: `![caption](/path "app")` -
    // monochrome hairline dots, never traffic-light colors. Charts/diagrams
    // omit the title and get the plain mat. Capture recipe + rationale:
    // DESIGN_SYSTEM.md "Evidence figures". Optimized via next.config images;
    // external hosts need a remotePatterns entry. 800x450 hints match the
    // 1600x900 capture geometry, so no layout shift.
    img: ({ src, alt, title }) => {
      const caption = typeof alt === 'string' && alt.length > 0 ? alt : null
      return (
        <figure className="my-6 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background-secondary)]">
          {title === 'app' && (
            <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-[var(--border)] px-4 py-2.5">
              <span className="h-2 w-2 rounded-full border border-[var(--border-hover)]" />
              <span className="h-2 w-2 rounded-full border border-[var(--border-hover)]" />
              <span className="h-2 w-2 rounded-full border border-[var(--border-hover)]" />
            </div>
          )}
          <Image
            src={typeof src === 'string' ? src : ''}
            alt={caption ?? ''}
            width={800}
            height={450}
            sizes="(min-width: 1024px) 680px, 100vw"
            className="w-full h-auto"
          />
          {caption && (
            <figcaption
              aria-hidden="true"
              className="border-t border-[var(--border)] px-4 py-2.5 font-mono text-[11px] tracking-[0.08em] text-[var(--text-secondary)]"
            >
              {caption}
            </figcaption>
          )}
        </figure>
      )
    },
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
