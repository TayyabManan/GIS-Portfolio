import { Metadata } from 'next'
import SEODashboard from './SEODashboard'

export const metadata: Metadata = {
  title: 'SEO Dashboard',
  description: 'Monitor SEO performance and web vitals for the portfolio website',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SEODashboardPage() {
  return <SEODashboard />
}