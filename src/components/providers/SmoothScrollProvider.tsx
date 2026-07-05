'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Module-level registry so lazily-loaded GSAP code (src/lib/gsap.ts) can sync
// ScrollTrigger to lenis without owning its lifecycle. Null on mobile/Safari,
// where native scroll events drive ScrollTrigger directly.
let activeLenis: Lenis | null = null
export function getLenis(): Lenis | null {
  return activeLenis
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect mobile devices
    const isMobile = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Detect Safari or macOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform)

    // Disable smooth scroll entirely on mobile to prevent fixed positioning issues
    if (isMobile) {
      // Use default browser scroll behavior on mobile
      return
    }

    // Use native smooth scroll on Safari/Mac for better performance
    if (isSafari || isMac) {
      document.documentElement.style.scrollBehavior = 'smooth'
      return () => {
        document.documentElement.style.scrollBehavior = 'auto'
      }
    }

    // Initialize Lenis only on non-Safari browsers with optimized settings
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.2 for snappier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })
    activeLenis = lenis

    // Request animation frame function
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Cleanup
    return () => {
      cancelAnimationFrame(rafId)
      activeLenis = null
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
