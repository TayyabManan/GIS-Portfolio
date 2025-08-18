import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientLayout from '@/components/ClientLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { themes } from '@/lib/themes'
import './globals.css'


const bricolageGrotesque = Bricolage_Grotesque({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-bricolage-grotesque',
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
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo.svg',
        color: '#3b82f6',
      },
    ],
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
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme') || 'system';
                  const themes = ${JSON.stringify({
                    light: themes.light,
                    dark: themes.dark
                  })};
                  
                  const getActualTheme = (themeMode) => {
                    if (themeMode === 'system') {
                      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    return themeMode;
                  };
                  
                  const actualTheme = getActualTheme(savedTheme);
                  const selectedTheme = themes[actualTheme] || themes.light;
                  const root = document.documentElement;
                  
                  Object.entries(selectedTheme).forEach(([key, value]) => {
                    const cssVarName = '--' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
                    root.style.setProperty(cssVarName, value);
                  });
                  
                  root.setAttribute('data-theme', actualTheme);
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className={bricolageGrotesque.className}>
        {/* Skip to main content link for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--primary)] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary)]"
        >
          Skip to main content
        </a>
        <GoogleAnalytics />
        <ErrorBoundary>
          <ThemeProvider>
            <ClientLayout>
              {children}
              <Analytics />
            </ClientLayout>
          </ThemeProvider>
        </ErrorBoundary>
        <SpeedInsights/>
      </body>
    </html>
  )
}