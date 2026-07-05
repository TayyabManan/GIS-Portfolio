import Link from 'next/link'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

/**
 * Home-page CTA. Rendered as a self-contained card so it can sit in the right
 * column beside the FAQ. Keeps its data-reveal-* hooks so HomeScrollEffects
 * still staggers it in on scroll.
 */
export default function CallToAction() {
  return (
    <section
      data-reveal-group
      data-reveal-stagger="0.12"
      className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-8 sm:p-10"
    >
      <div data-reveal="item" className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary)] rounded-full mb-5">
        <SparklesIcon className="w-5 h-5 text-white" />
        <span className="text-sm font-semibold text-white uppercase tracking-wider">Let&apos;s Connect</span>
      </div>
      <h2 data-reveal="item" className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-3">
        Interested in collaborating?
      </h2>
      <p data-reveal="item" className="text-base sm:text-lg text-[var(--text-secondary)] mb-6">
        I build production ML systems and I&apos;m looking for the right team to do it with. Happy to
        talk about roles, projects, or just trade notes on AI.
      </p>
      <div data-reveal="item" className="flex flex-col gap-3">
        <Link
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:bg-[var(--primary-hover)]"
        >
          Get in Touch
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/projects"
          className="group inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--border)] bg-[var(--background)] px-6 py-3.5 text-base font-semibold text-[var(--text)] transition-all duration-200 hover:border-[var(--primary)] hover:text-[var(--primary)]"
        >
          View My Work
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
