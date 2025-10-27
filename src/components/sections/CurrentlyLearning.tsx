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
        "Chip Huyen's \'AI Engineering: Building Applications with Foundation Models\'",
        "Aurélien Géron's \'Hands-On Machine Learning with Scikit-Learn, Keras & TensorFlow\'"
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
    <section className="py-16 sm:py-24 bg-[var(--background-secondary)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background)] border border-[var(--border)] mb-4">
            <SparklesIcon className="h-5 w-5 text-[var(--accent)]" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">Continuous Learning</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">
            Currently Learning & Exploring
          </h2>
          <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
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
                className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 hover:border-[var(--primary)] transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 ${colors.bg} rounded-xl border ${colors.border}`}>
                    <section.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text)]">
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
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${colors.bg} ${colors.text} flex-shrink-0 group-hover:scale-150 transition-transform`} />
                      <span className="group-hover:text-[var(--text)] transition-colors">
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
