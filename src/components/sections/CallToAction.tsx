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
    <section className="relative min-h-[50vh] py-16 sm:py-20 lg:py-24 flex items-center bg-transparent border-y border-[var(--border)] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Transparent overlay - let hero gradient show through */}
        <div className="absolute inset-0 bg-transparent opacity-5" />
        
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="mb-8 text-left">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] rounded-full mb-4 shadow-lg"
              >
                <SparklesIcon className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white uppercase tracking-wider">Let&apos;s Connect</span>
              </motion.div>
              <h2 className="text-4xl font-bold text-[var(--text)] mb-4 text-left" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                Interested in Collaborating?
              </h2>
              <p className="text-xl text-[var(--text-secondary)] text-left" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                I&apos;m excited to learn, contribute, and build impactful ML solutions.
                Let&apos;s discuss opportunities, projects, or just chat about AI and machine learning!
              </p>
            </div>
            <div className="flex flex-row items-start gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="group bg-[var(--primary)] text-white px-4 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-[var(--primary-hover)] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Get in Touch</span>
                <span className="sm:hidden">Contact</span>
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/projects"
                className="group border-2 border-[var(--primary)] text-[var(--primary)] px-4 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold hover:bg-[var(--primary)] hover:text-white transition-all duration-300 backdrop-blur-sm bg-[var(--background)]/50 hover:shadow-lg inline-flex items-center gap-2 whitespace-nowrap"
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

          {/* Right Column - SVG Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mt-8 lg:mt-0"
          >
            <svg className="w-full h-full max-w-md" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Gradients for nodes */}
                <radialGradient id="nodeGradient1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.6" />
                </radialGradient>
                <radialGradient id="nodeGradient2">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6" />
                </radialGradient>
                <radialGradient id="nodeGradient3">
                  <stop offset="0%" stopColor="var(--info)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--info)" stopOpacity="0.6" />
                </radialGradient>
              </defs>

              {/* Connection Lines - drawn first so they're behind nodes */}
              <g stroke="var(--text-tertiary)" strokeWidth="1.5" opacity="0.15">
                {/* Layer 1 to Layer 2 */}
                <line x1="80" y1="80" x2="200" y2="60" />
                <line x1="80" y1="80" x2="200" y2="120" />
                <line x1="80" y1="80" x2="200" y2="180" />
                <line x1="80" y1="140" x2="200" y2="60" />
                <line x1="80" y1="140" x2="200" y2="120" />
                <line x1="80" y1="140" x2="200" y2="180" />
                <line x1="80" y1="140" x2="200" y2="240" />
                <line x1="80" y1="200" x2="200" y2="120" />
                <line x1="80" y1="200" x2="200" y2="180" />
                <line x1="80" y1="200" x2="200" y2="240" />
                <line x1="80" y1="200" x2="200" y2="300" />
                <line x1="80" y1="260" x2="200" y2="180" />
                <line x1="80" y1="260" x2="200" y2="240" />
                <line x1="80" y1="260" x2="200" y2="300" />
                <line x1="80" y1="320" x2="200" y2="240" />
                <line x1="80" y1="320" x2="200" y2="300" />

                {/* Layer 2 to Layer 3 */}
                <line x1="200" y1="60" x2="320" y2="140" />
                <line x1="200" y1="60" x2="320" y2="200" />
                <line x1="200" y1="60" x2="320" y2="260" />
                <line x1="200" y1="120" x2="320" y2="140" />
                <line x1="200" y1="120" x2="320" y2="200" />
                <line x1="200" y1="120" x2="320" y2="260" />
                <line x1="200" y1="180" x2="320" y2="140" />
                <line x1="200" y1="180" x2="320" y2="200" />
                <line x1="200" y1="180" x2="320" y2="260" />
                <line x1="200" y1="240" x2="320" y2="140" />
                <line x1="200" y1="240" x2="320" y2="200" />
                <line x1="200" y1="240" x2="320" y2="260" />
                <line x1="200" y1="300" x2="320" y2="200" />
                <line x1="200" y1="300" x2="320" y2="260" />
              </g>

              {/* Neural Network Nodes */}
              <g>
                {/* Layer 1 - Input (5 nodes) */}
                <circle cx="80" cy="80" r="14" fill="url(#nodeGradient1)" stroke="var(--primary)" strokeWidth="2">
                  <animate attributeName="r" values="14;16;14" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="140" r="14" fill="url(#nodeGradient1)" stroke="var(--primary)" strokeWidth="2">
                  <animate attributeName="r" values="14;16;14" dur="3s" begin="0.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="200" r="14" fill="url(#nodeGradient1)" stroke="var(--primary)" strokeWidth="2">
                  <animate attributeName="r" values="14;16;14" dur="3s" begin="0.6s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="260" r="14" fill="url(#nodeGradient1)" stroke="var(--primary)" strokeWidth="2">
                  <animate attributeName="r" values="14;16;14" dur="3s" begin="0.9s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="320" r="14" fill="url(#nodeGradient1)" stroke="var(--primary)" strokeWidth="2">
                  <animate attributeName="r" values="14;16;14" dur="3s" begin="1.2s" repeatCount="indefinite" />
                </circle>

                {/* Layer 2 - Hidden (5 nodes) */}
                <circle cx="200" cy="60" r="14" fill="url(#nodeGradient2)" stroke="var(--accent)" strokeWidth="2">
                  <animate attributeName="r" values="14;17;14" dur="2.5s" begin="0.2s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="120" r="14" fill="url(#nodeGradient2)" stroke="var(--accent)" strokeWidth="2">
                  <animate attributeName="r" values="14;17;14" dur="2.5s" begin="0.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="180" r="14" fill="url(#nodeGradient2)" stroke="var(--accent)" strokeWidth="2">
                  <animate attributeName="r" values="14;17;14" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="240" r="14" fill="url(#nodeGradient2)" stroke="var(--accent)" strokeWidth="2">
                  <animate attributeName="r" values="14;17;14" dur="2.5s" begin="1.1s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="300" r="14" fill="url(#nodeGradient2)" stroke="var(--accent)" strokeWidth="2">
                  <animate attributeName="r" values="14;17;14" dur="2.5s" begin="1.4s" repeatCount="indefinite" />
                </circle>

                {/* Layer 3 - Output (3 nodes) */}
                <circle cx="320" cy="140" r="14" fill="url(#nodeGradient3)" stroke="var(--info)" strokeWidth="2">
                  <animate attributeName="r" values="14;18;14" dur="2s" begin="0.3s" repeatCount="indefinite" />
                </circle>
                <circle cx="320" cy="200" r="14" fill="url(#nodeGradient3)" stroke="var(--info)" strokeWidth="2">
                  <animate attributeName="r" values="14;18;14" dur="2s" begin="0.7s" repeatCount="indefinite" />
                </circle>
                <circle cx="320" cy="260" r="14" fill="url(#nodeGradient3)" stroke="var(--info)" strokeWidth="2">
                  <animate attributeName="r" values="14;18;14" dur="2s" begin="1.1s" repeatCount="indefinite" />
                </circle>

                {/* Data flow particles - from all 5 input nodes */}
                {/* From input node 1 (y=80) */}
                <circle r="4" fill="var(--primary)">
                  <animateMotion dur="4s" repeatCount="indefinite">
                    <mpath href="#path1"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" />
                </circle>

                {/* From input node 2 (y=140) */}
                <circle r="4" fill="var(--primary)">
                  <animateMotion dur="3.8s" repeatCount="indefinite" begin="0.5s">
                    <mpath href="#path2"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.8s" begin="0.5s" repeatCount="indefinite" />
                </circle>

                {/* From input node 3 (y=200) */}
                <circle r="4" fill="var(--primary)">
                  <animateMotion dur="4.2s" repeatCount="indefinite" begin="1s">
                    <mpath href="#path3"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="4.2s" begin="1s" repeatCount="indefinite" />
                </circle>

                {/* From input node 4 (y=260) */}
                <circle r="4" fill="var(--primary)">
                  <animateMotion dur="3.6s" repeatCount="indefinite" begin="1.5s">
                    <mpath href="#path4"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.6s" begin="1.5s" repeatCount="indefinite" />
                </circle>

                {/* From input node 5 (y=320) */}
                <circle r="4" fill="var(--primary)">
                  <animateMotion dur="4.4s" repeatCount="indefinite" begin="2s">
                    <mpath href="#path5"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="4.4s" begin="2s" repeatCount="indefinite" />
                </circle>

                {/* Additional particles through middle layer */}
                <circle r="4" fill="var(--accent)">
                  <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.3s">
                    <mpath href="#path6"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.5s" begin="0.3s" repeatCount="indefinite" />
                </circle>

                <circle r="4" fill="var(--accent)">
                  <animateMotion dur="3.7s" repeatCount="indefinite" begin="1.2s">
                    <mpath href="#path7"/>
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.7s" begin="1.2s" repeatCount="indefinite" />
                </circle>

                {/* Hidden paths for animation */}
                {/* Paths from each input node through hidden layer to outputs */}
                <path id="path1" d="M 80,80 L 200,60 L 320,140" fill="none" stroke="none" />
                <path id="path2" d="M 80,140 L 200,120 L 320,200" fill="none" stroke="none" />
                <path id="path3" d="M 80,200 L 200,180 L 320,200" fill="none" stroke="none" />
                <path id="path4" d="M 80,260 L 200,240 L 320,260" fill="none" stroke="none" />
                <path id="path5" d="M 80,320 L 200,300 L 320,260" fill="none" stroke="none" />
                <path id="path6" d="M 80,80 L 200,180 L 320,140" fill="none" stroke="none" />
                <path id="path7" d="M 80,200 L 200,300 L 320,260" fill="none" stroke="none" />
              </g>

              {/* Layer labels */}
              <g fill="var(--text)" fontSize="10" fontWeight="600" opacity="0.6">
                <text x="80" y="360" textAnchor="middle">INPUT</text>
                <text x="200" y="360" textAnchor="middle">HIDDEN</text>
                <text x="320" y="360" textAnchor="middle">OUTPUT</text>
              </g>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  )
}