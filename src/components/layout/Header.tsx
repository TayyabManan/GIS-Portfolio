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
  { name: 'About', href: '/about', shortcut: 'Alt+A' },
  { name: 'Contact', href: '/contact', shortcut: 'Alt+C' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showResumeAnimation, setShowResumeAnimation] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
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

  // Handle scroll behavior with debouncing and RAF
  useEffect(() => {
    let ticking = false
    let lastScrollY = 0
    
    const updateScrollProgress = () => {
      const scrollY = window.scrollY
      const threshold = 150 // Start transformation at this point
      const completeAt = 300 // Complete transformation at this point
      
      // Calculate progress from 0 to 1
      const progress = Math.min(Math.max((scrollY - threshold) / (completeAt - threshold), 0), 1)
      
      setScrollProgress(progress)
      setIsScrolled(progress > 0)
      lastScrollY = scrollY
      ticking = false
    }
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollProgress)
        ticking = true
      }
    }

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    updateScrollProgress() // Check initial scroll position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate dynamic styles based on scroll progress
  const navMarginTop = `${1 * scrollProgress}rem`
  const navBorderRadius = `${9999 * scrollProgress}px`
  const navBackgroundOpacity = 0.7 * scrollProgress
  const borderOpacity = scrollProgress > 0 ? (1 - scrollProgress) : 1

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-75"
      style={{
        backgroundColor: scrollProgress > 0 ? 'transparent' : 'var(--background)',
        borderBottomWidth: scrollProgress > 0 ? '0px' : '1px',
        borderBottomColor: `rgba(var(--border-rgb), ${borderOpacity})`,
        boxShadow: scrollProgress === 0 ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none'
      }}
    >
      <nav 
        className="mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-75 ease-out"
        style={{
          maxWidth: scrollProgress === 1 ? '64rem' : '80rem',
          marginTop: navMarginTop,
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div 
          className="flex items-center justify-between px-6 transition-all duration-75"
          style={{
            height: `${4 - (0.5 * scrollProgress)}rem`,
            borderRadius: navBorderRadius,
            backgroundColor: scrollProgress > 0 ? `rgba(var(--background-rgb), ${navBackgroundOpacity})` : 'transparent',
            backdropFilter: scrollProgress > 0 ? `blur(${12 * scrollProgress}px)` : 'none',
            boxShadow: scrollProgress > 0 ? `0 10px 30px -10px rgba(0, 0, 0, ${0.1 * scrollProgress})` : 'none',
            borderWidth: scrollProgress > 0 ? '1px' : '0px',
            borderColor: `rgba(var(--border-rgb), ${0.5 * scrollProgress})`
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
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.shortcut}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
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
              } ${
                showResumeAnimation ? 'animate-pulse-attention' : ''
              }`}
            >
              <span className="flex items-center gap-2">
                Resume
                <ChatBubbleLeftRightIcon className={`${isScrolled ? 'h-4 w-4' : 'h-5 w-5'}`} />
              </span>
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Alt+R
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900 dark:border-b-gray-700"></div>
              </div>
              {showResumeAnimation && (
                <>
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--success)]"></span>
                  </span>
                  <span className="absolute inset-0 rounded-md bg-[var(--primary-hover)] opacity-0 animate-shine"></span>
                </>
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
                className={`relative bg-[var(--primary)] text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[var(--primary-hover)] mt-4 ${
                  showResumeAnimation ? 'animate-pulse-attention' : ''
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2 justify-center">
                  Resume
                  <ChatBubbleLeftRightIcon className="h-4 w-4" />
                </span>
                {showResumeAnimation && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--success)]"></span>
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}