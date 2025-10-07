'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { resumeData, formatDate } from '@/lib/resume-data'
import { generateResumePDF } from '@/lib/pdf-utils'
import ResumeChatbot from '@/components/ui/ResumeChatbot'

export default function ResumePage() {
  const [downloading, setDownloading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [dots, setDots] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([])

  useEffect(() => {
    setMounted(true)
    // Generate random positions for animated background dots
    const dotsArray = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 2
    }))
    setDots(dotsArray)
  }, [])

  const downloadPDF = async () => {
    setDownloading(true)
    try {
      await generateResumePDF(resumeData)
    } catch {
      // Error is handled in generateResumePDF
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background-tertiary)]" />
        
        {/* Document pattern - representing resume/document theme */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="document-pattern" x="0" y="0" width="100" height="120" patternUnits="userSpaceOnUse">
              <rect x="20" y="20" width="60" height="2" fill="var(--border)" opacity="0.1" />
              <rect x="20" y="30" width="50" height="2" fill="var(--border)" opacity="0.08" />
              <rect x="20" y="40" width="55" height="2" fill="var(--border)" opacity="0.06" />
              <rect x="20" y="60" width="40" height="2" fill="var(--border)" opacity="0.1" />
              <rect x="20" y="70" width="45" height="2" fill="var(--border)" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#document-pattern)" />
        </svg>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -60, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating document elements */}
        {mounted && (
          <div className="absolute inset-0">
            {dots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[var(--primary)]/20"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                }}
                animate={{
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  delay: dot.delay,
                }}
              />
            ))}
          </div>
        )}
      </div>
      {/* Header with Download Button */}
      <div className="bg-[var(--background)]/80 backdrop-blur-sm border-b border-[var(--border)] print:hidden relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold text-[var(--text)]">Resume</h1>
              <p className="text-sm sm:text-base text-[var(--text-secondary)]">Tayyab Manan - GIS Analyst & Full Stack Developer</p>
            </div>
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)] disabled:opacity-50 transition-colors"
            >
              {downloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating PDF...
                </>
              ) : (
                <>
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="bg-[var(--background)]/90 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8" id="resume-content">
          {/* Header Section */}
          <div className="text-center mb-8 pb-6 border-b-2 border-[var(--primary)]">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-2">
              {resumeData.personalInfo.name.toUpperCase()}
            </h2>
            <p className="text-base sm:text-lg text-[var(--text-secondary)] mb-4">
              {resumeData.personalInfo.title}
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-6 text-sm text-[var(--text-secondary)]">
              <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-[var(--primary)] break-all transition-colors">
                {resumeData.personalInfo.email}
              </a>
              <span>{resumeData.personalInfo.phone}</span>
              <span className="text-center">{resumeData.personalInfo.location}</span>
              <a href={resumeData.personalInfo.website} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
                Portfolio
              </a>
              <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
                GitHub
              </a>
              <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] transition-colors">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text)] mb-3 uppercase border-b border-[var(--border)]">
              Professional Summary
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4 uppercase border-b border-[var(--border)]">
              Professional Experience
            </h2>
            {resumeData.experience.map((job, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-base font-bold text-[var(--text)]">{job.title}</h3>
                    <p className="text-[var(--text-secondary)]">
                      <span className="font-bold">{job.company}</span>, {job.location}
                    </p>
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] sm:text-right">
                    {formatDate(job.startDate)} - {formatDate(job.endDate)}
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
                  {job.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-sm">{desc}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  <p className="text-xs text-[var(--text-secondary)]">
                    <strong>Technologies:</strong> {job.technologies.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4 uppercase border-b border-[var(--border)]">
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-base font-bold text-[var(--text)]">{edu.degree}</h3>
                    <p className="text-[var(--text-secondary)]">
                      <span className="font-bold">{edu.institution}</span>, {edu.location}
                    </p>
                    {edu.gpa && (
                      <p className="text-sm text-[var(--text-secondary)]">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] sm:text-right">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.achievements && (
                  <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4">
                    {edu.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-sm">{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4 uppercase border-b border-[var(--border)]">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeData.skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="text-sm font-bold text-[var(--text)] mb-1">
                    {skillGroup.category}:
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-3 break-words">
                    {skillGroup.items.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-[var(--text)] mb-4 uppercase border-b border-[var(--border)]">
              Key Projects
            </h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-base font-bold text-[var(--text)] mb-2 sm:mb-0">{project.name}</h3>
                  <div className="text-xs text-[var(--text-secondary)] sm:text-right space-x-3">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] inline-block">
                        {project.urlText || 'View Project'}
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--primary)] inline-block">
                        {project.githubText || 'GitHub'}
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-2">{project.description}</p>
                <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] ml-4 mb-2">
                  {project.highlights.map((highlight, hlIndex) => (
                    <li key={hlIndex} className="text-sm">{highlight}</li>
                  ))}
                </ul>
                <p className="text-xs text-[var(--text-secondary)]">
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[var(--text)] mb-4 uppercase border-b border-[var(--border)]">
                Certifications
              </h2>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="mb-1 sm:mb-0">
                      <h3 className="text-sm font-bold text-[var(--text)]">{cert.name}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">
                        <span className="font-bold">{cert.issuer}</span>
                      </p>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)]">{formatDate(cert.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {resumeData.achievements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-[var(--text)] mb-4 uppercase border-b border-[var(--border)]">
                Achievements
              </h2>
              {resumeData.achievements.map((achievement, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="mb-1 sm:mb-0">
                      <h3 className="text-sm font-bold text-[var(--text)]">{achievement.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)]">{achievement.description}</p>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] sm:text-right">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Resume Chatbot */}
      <ResumeChatbot />
    </div>
  )
}