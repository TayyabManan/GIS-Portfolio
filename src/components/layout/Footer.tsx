'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'
import ObfuscatedEmail from '@/components/ui/ObfuscatedEmail'

// Monochrome hugging-face mark (premium pass: the full-color brand logo was
// the one foreign color left in the ink footer). Same stroke grammar as the
// lucide marks beside it; currentColor follows the link's hover.
const HuggingFaceIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="11" r="8" />
    <path d="M9 8.6h.01" />
    <path d="M15 8.6h.01" />
    <path d="M8.4 12.2c.9 2.5 6.3 2.5 7.2 0" />
    <path d="M4.6 16.2a2.1 2.1 0 0 0 2.9 1.9" />
    <path d="M19.4 16.2a2.1 2.1 0 0 1-2.9 1.9" />
  </svg>
)

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  const measure = useCallback(() => {
    if (containerRef.current) {
      setHeight(containerRef.current.scrollHeight)
    }
  }, [])

  useEffect(() => {
    measure()

    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(() => measure())
    observer.observe(el)

    // Re-measure after fonts load (large name text can shift)
    document.fonts?.ready?.then(measure)

    return () => observer.disconnect()
  }, [measure])

  return (
    <div
      className="site-footer relative"
      style={{ height: height || undefined, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
    >
      <footer
        className="fixed bottom-0 w-full border-t border-[var(--border)] shadow-2xl bg-[var(--background)]"
        style={{ height: height || undefined }}
      >
        {/* Inner container - natural flow, measured by ref */}
        <div ref={containerRef} className="flex flex-col">
          {/* One quiet line above the wordmark (premium pass): nav + email +
              social marks + mono meta. The wordmark reveal is the statement;
              this row just stays out of its way. */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-10 pb-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <Link href="/" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">Home</Link>
                <Link href="/projects" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">Projects</Link>
                <Link href="/blog" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">Blog</Link>
                <Link href="/about" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">About</Link>
                <Link href="/contact" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">Contact</Link>
                <Link href="/resume" className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">Resume</Link>
              </nav>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <ObfuscatedEmail className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]" />
                <span className="hidden h-4 w-px bg-[var(--border)] sm:block" aria-hidden="true" />
                <div className="-my-2 flex items-center gap-1">
                  <a href="https://github.com/TayyabManan" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" title="GitHub" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/tayyabmanan" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="https://huggingface.co/TayyabManan" target="_blank" rel="noopener noreferrer" aria-label="Hugging Face profile" title="Hugging Face" className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]">
                    <HuggingFaceIcon className="h-5 w-5" />
                  </a>
                </div>
                <span className="hidden h-4 w-px bg-[var(--border)] sm:block" aria-hidden="true" />
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                  Islamabad, Pakistan &middot; UTC+5
                </p>
              </div>
            </div>
          </div>

          {/* Large Name Display */}
          <div className="flex items-end justify-center pb-1 sm:pb-2 md:pb-3 px-4 sm:px-6 md:px-8 pointer-events-none">
            <div className="relative pr-4 sm:pr-8">
              {/* Decorative brand wordmark: a <p>, not an <h1>, so it doesn't
                  compete with each page's real heading for the sole H1 slot.
                  fontFamily restores the Bricolage Grotesque heading font, which
                  globals.css otherwise scopes only to h1-h6. */}
              <p
                style={{ fontFamily: 'var(--font-heading), system-ui, sans-serif' }}
                className="font-extrabold select-none leading-none tracking-tighter whitespace-nowrap text-[clamp(2rem,10vw,8rem)] sm:text-[12vw] md:text-[13vw] text-[var(--text)]"
              >
                Tayyab Manan
              </p>
              <span className="absolute top-0 -right-2 sm:-right-6 text-[3vw] sm:text-[2.5vw] md:text-[2vw] font-bold text-[var(--text)]">
                ©
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
