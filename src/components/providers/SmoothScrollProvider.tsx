'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect Safari or macOS - use native smooth scroll for better performance
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform)

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
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
