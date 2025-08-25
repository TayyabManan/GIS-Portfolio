// Custom image loader for optimized image delivery
export const customImageLoader = ({ src, width, quality }: {
  src: string
  width: number
  quality?: number
}) => {
  // If it's already an external URL, return as is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src
  }
  
  // For local images, use Next.js image optimization
  const params = [`w=${width}`]
  
  if (quality) {
    params.push(`q=${quality}`)
  }
  
  // Add format hint for modern browsers
  if (typeof window !== 'undefined' && window.navigator) {
    const webpSupport = window.document.createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') === 0
    
    if (webpSupport) {
      params.push('fm=webp')
    }
  }
  
  return `${src}?${params.join('&')}`
}

// Preload critical images
export const preloadImage = (src: string) => {
  if (typeof window === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

// Generate blur placeholder for images
export const generateBlurPlaceholder = (width: number, height: number) => {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null
  if (!canvas) return undefined
  
  canvas.width = width
  canvas.height = height
  
  const ctx = canvas.getContext('2d')
  if (!ctx) return undefined
  
  // Create a simple gradient as placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f3f4f6')
  gradient.addColorStop(1, '#e5e7eb')
  
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
  
  return canvas.toDataURL()
}

// Image optimization config
export const imageConfig = {
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
  dangerouslyAllowSVG: true,
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
}