'use client'

import { motion } from 'framer-motion'
import { AcademicCapIcon, BookOpenIcon, TrophyIcon } from '@heroicons/react/24/outline'

export default function Education() {
  const education = [
    {
      degree: "Master's in Artificial Intelligence Engineering",
      institution: "COMSATS University Islamabad",
      period: "2025 - 2027 (Expected)",
      status: "In Progress",
      icon: AcademicCapIcon,
      highlights: [
        "Focus: Deep Learning, Computer Vision, NLP",
        "Excellence in AI Engineering with focus on Computer Vision"
      ]
    },
    {
      degree: "Bachelor of Science in GIS",
      institution: "University of the Punjab, Lahore",
      period: "2021 - 2025",
      status: "Completed",
      icon: BookOpenIcon,
      highlights: [
        "Outstanding performance in GIS and Remote Sensing",
        "Strong foundation in geospatial analysis and environmental data"
      ]
    }
  ]

  return (
    <section className="py-16 sm:py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Education
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)]">
            My academic journey in AI and Machine Learning
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg"
            >
              {/* Status Badge */}
              <div className="absolute top-6 right-6">
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                  edu.status === 'In Progress'
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                    : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                }`}>
                  {edu.status === 'In Progress' && (
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  )}
                  {edu.status}
                </span>
              </div>

              {/* Icon */}
              <div className="flex items-center gap-4 mb-4 pr-24 sm:pr-28">
                <div className="p-3 bg-[var(--primary)]/10 rounded-xl flex-shrink-0">
                  <edu.icon className="h-8 w-8 text-[var(--primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--text)] break-words">
                    {edu.degree}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium">
                    {edu.institution}
                  </p>
                </div>
              </div>

              {/* Period */}
              <p className="text-sm text-[var(--text-tertiary)] mb-4">
                {edu.period}
              </p>

              {/* Highlights */}
              <ul className="space-y-2">
                {edu.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                    <span className="text-[var(--accent)] mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Academic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-6 text-center">
            <TrophyIcon className="h-8 w-8 text-[var(--accent)] mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Relevant Coursework</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Deep Learning, Machine Learning, Neural Networks, Computer Vision, NLP, Remote Sensing
            </p>
          </div>

          <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-6 text-center">
            <BookOpenIcon className="h-8 w-8 text-[var(--info)] mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Technical Skills</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              PyTorch, TensorFlow, Python, QGIS, Google Earth Engine, React, Next.js
            </p>
          </div>

          <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-6 text-center">
            <AcademicCapIcon className="h-8 w-8 text-[var(--primary)] mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-[var(--text)] mb-2">Research Interests</h4>
            <p className="text-sm text-[var(--text-secondary)]">
              Geospatial AI, Environmental Monitoring, Computer Vision, Time-Series Forecasting
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
