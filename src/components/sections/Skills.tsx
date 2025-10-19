'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
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
const SkillBadge = ({ name, index }: { name: string, index: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--background-secondary)] rounded-lg text-sm text-[var(--text)] border border-[var(--border)] hover:border-[var(--primary)] transition-all hover:scale-105"
    >
      <CheckCircleIcon className="h-3.5 w-3.5 text-[var(--primary)]" />
      <span className="font-medium">{name}</span>
    </motion.span>
  )
}

export default function Skills() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated skills-themed background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--skills-gradient-start)] via-[var(--skills-gradient-mid)] to-[var(--skills-gradient-end)]" />
        
        {/* Animated skill elements */}
        <div className="absolute inset-0">
          {/* Circuit board pattern - representing technical skills */}
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
          
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-64 h-64 bg-[var(--skills-orb-primary)] rounded-full blur-3xl opacity-10"
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-64 h-64 bg-[var(--skills-orb-secondary)] rounded-full blur-3xl opacity-10"
            animate={{
              x: [0, -30, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Floating skill icons */}
          {mounted && (
            <div className="absolute inset-0">
              {/* Code symbols */}
              {['{', '}', '<', '>', '/', '*', '+', '='].map((symbol, i) => (
                <motion.div
                  key={`symbol-${i}`}
                  className="absolute text-xl font-bold opacity-5"
                  style={{
                    left: `${10 + (i * 11)}%`,
                    top: `${15 + (i * 8)}%`,
                    color: 'var(--skills-float-color)'
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.05, 0.1, 0.05],
                  }}
                  transition={{
                    duration: 8 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.8,
                    ease: "easeInOut"
                  }}
                >
                  {symbol}
                </motion.div>
              ))}
              
              {/* Gear symbols for technical skills */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`gear-${i}`}
                  className="absolute w-6 h-6 opacity-5"
                  style={{
                    right: `${10 + (i * 15)}%`,
                    top: `${20 + (i * 15)}%`,
                    color: 'var(--skills-gear-color)'
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    rotate: {
                      duration: 60 + i * 10,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                >
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </motion.div>
              ))}
              
              {/* Floating data points */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: `${20 + (i * 12)}%`,
                    bottom: `${10 + (i * 8)}%`,
                    background: i % 3 === 0 ? 'var(--skills-float-color)' : i % 3 === 1 ? 'var(--skills-float-color-alt)' : 'var(--info)',
                    boxShadow: `0 0 20px ${i % 3 === 0 ? 'var(--skills-float-color)' : i % 3 === 1 ? 'var(--skills-float-color-alt)' : 'var(--info)'}`
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 6 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
      
      {/* Content with higher z-index */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[var(--text)] mb-4">Skills & Expertise</h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
            Combining full-stack development expertise with advanced GIS capabilities,
            delivering innovative solutions across {resumeData.skills.length} specialized technology domains.
          </p>
        </motion.div>

        {/* Skills in Compact Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
          {toolCategories.map((category, categoryIndex) => {
            const Icon = category.icon

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.08 }}
                viewport={{ once: true }}
                className="group relative bg-[var(--background-secondary)] rounded-xl p-4 border border-[var(--border)] hover:border-[var(--primary)] transition-all hover:shadow-lg"
              >
                {/* Animated gradient background on hover */}
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
                    {category.items.map((item, index) => (
                      <SkillBadge
                        key={item}
                        name={item}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}