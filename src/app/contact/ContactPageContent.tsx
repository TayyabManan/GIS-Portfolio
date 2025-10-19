"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Github, Linkedin } from "lucide-react";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string; // Anti-spam field
}

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: "Email",
    value: "haris.a.mannan@gmail.com",
    href: "mailto:haris.a.mannan@gmail.com",
  },
  {
    icon: MapPinIcon,
    label: "Location",
    value: "Islamabad, Pakistan",
    href: null,
  },
];

export default function ContactPageContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [mounted, setMounted] = useState(false);
  const [contactDots, setContactDots] = useState<Array<{left: number, top: number, delay: number, duration: number}>>([]);

  useEffect(() => {
    setMounted(true);
    // Generate random positions for animated contact elements
    const dotsArray = Array.from({ length: 25 }, () => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3
    }));
    setContactDots(dotsArray);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[var(--background)] py-16 min-h-screen relative overflow-hidden">
      {/* Animated Contact Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--background-tertiary)]" />
        
        {/* Communication pattern - representing connectivity */}
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-pattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="2" fill="var(--primary)" opacity="0.1" />
              <circle cx="20" cy="20" r="1.5" fill="var(--accent)" opacity="0.08" />
              <circle cx="100" cy="20" r="1.5" fill="var(--info)" opacity="0.08" />
              <circle cx="20" cy="100" r="1.5" fill="var(--success)" opacity="0.08" />
              <circle cx="100" cy="100" r="1.5" fill="var(--primary)" opacity="0.08" />
              <path d="M60,60 L20,20 M60,60 L100,20 M60,60 L20,100 M60,60 L100,100" stroke="var(--border)" strokeWidth="0.5" opacity="0.05" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-pattern)" />
        </svg>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-16 left-8 w-80 h-80 bg-[var(--primary)]/8 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-16 right-8 w-80 h-80 bg-[var(--accent)]/8 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Floating communication elements */}
        {mounted && (
          <div className="absolute inset-0">
            {['@', '✉', '📧', '💬', '📞', '🌐'].map((symbol, i) => (
              <motion.div
                key={`comm-symbol-${i}`}
                className="absolute text-2xl opacity-20"
                style={{
                  left: `${15 + (i * 15)}%`,
                  top: `${20 + (i * 12)}%`,
                  color: 'var(--primary)'
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.1, 0.3, 0.1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "easeInOut"
                }}
              >
                {symbol}
              </motion.div>
            ))}
            
            {/* Floating dots */}
            {contactDots.map((dot, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-[var(--primary)]/20"
                style={{
                  left: `${dot.left}%`,
                  top: `${dot.top}%`,
                }}
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: dot.duration,
                  repeat: Infinity,
                  delay: dot.delay,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">
            I&apos;m always interested in discussing new opportunities,
            collaborating on projects, or sharing insights about GIS and spatial
            analysis. Let&apos;s connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-6">
              Contact Information
            </h2>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[var(--primary-light)] dark:bg-[var(--primary)]/20 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-[var(--primary)] dark:text-[var(--info)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--text)]">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-[var(--text-secondary)]">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--text)] mb-4">
                Connect Online
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/muhammad-tayyab-3962a2373/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--border-hover)] transition-all text-[var(--primary)] hover:text-[var(--primary-hover)]"
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/TayyabManan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--border-hover)] transition-all text-[var(--text)] hover:text-[var(--text-secondary)]"
                  title="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.upwork.com/users/~0155edcc7d42fc5b51"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg border border-[var(--border)] hover:border-[var(--border-hover)] transition-all text-[var(--success)] hover:text-[var(--success)]/80"
                  title="Upwork"
                >
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="mt-8 p-6 bg-[var(--primary-light)] dark:bg-[var(--background-tertiary)] rounded-lg">
              <h3 className="text-lg font-semibold text-[var(--text)] mb-2">
                Availability
              </h3>
              <p className="text-[var(--text-secondary)]">
                Currently available for full-time positions, consulting
                projects, and collaborative opportunities. I typically respond
                to messages within 24 hours.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-[var(--background-secondary)] dark:bg-[var(--background-tertiary)] p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-6">
                Send a Message
              </h2>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-[var(--success)]/10 dark:bg-[var(--success)]/20 border border-[var(--success)]/30 dark:border-[var(--success)]/40 rounded-lg">
                  <p className="text-[var(--success)] dark:text-[var(--success)]">
                    Thank you for your message! I&apos;ll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-[var(--error)]/10 dark:bg-[var(--error)]/20 border border-[var(--error)]/30 dark:border-[var(--error)]/40 rounded-lg">
                  <p className="text-[var(--error)] dark:text-[var(--error)]">
                    Sorry, there was an error sending your message. Please try
                    again or contact me directly at haris.a.mannan@gmail.com.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 border border-[var(--border)] dark:border-[var(--border-hover)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] dark:bg-[var(--background-tertiary)] text-[var(--text)]"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-[var(--error)]">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-3 border border-[var(--border)] dark:border-[var(--border-hover)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] dark:bg-[var(--background-tertiary)] text-[var(--text)]"
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-[var(--error)]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 2,
                        message: "Subject must be at least 2 characters long"
                      }
                    })}
                    className="w-full px-4 py-3 border border-[var(--border)] dark:border-[var(--border-hover)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] dark:bg-[var(--background-tertiary)] text-[var(--text)]"
                    placeholder="What would you like to discuss?"
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-[var(--error)]">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters long"
                      }
                    })}
                    className="w-full px-4 py-3 border border-[var(--border)] dark:border-[var(--border-hover)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent bg-[var(--background)] dark:bg-[var(--background-tertiary)] text-[var(--text)]"
                    placeholder="Tell me about your project, opportunity, or question... (minimum 10 characters)"
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-[var(--error)]">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Honeypot field - hidden from users */}
                <input
                  type="text"
                  {...register("honeypot")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
