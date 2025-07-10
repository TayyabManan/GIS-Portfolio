'use client'

import { useEffect } from 'react'
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'

interface WebVitalMetric {
  name: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
  value: number
  id: string
}

function sendToAnalytics(metric: WebVitalMetric) {
  const { name, delta, rating, value, id } = metric
  
  // Send to Google Analytics if available
  if (typeof window !== 'undefined' && (window as Record<string, unknown>).gtag) {
    ((window as Record<string, unknown>).gtag as (...args: unknown[]) => void)('event', name, {
      event_category: 'Web Vitals',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      metric_rating: rating,
      metric_delta: delta,
      non_interaction: true,
    })
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}:`, {
      value: value,
      rating: rating,
      delta: delta
    })
  }
}

export default function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(sendToAnalytics)
    onFCP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onINP(sendToAnalytics)
    
    // Other metrics
    onTTFB(sendToAnalytics)
  }, [])

  return null
}