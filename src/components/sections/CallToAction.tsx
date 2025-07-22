'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function CallToAction() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <section className="relative min-h-[50vh] py-16 sm:py-20 lg:py-24 flex items-center bg-[var(--background-secondary)] border-y border-[var(--border)] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-light)] via-transparent to-[var(--accent)] opacity-5" />
        
        {/* Animated shapes */}
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-[var(--primary)] rounded-full blur-3xl opacity-5"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl opacity-5"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating icons */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + (i * 15)}%`,
                  top: `${20 + (i % 2 * 60)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  y: {
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  rotate: {
                    duration: 20 + i * 2,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                <div className="w-8 h-8 border-2 border-[var(--border)] rounded-lg opacity-10" />
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:64px_64px] opacity-5" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--primary-light)] rounded-full mb-4"
            >
              <SparklesIcon className="w-5 h-5 text-[var(--primary)]" />
              <span className="text-sm font-medium text-[var(--primary)]">Let's Work Together</span>
            </motion.div>
            <h2 className="text-4xl font-bold text-[var(--text)] mb-4">
              Ready to Transform Your Spatial Data?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
              Let&apos;s collaborate on innovative GIS solutions that turn complex geographic 
              information into actionable insights for your organization.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="group bg-[var(--primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start a Project
              <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/projects"
              className="group border-2 border-[var(--primary)] text-[var(--primary)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-300 backdrop-blur-sm bg-[var(--background)]/50 hover:shadow-lg flex items-center gap-2"
            >
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}