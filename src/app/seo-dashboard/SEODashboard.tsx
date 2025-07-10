'use client'

import { useState, useEffect } from 'react'
import { ChartBarIcon, ClockIcon, GlobeAltIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

interface WebVitalData {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

interface SEOCheck {
  name: string
  status: 'pass' | 'fail' | 'warning'
  description: string
  recommendation?: string
}

export default function SEODashboard() {
  const [webVitals, setWebVitals] = useState<WebVitalData[]>([])
  const [seoChecks, setSeoChecks] = useState<SEOCheck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Listen for Web Vitals data
    if (typeof window !== 'undefined') {
      const vitalsData = localStorage.getItem('webVitals')
      if (vitalsData) {
        setWebVitals(JSON.parse(vitalsData))
      }
    }

    // Perform SEO checks
    performSEOChecks()
    setLoading(false)
  }, [])

  const performSEOChecks = () => {
    const checks: SEOCheck[] = []

    // Check meta title
    const title = document.querySelector('title')
    checks.push({
      name: 'Page Title',
      status: title && title.innerText.length > 30 && title.innerText.length < 60 ? 'pass' : 'warning',
      description: `Title length: ${title?.innerText.length || 0} characters`,
      recommendation: 'Keep title between 30-60 characters'
    })

    // Check meta description
    const metaDesc = document.querySelector('meta[name="description"]')
    const descContent = metaDesc?.getAttribute('content') || ''
    checks.push({
      name: 'Meta Description',
      status: descContent.length > 120 && descContent.length < 160 ? 'pass' : 'warning',
      description: `Description length: ${descContent.length} characters`,
      recommendation: 'Keep description between 120-160 characters'
    })

    // Check Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    checks.push({
      name: 'Open Graph Tags',
      status: ogTitle ? 'pass' : 'fail',
      description: ogTitle ? 'Open Graph tags present' : 'Open Graph tags missing',
      recommendation: 'Add Open Graph tags for better social sharing'
    })

    // Check structured data
    const jsonLd = document.querySelector('script[type="application/ld+json"]')
    checks.push({
      name: 'Structured Data',
      status: jsonLd ? 'pass' : 'fail',
      description: jsonLd ? 'Schema.org markup present' : 'Schema.org markup missing',
      recommendation: 'Add structured data for better search results'
    })

    // Check images for alt text
    const images = document.querySelectorAll('img')
    const imagesWithoutAlt = Array.from(images).filter(img => !img.alt)
    checks.push({
      name: 'Image Alt Text',
      status: imagesWithoutAlt.length === 0 ? 'pass' : 'warning',
      description: `${imagesWithoutAlt.length} images without alt text`,
      recommendation: 'Add descriptive alt text to all images'
    })

    // Check heading structure
    const h1Tags = document.querySelectorAll('h1')
    checks.push({
      name: 'H1 Tags',
      status: h1Tags.length === 1 ? 'pass' : h1Tags.length === 0 ? 'fail' : 'warning',
      description: `${h1Tags.length} H1 tags found`,
      recommendation: 'Use exactly one H1 tag per page'
    })

    setSeoChecks(checks)
  }

  const getVitalRating = (value: number, metric: string): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      LCP: { good: 2500, poor: 4000 },
      INP: { good: 200, poor: 500 },
      CLS: { good: 0.1, poor: 0.25 },
      FCP: { good: 1800, poor: 3000 },
      TTFB: { good: 800, poor: 1800 }
    }

    const threshold = thresholds[metric]
    if (!threshold) return 'good'

    if (value <= threshold.good) return 'good'
    if (value <= threshold.poor) return 'needs-improvement'
    return 'poor'
  }

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
      case 'pass':
        return 'text-green-600 bg-green-50'
      case 'needs-improvement':
      case 'warning':
        return 'text-yellow-600 bg-yellow-50'
      case 'poor':
      case 'fail':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">SEO Dashboard</h1>
        <p className="mt-2 text-gray-600">Monitor your website&apos;s SEO performance and Core Web Vitals</p>
      </div>

      {/* Core Web Vitals */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <ChartBarIcon className="h-6 w-6 mr-2 text-blue-600" />
          Core Web Vitals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['LCP', 'INP', 'CLS', 'FCP', 'TTFB'].map((metric) => {
            const vital = webVitals.find(v => v.name === metric)
            const value = vital?.value || 0
            const rating = vital?.rating || getVitalRating(value, metric)
            
            return (
              <div key={metric} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{metric}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRatingColor(rating)}`}>
                    {rating}
                  </span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">
                  {metric === 'CLS' ? value.toFixed(3) : `${Math.round(value)}ms`}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {metric === 'LCP' && 'Largest Contentful Paint'}
                  {metric === 'INP' && 'Interaction to Next Paint'}
                  {metric === 'CLS' && 'Cumulative Layout Shift'}
                  {metric === 'FCP' && 'First Contentful Paint'}
                  {metric === 'TTFB' && 'Time to First Byte'}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* SEO Checks */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <GlobeAltIcon className="h-6 w-6 mr-2 text-blue-600" />
          SEO Checks
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {seoChecks.map((check, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {check.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {check.status === 'pass' ? (
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                      ) : check.status === 'warning' ? (
                        <ClockIcon className="h-5 w-5 text-yellow-500 mr-2" />
                      ) : (
                        <XCircleIcon className="h-5 w-5 text-red-500 mr-2" />
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getRatingColor(check.status)}`}>
                        {check.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <p>{check.description}</p>
                    {check.recommendation && (
                      <p className="text-xs text-gray-400 mt-1">{check.recommendation}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Setup Instructions</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
          <li>Create a Google Analytics account and get your Measurement ID</li>
          <li>Add <code className="bg-blue-100 px-1 py-0.5 rounded">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> to your .env.local file</li>
          <li>Set up Google Search Console and verify your domain</li>
          <li>Submit your sitemap at <code className="bg-blue-100 px-1 py-0.5 rounded">https://tayyabmanan.vercel.app/sitemap.xml</code></li>
          <li>Monitor this dashboard regularly to track improvements</li>
        </ol>
      </div>
    </div>
  )
}