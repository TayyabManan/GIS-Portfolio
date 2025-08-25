// Centralized performance configuration
export const performanceConfig = {
  // Image optimization
  images: {
    // Lazy load images that are not above the fold
    lazyLoadOffset: '50px',
    // Quality settings for different image types
    quality: {
      thumbnail: 60,
      normal: 75,
      high: 90,
    },
    // Breakpoints for responsive images
    breakpoints: [640, 768, 1024, 1280, 1536],
  },
  
  // Animation settings
  animations: {
    // Disable complex animations on low-end devices
    enableComplexAnimations: typeof window !== 'undefined' 
      ? navigator.hardwareConcurrency > 4 
      : true,
    // Reduce animation duration on mobile
    durationMultiplier: typeof window !== 'undefined' 
      ? window.innerWidth < 768 ? 0.7 : 1 
      : 1,
  },
  
  // Scroll performance
  scroll: {
    // Throttle scroll events
    throttleMs: 16, // ~60fps
    // Use passive listeners
    passive: true,
  },
  
  // Network optimization
  api: {
    // Cache duration in milliseconds
    cacheDuration: {
      projects: 10 * 60 * 1000, // 10 minutes
      content: 5 * 60 * 1000,    // 5 minutes
      static: 60 * 60 * 1000,    // 1 hour
    },
    // Request timeout
    timeout: 10000, // 10 seconds
    // Retry configuration
    retry: {
      attempts: 3,
      delay: 1000,
    },
  },
  
  // Bundle optimization
  bundle: {
    // Chunk size limits (in KB)
    maxChunkSize: 200,
    // Prefetch delay for non-critical chunks
    prefetchDelay: 2000,
  },
  
  // Monitoring
  monitoring: {
    // Enable performance monitoring in development
    enableInDev: process.env.NODE_ENV === 'development',
    // Send metrics to analytics
    sendMetrics: process.env.NODE_ENV === 'production',
    // Sample rate for metrics (0-1)
    sampleRate: 0.1,
  },
}

// Performance optimization hooks
export const useOptimizedSettings = () => {
  if (typeof window === 'undefined') {
    return {
      isLowEnd: false,
      isMobile: false,
      shouldReduceMotion: false,
      connectionSpeed: 'unknown',
    }
  }
  
  const isLowEnd = navigator.hardwareConcurrency <= 4
  const isMobile = window.innerWidth < 768
  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  // Detect connection speed
  let connectionSpeed = 'unknown'
  if ('connection' in navigator) {
    const connection = (navigator as Navigator & {
      connection?: {
        effectiveType?: string
        downlink?: number
        rtt?: number
        saveData?: boolean
      }
    }).connection
    if (connection?.effectiveType) {
      connectionSpeed = connection.effectiveType
    }
  }
  
  return {
    isLowEnd,
    isMobile,
    shouldReduceMotion,
    connectionSpeed,
  }
}

// Resource hints for critical resources
export const resourceHints = [
  // Preconnect to external domains
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'preconnect', href: 'https://www.google-analytics.com' },
  
  // DNS prefetch for potential external resources
  { rel: 'dns-prefetch', href: 'https://vercel.live' },
  { rel: 'dns-prefetch', href: 'https://vitals.vercel-insights.com' },
]

// Critical CSS for above-the-fold content
export const criticalCSS = `
  :root {
    --primary: #2563eb;
    --background: #ffffff;
    --text: #111827;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background-color: var(--background);
    color: var(--text);
  }
  
  .loading-skeleton {
    background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`