import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Safely extracts text content from React children
 */
export function extractTextContent(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children)) {
    return children.map(extractTextContent).join('')
  }

  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as React.ReactElement<{ children?: React.ReactNode }>
    return extractTextContent(element.props.children)
  }

  return String(children || '')
}

/**
 * Generates a unique, sanitized HTML ID from heading text
 * Prevents XSS and ensures valid HTML IDs
 */
const headingIdRegistry = new Set<string>()

export function generateHeadingId(text: string | React.ReactNode): string {
  const textContent = typeof text === 'string' ? text : extractTextContent(text)

  let id = textContent
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '')   // Trim hyphens from start/end

  // Ensure ID starts with a letter (HTML requirement)
  if (!/^[a-z]/.test(id)) {
    id = `heading-${id}`
  }

  // Ensure ID is not empty
  if (!id) {
    id = 'heading-' + Math.random().toString(36).substr(2, 9)
  }

  // Handle duplicates
  let uniqueId = id
  let counter = 1
  while (headingIdRegistry.has(uniqueId)) {
    uniqueId = `${id}-${counter}`
    counter++
  }

  headingIdRegistry.add(uniqueId)

  return uniqueId
}

/**
 * Clears the heading ID registry (useful for testing or page changes)
 */
export function clearHeadingIdRegistry() {
  headingIdRegistry.clear()
}