'use client'

import { motion } from 'framer-motion'
import {
  BookOpenIcon,
  BeakerIcon,
  RocketLaunchIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

export default function CurrentlyLearning() {
  const learningItems = [
    {
      icon: BookOpenIcon,
      category: "Studying",
      items: [
        "Face Detection & Convolutional Neural Networks (CNNs)",
        "Advanced Computer Vision Techniques",
        "Deep Learning Specialization (Coursera)",
        "Transformer Architectures & Attention Mechanisms",
      ],
      color: "primary"
    },
    {
      icon: BeakerIcon,
      category: "Experimenting With",
      items: [
        "Fine-tuning Large Language Models",
        "Diffusion Models for Image Generation",
        "Time-Series Forecasting with LSTM/Transformers",
      ],
      color: "accent"
    },
    {
      icon: BookOpenIcon,
      category: "Reading",
      items: [
        "Chip Huyen's 'AI Engineering: Building Applications with Foundation Models'",
        "Aurélien Géron's 'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow'"
      ],
      color: "info"
    },
    {
      icon: RocketLaunchIcon,
      category: "Next Goals",
      items: [
        "Deploy ML model to production with monitoring",
        "Contribute to open-source ML projects",
        "Build end-to-end MLOps pipeline",
      ],
      color: "warning"
    }
  ]

  const colorClasses = {
    primary: {
      bg: "bg-[var(--primary)]/10",
      text: "text-[var(--primary)]",
      border: "border-[var(--primary)]/20"
    },
    accent: {
      bg: "bg-[var(--accent)]/10",
      text: "text-[var(--accent)]",
      border: "border-[var(--accent)]/20"
    },
    info: {
      bg: "bg-[var(--info)]/10",
      text: "text-[var(--info)]",
      border: "border-[var(--info)]/20"
    },
    warning: {
      bg: "bg-amber-500/10",
      text: "text-amber-500",
      border: "border-amber-500/20"
    }
  }

  return (
    <section className="py-16 sm:py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background)]/90 backdrop-blur-sm border border-[var(--border)] mb-4 shadow-md">
            <SparklesIcon className="h-5 w-5 text-[var(--accent)]" />
            <span className="text-sm font-semibold text-[var(--text-secondary)]" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>Continuous Learning</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            Currently Learning & Exploring
          </h2>
          <p className="mt-4 text-lg font-semibold text-[var(--text-secondary)] max-w-2xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Actively expanding my skills and knowledge in AI/ML through courses, experiments, and research
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {learningItems.map((section, index) => {
            const colors = colorClasses[section.color as keyof typeof colorClasses]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[var(--background)]/95 backdrop-blur-md border border-[var(--border)] rounded-2xl p-6 sm:p-8 hover:border-[var(--primary)] transition-all duration-300 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 ${colors.bg} rounded-xl border ${colors.border}`}>
                    <section.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[var(--text)]" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.15)' }}>
                    {section.category}
                  </h3>
                </div>

                <ul className="space-y-3">
                  {section.items.map((item, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                      className="flex items-start gap-3 text-sm text-[var(--text-secondary)] group"
                    >
                      <span className={`mt-1.5 w-2 h-2 rounded-full ${colors.text} flex-shrink-0 group-hover:scale-150 transition-transform opacity-80`} style={{ backgroundColor: 'currentColor' }} />
                      <span className="font-medium group-hover:text-[var(--text)] transition-colors" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Progress indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
        </motion.div>
      </div>
    </section>
  )
}
