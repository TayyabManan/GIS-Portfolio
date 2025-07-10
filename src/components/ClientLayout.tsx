'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  return (
    
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
   
  )
}