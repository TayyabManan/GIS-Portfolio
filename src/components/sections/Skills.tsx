'use client'

import React from 'react'
import { CheckCircleIcon, CodeBracketIcon, GlobeAltIcon, CircleStackIcon, CloudIcon, BeakerIcon } from '@heroicons/react/24/solid'
import { resumeData } from '@/lib/resume-data'

// Get icons for each category
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Programming Languages': CodeBracketIcon,
  'GIS & Remote Sensing': GlobeAltIcon,
  'Web Development': CodeBracketIcon,
  'Data Analysis & ML': BeakerIcon,
  'Databases': CircleStackIcon,
  'Cloud & Tools': CloudIcon,
}

// Group tools by category
const toolCategories = resumeData.skills.map(category => ({
  name: category.category,
  icon: categoryIcons[category.category] || CheckCircleIcon,
  items: category.items
}))

// Simple skill badge component
const SkillBadge = ({ name }: { name: string }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--background-secondary)] rounded-lg text-sm text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)] transition-all hover:scale-105">
      <CheckCircleIcon className="h-3.5 w-3.5 text-[var(--primary)]" />
      <span className="font-medium">{name}</span>
    </span>
  )
}

export default function Skills() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Simple background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-transparent" />

        {/* Static pattern */}
        <div className="absolute inset-0">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M10 10h20v20h-20z M50 10h20v20h-20z M10 50h20v20h-20z M50 50h20v20h-20z" fill="none" stroke="var(--skills-pattern-stroke)" strokeWidth="0.5" opacity="0.1" />
                <circle cx="20" cy="20" r="2" fill="var(--skills-pattern-stroke)" opacity="0.1" />
                <circle cx="60" cy="20" r="2" fill="var(--skills-pattern-stroke)" opacity="0.1" />
                <circle cx="20" cy="60" r="2" fill="var(--skills-pattern-stroke)" opacity="0.1" />
                <circle cx="60" cy="60" r="2" fill="var(--skills-pattern-stroke)" opacity="0.1" />
                <path d="M20 20h40 M20 60h40 M20 20v40 M60 20v40" stroke="var(--skills-pattern-stroke)" strokeWidth="0.5" opacity="0.05" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
        </div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-4" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>Skills & Expertise</h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Specialized in machine learning engineering with expertise across {resumeData.skills.length} technology domains,
            from deep learning frameworks to production MLOps and deployment.
          </p>
        </div>

        {/* Skills in Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {toolCategories.map((category) => {
            const Icon = category.icon

            return (
              <div
                key={category.name}
                className="group relative bg-[var(--background-secondary)] rounded-xl p-4 border border-[var(--border)] hover:border-[var(--primary)] transition-all hover:shadow-lg"
              >
                {/* Gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Compact Category Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="h-4 w-4 text-[var(--primary)] group-hover:scale-110 transition-transform" />
                    <h3 className="text-sm font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                      {category.name}
                    </h3>
                    <span className="ml-auto text-xs text-[var(--text-secondary)]">
                      {category.items.length}
                    </span>
                  </div>

                  {/* Skills as compact badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.items.map((item) => (
                      <SkillBadge
                        key={item}
                        name={item}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
