'use client'

import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { MapPinIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const skills = [
  'Spatial Analysis & Modeling',
  'Web Development (React, Node.js)',
  'Database Management (PostGIS, PostgreSQL)',
  'Python Programming & Automation',
  'Machine Learning for Spatial Data',
  'Project Management & Communication'
]

const education = [
  {
    degree: 'Bachelor of Science in Geographic Information Systems',
    school: 'University of the Punjab',
    year: '2025',
    description: 'Specialized in spatial analysis, remote sensing, and GIS application development.'
  }
]

const experience = [
  {
    role: 'AI Developer',
    company: 'Cointegration',
    period: '2023 - Present',
    description: 'Using Machine Learning techniques to create RAG bots and scrape web data.'
  }
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="relative bg-[var(--background)] py-16 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-light)] via-[var(--background)] to-[var(--accent)] opacity-30" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-96 h-96 bg-[var(--primary)] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[var(--accent)] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -80, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.05]" />
        
        {/* Floating icons */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${15 + (i * 10)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <div className="w-12 h-12 border-2 border-[var(--border)] rounded-lg opacity-20" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">About Me</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            Passionate GIS professional with expertise in spatial analysis, web development, 
            and innovative solutions for complex geographic challenges.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Profile */}
          <div className="lg:col-span-1">
            <div className="relative aspect-square w-64 mx-auto mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/images/profile.jpg"
                alt="Tayyab Manan - GIS Analyst"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
                priority
              />
            </div>
            
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                <MapPinIcon className="h-5 w-5" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Available for Remote Work</span>
              </div>
            </div>
          </div>

          {/* Bio & Skills */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Professional Summary</h2>
              <div className="prose prose-lg text-[var(--text-secondary)]">
                <p className="mb-4">
                  I&apos;m a dedicated GIS analyst with a passion for transforming complex spatial data 
                  into actionable insights. With a strong foundation in both traditional GIS methodologies 
                  and modern web development, I bridge the gap between technical analysis and 
                  user-friendly applications.
                </p>
                <p className="mb-4">
                  My expertise spans urban planning, environmental analysis, and real-time data 
                  visualization. I specialize in developing full-stack GIS applications that combine 
                  robust spatial analysis with intuitive user interfaces, making complex geographic 
                  information accessible to diverse stakeholders.
                </p>
                <p>
                  Currently focused on leveraging machine learning and real-time data processing 
                  to solve urban mobility challenges and optimize transportation systems.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Core Competencies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-[var(--primary)] flex-shrink-0" />
                    <span className="text-[var(--text-secondary)]">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <AcademicCapIcon className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-bold text-[var(--text)]">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-[var(--primary-light)] pl-6 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--text)]">{edu.degree}</h3>
                    <span className="text-sm text-[var(--primary)] font-medium">{edu.year}</span>
                  </div>
                  <p className="text-[var(--primary)] font-medium mb-2">{edu.school}</p>
                  <p className="text-[var(--text-secondary)]">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseIcon className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-bold text-[var(--text)]">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-[var(--primary-light)] pl-6 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--text)]">{exp.role}</h3>
                    <span className="text-sm text-[var(--primary)] font-medium">{exp.period}</span>
                  </div>
                  <p className="text-[var(--primary)] font-medium mb-2">{exp.company}</p>
                  <p className="text-[var(--text-secondary)]">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-[var(--background-secondary)] rounded-2xl p-8 border border-[var(--border)]">
          <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Let&apos;s Work Together</h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-2xl mx-auto">
            I&apos;m always interested in discussing new opportunities, collaborating on innovative 
            projects, or sharing insights about spatial analysis and GIS development.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center bg-[var(--primary)] text-white px-6 py-3 rounded-md font-medium hover:bg-[var(--primary-hover)] transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  )
}