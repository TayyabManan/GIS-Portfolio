import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { ResumeData, formatDate, calculateDuration } from './resume-data'

export async function generateResumePDF(resumeData: ResumeData): Promise<void> {
  // Create a hidden div with the resume content
  const resumeElement = document.createElement('div')
  resumeElement.innerHTML = generateResumeHTML(resumeData)
  resumeElement.style.position = 'absolute'
  resumeElement.style.left = '-9999px'
  resumeElement.style.top = '0'
  resumeElement.style.width = '800px'
  resumeElement.style.background = 'white'
  resumeElement.style.padding = '40px'
  document.body.appendChild(resumeElement)

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(resumeElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })

    // Create PDF
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Download the PDF
    pdf.save(`${resumeData.personalInfo.name.replace(' ', '_')}_Resume.pdf`)
  } finally {
    // Clean up
    document.body.removeChild(resumeElement)
  }
}

function generateResumeHTML(resumeData: ResumeData): string {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.4; color: #000; max-width: 800px; margin: 0 auto; font-size: 11px;">
      <!-- Header -->
      <div style="text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="font-size: 22px; color: #000; margin: 0 0 5px 0; font-weight: bold;">${resumeData.personalInfo.name.toUpperCase()}</h1>
        <div style="font-size: 14px; color: #000; margin-bottom: 8px;">${resumeData.personalInfo.title}</div>
        <div style="font-size: 10px; color: #000; text-align: center;">
          <a href="mailto:${resumeData.personalInfo.email}" style="color: #000; text-decoration: none;">${resumeData.personalInfo.email}</a> | 
          ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}<br>
          <a href="${resumeData.personalInfo.github}" style="color: #000; text-decoration: none;">${resumeData.personalInfo.github}</a> | 
          <a href="${resumeData.personalInfo.linkedin}" style="color: #000; text-decoration: none;">${resumeData.personalInfo.linkedin}</a>
        </div>
      </div>

      <!-- Summary -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">Professional Summary</h2>
        <div style="font-size: 11px; color: #000; line-height: 1.4;">
          ${resumeData.personalInfo.summary}
        </div>
      </div>

      <!-- Experience -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">Professional Experience</h2>
        ${resumeData.experience.map(job => `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
              <div>
                <h3 style="font-size: 12px; color: #000; margin: 0; font-weight: bold;">${job.title}</h3>
                <div style="font-size: 11px; color: #000; font-weight: 500;">${job.company}, ${job.location}</div>
              </div>
              <div style="font-size: 10px; color: #000; text-align: right;">
                ${formatDate(job.startDate)} - ${formatDate(job.endDate)}
                <br>(${calculateDuration(job.startDate, job.endDate)})
              </div>
            </div>
            <ul style="margin: 5px 0 8px 20px; padding: 0;">
              ${job.description.map(desc => `<li style="margin-bottom: 2px; font-size: 10px; color: #000;">${desc}</li>`).join('')}
            </ul>
            <div style="font-size: 9px; color: #000; margin-top: 5px;">
              <strong>Technologies:</strong> ${job.technologies.join(', ')}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Education -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">Education</h2>
        ${resumeData.education.map(edu => `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
              <div>
                <h3 style="font-size: 12px; color: #000; margin: 0; font-weight: bold;">${edu.degree}</h3>
                <div style="font-size: 11px; color: #000;">${edu.institution}, ${edu.location}</div>
                ${edu.gpa ? `<div style="font-size: 10px; color: #000;">GPA: ${edu.gpa}</div>` : ''}
              </div>
              <div style="font-size: 10px; color: #000;">${edu.startDate} - ${edu.endDate}</div>
            </div>
            ${edu.achievements ? `
              <ul style="margin: 5px 0 0 20px; padding: 0;">
                ${edu.achievements.map(achievement => `<li style="margin-bottom: 2px; font-size: 10px; color: #000;">${achievement}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <!-- Skills -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">Technical Skills</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
          ${resumeData.skills.map(skillGroup => `
            <div style="margin-bottom: 8px;">
              <h3 style="font-size: 11px; color: #000; margin: 0 0 3px 0; font-weight: bold;">${skillGroup.category}:</h3>
              <div style="font-size: 10px; color: #000; line-height: 1.3;">
                ${skillGroup.items.join(', ')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Projects -->
      <div style="margin-bottom: 20px;">
        <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">Key Projects</h2>
        ${resumeData.projects.map(project => `
          <div style="margin-bottom: 15px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
              <h3 style="font-size: 12px; color: #000; margin: 0; font-weight: bold;">${project.name}</h3>
              <div style="font-size: 9px; color: #000; text-align: right;">
                ${project.url ? `Demo: <a href="${project.url}" style="color: #000; text-decoration: none;">${project.url}</a>` : ''}
                ${project.github ? `<br>GitHub: <a href="${project.github}" style="color: #000; text-decoration: none;">${project.github}</a>` : ''}
              </div>
            </div>
            <p style="font-size: 10px; color: #000; margin: 0 0 5px 0;">${project.description}</p>
            <ul style="margin: 0 0 8px 20px; padding: 0;">
              ${project.highlights.map(highlight => `<li style="margin-bottom: 2px; font-size: 10px; color: #000;">${highlight}</li>`).join('')}
            </ul>
            <div style="font-size: 9px; color: #000;">
              <strong>Technologies:</strong> ${project.technologies.join(', ')}
            </div>
          </div>
        `).join('')}
      </div>

      ${resumeData.certifications.length > 0 ? `
        <!-- Certifications -->
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">Certifications</h2>
          ${resumeData.certifications.map(cert => `
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 11px; color: #000; margin: 0; font-weight: bold;">${cert.name}</h3>
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
        <div style="margin-bottom: 20px;">
          <h2 style="font-size: 14px; color: #000; border-bottom: 1px solid #000; padding-bottom: 3px; margin-bottom: 10px; font-weight: bold; text-transform: uppercase;">Achievements</h2>
          ${resumeData.achievements.map(achievement => `
            <div style="margin-bottom: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 11px; color: #000; margin: 0; font-weight: bold;">${achievement.title}</h3>
                  <div style="font-size: 10px; color: #000;">${achievement.description}</div>
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