export interface ImageDimensions {
  width: number
  height: number
  aspectRatio?: string
}

export interface OptimizedImageSrc {
  src: string
  srcSet?: string
  sizes?: string
  placeholder?: string
}

// Generate responsive image sizes based on screen breakpoints
export function generateResponsiveSizes(
  maxWidth: number = 1920,
  breakpoints: number[] = [640, 768, 1024, 1280, 1536]
): string {
  const sizes = breakpoints
    .filter(bp => bp < maxWidth)
    .map((bp) => {
      return `(max-width: ${bp}px) ${Math.round((bp / maxWidth) * 100)}vw`
    })
    .join(', ')
  
  return `${sizes}, ${maxWidth}px`
}

// Generate srcSet for responsive images
export function generateSrcSet(
  src: string,
  widths: number[] = [640, 768, 1024, 1280, 1536, 1920]
): string {
  return widths
    .map(width => `${src}?w=${width} ${width}w`)
    .join(', ')
}

// Calculate optimal dimensions while maintaining aspect ratio
export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth?: number,
  maxHeight?: number
): ImageDimensions {
  let width = originalWidth
  let height = originalHeight
  const aspectRatio = originalWidth / originalHeight

  if (maxWidth && width > maxWidth) {
    width = maxWidth
    height = width / aspectRatio
  }

  if (maxHeight && height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
    aspectRatio: `${originalWidth}/${originalHeight}`,
  }
}

// Generate blur placeholder data URL
export function generateBlurPlaceholder(
  width: number = 10,
  height: number = 10,
  color: string = '#f3f4f6'
): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>
  `
  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}

// Get optimized image URL with format detection
export function getOptimizedImageUrl(
  src: string,
  options: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'avif'
  } = {}
): string {
  const { width, height, quality = 75, format = 'auto' } = options
  const params = new URLSearchParams()

  if (width) params.append('w', width.toString())
  if (height) params.append('h', height.toString())
  if (quality !== 75) params.append('q', quality.toString())
  if (format !== 'auto') params.append('fm', format)

  const queryString = params.toString()
  return queryString ? `${src}?${queryString}` : src
}

// Preload critical images
export function preloadImage(src: string, as: 'image' = 'image'): void {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = src
  
  // Add format hints for better browser optimization
  if (src.includes('.webp')) {
    link.type = 'image/webp'
  } else if (src.includes('.avif')) {
    link.type = 'image/avif'
  }

  document.head.appendChild(link)
}

// Lazy load images with Intersection Observer
export function setupLazyLoading(
  selector: string = 'img[data-lazy]',
  options: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.01,
  }
): () => void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return () => {}
  }

  const images = document.querySelectorAll<HTMLImageElement>(selector)
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.dataset.src
        const srcset = img.dataset.srcset

        if (src) img.src = src
        if (srcset) img.srcset = srcset
        
        img.removeAttribute('data-lazy')
        img.removeAttribute('data-src')
        img.removeAttribute('data-srcset')
        
        imageObserver.unobserve(img)
      }
    })
  }, options)

  images.forEach(img => imageObserver.observe(img))

  return () => {
    images.forEach(img => imageObserver.unobserve(img))
  }
}

// Check WebP/AVIF support
let supportsWebP: boolean | null = null
let supportsAvif: boolean | null = null

export async function checkWebPSupport(): Promise<boolean> {
  if (supportsWebP !== null) return supportsWebP
  
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      supportsWebP = webP.height === 2
      resolve(supportsWebP)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

export async function checkAvifSupport(): Promise<boolean> {
  if (supportsAvif !== null) return supportsAvif
  
  return new Promise((resolve) => {
    const avif = new Image()
    avif.onload = avif.onerror = () => {
      supportsAvif = avif.height === 2
      resolve(supportsAvif)
    }
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
  })
}

// Get the best supported format
export async function getBestImageFormat(): Promise<'avif' | 'webp' | 'jpeg'> {
  if (await checkAvifSupport()) return 'avif'
  if (await checkWebPSupport()) return 'webp'
  return 'jpeg'
}

// Generate picture element sources for modern formats
export function generatePictureSources(
  src: string,
  alt: string,
  sizes?: string,
  className?: string
): {
  sources: Array<{ srcSet: string; type: string }>
  img: { src: string; alt: string; sizes?: string; className?: string }
} {
  const basePath = src.replace(/\.[^.]+$/, '')

  return {
    sources: [
      {
        srcSet: `${basePath}.avif`,
        type: 'image/avif',
      },
      {
        srcSet: `${basePath}.webp`,
        type: 'image/webp',
      },
    ],
    img: {
      src,
      alt,
      sizes,
      className,
    },
  }
}