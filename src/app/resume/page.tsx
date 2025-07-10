'use client'

import { useState } from 'react'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { resumeData, formatDate, calculateDuration } from '@/lib/resume-data'
import { generateResumePDF } from '@/lib/pdf-utils'

export default function ResumePage() {
  const [downloading, setDownloading] = useState(false)

  const downloadPDF = async () => {
    setDownloading(true)
    try {
      await generateResumePDF(resumeData)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Download Button */}
      <div className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Resume</h1>
              <p className="text-sm sm:text-base text-gray-600">Muhammad Tayyab - GIS Analyst & Spatial Developer</p>
            </div>
            <button
              onClick={downloadPDF}
              disabled={downloading}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50"
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white" id="resume-content">
          {/* Header Section */}
          <div className="text-center mb-8 pb-6 border-b-2 border-gray-900">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {resumeData.personalInfo.name.toUpperCase()}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4">
              {resumeData.personalInfo.title}
            </p>
            <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-6 text-sm text-gray-600">
              <a href={`mailto:${resumeData.personalInfo.email}`} className="hover:text-gray-800 break-all">
                {resumeData.personalInfo.email}
              </a>
              <span>{resumeData.personalInfo.phone}</span>
              <span className="text-center">{resumeData.personalInfo.location}</span>
              <a href={resumeData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 break-all">
                {resumeData.personalInfo.github}
              </a>
              <a href={resumeData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 break-all">
                {resumeData.personalInfo.linkedin}
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-3 uppercase border-b border-gray-300">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {resumeData.personalInfo.summary}
            </p>
          </div>

          {/* Experience */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300">
              Professional Experience
            </h2>
            {resumeData.experience.map((job, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-base font-bold text-gray-900">{job.title}</h3>
                    <p className="text-gray-700 font-medium">{job.company}, {job.location}</p>
                  </div>
                  <div className="text-sm text-gray-600 sm:text-right">
                    <div>{formatDate(job.startDate)} - {formatDate(job.endDate)}</div>
                    <div className="text-xs">({calculateDuration(job.startDate, job.endDate)})</div>
                  </div>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  {job.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-sm">{desc}</li>
                  ))}
                </ul>
                <div className="mt-2">
                  <p className="text-xs text-gray-600">
                    <strong>Technologies:</strong> {job.technologies.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300">
              Education
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <div className="mb-2 sm:mb-0">
                    <h3 className="text-base font-bold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}, {edu.location}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 sm:text-right">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                {edu.achievements && (
                  <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
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
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeData.skills.map((skillGroup, index) => (
                <div key={index}>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {skillGroup.category}:
                  </h3>
                  <p className="text-sm text-gray-700 mb-3 break-words">
                    {skillGroup.items.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300">
              Key Projects
            </h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                  <h3 className="text-base font-bold text-gray-900 mb-2 sm:mb-0">{project.name}</h3>
                  <div className="text-xs text-gray-600 sm:text-right">
                    {project.url && (
                      <div className="mb-1">
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 break-all">
                          Demo: {project.url}
                        </a>
                      </div>
                    )}
                    {project.github && (
                      <div>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-800 break-all">
                          GitHub: {project.github}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-2">{project.description}</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4 mb-2">
                  {project.highlights.map((highlight, hlIndex) => (
                    <li key={hlIndex} className="text-sm">{highlight}</li>
                  ))}
                </ul>
                <p className="text-xs text-gray-600">
                  <strong>Technologies:</strong> {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          {resumeData.certifications.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300">
                Certifications
              </h2>
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="mb-1 sm:mb-0">
                      <h3 className="text-sm font-bold text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-700">{cert.issuer}</p>
                    </div>
                    <p className="text-sm text-gray-600">{formatDate(cert.date)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {resumeData.achievements.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-4 uppercase border-b border-gray-300">
                Achievements
              </h2>
              {resumeData.achievements.map((achievement, index) => (
                <div key={index} className="mb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                    <div className="mb-1 sm:mb-0">
                      <h3 className="text-sm font-bold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-700">{achievement.description}</p>
                    </div>
                    <p className="text-sm text-gray-600 sm:text-right">{achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}