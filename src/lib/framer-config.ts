// Global Framer Motion configuration for better performance
export const globalMotionConfig = {
  // Reduce motion on low-end devices
  reducedMotion: 'user',
  
  // Transition defaults for consistency and performance
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
  
  // Disable animations during hydration
  isStatic: typeof window === 'undefined',
}

// Performance-optimized animation variants
export const optimizedVariants = {
  // Page transitions
  pageInitial: {
    opacity: 0,
    y: 20,
  },
  pageAnimate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  pageExit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
  
  // Card animations
  cardHover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  cardTap: {
    scale: 0.98,
  },
  
  // Stagger animations for lists
  containerVariants: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
  itemVariants: {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },
}

// Performance settings for different device types
export const getDeviceMotionSettings = () => {
  if (typeof window === 'undefined') return { shouldAnimate: true, quality: 'high' }
  
  const isMobile = window.innerWidth < 768
  const isLowEndDevice = navigator.hardwareConcurrency <= 4
  const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (hasReducedMotion) {
    return { shouldAnimate: false, quality: 'none' }
  }
  
  if (isMobile || isLowEndDevice) {
    return { shouldAnimate: true, quality: 'low' }
  }
  
  return { shouldAnimate: true, quality: 'high' }
}

// Optimized scroll animation settings
export const scrollAnimationConfig = {
  low: {
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.3 },
  },
  high: {
    viewport: { once: true, amount: 0.1 },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}