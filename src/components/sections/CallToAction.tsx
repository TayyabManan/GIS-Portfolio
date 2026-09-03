import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

/**
 * Home-page CTA card. Sits in the right column beside the FAQ; keeps its
 * data-reveal-* hooks so HomeScrollEffects staggers it in on scroll. A single
 * "Get in Touch" action - the hero already links to the projects.
 */
export default function CallToAction() {
  return (
    <section
      data-reveal-group
      data-reveal-stagger="0.12"
      className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-8 sm:p-10"
    >
      <h2 data-reveal="item" className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-3">
        Looking for an ML engineer?
      </h2>
      <p data-reveal="item" className="text-base sm:text-lg text-[var(--text-secondary)] mb-6">
        I&apos;m looking for a full-time AI/ML role. If you have one, or a model that needs to
        reach production, send me a note.
      </p>
      <div data-reveal="item">
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3.5 text-base font-semibold text-[var(--on-primary)] transition-all duration-200 hover:bg-[var(--primary-hover)]"
        >
          Get in touch
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
