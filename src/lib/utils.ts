import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// Email obfuscation: encoded so bots can't scrape plaintext from HTML/JS source
// Decoded client-side only via the ObfuscatedEmail component
export const ENCODED_EMAIL = [109,46,116,97,121,121,97,98,46,109,97,110,97,110,64,103,109,97,105,108,46,99,111,109]
export function decodeEmail(): string {
  return String.fromCharCode(...ENCODED_EMAIL)
}

/**
 * Truncate text to at most `max` characters on a word boundary, appending an
 * ellipsis when it had to cut. Used to keep meta descriptions within the
 * ~155-char SERP window while ending on a whole word.
 */
export function truncateAtWord(text: string, max = 155): string {
  const clean = text.trim().replace(/\s+/g, ' ')
  if (clean.length <= max) return clean
  // Reserve one char for the ellipsis, then back up to the last space.
  const slice = clean.slice(0, max - 1)
  const lastSpace = slice.lastIndexOf(' ')
  const trimmed = (lastSpace > 0 ? slice.slice(0, lastSpace) : slice).replace(/[\s,;:.!?-]+$/, '')
  return `${trimmed}…`
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

