'use client'

import { useState, useEffect } from 'react'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const toggleVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    const duration = 1000 // 1 second for smooth scroll
    const start = window.scrollY
    const startTime = performance.now()

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, start * (1 - ease))

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  // Always mounted so visibility can transition (board: hidden <-> visible).
  // Tailwind v4's `translate` is independent of `active:scale-*` - no
  // transform fight. `inert` (not aria-hidden/tabIndex) hides it: the browser
  // also moves focus off the button when it hides mid-press, so focus is never
  // stranded on an aria-hidden element.
  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 bg-[var(--primary)] text-white rounded-full shadow-lg hover:bg-[var(--primary-hover)] transition-[opacity,translate,background-color,transform,box-shadow] duration-200 ease-out active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
      aria-label="Back to top"
      inert={!isVisible}
      title="Back to top"
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  )
}
