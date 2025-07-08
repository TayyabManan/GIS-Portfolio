import fs from 'fs'
import path from 'path'
import { Project } from './projects'

const contentDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectWithContent extends Project {
  content: string
}

/**
 * Simple frontmatter parser (no external dependencies)
 */
function parseFrontmatter(fileContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = fileContent.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content: fileContent }
  }

  const frontmatterText = match[1]
  const content = match[2]
  const data: Record<string, unknown> = {}

  // Parse YAML-like frontmatter
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      let value = line.substring(colonIndex + 1).trim()

      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        const arrayContent = value.slice(1, -1)
        data[key] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ''))
          .filter(item => item.length > 0)
      }
      // Handle booleans
      else if (value === 'true') {
        data[key] = true
      } else if (value === 'false') {
        data[key] = false
      }
      // Handle strings
      else {
        data[key] = value
      }
    }
  })

  return { data, content }
}

/**
 * Get all project markdown files
 */
export function getAllProjectSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return []
    }
    const fileNames = fs.readdirSync(contentDirectory)
    return fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => name.replace(/\.md$/, ''))
  } catch (error) {
    console.warn('Error reading project directory:', error)
    return []
  }
}

/**
 * Get project data by slug from markdown file
 */
export function getProjectBySlug(slug: string): ProjectWithContent | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = parseFrontmatter(fileContents)

    return {
      slug: data.slug || slug,
      title: data.title || '',
      subtitle: data.subtitle || '',
      description: data.description || '',
      category: data.category || '',
      techStack: data.techStack || [],
      image: data.image || '',
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      featured: data.featured || false,
      date: data.date || '',
      content
    }
  } catch (error) {
    console.warn(`Error reading project ${slug}:`, error)
    return null
  }
}

/**
 * Get all projects from markdown files
 */
export function getAllProjectsFromMarkdown(): Project[] {
  try {
    const slugs = getAllProjectSlugs()
    const projects = slugs
      .map(slug => getProjectBySlug(slug))
      .filter((project): project is ProjectWithContent => project !== null)
      .map((project) => {
        const { content, ...projectWithoutContent } = project
        return projectWithoutContent
      }) // Remove content for list view
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return projects
  } catch (error) {
    console.warn('Error getting all projects from markdown:', error)
    return []
  }
}

/**
 * Get featured projects from markdown files
 */
export function getFeaturedProjectsFromMarkdown(): Project[] {
  return getAllProjectsFromMarkdown().filter(project => project.featured)
}

/**
 * Validate project markdown frontmatter
 */
export function validateProjectData(data: Record<string, unknown>): boolean {
  const requiredFields = ['slug', 'title', 'description', 'category', 'date']
  return requiredFields.every(field => data[field] !== undefined && data[field] !== '')
}