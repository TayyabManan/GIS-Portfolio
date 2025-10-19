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
    default: 'Tayyab Manan - GIS Analyst & Full Stack Developer | Portfolio',
    template: '%s | Tayyab Manan - GIS Specialist'
  },
  description: 'Professional GIS Analyst and Full Stack Developer building innovative web applications and geospatial solutions. Expertise in React, Next.js, Python, ArcGIS, QGIS, and modern web technologies for spatial data visualization and analysis.',
  keywords: [
    'GIS Analyst',
    'Full Stack Developer',
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
    title: 'Tayyab Manan - GIS Analyst & Full Stack Developer',
    description: 'Professional GIS Analyst and Full Stack Developer creating innovative web applications and geospatial solutions. View my portfolio showcasing modern web development and GIS projects.',
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
    title: 'Tayyab Manan - GIS Analyst & Full Stack Developer',
    description: 'Professional GIS Analyst and Full Stack Developer specializing in web applications and geospatial solutions.',
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
      'https://www.linkedin.com/in/muhammad-tayyab-3962a2373',
      'https://github.com/TayyabManan',
      'https://twitter.com/tayyabmanan'
    ],
    jobTitle: 'GIS Analyst & Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'COINTEGRATION'
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of the Punjab',
        location: 'Lahore, Pakistan'
      },
      {
        '@type': 'CollegeOrUniversity',
        name: 'COMSATS',
        location: 'Islamabad, Pakistan'
      }
    ],
    description: 'Professional GIS Analyst and Full Stack Developer with 4 years of experience building innovative web applications with expertise in React, Python, QGIS, ArcGIS, spatial data analysis, and geospatial solutions.',
    knowsAbout: [
      'Geographic Information Systems',
      'Full Stack Development',
      'Spatial Analysis',
      'Web Mapping',
      'Python Programming',
      'React Development',
      'Next.js',
      'QGIS',
      'ArcGIS',
      'Google Earth Engine',
      'PostGIS',
      'Remote Sensing',
      'Environmental Monitoring',
      'Urban Planning',
      'Data Visualization',
      'Machine Learning',
      'Geospatial Data Science'
    ],
    email: 'haris.a.mannan@gmail.com',
    telephone: '+92-324-9941206',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'Pakistan'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': 'https://tayyabmanan.vercel.app/#service',
    name: 'Tayyab Manan - GIS & Development Services',
    description: 'Professional GIS consulting, spatial analysis, full-stack web development, and geospatial solutions. Specializing in custom web mapping applications, environmental monitoring systems, and data-driven spatial decision support tools.',
    url: 'https://tayyabmanan.vercel.app',
    telephone: '+92-324-9941206',
    email: 'haris.a.mannan@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'Pakistan'
    },
    priceRange: '$$',
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide (Remote Services)'
    },
    serviceType: [
      'GIS Analysis',
      'Spatial Analysis',
      'Web Mapping',
      'Full Stack Development',
      'Geospatial Consulting',
      'Environmental Monitoring',
      'Urban Planning Analysis',
      'Custom GIS Applications'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'GIS and Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Spatial Analysis & Modeling',
            description: 'Advanced spatial analysis for urban planning, environmental impact assessment, and site selection.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development & System Integration',
            description: 'Full-stack web development with GIS integration, responsive interfaces, and robust backend systems.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Mapping Solutions',
            description: 'Interactive web maps, dashboard development, and custom GIS applications.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Data Analytics & Visualization',
            description: 'Transform complex spatial data into actionable insights through interactive dashboards and visualization.'
          }
        }
      ]
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://tayyabmanan.vercel.app/#website',
    url: 'https://tayyabmanan.vercel.app',
    name: 'Tayyab Manan - GIS Analyst & Full Stack Developer Portfolio',
    description: 'Professional portfolio showcasing GIS projects, web applications, and geospatial solutions.',
    publisher: {
      '@type': 'Person',
      name: 'Tayyab Manan'
    },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://tayyabmanan.vercel.app/projects?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': 'https://tayyabmanan.vercel.app/#breadcrumb',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tayyabmanan.vercel.app'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'About',
        item: 'https://tayyabmanan.vercel.app/about'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Services',
        item: 'https://tayyabmanan.vercel.app/services'
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Projects',
        item: 'https://tayyabmanan.vercel.app/projects'
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Resume',
        item: 'https://tayyabmanan.vercel.app/resume'
      },
      {
        '@type': 'ListItem',
        position: 6,
        name: 'Contact',
        item: 'https://tayyabmanan.vercel.app/contact'
      }
    ]
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