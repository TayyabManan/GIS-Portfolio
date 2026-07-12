'use client'

import Link from 'next/link'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Scatter404 } from '@/components/effects/NotebookDoodles'

/**
 * The delight page (kill-boring pass): the accent floods, the notebook motif
 * goes maximal, and the lost page is literally the outlier on the plot.
 * Ink colors come from the .flood-404 scope in globals.css (theme-aware,
 * degrades to plain HC palette automatically). Next.js injects
 * <meta name="robots" content="noindex"> on not-found renders by itself.
 */
export default function NotFound() {
  return (
    // One centered column that fills <main> (which the flex rule in globals.css
    // sizes to exactly the space under the header - no hardcoded height). min-h
    // (not fixed h) + no overflow-hidden means a genuinely short viewport grows
    // and scrolls gracefully instead of clipping the nav links. The scatter is
    // capped by viewport height so it shrinks first on short screens.
    <div className="flood-404 relative flex min-h-full flex-col items-center justify-center gap-4 px-4 py-6 text-center">
      {/* The motif moment: a scatter where this page is the circled outlier.
          Capped by viewport HEIGHT so it's the first thing to shrink on short
          screens; the 280px ceiling keeps it from ballooning on tall ones. */}
      <div className="w-full text-[var(--on-flood)]">
        <Scatter404 className="mx-auto h-auto max-h-[min(280px,26vh)] w-auto max-w-full" />
        <p className="font-mono text-xs sm:text-sm tracking-[0.08em] mt-1">
          you are here (n=1)
        </p>
      </div>

      {/* Headline block */}
      <div className="max-w-xl">
        <h1 className="text-6xl sm:text-7xl font-bold text-[var(--on-flood-strong)] mb-2">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--on-flood)] mb-3">
          This page is the outlier.
        </h2>
        <p className="text-base sm:text-lg text-[var(--on-flood)]/80">
          Whatever was here didn&apos;t make it to production. Every other
          route still resolves. Pick one below.
        </p>
      </div>

      {/* Buttons - ink-on-marker */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 bg-[var(--flood-btn-bg)] text-[var(--flood-btn-ink)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--flood-btn-bg-hover)] transition-colors"
        >
          <HomeIcon className="h-5 w-5" />
          Back to Home
        </Link>

        <button
          onClick={() => {
            if (window.history.length > 1) {
              window.history.back()
            } else {
              window.location.href = '/'
            }
          }}
          className="inline-flex items-center justify-center gap-2 bg-transparent text-[var(--on-flood)] px-6 py-3 rounded-lg font-semibold border-2 border-current hover:bg-[var(--on-flood)]/10 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5" />
          Go Back
        </button>
      </div>

      {/* Quick links */}
      <div className="w-full max-w-md border-t border-[var(--on-flood)]/25 pt-5">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-[var(--on-flood)]/70 mb-3">
          Known-good routes:
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { name: 'Projects', href: '/projects' },
            { name: 'Blog', href: '/blog' },
            { name: 'About', href: '/about' },
            { name: 'Contact', href: '/contact' }
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[var(--on-flood)] underline underline-offset-2 font-medium hover:opacity-70 transition-opacity"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
