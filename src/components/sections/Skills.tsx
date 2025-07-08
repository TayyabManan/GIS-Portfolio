'use client'

import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const skills = [
  { name: 'Spatial Analysis & Modeling', level: 95 },
  { name: 'Web Development (React, Node.js)', level: 85 },
  { name: 'Database Management (PostGIS)', level: 90 },
  { name: 'Python Programming', level: 88 },
  { name: 'Machine Learning for Spatial Data', level: 80 },
  { name: 'Project Management', level: 75 },
]

const tools = [
  'ArcGIS Pro', 'QGIS', 'PostGIS', 'React.js', 'Node.js', 
  'Python', 'JavaScript', 'Docker', 'AWS', 'PostgreSQL'
]

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
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill.name}</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${animatedLevel}%` }}
        />
      </div>
    </motion.div>
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
        
        {/* Animated skill elements */}
        <div className="absolute inset-0">
          {/* Circuit board pattern - representing technical skills */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <path d="M10 10h20v20h-20z M50 10h20v20h-20z M10 50h20v20h-20z M50 50h20v20h-20z" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.1" />
                <circle cx="20" cy="20" r="2" fill="#8b5cf6" opacity="0.1" />
                <circle cx="60" cy="20" r="2" fill="#8b5cf6" opacity="0.1" />
                <circle cx="20" cy="60" r="2" fill="#8b5cf6" opacity="0.1" />
                <circle cx="60" cy="60" r="2" fill="#8b5cf6" opacity="0.1" />
                <path d="M20 20h40 M20 60h40 M20 20v40 M60 20v40" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.05" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
          </svg>
          
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, 80, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              x: [0, -80, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 22,
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
                  className="absolute text-2xl font-bold text-purple-600/20 dark:text-purple-400/20"
                  style={{
                    left: `${10 + (i * 11)}%`,
                    top: `${15 + (i * 8)}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.6, 0.2],
                    rotate: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.4,
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
                  className="absolute w-8 h-8 text-blue-600/20 dark:text-blue-400/20"
                  style={{
                    right: `${10 + (i * 15)}%`,
                    top: `${20 + (i * 15)}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "linear"
                    },
                    scale: {
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
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
                    background: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#06b6d4',
                    boxShadow: `0 0 20px ${i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#06b6d4'}`
                  }}
                  animate={{
                    y: [0, -25, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.5,
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive skill set combining traditional GIS analysis with modern 
            web development technologies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills with Progress Bars */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Core Competencies</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Tools & Technologies</h3>
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <CheckCircleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tool}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}