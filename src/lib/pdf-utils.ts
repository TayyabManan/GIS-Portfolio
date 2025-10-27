import { ResumeData, formatDate } from './resume-data'

export async function generateResumePDF(resumeData: ResumeData): Promise<void> {
  // Dynamically import jsPDF only when needed
  const { default: jsPDF } = await import('jspdf')
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
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
    const lineHeight = fontSize * 0.45
    
    checkPageBreak(lines.length * lineHeight)
    
    for (let i = 0; i < lines.length; i++) {
      pdf.text(lines[i], margin, currentY)
      currentY += lineHeight
    }
    return currentY
  }

  // Header
  pdf.setFontSize(20)
  pdf.setFont('helvetica', 'bold')
  const nameWidth = pdf.getTextWidth(resumeData.personalInfo.name.toUpperCase())
  pdf.text(resumeData.personalInfo.name.toUpperCase(), (pageWidth - nameWidth) / 2, currentY)
  currentY += 9

  pdf.setFontSize(13)
  pdf.setFont('helvetica', 'normal')
  const titleWidth = pdf.getTextWidth(resumeData.personalInfo.title)
  pdf.text(resumeData.personalInfo.title, (pageWidth - titleWidth) / 2, currentY)
  currentY += 6

  // Contact info
  pdf.setFontSize(9)

  // First line: email, location
  const emailText = resumeData.personalInfo.email
  const locationText = resumeData.personalInfo.location
  const separator = ' | '

  const emailWidth = pdf.getTextWidth(emailText)
  const locationWidth = pdf.getTextWidth(locationText)
  const separatorWidth = pdf.getTextWidth(separator)

  const totalWidth1 = emailWidth + locationWidth + separatorWidth
  let startX1 = (pageWidth - totalWidth1) / 2

  pdf.setTextColor(0, 0, 255) // Blue for email link
  pdf.text(emailText, startX1, currentY)
  pdf.link(startX1, currentY - 3, emailWidth, 4, { url: `mailto:${emailText}` })
  startX1 += emailWidth

  pdf.setTextColor(0, 0, 0) // Black for separator
  pdf.text(separator, startX1, currentY)
  startX1 += separatorWidth

  pdf.text(locationText, startX1, currentY)
  currentY += 4

  // Second line: portfolio, github and linkedin
  const portfolioText = 'Portfolio'
  const githubText = 'GitHub'
  const linkedinText = 'LinkedIn'

  const portfolioTextWidth = pdf.getTextWidth(portfolioText)
  const githubTextWidth = pdf.getTextWidth(githubText)
  const linkedinTextWidth = pdf.getTextWidth(linkedinText)
  const totalWidth2 = portfolioTextWidth + githubTextWidth + linkedinTextWidth + 2 * separatorWidth
  let startX2 = (pageWidth - totalWidth2) / 2

  pdf.setTextColor(0, 0, 255) // Blue for links
  pdf.text(portfolioText, startX2, currentY)
  pdf.link(startX2, currentY - 3, portfolioTextWidth, 4, { url: resumeData.personalInfo.website })
  startX2 += portfolioTextWidth

  pdf.setTextColor(0, 0, 0) // Black for separator
  pdf.text(separator, startX2, currentY)
  startX2 += separatorWidth

  pdf.setTextColor(0, 0, 255) // Blue for links
  pdf.text(githubText, startX2, currentY)
  pdf.link(startX2, currentY - 3, githubTextWidth, 4, { url: resumeData.personalInfo.github })
  startX2 += githubTextWidth

  pdf.setTextColor(0, 0, 0) // Black for separator
  pdf.text(separator, startX2, currentY)
  startX2 += separatorWidth

  pdf.setTextColor(0, 0, 255) // Blue for links
  pdf.text(linkedinText, startX2, currentY)
  pdf.link(startX2, currentY - 3, linkedinTextWidth, 4, { url: resumeData.personalInfo.linkedin })

  pdf.setTextColor(0, 0, 0) // Reset to black
  currentY += 10

  // Add line under header
  pdf.setLineWidth(0.5)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 10

  // Professional Summary
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFESSIONAL SUMMARY', margin, currentY)
  currentY += 3

  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 7

  addText(resumeData.personalInfo.summary, 10)
  currentY += 8

  // Experience
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('PROFESSIONAL EXPERIENCE', margin, currentY)
  currentY += 3

  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 7

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
    pdf.setFont('helvetica', 'bold')
    pdf.text(job.company, margin, currentY)
    const companyWidth = pdf.getTextWidth(job.company)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`, ${job.location}`, margin + companyWidth, currentY)
    currentY += 6

    // Description
    job.description.forEach((desc) => {
      checkPageBreak(8)
      pdf.setFontSize(9)
      pdf.text('• ' + desc, margin + 5, currentY)
      const lines = pdf.splitTextToSize(desc, contentWidth - 10)
      currentY += lines.length * 4.2
    })
    
    // Technologies
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    const techLabel = 'Technologies: '
    pdf.text(techLabel, margin, currentY)
    pdf.setFont('helvetica', 'normal')
    const techWidth = pdf.getTextWidth(techLabel)
    pdf.text(job.technologies.join(', '), margin + techWidth + 1, currentY)
    currentY += 10
  })

  // Education
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('EDUCATION', margin, currentY)
  currentY += 3

  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 7

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
    pdf.setFont('helvetica', 'bold')
    pdf.text(edu.institution, margin, currentY)
    const institutionWidth = pdf.getTextWidth(edu.institution)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`, ${edu.location}`, margin + institutionWidth, currentY)
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
        currentY += 4.2
      })
    }
    currentY += 6
  })

  // Skills
  checkPageBreak(30)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('TECHNICAL SKILLS', margin, currentY)
  currentY += 3

  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 7

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
        pdf.text(skillLines[k], xPos, currentY + 4 + k * 4)
      }
    }
    currentY += 17
  }

  // Projects
  checkPageBreak(20)
  pdf.setFontSize(12)
  pdf.setFont('helvetica', 'bold')
  pdf.text('KEY PROJECTS', margin, currentY)
  currentY += 3

  pdf.setLineWidth(0.2)
  pdf.line(margin, currentY, pageWidth - margin, currentY)
  currentY += 7

  resumeData.projects.forEach((project) => {
    checkPageBreak(25)
    
    pdf.setFontSize(11)
    pdf.setFont('helvetica', 'bold')
    pdf.text(project.name, margin, currentY)
    currentY += 4

    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(0, 0, 255) // Blue color for links

    let linkX = margin
    if (project.url) {
      const linkText = project.urlText || 'View Project'
      pdf.text(linkText, linkX, currentY)
      const linkWidth = pdf.getTextWidth(linkText)
      pdf.link(linkX, currentY - 3, linkWidth, 4, { url: project.url })
      linkX += linkWidth + 10
    }

    if (project.github) {
      const githubText = project.githubText || 'GitHub'
      pdf.text(githubText, linkX, currentY)
      const githubWidth = pdf.getTextWidth(githubText)
      pdf.link(linkX, currentY - 3, githubWidth, 4, { url: project.github })
    }

    pdf.setTextColor(0, 0, 0) // Reset to black
    currentY += project.url || project.github ? 4 : 0
    
    pdf.setFontSize(10)
    addText(project.description, 10)
    currentY += 2
    
    project.highlights.forEach((highlight) => {
      checkPageBreak(6)
      pdf.setFontSize(9)
      pdf.text('• ' + highlight, margin + 5, currentY)
      const lines = pdf.splitTextToSize(highlight, contentWidth - 10)
      currentY += lines.length * 4.2
    })
    
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'bold')
    const projectTechLabel = 'Technologies: '
    pdf.text(projectTechLabel, margin, currentY)
    pdf.setFont('helvetica', 'normal')
    const projectTechWidth = pdf.getTextWidth(projectTechLabel)
    pdf.text(project.technologies.join(', '), margin + projectTechWidth + 1, currentY)
    currentY += 10
  })

  // Certifications
  if (resumeData.certifications.length > 0) {
    checkPageBreak(20)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('CERTIFICATIONS', margin, currentY)
    currentY += 3

    pdf.setLineWidth(0.2)
    pdf.line(margin, currentY, pageWidth - margin, currentY)
    currentY += 7

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
      pdf.setFont('helvetica', 'bold')
      pdf.text(cert.issuer, margin, currentY)
      pdf.setFont('helvetica', 'normal')
      currentY += 7
    })
  }

  // Achievements
  if (resumeData.achievements.length > 0) {
    checkPageBreak(20)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text('ACHIEVEMENTS', margin, currentY)
    currentY += 3

    pdf.setLineWidth(0.2)
    pdf.line(margin, currentY, pageWidth - margin, currentY)
    currentY += 7

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
      currentY += 6
    })
  }

  // Download the PDF
  pdf.save(`${resumeData.personalInfo.name.replace(' ', '_')}_Resume.pdf`)
}

