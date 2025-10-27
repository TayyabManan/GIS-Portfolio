'use client'

import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { MapPinIcon, AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const skills = [
  'Machine Learning & Deep Learning (PyTorch, TensorFlow)',
  'Computer Vision & Image Processing',
  'Natural Language Processing (NLP)',
  'MLOps & Model Deployment',
  'Geospatial AI & Remote Sensing',
  'Multi-Agent AI Systems (LangChain, AutoGen, CrewAI)',
  'Python Programming & Data Engineering',
  'Full Stack Development (React, Next.js, FastAPI)'
]

const education = [
  {
    degree: 'Bachelor of Science in Geographic Information Systems(GIS)',
    school: 'University of the Punjab, Lahore',
    year: '2025',
    description: 'Developing GIS solutions using Python, QGIS, and Google Earth Engine to transform satellite data into actionable insights.'
  },
  {
    degree: 'Masters in Artificial Intelligence Engineering',
    school: 'COMSATS Islamabad',
    year: '2027 (Expected)',
    description: 'Graduate student specializing in computer vision, deep learning architectures, and practical AI system deployment.'
  }
]

const experience = [
  {
    role: 'Project Experience',
    company: 'WaterTrace Pakistan',
    period: '2024 - 2025',
    description: 'Built ML-powered groundwater prediction system using 22 years of satellite data. Achieved R²=0.89 through feature engineering and model optimization. Deployed full-stack application with React and Flask.'
  },
  {
    role: 'Academic Projects',
    company: 'University Coursework',
    period: '2023 - Present',
    description: 'Developing ML solutions for coursework including computer vision applications, NLP systems, and geospatial analysis projects. Building hands-on experience with PyTorch, TensorFlow, and modern ML frameworks.'
  }
]

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  return (
    <div className="relative bg-[var(--background)] py-16 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-light)] via-[var(--background)] to-[var(--accent)] opacity-30" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-96 h-96 bg-[var(--primary)] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-[var(--accent)] rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -80, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.05]" />
        
        {/* Floating icons */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${10 + (i * 12)}%`,
                  top: `${15 + (i * 10)}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                <div className="w-12 h-12 border-2 border-[var(--border)] rounded-lg opacity-20" />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Left aligned */}
        <div className="mb-16 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-4">About Me</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            AI Engineering graduate student building machine learning systems with focus
            on Computer Vision, NLP, and Geospatial AI. Seeking Summer 2026 internships.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Bio & Skills - Left side on desktop, order-1 on mobile */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            <section>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">About My Journey</h2>
              <div className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed space-y-4">
                <p>
                  I&apos;m an AI Engineering graduate student specializing in Computer Vision, Natural Language Processing,
                  and Geospatial AI. Currently pursuing my Master&apos;s in AI Engineering at COMSATS Islamabad,
                  I&apos;m passionate about applying machine learning to solve real-world problems, particularly in
                  environmental monitoring and sustainable development.
                </p>
                <p>
                  My journey into AI started with a fascination for how satellite imagery and geospatial data could be
                  transformed into actionable insights. Through my Bachelor&apos;s in Geographic Information Systems and
                  hands-on projects, I&apos;ve developed skills in end-to-end ML development - from data collection and
                  preprocessing to model training and deployment. I&apos;m proficient with PyTorch, TensorFlow, and modern
                  ML frameworks like LangChain for building intelligent systems.
                </p>
                <p>
                  I&apos;m actively seeking Summer 2026 internship opportunities where I can contribute to impactful ML projects,
                  learn from experienced engineers, and grow my skills in production ML systems. My projects like WaterTrace
                  (groundwater prediction) and EV Suitability Analysis demonstrate my ability to tackle complex problems and
                  build full-stack ML applications. I&apos;m excited to bring my enthusiasm for learning, problem-solving
                  skills, and technical foundation to a collaborative team environment.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">Core Competencies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-[var(--primary)] flex-shrink-0" />
                    <span className="text-[var(--text-secondary)]">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Profile - Right side on desktop, order-1 on mobile */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="relative aspect-square w-64 mx-auto mb-8 rounded-xl overflow-hidden shadow-lg border-2 border-[var(--border)]">
              <Image
                src="/images/profile.jpg"
                alt="Tayyab Manan - ML Engineer and AI Developer specializing in Computer Vision, NLP, and Geospatial AI"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 256px"
                priority
              />
            </div>

            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                <MapPinIcon className="h-5 w-5" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-[var(--text-secondary)]">
                <BriefcaseIcon className="h-5 w-5" />
                <span>Available for Remote Work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <AcademicCapIcon className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-bold text-[var(--text)]">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="border-l-2 border-[var(--primary-light)] pl-6 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--text)]">{edu.degree}</h3>
                    <span className="text-sm text-[var(--primary)] font-medium">{edu.year}</span>
                  </div>
                  <p className="text-[var(--primary)] font-medium mb-2">{edu.school}</p>
                  <p className="text-[var(--text-secondary)]">{edu.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <BriefcaseIcon className="h-6 w-6 text-[var(--primary)]" />
              <h2 className="text-2xl font-bold text-[var(--text)]">Experience</h2>
            </div>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-[var(--primary-light)] pl-6 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--text)]">{exp.role}</h3>
                    <span className="text-sm text-[var(--primary)] font-medium">{exp.period}</span>
                  </div>
                  <p className="text-[var(--primary)] font-medium mb-2">{exp.company}</p>
                  <p className="text-[var(--text-secondary)]">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Call to Action - Two column layout */}
        <div className="mt-16 bg-[var(--background-secondary)] rounded-2xl p-8 lg:p-12 border border-[var(--border)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] mb-4">Let&apos;s Work Together</h2>
              <p className="text-[var(--text-secondary)] mb-6 text-base sm:text-lg">
                I&apos;m always interested in discussing new opportunities, collaborating on innovative
                ML projects, or sharing insights about machine learning engineering, computer vision, and MLOps.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[var(--primary-hover)] transition-all hover:scale-105 shadow-lg"
              >
                Get in Touch
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Right - SVG Illustration */}
            <div className="hidden lg:flex items-center justify-center">
              <svg className="w-full max-w-xs" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                {/* Coffee chat / collaboration illustration */}
                <g>
                  {/* Laptop */}
                  <g>
                    {/* Screen */}
                    <rect
                      x="95"
                      y="85"
                      width="70"
                      height="50"
                      rx="3"
                      fill="var(--accent)"
                      opacity="0.8"
                    />
                    {/* Screen border */}
                    <rect
                      x="98"
                      y="88"
                      width="64"
                      height="44"
                      rx="2"
                      fill="var(--background)"
                      opacity="0.3"
                    />

                    {/* Code on screen - animated typing */}
                    <g>
                      {[0, 1, 2, 3].map((i) => (
                        <motion.line
                          key={`code-${i}`}
                          x1="105"
                          y1={95 + i * 8}
                          x2="105"
                          y2={95 + i * 8}
                          stroke="var(--success)"
                          strokeWidth="2"
                          strokeLinecap="round"
                          initial={{ x2: 105 }}
                          animate={{ x2: 155 }}
                          transition={{
                            duration: 1.5,
                            delay: i * 0.3,
                            repeat: Infinity,
                            repeatDelay: 2
                          }}
                        />
                      ))}
                    </g>

                    {/* Keyboard base */}
                    <path
                      d="M 90 135 L 95 140 L 165 140 L 170 135 Z"
                      fill="var(--accent)"
                      opacity="0.8"
                    />
                  </g>

                  {/* Notebook with pen */}
                  <g>
                    {/* Notebook */}
                    <rect
                      x="50"
                      y="50"
                      width="35"
                      height="45"
                      rx="2"
                      fill="var(--warning)"
                      opacity="0.7"
                    />
                    {/* Spiral binding */}
                    {[0, 1, 2, 3, 4].map((i) => (
                      <circle
                        key={`spiral-${i}`}
                        cx="52"
                        cy={55 + i * 9}
                        r="2"
                        fill="var(--background)"
                        opacity="0.5"
                      />
                    ))}
                    {/* Lines on notebook */}
                    {[0, 1, 2, 3].map((i) => (
                      <line
                        key={`line-${i}`}
                        x1="58"
                        y1={60 + i * 8}
                        x2="80"
                        y2={60 + i * 8}
                        stroke="var(--background)"
                        strokeWidth="1"
                        opacity="0.3"
                      />
                    ))}

                    {/* Pen */}
                    <motion.g
                      animate={{
                        rotate: [0, -5, 0],
                        x: [0, 2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <rect
                        x="75"
                        y="65"
                        width="4"
                        height="25"
                        fill="var(--info)"
                        opacity="0.8"
                        transform="rotate(-45 77 77)"
                      />
                      <path
                        d="M 88 52 L 90 50 L 92 52 Z"
                        fill="var(--text)"
                        opacity="0.7"
                      />
                    </motion.g>
                  </g>

                  {/* Floating idea icons */}
                  {[
                    { x: 140, y: 50, icon: 'lightbulb', delay: 0 },
                    { x: 170, y: 70, icon: 'star', delay: 0.5 },
                    { x: 45, y: 30, icon: 'checkmark', delay: 1 }
                  ].map((item, i) => (
                    <motion.g
                      key={`icon-${i}`}
                      animate={{
                        y: [0, -8, 0],
                        opacity: [0.4, 0.9, 0.4]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: item.delay,
                        ease: "easeInOut"
                      }}
                    >
                      {item.icon === 'lightbulb' && (
                        <>
                          <circle cx={item.x} cy={item.y} r="6" fill="var(--warning)" opacity="0.7" />
                          <rect x={item.x - 2} y={item.y + 6} width="4" height="4" fill="var(--warning)" opacity="0.7" />
                        </>
                      )}
                      {item.icon === 'star' && (
                        <path
                          d={`M ${item.x} ${item.y - 6} L ${item.x + 2} ${item.y} L ${item.x + 6} ${item.y + 2} L ${item.x + 2} ${item.y + 4} L ${item.x} ${item.y + 8} L ${item.x - 2} ${item.y + 4} L ${item.x - 6} ${item.y + 2} L ${item.x - 2} ${item.y} Z`}
                          fill="var(--success)"
                          opacity="0.7"
                        />
                      )}
                      {item.icon === 'checkmark' && (
                        <path
                          d={`M ${item.x - 4} ${item.y} L ${item.x - 1} ${item.y + 4} L ${item.x + 4} ${item.y - 4}`}
                          stroke="var(--success)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          fill="none"
                          opacity="0.7"
                        />
                      )}
                    </motion.g>
                  ))}

                  {/* Chat bubbles */}
                  <motion.g
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Bubble 1 */}
                    <rect x="115" y="160" width="30" height="20" rx="8" fill="var(--primary)" opacity="0.6" />
                    <path d="M 120 180 L 125 185 L 130 180" fill="var(--primary)" opacity="0.6" />
                  </motion.g>

                  <motion.g
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.3,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Bubble 2 */}
                    <rect x="55" y="165" width="25" height="18" rx="7" fill="var(--accent)" opacity="0.6" />
                    <path d="M 60 183 L 64 187 L 68 183" fill="var(--accent)" opacity="0.6" />
                  </motion.g>

                  {/* Connecting dots showing collaboration */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.circle
                      key={`dot-${i}`}
                      cx={60 + i * 20}
                      cy={155}
                      r="2"
                      fill="var(--info)"
                      opacity="0"
                      animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0.5, 1.5, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}