'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from '@/components/ui/Toast'
import { CommandPalette, useCommandPalette } from '@/components/ui/CommandPalette'
import { useGlobalKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts'
import { useSkipToContent } from '@/hooks/useFocusManagement'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isOpen, close } = useCommandPalette()
  useGlobalKeyboardShortcuts()
  useSkipToContent()

  return (
    <>
      <div className="bg-[var(--background)] min-h-screen transition-colors">
        <Header />
        <main id="main-content" className="min-h-screen pt-16 focus:outline-none">
          {children}
        </main>
        <Footer />
      </div>
      <Toaster />
      <CommandPalette isOpen={isOpen} onClose={close} />
    </>
  )
}