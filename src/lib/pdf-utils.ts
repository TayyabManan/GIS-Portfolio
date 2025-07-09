import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
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
  const contentHeight = pageHeight - 2 * margin
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

function generateResumeHTML(resumeData: ResumeData): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #000; max-width: 800px; margin: 0 auto; font-size: 11px; page-break-inside: avoid;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; page-break-inside: avoid;">
        <h1 style="font-size: 22px; color: #000; margin: 0 0 8px 0; font-weight: bold;">${resumeData.personalInfo.name.toUpperCase()}</h1>
        <div style="font-size: 14px; color: #000; margin-bottom: 10px;">${resumeData.personalInfo.title}</div>
        <div style="font-size: 10px; color: #000; text-align: center; line-height: 1.4;">
          <a href="mailto:${resumeData.personalInfo.email}" style="color: #000; text-decoration: none;">${resumeData.personalInfo.email}</a> | 
          ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}<br>
          <a href="${resumeData.personalInfo.github}" style="color: #000; text-decoration: none;">${resumeData.personalInfo.github}</a> | 
          <a href="${resumeData.personalInfo.linkedin}" style="color: #000; text-decoration: none;">${resumeData.personalInfo.linkedin}</a>
        </div>
      </div>

      <!-- Summary -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 12px; font-weight: bold; text-transform: uppercase;">Professional Summary</h2>
        <div style="font-size: 11px; color: #000; line-height: 1.5;">
          ${resumeData.personalInfo.summary}
        </div>
      </div>

      <!-- Experience -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 12px; font-weight: bold; text-transform: uppercase;">Professional Experience</h2>
        ${resumeData.experience.map(job => `
          <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h3 style="font-size: 12px; color: #000; margin: 0 0 3px 0; font-weight: bold;">${job.title}</h3>
                <div style="font-size: 11px; color: #000; font-weight: 500;">${job.company}, ${job.location}</div>
              </div>
              <div style="font-size: 10px; color: #000; text-align: right; line-height: 1.3;">
                ${formatDate(job.startDate)} - ${formatDate(job.endDate)}
                <br>(${calculateDuration(job.startDate, job.endDate)})
              </div>
            </div>
            <ul style="margin: 8px 0 10px 20px; padding: 0;">
              ${job.description.map(desc => `<li style="margin-bottom: 3px; font-size: 10px; color: #000; line-height: 1.4;">${desc}</li>`).join('')}
            </ul>
            <div style="font-size: 9px; color: #000; margin-top: 8px;">
              <strong>Technologies:</strong> ${job.technologies.join(', ')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Education -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 12px; font-weight: bold; text-transform: uppercase;">Education</h2>
        ${resumeData.education.map(edu => `
          <div style="margin-bottom: 18px; page-break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <div>
                <h3 style="font-size: 12px; color: #000; margin: 0 0 3px 0; font-weight: bold;">${edu.degree}</h3>
                <div style="font-size: 11px; color: #000;">${edu.institution}, ${edu.location}</div>
                ${edu.gpa ? `<div style="font-size: 10px; color: #000; margin-top: 2px;">GPA: ${edu.gpa}</div>` : ''}
              </div>
              <div style="font-size: 10px; color: #000;">${edu.startDate} - ${edu.endDate}</div>
            </div>
            ${edu.achievements ? `
              <ul style="margin: 8px 0 0 20px; padding: 0;">
                ${edu.achievements.map(achievement => `<li style="margin-bottom: 3px; font-size: 10px; color: #000; line-height: 1.4;">${achievement}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Skills -->
      <div style="margin-bottom: 25px; page-break-inside: avoid;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 12px; font-weight: bold; text-transform: uppercase;">Technical Skills</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          ${resumeData.skills.map(skillGroup => `
            <div style="margin-bottom: 10px;">
              <h3 style="font-size: 11px; color: #000; margin: 0 0 5px 0; font-weight: bold;">${skillGroup.category}:</h3>
              <div style="font-size: 10px; color: #000; line-height: 1.4;">
                ${skillGroup.items.join(', ')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Projects -->
      <div style="margin-bottom: 25px;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 12px; font-weight: bold; text-transform: uppercase;">Key Projects</h2>
        ${resumeData.projects.map(project => `
          <div style="margin-bottom: 20px; page-break-inside: avoid;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h3 style="font-size: 12px; color: #000; margin: 0; font-weight: bold;">${project.name}</h3>
              <div style="font-size: 9px; color: #000; text-align: right; line-height: 1.3;">
                ${project.url ? `Demo: <a href="${project.url}" style="color: #000; text-decoration: none;">${project.url}</a>` : ''}
                ${project.github ? `<br>GitHub: <a href="${project.github}" style="color: #000; text-decoration: none;">${project.github}</a>` : ''}
              </div>
            </div>
            <p style="font-size: 10px; color: #000; margin: 0 0 8px 0; line-height: 1.4;">${project.description}</p>
            <ul style="margin: 0 0 10px 20px; padding: 0;">
              ${project.highlights.map(highlight => `<li style="margin-bottom: 3px; font-size: 10px; color: #000; line-height: 1.4;">${highlight}</li>`).join('')}
            </ul>
            <div style="font-size: 9px; color: #000; margin-top: 8px;">
              <strong>Technologies:</strong> ${project.technologies.join(', ')}
            </div>
          </div>
        `).join('')}
      </div>

      ${resumeData.certifications.length > 0 ? `
        <!-- Certifications -->
        <div style="margin-bottom: 25px; page-break-inside: avoid;">
          <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 12px; font-weight: bold; text-transform: uppercase;">Certifications</h2>
          ${resumeData.certifications.map(cert => `
            <div style="margin-bottom: 12px; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 11px; color: #000; margin: 0 0 2px 0; font-weight: bold;">${cert.name}</h3>
                  <div style="font-size: 10px; color: #000;">${cert.issuer}</div>
                </div>
                <div style="font-size: 10px; color: #000;">${formatDate(cert.date)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.achievements.length > 0 ? `
        <!-- Achievements -->
        <div style="margin-bottom: 25px; page-break-inside: avoid;">
          <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 12px; font-weight: bold; text-transform: uppercase;">Achievements</h2>
          ${resumeData.achievements.map(achievement => `
            <div style="margin-bottom: 12px; page-break-inside: avoid;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 11px; color: #000; margin: 0 0 2px 0; font-weight: bold;">${achievement.title}</h3>
                  <div style="font-size: 10px; color: #000; line-height: 1.4;">${achievement.description}</div>
                </div>
                <div style="font-size: 10px; color: #000;">${achievement.date}</div>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `
}