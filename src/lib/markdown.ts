import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project } from './projects'

const contentDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectWithContent extends Project {
  content: string
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
    const { data, content } = matter(fileContents)

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