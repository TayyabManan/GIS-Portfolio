import { motion, MotionProps } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ReactNode, forwardRef } from 'react'

// Performance-optimized motion component that respects reduced motion
interface OptimizedMotionProps extends MotionProps {
  children: ReactNode
  disableOnMobile?: boolean
}

// List of motion-specific props to exclude
const MOTION_PROPS = [
  'initial', 'animate', 'exit', 'variants', 'whileHover', 'whileTap', 'whileDrag', 
  'whileFocus', 'whileInView', 'drag', 'dragConstraints', 'dragElastic', 
  'dragTransition', 'dragMomentum', 'dragPropagation', 'dragDirectionLock', 
  'dragSnapToOrigin', 'onDragStart', 'onDragEnd', 'onDrag', 'onDirectionLock', 
  'layout', 'layoutId', 'transition', 'transformTemplate'
] as const

// Helper to extract HTML props from motion props
function extractHTMLProps(props: Record<string, unknown>) {
  const htmlProps: Record<string, unknown> = {}
  
  // Copy all props except motion-specific ones
  Object.keys(props).forEach(key => {
    if (!MOTION_PROPS.includes(key as typeof MOTION_PROPS[number])) {
      htmlProps[key] = props[key]
    }
  })
  
  // Handle style separately to filter out motion transforms
  if (props.style && typeof props.style === 'object') {
    const style = props.style as Record<string, unknown>
    htmlProps.style = Object.fromEntries(
      Object.entries(style).filter(([key]) => 
        !key.startsWith('x') && !key.startsWith('y') && 
        !key.startsWith('rotate') && !key.startsWith('scale') &&
        !key.startsWith('skew')
      )
    )
  }
  
  return htmlProps
}

export const OptimizedMotion = forwardRef<HTMLDivElement, OptimizedMotionProps>(
  ({ children, disableOnMobile = false, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640
    
    // Skip animations if reduced motion is preferred or on mobile (if specified)
    if (prefersReducedMotion || (disableOnMobile && isMobile)) {
      const htmlProps = extractHTMLProps(props)
      return (
        <div ref={ref} {...htmlProps}>
          {children}
        </div>
      )
    }
    
    return (
      <motion.div ref={ref} {...props}>
        {children}
      </motion.div>
    )
  }
)

OptimizedMotion.displayName = 'OptimizedMotion'

// Preset animations with performance optimizations
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' }
}

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 }
}

// Stagger children animation helper
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
}

// Performance-optimized scroll-triggered animation
export const useScrollAnimation = (threshold = 0.1) => {
  return {
    initial: { opacity: 0, y: 50 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: threshold },
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}