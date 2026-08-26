'use client'

import { useRef } from 'react'
import { useSectionReveal } from '@/components/effects/useSectionReveal'

/**
 * Client wrapper that scroll-reveals the home page's server-rendered sections
 * (Education, CallToAction). The children stay server
 * components - they only carry data-reveal-* attributes; this layout-neutral
 * div provides the scope for useSectionReveal.
 */
export default function HomeScrollEffects({ children }: { children: React.ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null)
  useSectionReveal(scopeRef)
  return <div ref={scopeRef}>{children}</div>
}
