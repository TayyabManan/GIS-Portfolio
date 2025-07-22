'use client'

import Link from 'next/link'
import { MapPinIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import { Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

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
    <footer className="bg-[var(--background)] text-[var(--text)] min-h-[50vh] py-16 sm:py-20 flex items-center relative overflow-hidden border-t border-[var(--border)]">
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
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[var(--text)]">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-[var(--text-tertiary)]" />
                <span className="text-[var(--text-secondary)]">Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-[var(--text-tertiary)]" />
                <a 
                  href="mailto:haris.a.mannan@gmail.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
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