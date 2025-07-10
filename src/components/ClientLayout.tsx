'use client'

import dynamic from 'next/dynamic'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const WebVitals = dynamic(() => import('@/components/WebVitals'), { ssr: false })

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  return (
    
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
        <WebVitals />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
   
  )
}