'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircleIcon, CodeBracketIcon, GlobeAltIcon, CircleStackIcon, CloudIcon, BeakerIcon } from '@heroicons/react/24/solid'
import { resumeData } from '@/lib/resume-data'

// Map skill categories to proficiency levels for progress bars
const skillLevels: Record<string, number> = {
  'Programming Languages': 90,
  'GIS & Remote Sensing': 95,
  'Web Development': 85,
  'Data Analysis & ML': 82,
  'Databases': 88,
  'Cloud & Tools': 80,
}

// Convert resume skills to the format needed for progress bars
const skills = resumeData.skills.map(category => ({
  name: category.category,
  level: skillLevels[category.category] || 75
}))

// Get icons for each category
const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Programming Languages': CodeBracketIcon,
  'GIS & Remote Sensing': GlobeAltIcon,
  'Web Development': CodeBracketIcon,
  'Data Analysis & ML': BeakerIcon,
  'Databases': CircleStackIcon,
  'Cloud & Tools': CloudIcon,
}

// Group tools by category for tabbed display
const toolCategories = resumeData.skills.map(category => ({
  name: category.category,
  icon: categoryIcons[category.category] || CheckCircleIcon,
  items: category.items
}))

// Progress bar component with animation
const SkillBar = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(skill.level)
    }, 500 + index * 200) // Stagger the animations

    return () => clearTimeout(timer)
  }, [skill.level, index])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex justify-between">
        <span className="text-sm font-medium text-[var(--text)]">{skill.name}</span>
        <span className="text-sm text-[var(--text-secondary)]">{skill.level}%</span>
      </div>
      <div className="w-full bg-[var(--border)] rounded-full h-2">
        <div
          className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(0)

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
            Bridging the gap between geospatial analysis and modern software development, 
            with expertise across {resumeData.skills.length} specialized technology domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills with Progress Bars */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--text)] mb-6">Technical Proficiency</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Tools & Technologies - Compact Tabbed View */}
          <div>
            <h3 className="text-xl font-semibold text-[var(--text)] mb-6">Technologies & Frameworks</h3>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {toolCategories.map((category, index) => {
                const Icon = category.icon
                return (
                  <motion.button
                    key={category.name}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedCategory(index)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCategory === index
                        ? 'bg-[var(--primary)] text-white'
                        : 'bg-[var(--background-secondary)] text-[var(--text-secondary)] hover:bg-[var(--background-tertiary)]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{category.name.split('&')[0].trim()}</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Category Content */}
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--background-secondary)] rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                {React.createElement(toolCategories[selectedCategory].icon, {
                  className: "h-5 w-5 text-[var(--primary)]"
                })}
                <h4 className="font-medium text-[var(--text)]">
                  {toolCategories[selectedCategory].name}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {toolCategories[selectedCategory].items.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--background)] rounded-full text-sm"
                  >
                    <CheckCircleIcon className="h-3.5 w-3.5 text-[var(--primary)]" />
                    <span className="text-[var(--text)]">{item}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Skills Summary */}
            <div className="mt-4 p-3 bg-[var(--background-secondary)] rounded-lg">
              <p className="text-xs text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--primary)]">{resumeData.skills.reduce((acc, cat) => acc + cat.items.length, 0)}</span> total technologies across{' '}
                <span className="font-semibold text-[var(--primary)]">{resumeData.skills.length}</span> specialized areas
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}