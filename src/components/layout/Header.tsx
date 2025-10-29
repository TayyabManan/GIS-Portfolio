'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import Logo from '@/components/ui/Logo'
import { ThemeSelector } from '@/components/ui/ThemeSelector'

const navigation = [
  { name: 'Home', href: '/', shortcut: 'Alt+H' },
  { name: 'Projects', href: '/projects', shortcut: 'Alt+P' },
  { name: 'Blog', href: '/blog', shortcut: 'Alt+B' },
  { name: 'About', href: '/about', shortcut: 'Alt+A' },
  { name: 'Contact', href: '/contact', shortcut: 'Alt+C' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showResumeAnimation, setShowResumeAnimation] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  // Show animation on homepage after a delay
  useEffect(() => {
    if (pathname === '/') {
      const timer = setTimeout(() => {
        setShowResumeAnimation(true)
      }, 2000) // Show after 2 seconds on homepage

      return () => clearTimeout(timer)
    } else {
      setShowResumeAnimation(false)
    }
  }, [pathname])

  // Handle scroll behavior with CSS custom properties to avoid forced reflow
  useEffect(() => {
    let ticking = false
    let lastProgress = -1

    const updateScrollProgress = () => {
      // Use pageYOffset as fallback for better mobile compatibility
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      const threshold = 150
      const completeAt = 300

      // Calculate progress from 0 to 1
      const progress = Math.min(Math.max((scrollY - threshold) / (completeAt - threshold), 0), 1)

      // Only update if progress changed significantly (avoid unnecessary updates)
      if (Math.abs(progress - lastProgress) > 0.01) {
        // Update CSS custom property directly (no React re-render, no layout thrashing)
        document.documentElement.style.setProperty('--scroll-progress', progress.toString())

        // Only update React state for boolean flag (minimal re-render)
        const scrolled = progress > 0
        if (scrolled !== isScrolled) {
          setIsScrolled(scrolled)
        }

        lastProgress = progress
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    // Handle touchend with delayed update for mobile scroll completion
    const handleTouchEnd = () => {
      setTimeout(updateScrollProgress, 100)
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Add touchmove listener for better mobile scroll detection
    // This ensures updates happen during touch-based scrolling on mobile devices
    window.addEventListener('touchmove', handleScroll, { passive: true })

    // Force update on touchend to catch final scroll position on mobile
    window.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Initial check with delay for mobile browsers (after address bar settles)
    updateScrollProgress()
    setTimeout(updateScrollProgress, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
      window.removeEventListener('touchend', handleTouchEnd)
      document.documentElement.style.removeProperty('--scroll-progress')
    }
  }, [isScrolled])

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-75"
      style={{
        backgroundColor: isScrolled ? 'transparent' : 'var(--background)',
        borderBottomWidth: isScrolled ? '0px' : '1px',
        borderBottomColor: `rgba(var(--border-rgb), calc(1 - var(--scroll-progress, 0)))`,
        boxShadow: isScrolled ? 'none' : '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}
    >
      <nav
        className="mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-75 ease-out"
        style={{
          maxWidth: `calc(80rem - (16rem * var(--scroll-progress, 0)))`,
          marginTop: `calc(1rem * var(--scroll-progress, 0))`,
          willChange: 'margin-top, max-width'
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className="flex items-center justify-between px-6 transition-all duration-75"
          style={{
            height: `calc(4rem - (0.5rem * var(--scroll-progress, 0)))`,
            borderRadius: `calc(9999px * var(--scroll-progress, 0))`,
            backgroundColor: `rgba(var(--background-rgb), calc(0.7 * var(--scroll-progress, 0)))`,
            backdropFilter: `blur(calc(12px * var(--scroll-progress, 0)))`,
            boxShadow: isScrolled ? `rgba(0, 0, 0, calc(0.1 * var(--scroll-progress, 0))) 0px 10px 30px -10px` : 'none',
            borderWidth: isScrolled ? '1px' : '0px',
            borderColor: `rgba(var(--border-rgb), calc(0.5 * var(--scroll-progress, 0)))`,
            willChange: 'height, border-radius, background-color, backdrop-filter'
          }}
        >
          <div className="flex items-center">
            <Link href="/" className={`flex items-center gap-2 sm:gap-3 font-bold text-[var(--text)] transition-all duration-300`}>
              <Logo className={`text-[var(--primary)] transition-all duration-300 ${
                isScrolled ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-6 h-6 sm:w-8 sm:h-8'
              }`} />
              <span className={`transition-all duration-300 ${
                isScrolled 
                  ? 'text-sm sm:text-base' 
                  : 'text-base sm:text-lg md:text-xl'
              }`}>Tayyab Manan</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className={`flex items-center ${isScrolled ? 'space-x-2' : 'space-x-4'}`}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`font-medium transition-all duration-300 flex items-center relative group ${
                    isScrolled 
                      ? 'px-3 py-1.5 text-sm h-8' 
                      : 'px-4 py-2 text-base'
                  } ${
                    isActive(item.href)
                      ? isScrolled 
                        ? 'text-[var(--primary)] bg-[var(--primary)]/10 rounded-full'
                        : 'text-[var(--primary)] border-b-2 border-[var(--primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'
                  }`}
                >
                  {item.name}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--background-tertiary)] text-[var(--text)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-[var(--border)]">
                    {item.shortcut}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent" style={{ borderBottomColor: 'var(--background-tertiary)' }}></div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Enhanced Theme Selector with dropdown */}
            <ThemeSelector isCompact={isScrolled} />
            
            <Link
              href="/resume"
              className={`relative bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-hover)] transition-all duration-300 flex items-center group ${
                isScrolled
                  ? 'px-4 py-1.5 rounded-full text-sm h-8'
                  : 'px-5 py-2.5 rounded-lg text-base'
              }`}
            >
              <span className="flex items-center gap-2">
                Resume
                <ChatBubbleLeftRightIcon className={`${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </span>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--background-tertiary)] text-[var(--text)] text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-[var(--border)]">
                Alt+R
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent" style={{ borderBottomColor: 'var(--background-tertiary)' }}></div>
              </div>
              {showResumeAnimation && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--success)]"></span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Selector */}
            <ThemeSelector isCompact={isScrolled} />
            
            <button
              type="button"
              className="text-[var(--text-secondary)] hover:text-[var(--text)] p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4">
            <div className="bg-[var(--background)] rounded-lg shadow-lg border border-[var(--border)] px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium ${
                    isActive(item.href)
                      ? 'text-[var(--primary)] bg-[var(--primary-light)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/resume"
                className="relative bg-[var(--primary)] text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--primary-hover)] mt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2 justify-center">
                  Resume
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                </span>
                {showResumeAnimation && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--success)]"></span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}