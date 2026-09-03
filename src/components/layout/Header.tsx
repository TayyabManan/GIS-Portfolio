'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, DocumentTextIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import Logo from '@/components/ui/Logo'
import { useCommandPalette, preloadCommandPalette } from '@/components/ui/CommandPaletteProvider'
import { useTheme } from '@/contexts/ThemeContext'
import { useNavUnderline, warmNavUnderline } from '@/components/effects/useNavUnderline'

// Keyboard shortcuts (Alt+H etc.) are owned and documented by the command
// palette; the nav no longer tooltips them on hover (a shortcut hint on
// every nav hover was noise on the first-impression surface).
const navigationItems = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

// Stable identity so useNavUnderline's effect doesn't re-run per render.
const NAV_HREFS = navigationItems.map((item) => item.href)

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { open: openCommandPalette } = useCommandPalette()
  const { toggleTheme } = useTheme()

  const pathname = usePathname()

  // Check if a navigation item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Active-underline handoff between nav links on route change (desktop only;
  // below the gate the class swap is instant). See useNavUnderline.
  const activeHref = navigationItems.find((item) => isActive(item.href))?.href ?? null
  const setUnderlineRef = useNavUnderline(activeHref, NAV_HREFS)

  // Enhanced scroll detection for mobile (especially iOS)
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = currentScroll > 20
          if (isScrolled !== scrolled) {
            setIsScrolled(scrolled)
          }
          ticking = false
        })
        ticking = true
      }
    }

    // Initial check
    handleScroll()

    // Listen to scroll with passive for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Also listen to touchmove for iOS
    window.addEventListener('touchmove', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [isScrolled])

  // Lock body scroll when mobile menu is open (iOS compatible)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [mobileMenuOpen])

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [mobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`hidden md:block fixed top-0 left-0 right-0 z-[100] mx-auto transition-all duration-300 ${
          isScrolled
            ? 'mt-3 px-4 max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl'
            : 'px-4 sm:px-6 lg:px-8 max-w-7xl'
        }`}
        role="navigation"
        aria-label="Main navigation"
        style={{
          WebkitTransform: 'translateZ(0)',
          transform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        <div
          className={`nav-surface flex items-center justify-between transition-[height,background-color,border-color,padding] duration-300 ${
            isScrolled
              ? 'h-14 px-4 sm:px-6 rounded-full border border-[var(--border)] bg-[var(--background)]'
              : 'h-16 bg-transparent'
          }`}
        >
          {/* Logo. Opaque hairline pill when scrolled - no shadow (the last
              one in the chrome) and no 95% opacity (page text bled through
              the Resume button mid-scroll). The mark and wordmark keep one
              size in both states: scaling text mid-transition blurs it. */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 font-bold transition-opacity duration-300 hover:opacity-80"
          >
            <div className="text-[var(--primary)]">
              <Logo className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <span className="whitespace-nowrap text-base sm:text-lg text-[var(--text)]">
              Tayyab Manan
            </span>
          </Link>

          {/* Desktop Navigation. Hover/focus warms the gsap chunk for the
              underline handoff (intent-based, like preloadCommandPalette). */}
          <div
            className="flex items-center gap-1 lg:gap-2"
            onPointerEnter={warmNavUnderline}
            onFocus={warmNavUnderline}
          >
            {navigationItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg font-medium text-sm lg:text-base transition-colors duration-200 ${
                    active
                      ? 'text-[var(--primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--primary)]'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.name}
                  {/* Underline bar rendered for EVERY link (board: rest ->
                      handoff-out -> handoff-in). Resting state is class-driven
                      (SSR-correct); [transform:scaleX()] arbitrary properties,
                      not scale-x-*, because v4's scale-x-* sets the standalone
                      `scale` property, which would compose with GSAP's inline
                      transform. left-1/4 + w-1/2 centers without a translate. */}
                  <div
                    ref={setUnderlineRef(item.href)}
                    aria-hidden="true"
                    className={`absolute bottom-0 left-1/4 w-1/2 h-0.5 rounded-full bg-[var(--primary)] ${
                      active ? '[transform:scaleX(1)]' : '[transform:scaleX(0)]'
                    }`}
                  />
                </Link>
              )
            })}

            {/* Search Button */}
            <button
              onClick={openCommandPalette}
              onMouseEnter={preloadCommandPalette}
              onFocus={preloadCommandPalette}
              type="button"
              className="p-2 min-h-[44px] min-w-[44px] rounded-lg transition-colors duration-200 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)]"
              aria-label="Open command palette"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2 min-h-[44px] min-w-[44px] rounded-lg transition-colors duration-200 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)]"
              aria-label="Toggle theme"
            >
              {/* Both icons render stacked; [data-theme] CSS in globals.css
                  cross-fades them (board: moon-resting <-> sun-resting) and is
                  correct pre-hydration, unlike theme state. */}
              <span className="relative block h-5 w-5" aria-hidden="true">
                <MoonIcon className="theme-icon-moon absolute inset-0 h-5 w-5" />
                <SunIcon className="theme-icon-sun absolute inset-0 h-5 w-5" />
              </span>
            </button>

            {/* Resume Button. Document icon: the label says "Resume", so the
                icon must too - the old chat bubble hinted at the resume-page
                chatbot, which no one can know before clicking. */}
            <Link
              href="/resume"
              className="ml-2 px-4 lg:px-5 py-2 text-[var(--on-primary)] font-medium text-sm lg:text-base rounded-lg transition-colors duration-200 flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)]"
            >
              Resume
              <DocumentTextIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - iOS Optimized */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-[100]"
        style={{
          position: 'fixed',
          WebkitTransform: 'translate3d(0,0,0)',
          transform: 'translate3d(0,0,0)',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitPerspective: '1000',
          perspective: '1000',
          willChange: 'auto'
        }}
      >
        {/* Mobile Navbar Container */}
        <div
          className={`transition-all duration-300 ease-out ${
            isScrolled ? 'p-3' : 'p-0'
          }`}
        >
          {/* Mobile Nav Bar */}
          <div
            className={`nav-surface transition-all duration-300 ease-out ${
              isScrolled
                ? 'rounded-full border border-[var(--border)] bg-[var(--background)]'
                : mobileMenuOpen
                ? 'bg-[var(--background)]'
                : 'bg-transparent'
            }`}
            style={{
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
            }}
          >
            <div className="flex items-center justify-between h-16 px-4">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 font-bold transition-opacity duration-300 hover:opacity-80 z-10"
              >
                <div className="text-[var(--primary)]">
                  <Logo className="w-6 h-6" />
                </div>
                <span className="whitespace-nowrap text-base text-[var(--text)]">
                  Tayyab Manan
                </span>
              </Link>

              {/* Mobile Controls */}
              <div className="flex items-center gap-1 z-10">
                {/* Mobile Search */}
                <button
                  onClick={openCommandPalette}
                  onMouseEnter={preloadCommandPalette}
                  onFocus={preloadCommandPalette}
                  type="button"
                  className="p-2 min-h-[44px] min-w-[44px] transition-colors rounded-lg flex items-center justify-center text-[var(--text-secondary)] active:text-[var(--primary)] active:bg-[var(--background-secondary)]"
                  aria-label="Open search"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>

                {/* Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  type="button"
                  className="p-2 min-h-[44px] min-w-[44px] transition-colors rounded-lg flex items-center justify-center text-[var(--text-secondary)] active:text-[var(--primary)] active:bg-[var(--background-secondary)]"
                  aria-label="Toggle theme"
                >
                  {/* Stacked pair, cross-faded by [data-theme] CSS (see globals.css) */}
                  <span className="relative block h-5 w-5" aria-hidden="true">
                    <MoonIcon className="theme-icon-moon absolute inset-0 h-5 w-5" />
                    <SunIcon className="theme-icon-sun absolute inset-0 h-5 w-5" />
                  </span>
                </button>

                {/* Hamburger Menu */}
                <button
                  type="button"
                  className="p-2 min-h-[44px] min-w-[44px] transition-colors rounded-lg flex items-center justify-center text-[var(--text-secondary)] active:text-[var(--text)] active:bg-[var(--background-secondary)]"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu-dropdown"
                >
                  {mobileMenuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay + Dropdown - kept OUTSIDE the transformed navbar above.
          The navbar has transform: translate3d(...), which would otherwise become the
          containing block for these position:fixed children, shrinking the scrim to the
          navbar height and breaking tap-anywhere-to-close. */}
      <div className="md:hidden">
        {/* Mobile Menu Overlay (tap anywhere to close) */}
        <div
          className={`fixed inset-0 bg-[var(--overlay)] transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ zIndex: 90 }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Mobile Menu Dropdown */}
        <div
          id="mobile-menu-dropdown"
          className={`fixed left-3 right-3 transition-all duration-300 ease-out ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          style={{
            top: isScrolled ? 'calc(4rem + 2rem)' : '4.75rem',
            zIndex: 95,
            WebkitTransform: mobileMenuOpen ? 'translate3d(0,0,0)' : 'translate3d(0,-1rem,0)',
            transform: mobileMenuOpen ? 'translate3d(0,0,0)' : 'translate3d(0,-1rem,0)',
          }}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="rounded-2xl shadow-2xl border border-[var(--border)] bg-[var(--background)] overflow-hidden">
            <div className="p-2 space-y-1">
              {navigationItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    role="menuitem"
                    className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all duration-200 active:scale-[0.98] ${
                      active
                        ? 'text-[var(--primary)]'
                        : 'text-[var(--text)] active:bg-[var(--background-secondary)]'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span>{item.name}</span>
                  </Link>
                )
              })}

              {/* Resume Button */}
              <Link
                href="/resume"
                role="menuitem"
                className="flex items-center justify-center px-4 py-3 mt-2 text-[var(--on-primary)] font-medium rounded-lg transition-all duration-200 active:scale-[0.98] gap-2 bg-[var(--primary)] active:bg-[var(--primary-hover)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
                <DocumentTextIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16" />
    </>
  )
}
