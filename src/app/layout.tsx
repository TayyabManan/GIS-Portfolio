import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientLayout from '@/components/ClientLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import './globals.css'


const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tayyabmanan.vercel.app'),
  title: {
    default: 'Tayyab Manan - GIS Analyst & Spatial Developer | Portfolio',
    template: '%s | Tayyab Manan - GIS Specialist'
  },
  description: 'Professional GIS analyst and spatial developer specializing in urban planning, environmental analysis, real-time data visualization, and geospatial solutions. Expertise in ArcGIS, QGIS, Python, and web mapping technologies.',
  keywords: [
    'GIS Analyst',
    'Spatial Developer',
    'Geographic Information Systems',
    'Urban Planning',
    'Environmental Analysis',
    'Geospatial Data',
    'ArcGIS',
    'QGIS',
    'Python GIS',
    'Web Mapping',
    'Remote Sensing',
    'Spatial Analysis',
    'Tayyab Manan',
    'GIS Portfolio',
    'Cartography',
    'Data Visualization'
  ],
  authors: [{ name: 'Tayyab Manan' }],
  creator: 'Tayyab Manan',
  publisher: 'Tayyab Manan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: 'Tayyab Manan - GIS Analyst & Spatial Developer',
    description: 'Professional GIS analyst specializing in urban planning, environmental analysis, and real-time data visualization. View my portfolio and projects.',
    url: 'https://tayyabmanan.vercel.app',
    siteName: 'Tayyab Manan Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - GIS Analyst',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayyab Manan - GIS Analyst & Spatial Developer',
    description: 'Professional GIS analyst specializing in urban planning and geospatial solutions.',
    images: ['/images/profile-picture.jpg'],
    creator: '@tayyabmanan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app',
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tayyab Manan',
    url: 'https://tayyabmanan.vercel.app',
    image: 'https://tayyabmanan.vercel.app/images/profile-picture.jpg',
    sameAs: [
      'https://www.linkedin.com/in/tayyabmanan',
      'https://github.com/tayyabmanan',
      'https://twitter.com/tayyabmanan'
    ],
    jobTitle: 'GIS Analyst & Spatial Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance GIS Services'
    },
    description: 'Professional GIS analyst and spatial developer specializing in urban planning, environmental analysis, and geospatial solutions.',
    knowsAbout: [
      'Geographic Information Systems',
      'Urban Planning',
      'Environmental Analysis',
      'ArcGIS',
      'QGIS',
      'Python',
      'Spatial Analysis',
      'Remote Sensing',
      'Web Mapping'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Your City',
      addressRegion: 'Your State/Province',
      addressCountry: 'Your Country'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 'Your Latitude',
      longitude: 'Your Longitude'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://tayyabmanan.vercel.app/#business',
    name: 'Tayyab Manan GIS Services',
    description: 'Professional GIS consulting and spatial analysis services for urban planning, environmental assessment, and geospatial solutions.',
    url: 'https://tayyabmanan.vercel.app',
    telephone: '+1-XXX-XXX-XXXX',
    email: 'contact@tayyabmanan.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Your City',
      addressRegion: 'Your State/Province',
      postalCode: 'Your Postal Code',
      addressCountry: 'Your Country'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 'Your Latitude',
      longitude: 'Your Longitude'
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    },
    priceRange: '$$',
    servesCuisine: 'GIS Services',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 'Your Latitude',
        longitude: 'Your Longitude'
      },
      geoRadius: '50km'
    }
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={plusJakarta.className}>
        <GoogleAnalytics />
        <ClientLayout>
          {children}
          <Analytics />
        </ClientLayout>
        <SpeedInsights/>
      </body>
    </html>
  )
}