import jsPDF from 'jspdf'
import { ResumeData, formatDate, calculateDuration } from './resume-data'

export async function generateResumePDF(resumeData: ResumeData): Promise<void> {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  // Page dimensions and margins
  const pageWidth = 210
  const pageHeight = 297
  const margin = 20
  const contentWidth = pageWidth - 2 * margin
  let currentY = margin

  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight: number) => {
    if (currentY + requiredHeight > pageHeight - margin) {
      pdf.addPage()
      currentY = margin
    }
  }

  // Helper function to add text with word wrap
  const addText = (text: string, fontSize: number, isBold: boolean = false, maxWidth: number = contentWidth) => {
    pdf.setFontSize(fontSize)
    pdf.setFont('helvetica', isBold ? 'bold' : 'normal')
    const lines = pdf.splitTextToSize(text, maxWidth)
    const lineHeight = fontSize * 0.35
    
    checkPageBreak(lines.length * lineHeight)
    
    for (let i = 0; i < lines.length; i++) {
      pdf.text(lines[i], margin, currentY)
      currentY += lineHeight
    }
    return currentY
  }

  // Header
  pdf.setFontSize(18)
  pdf.setFont('helvetica', 'bold')
  const nameWidth = pdf.getTextWidth(resumeData.personalInfo.name.toUpperCase())
  pdf.text(resumeData.personalInfo.name.toUpperCase(), (pageWidth - nameWidth) / 2, currentY)
  currentY += 8

  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'normal')
  const titleWidth = pdf.getTextWidth(resumeData.personalInfo.title)
  pdf.text(resumeData.personalInfo.title, (pageWidth - titleWidth) / 2, currentY)
  currentY += 6

  // Contact info
  pdf.setFontSize(9)
  const contactLine1 = `${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}`
  const contactLine2 = `${resumeData.personalInfo.github} | ${resumeData.personalInfo.linkedin}`
  
  const contact1Width = pdf.getTextWidth(contactLine1)
  const contact2Width = pdf.getTextWidth(contactLine2)
  
  pdf.text(contactLine1, (pageWidth - contact1Width) / 2, currentY)
  currentY += 4
  pdf.text(contactLine2, (pageWidth - contact2Width) / 2, currentY)
  currentY += 8

  // Add line under header
  pdf.setLineWidth(0.5)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 8

  // Professional Summary
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFESSIONAL SUMMARY', margin, currentY)
  currentY += 2
  
  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 6
  
  addText(resumeData.personalInfo.summary, 10)
  currentY += 6

  // Experience
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFESSIONAL EXPERIENCE', margin, currentY)
  currentY += 2
  
  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 6

  resumeData.experience.forEach((job) => {
    checkPageBreak(25)
    
    // Job title and dates
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(job.title, margin, currentY)
    
    const dateText = `${formatDate(job.startDate)} - ${formatDate(job.endDate)}`
    const dateWidth = pdf.getTextWidth(dateText)
    pdf.text(dateText, pageWidth - margin - dateWidth, currentY)
    currentY += 4
    
    // Company
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${job.company}, ${job.location}`, margin, currentY)
    currentY += 4
    
    // Duration
    pdf.setFontSize(9)
    pdf.text(`(${calculateDuration(job.startDate, job.endDate)})`, margin, currentY)
    currentY += 4
    
    // Description
    job.description.forEach((desc) => {
      checkPageBreak(8)
      pdf.setFontSize(9)
      pdf.text('• ' + desc, margin + 5, currentY)
      const lines = pdf.splitTextToSize(desc, contentWidth - 10)
      currentY += lines.length * 3.5
    })
    
    // Technologies
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    const techLabel = 'Technologies: '
    pdf.text(techLabel, margin, currentY)
    pdf.setFont('helvetica', 'normal')
    const techWidth = pdf.getTextWidth(techLabel)
    pdf.text(job.technologies.join(', '), margin + techWidth + 1, currentY)
    currentY += 8
  })

  // Education
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EDUCATION', margin, currentY)
  currentY += 2
  
  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 6

  resumeData.education.forEach((edu) => {
    checkPageBreak(15)
    
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.degree, margin, currentY)
    
    const eduDate = `${edu.startDate} - ${edu.endDate}`
    const eduDateWidth = pdf.getTextWidth(eduDate)
    pdf.text(eduDate, pageWidth - margin - eduDateWidth, currentY)
    currentY += 4
    
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`${edu.institution}, ${edu.location}`, margin, currentY)
    currentY += 4
    
    if (edu.gpa) {
      pdf.setFontSize(9)
      pdf.text(`GPA: ${edu.gpa}`, margin, currentY)
      currentY += 4
    }
    
    if (edu.achievements) {
      edu.achievements.forEach((achievement) => {
        checkPageBreak(6)
        pdf.setFontSize(9)
        pdf.text('• ' + achievement, margin + 5, currentY)
        currentY += 3.5
      })
    }
    currentY += 4
  })

  // Skills
  checkPageBreak(30)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('TECHNICAL SKILLS', margin, currentY)
  currentY += 2
  
  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 6

  const skillsPerRow = 2
  const skillWidth = contentWidth / skillsPerRow
  
  for (let i = 0; i < resumeData.skills.length; i += skillsPerRow) {
    checkPageBreak(15)
    
    for (let j = 0; j < skillsPerRow && i + j < resumeData.skills.length; j++) {
      const skill = resumeData.skills[i + j]
      const xPos = margin + j * skillWidth
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text(skill.category + ':', xPos, currentY)
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      const skillText = skill.items.join(', ')
      const skillLines = pdf.splitTextToSize(skillText, skillWidth - 10)
      
      for (let k = 0; k < skillLines.length; k++) {
        pdf.text(skillLines[k], xPos, currentY + 4 + k * 3.5)
      }
    }
    currentY += 15
  }

  // Projects
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('KEY PROJECTS', margin, currentY)
  currentY += 2
  
  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 6

  resumeData.projects.forEach((project) => {
    checkPageBreak(25)
    
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(project.name, margin, currentY)
    currentY += 4
    
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    if (project.url) {
      pdf.text(`Demo: ${project.url}`, margin, currentY)
      currentY += 3.5
    }
    if (project.github) {
      pdf.text(`GitHub: ${project.github}`, margin, currentY)
      currentY += 3.5
    }
    
    pdf.setFontSize(10)
    addText(project.description, 10)
    currentY += 2
    
    project.highlights.forEach((highlight) => {
      checkPageBreak(6)
      pdf.setFontSize(9)
      pdf.text('• ' + highlight, margin + 5, currentY)
      const lines = pdf.splitTextToSize(highlight, contentWidth - 10)
      currentY += lines.length * 3.5
    })
    
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    const projectTechLabel = 'Technologies: '
    pdf.text(projectTechLabel, margin, currentY)
    pdf.setFont('helvetica', 'normal')
    const projectTechWidth = pdf.getTextWidth(projectTechLabel)
    pdf.text(project.technologies.join(', '), margin + projectTechWidth + 1, currentY)
    currentY += 8
  })

  // Certifications
  if (resumeData.certifications.length > 0) {
    checkPageBreak(20)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('CERTIFICATIONS', margin, currentY)
    currentY += 2
    
    pdf.setLineWidth(0.2)
    pdf.line(margin, currentY, pageWidth - margin, currentY)
    currentY += 6

    resumeData.certifications.forEach((cert) => {
      checkPageBreak(10)
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text(cert.name, margin, currentY)
      
      const certDate = formatDate(cert.date)
      const certDateWidth = pdf.getTextWidth(certDate)
      pdf.text(certDate, pageWidth - margin - certDateWidth, currentY)
      currentY += 4
      
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.text(cert.issuer, margin, currentY)
      currentY += 6
    })
  }

  // Achievements
  if (resumeData.achievements.length > 0) {
    checkPageBreak(20)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('ACHIEVEMENTS', margin, currentY)
    currentY += 2
    
    pdf.setLineWidth(0.2)
    pdf.line(margin, currentY, pageWidth - margin, currentY)
    currentY += 6

    resumeData.achievements.forEach((achievement) => {
      checkPageBreak(12)
      
      pdf.setFontSize(10)
      pdf.setFont('helvetica', 'bold')
      pdf.text(achievement.title, margin, currentY)
      
      const achDate = achievement.date
      const achDateWidth = pdf.getTextWidth(achDate)
      pdf.text(achDate, pageWidth - margin - achDateWidth, currentY)
      currentY += 4
      
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      addText(achievement.description, 9)
      currentY += 4
    })
  }

  // Download the PDF
  pdf.save(`${resumeData.personalInfo.name.replace(' ', '_')}_Resume.pdf`)
}

