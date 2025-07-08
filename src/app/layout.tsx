import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientLayout from '@/components/ClientLayout'
import './globals.css'


const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tayyab Manan - GIS Analyst & Spatial Developer',
    template: '%s | Tayyab Manan'
  },
  description: 'Professional GIS analyst specializing in urban planning, environmental analysis, and real-time data visualization.',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={plusJakarta.className}>
        <ClientLayout>
          {children}
          <Analytics />
          <SpeedInsights/>
        </ClientLayout>
      </body>
    </html>
  )
}