import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'

/**
 * Compact background strip (home restructure): education as quiet hairline
 * rows instead of cards - degree, institution, mono period, nothing else.
 * The detail (highlights, certifications, the journey) lives on /about,
 * which the section-end link points at. Non-interactive surface = static
 * ink, no hover styles. Carries its own data-reveal-group so it reveals
 * independently of the CallToAction card beside it (nesting groups would
 * double-arm the items).
 */
export default function Education() {
  const education = [
    {
      degree: "Master's in Artificial Intelligence Engineering",
      institution: 'COMSATS University Islamabad',
      period: '2025 - 2027 (expected)',
    },
    {
      degree: 'BS Geographic Information Science',
      institution: 'University of the Punjab, Lahore',
      period: '2021 - 2025',
    },
  ]

  return (
    <div data-reveal-group>
      <div data-reveal="heading">
        <Eyebrow index="03">Background</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-4xl">
          Education
        </h2>
      </div>

      <ul className="mt-8">
        {education.map((edu) => (
          <li
            key={edu.degree}
            data-reveal="item"
            className="flex flex-col gap-1 border-t border-[var(--border)] py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            <div>
              <h3 className="text-base font-semibold text-[var(--text)] sm:text-lg">{edu.degree}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{edu.institution}</p>
            </div>
            <p className="shrink-0 font-mono text-xs font-medium tracking-[0.08em] text-[var(--text-secondary)]">
              {edu.period}
            </p>
          </li>
        ))}
      </ul>

      <div data-reveal="item" className="border-t border-[var(--border)] pt-5">
        <Link
          href="/about"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
        >
          More about me
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
    </div>
  )
}
