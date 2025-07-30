import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Project } from './projects'
import { projectSlugSchema } from './validation'

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
      .filter(name => name.endsWith('.md') && !name.startsWith('_'))
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
    // Validate slug to prevent path traversal
    const validatedSlug = projectSlugSchema.parse(slug)
    
    const fullPath = path.join(contentDirectory, `${validatedSlug}.md`)
    
    // Additional safety check: ensure the resolved path is within content directory
    const resolvedPath = path.resolve(fullPath)
    const resolvedContentDir = path.resolve(contentDirectory)
    
    if (!resolvedPath.startsWith(resolvedContentDir)) {
      console.warn(`Attempted path traversal: ${slug}`)
      return null
    }
    
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
      .filter(slug => !slug.startsWith('_')) // Filter out template files
      .map(slug => getProjectBySlug(slug))
      .filter((project): project is ProjectWithContent => project !== null)
      .map((project) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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