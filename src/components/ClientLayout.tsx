'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  return (
    
      <div className="bg-[var(--background)] min-h-screen transition-colors">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </div>
   
  )
}