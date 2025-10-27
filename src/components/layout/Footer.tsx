'use client'

import Link from 'next/link'
import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const UpworkIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [mounted, setMounted] = useState(false)
  const [footerDots, setFooterDots] = useState<Array<{left: number, top: number, delay: number}>>([])

  useEffect(() => {
    setMounted(true)
    // Generate random positions for subtle footer animation
    const dotsArray = Array.from({ length: 12 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5
    }))
    setFooterDots(dotsArray)
  }, [])

  return (
    <footer className="bg-[var(--background)] text-[var(--text)] py-8 sm:py-12 flex items-center relative overflow-hidden border-t border-[var(--border)]">
      {/* Subtle Footer Animation */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)] to-transparent opacity-50" />
        
        {/* Subtle network pattern */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footer-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="1" fill="var(--border)" opacity="0.1" />
              <circle cx="50" cy="50" r="0.5" fill="var(--primary)" opacity="0.08" />
              <circle cx="150" cy="50" r="0.5" fill="var(--accent)" opacity="0.08" />
              <circle cx="50" cy="150" r="0.5" fill="var(--info)" opacity="0.08" />
              <circle cx="150" cy="150" r="0.5" fill="var(--success)" opacity="0.08" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-pattern)" />
        </svg>

        {/* Floating subtle elements */}
        {mounted && (
          <div className="absolute inset-0">
            {footerDots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-[var(--border)]"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Mobile view - modern clean layout */}
          <div className="sm:hidden">
            <div className="flex flex-col gap-8">
              {/* Brand & Social */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-[var(--text)] mb-1">Tayyab Manan</h2>
                  <p className="text-xs text-[var(--text-secondary)]">AI Engineering Student</p>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.linkedin.com/in/muhammad-tayyab-3962a2373/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://github.com/TayyabManan" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.upwork.com/users/~0155edcc7d42fc5b51" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                  >
                    <UpworkIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>

              {/* Two column layout */}
              <div className="grid grid-cols-2 gap-8">
                {/* Quick Links */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-[var(--text)]">Quick Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/projects" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                        Projects
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <a href="/resume" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors" target="_blank" rel="noopener noreferrer">
                        Resume
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-sm font-semibold mb-3 text-[var(--text)]">Contact</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <MapPinIcon className="h-3.5 w-3.5 text-[var(--text-tertiary)] mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[var(--text-secondary)]">Islamabad, Pakistan</span>
                    </li>
                    <li>
                      <a 
                        href="mailto:haris.a.mannan@gmail.com"
                        className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-2"
                      >
                        <EnvelopeIcon className="h-3.5 w-3.5 text-[var(--text-tertiary)] flex-shrink-0" />
                        <span className="truncate">Email Me</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop view - original layout */}
          <div className="hidden sm:grid sm:grid-cols-3 sm:col-span-3 gap-8">
            {/* Contact Info */}
            <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-[var(--text-tertiary)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--text-secondary)]">Islamabad, Pakistan</span>
              </div>
              <div className="flex items-start gap-3">
                <EnvelopeIcon className="h-5 w-5 text-[var(--text-tertiary)] mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:haris.a.mannan@gmail.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors break-all"
                >
                  haris.a.mannan@gmail.com
                </a>
              </div>
            </div>
            </div>

            {/* Quick Links */}
            <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/projects" className="block text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                Projects
              </Link>
              <Link href="/about" className="block text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                About
              </Link>
              <Link href="/contact" className="block text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                Contact
              </Link>
              <a href="/resume" className="block text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </div>
            </div>

            {/* Professional Links */}
            <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Connect</h3>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/muhammad-tayyab-3962a2373/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a 
                href="https://github.com/TayyabManan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a 
                href="https://www.upwork.com/users/~0155edcc7d42fc5b51" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
              >
                <UpworkIcon className="h-6 w-6" />
              </a>
            </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border)] mt-8 pt-8 text-center">
          <p className="text-[var(--text-tertiary)]">
            © {currentYear} Tayyab Manan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}