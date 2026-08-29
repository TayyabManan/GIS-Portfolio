'use client'

import { useEffect, useRef } from 'react'
import { resumeData, formatDate } from '@/lib/resume-data'
import Link from 'next/link'
import Image from 'next/image'
import FAQ from '@/components/ui/FAQ'
import { aboutFaqs } from '@/lib/faqs'
import { desktopMotionOK, MOTION, loadScrollCore } from '@/lib/gsap'
import { useSectionReveal } from '@/components/effects/useSectionReveal'
import { ScatterOutlier } from '@/components/effects/NotebookDoodles'

const skills = [
  'Machine Learning & Deep Learning (PyTorch, TensorFlow)',
  'Computer Vision & Image Processing',
  'Natural Language Processing (NLP)',
  'MLOps & Model Deployment',
  'Geospatial AI & Remote Sensing',
  'Multi-Agent AI Systems (LangChain, AutoGen, CrewAI)',
  'Python Programming & Data Engineering',
  'Full Stack Development (React, Next.js, FastAPI)'
]

const education = [
  {
    degree: 'Masters in Artificial Intelligence Engineering',
    school: 'COMSATS Islamabad',
    year: '2027 (Expected)',
    description: 'Graduate student specializing in computer vision, deep learning architectures, and practical AI system deployment.'
  },
  {
    degree: 'Bachelor of Science in Geographic Information Science',
    school: 'University of the Punjab, Lahore',
    year: '2025',
    description: 'Built quantitative skills in remote sensing, spatial statistics, and Python, turning satellite data into ML-ready datasets and models.'
  }
]

const experience = [
  {
    role: 'Junior AI Developer',
    company: 'Cointegration',
    period: 'Jan 2025 - Present',
    description: 'Build production ML models and multi-agent workflows with LangChain, AutoGen, and the Model Context Protocol. Shipped 5+ production models, reduced processing time by 40%, and automated workflows saving 15+ hours/week.'
  },
  {
    role: 'Projects & Research',
    company: 'WaterTrace & University Coursework',
    period: '2023 - Present',
    description: 'Built WaterTrace, an ML groundwater prediction system on 22 years of satellite data (R²=0.89), deployed full-stack with React and Flask. Alongside my coursework I keep building computer vision, NLP, and geospatial projects with PyTorch and TensorFlow.'
  }
]

export default function AboutPage() {
  const rootRef = useRef<HTMLDivElement>(null)

  // Certifications get the shared section reveal (the only [data-reveal-group] in scope).
  useSectionReveal(rootRef)

  // Timeline draw (desktop, fine-pointer only): each education/experience entry's
  // vertical line draws downward (an overlay span scaling from the top; the CSS
  // border-l-2 stays as the no-JS/mobile fallback and is made transparent only
  // while the effect is armed) as the entry's content fades in alongside it.
  // Play-once, not scrubbed - the per-item segments are discontinuous, and
  // scrubbing short segments reads as stutter. GSAP so it survives the global
  // prefers-reduced-motion rule; lazy so mobile never ships it.
  useEffect(() => {
    if (!rootRef.current) return
    if (!desktopMotionOK()) return
    let cancelled = false
    let revert: (() => void) | null = null
    loadScrollCore().then(({ gsap }) => {
      const root = rootRef.current
      if (cancelled || !root) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-tl-item]', root)
        const cleanups = items.map((item) => {
          // Anti-FOUC: never hide an entry the user can already meaningfully see.
          if (item.getBoundingClientRect().top < window.innerHeight - 40) return () => {}
          const line = item.querySelector<HTMLElement>('[data-tl-line]')
          const content = Array.from(item.children).filter((c) => c !== line) as HTMLElement[]
          gsap.set(item, { borderLeftColor: 'transparent' })
          gsap.set(content, { autoAlpha: 0, y: 16 })
          const tl = gsap.timeline({
            scrollTrigger: { trigger: item, start: 'top 82%', once: true },
            onComplete: () => gsap.set(content, { clearProps: 'transform,opacity,visibility' }),
          })
          if (line) tl.to(line, { scaleY: 1, duration: 0.5, ease: MOTION.ease })
          tl.to(
            content,
            { autoAlpha: 1, y: 0, duration: 0.5, ease: MOTION.ease, stagger: 0.08 },
            line ? '-=0.3' : 0
          )
          return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
          }
        })
        return () => cleanups.forEach((dispose) => dispose())
      })
      revert = () => mm.revert()
    }).catch(() => {
      // Progressive enhancement: a failed gsap chunk load leaves the timeline
      // fully visible with its static CSS border (nothing is hidden before this).
    })
    return () => {
      cancelled = true
      revert?.()
    }
  }, [])

  return (
    <div ref={rootRef} className="relative bg-[var(--background)] py-16 sm:py-24 min-h-[100dvh]">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Left aligned */}
        <div className="mb-16 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--text)] mb-4">About Me</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            AI/ML Engineer building machine learning systems across Computer Vision, NLP,
            and Geospatial AI. Open to full-time AI/ML roles.
          </p>
        </div>

        {/* Notebook doodle in the header's right whitespace - the circled
            outlier is a quiet self-portrait joke. No caption. */}
        <div className="doodle absolute right-12 top-6 hidden w-32 xl:block">
          <ScatterOutlier className="w-full" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Bio & Skills - Left side on desktop, order-1 on mobile */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <section>
              {/* Interior sections sit one step below the page-title scale
                  (text-2xl/3xl) - display-size H2s on utility sections read
                  as shouting. Headings speak the site voice, not resume-ese. */}
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-4">How I got here</h2>
              <div className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>
                  I got into AI through an unusual path: geography. During my Bachelor&apos;s in GIS at Punjab University,
                  I spent a lot of time working with satellite imagery and spatial data. At some point I realized the most
                  interesting problems I was solving all came down to building better models, so I leaned into that.
                  Now I&apos;m doing my Master&apos;s in AI Engineering at COMSATS University, Islamabad.
                </p>
                <p>
                  Alongside my studies, I work as a Junior AI Developer at Cointegration, where I build production ML models
                  and multi-agent systems with LangChain, AutoGen, and the Model Context Protocol. On the side, I take on
                  freelance projects. One example is WaterTrace, where I used 22 years of satellite data to predict groundwater
                  levels across 145 districts in Pakistan. I like working across the full stack, from training models in
                  PyTorch to deploying them behind Flask APIs with React frontends.
                </p>
                <p>
                  I&apos;m also going through AI training programs at Samsung Innovation Campus and AISkill Bridge
                  to fill gaps in my deep learning knowledge. I&apos;m open to full-time AI/ML roles where
                  I can work on real ML problems with a strong engineering team and learn from experienced people.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-4">What I work with</h2>
              {/* Plain two-column list in the body voice - the checkmark-icon
                  grid is retired (a checkmark asserts nothing the text
                  doesn't), and these are full phrases, so they read in Hanken
                  (owner call: mono annotation voice is for short labels).
                  Markers stay tertiary ink, not lime: the closed lime budget
                  doesn't include this list. */}
              <ul className="grid grid-cols-1 gap-x-10 gap-y-2.5 md:grid-cols-2">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-baseline gap-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                    <span aria-hidden="true" className="text-[var(--text-tertiary)]">·</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Profile - Right side on desktop, order-1 on mobile */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="relative aspect-square w-64 mx-auto mb-8 rounded-xl overflow-hidden shadow-[0_8px_30px_-4px_rgba(28,25,23,0.12)]">
              <Image
                src="/images/profile-picture.webp"
                alt="Tayyab Manan - AI/ML Engineer specializing in Computer Vision, NLP, and Geospatial AI"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
                priority
              />
            </div>

            {/* Plain text meta - the icon rows were the retired template
                generation; the words carry everything the pictograms did. */}
            <div className="space-y-1.5 text-center text-sm text-[var(--text-secondary)]">
              <p>Islamabad, Pakistan</p>
              <p>Available for remote work</p>
            </div>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <section>
            <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-[var(--text)]">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} data-tl-item className="relative border-l-2 border-[var(--primary-light)] pl-6 pb-6">
                  {/* Draw-on-scroll overlay; sits exactly over the 2px border (fallback for no-JS/mobile) */}
                  <span
                    aria-hidden="true"
                    data-tl-line
                    className="absolute -left-0.5 top-0 h-full w-0.5 origin-top bg-[var(--primary-light)]"
                    style={{ transform: 'scaleY(0)' }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--text)]">{edu.degree}</h3>
                    <span className="font-mono text-xs font-medium tracking-[0.08em] text-[var(--text-tertiary)]">{edu.year}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] font-medium mb-2">{edu.school}</p>
                  <p className="text-[var(--text-secondary)]">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="mb-6 text-2xl sm:text-3xl font-semibold text-[var(--text)]">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} data-tl-item className="relative border-l-2 border-[var(--primary-light)] pl-6 pb-6">
                  {/* Draw-on-scroll overlay; sits exactly over the 2px border (fallback for no-JS/mobile) */}
                  <span
                    aria-hidden="true"
                    data-tl-line
                    className="absolute -left-0.5 top-0 h-full w-0.5 origin-top bg-[var(--primary-light)]"
                    style={{ transform: 'scaleY(0)' }}
                  />
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--text)]">{exp.role}</h3>
                    <span className="font-mono text-xs font-medium tracking-[0.08em] text-[var(--text-tertiary)]">{exp.period}</span>
                  </div>
                  <p className="text-[var(--text-secondary)] font-medium mb-2">{exp.company}</p>
                  <p className="text-[var(--text-secondary)]">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Certifications */}
        <section data-reveal-group className="mt-12">
          <h2 data-reveal="heading" className="mb-6 text-2xl sm:text-3xl font-semibold text-[var(--text)]">Certifications</h2>
          {/* Hairline rows, single column - the old two-column grid ran
              ragged with five items. Linked names use the ink-link grammar
              (underline as affordance, WCAG G183). */}
          <ul className="max-w-3xl">
            {resumeData.certifications.map((cert, index) => (
              <li
                key={index}
                data-reveal="item"
                className="flex flex-col gap-1 border-t border-[var(--border)] py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div>
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--text)] underline decoration-[var(--text)]/30 underline-offset-[0.15em] transition-[text-decoration-color] duration-200 hover:decoration-[var(--text)]"
                    >
                      {cert.name}
                    </a>
                  ) : (
                    <h3 className="inline font-semibold text-[var(--text)]">{cert.name}</h3>
                  )}
                  <p className="text-sm text-[var(--text-secondary)]">{cert.issuer}</p>
                </div>
                <p className="shrink-0 font-mono text-xs font-medium tracking-[0.08em] text-[var(--text-secondary)]">
                  {formatDate(cert.date)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ + CTA side by side on desktop; the CTA fills the space beside
            the FAQ. They stack on mobile/tablet. */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-14">
          <FAQ items={aboutFaqs} />
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text)] mb-3">Let&apos;s Work Together</h2>
              <p className="text-[var(--text-secondary)] mb-6 text-base sm:text-lg">
                I&apos;m always up for new opportunities, collaborating on ML projects, or just trading
                notes on machine learning, computer vision, and MLOps.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-[var(--on-primary)] px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-200"
              >
                Get in Touch
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}