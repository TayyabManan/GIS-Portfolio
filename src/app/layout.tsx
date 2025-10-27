import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import ClientLayout from '@/components/ClientLayout'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { themes } from '@/lib/themes'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
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
    default: 'Tayyab Manan - AI Engineering Student | Portfolio',
    template: '%s | Tayyab Manan'
  },
  description: 'AI Engineering graduate student specializing in Computer Vision, NLP & Geospatial AI. Building ML systems with PyTorch, TensorFlow & LangChain. Seeking Summer 2026 internships.',
  keywords: [
    'AI Engineering Student',
    'Machine Learning Student',
    'AI Graduate Student',
    'Computer Vision',
    'Deep Learning',
    'PyTorch',
    'TensorFlow',
    'LangChain',
    'NLP',
    'Natural Language Processing',
    'MLOps',
    'Model Deployment',
    'Scikit-learn',
    'Geospatial AI',
    'Python ML',
    'Neural Networks',
    'Model Training',
    'Tayyab Manan',
    'AI Portfolio',
    'ML Internship',
    'COMSATS AI Engineering'
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
    title: 'Tayyab Manan - AI Engineering Student',
    description: 'AI Engineering graduate student specializing in Computer Vision, NLP, and Geospatial AI. Building ML systems with PyTorch, TensorFlow, and LangChain. View my portfolio showcasing deep learning projects.',
    url: 'https://tayyabmanan.vercel.app',
    siteName: 'Tayyab Manan Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - AI Engineering Student',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayyab Manan - AI Engineering Student',
    description: 'AI Engineering graduate student specializing in Computer Vision, NLP, and Geospatial AI. Building ML systems with PyTorch, TensorFlow, and LangChain.',
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
    jobTitle: 'ML Engineer & AI Developer',
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
    description: 'ML Engineer and AI Developer with 2 years of experience building production ML systems. Expertise in PyTorch, TensorFlow, LangChain, Computer Vision, NLP, MLOps, and Geospatial AI. Specialized in multi-agent systems and model deployment.',
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'LangChain',
      'AutoGen',
      'CrewAI',
      'MLOps',
      'Model Deployment',
      'Neural Networks',
      'Multi-agent Systems',
      'Python Programming',
      'Geospatial AI',
      'Google Earth Engine',
      'Model Training',
      'Transfer Learning',
      'Model Context Protocol',
      'OpenAI',
      'LLMs'
    ],
    email: 'haris.a.mannan@gmail.com',
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
    name: 'Tayyab Manan - ML Engineering & AI Development Services',
    description: 'Professional ML Engineering, AI development, MLOps consulting, and geospatial AI solutions. Specializing in computer vision, NLP, multi-agent systems, model deployment, and production ML systems.',
    url: 'https://tayyabmanan.vercel.app',
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
      'Machine Learning Engineering',
      'AI Development',
      'Computer Vision',
      'Natural Language Processing',
      'MLOps & Model Deployment',
      'Multi-agent Systems',
      'Geospatial AI',
      'Deep Learning Solutions'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ML Engineering and AI Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ML Model Development & Training',
            description: 'Custom machine learning models using PyTorch, TensorFlow, and Scikit-learn for computer vision, NLP, and predictive analytics.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Multi-agent AI Systems',
            description: 'Building production-ready multi-agent systems using LangChain, AutoGen, and CrewAI for complex automation workflows.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'MLOps & Model Deployment',
            description: 'End-to-end ML pipeline development, model deployment, monitoring, and optimization for production environments.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Geospatial AI Solutions',
            description: 'ML-powered geospatial analysis, satellite imagery processing, and predictive modeling for environmental and agricultural applications.'
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
    name: 'Tayyab Manan - ML Engineer & AI Developer Portfolio',
    description: 'Professional portfolio showcasing machine learning projects, AI systems, deep learning applications, and geospatial AI solutions.',
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
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://tayyabmanan.vercel.app/#localbusiness',
    name: 'Tayyab Manan - ML Engineer & AI Developer',
    image: 'https://tayyabmanan.vercel.app/images/profile-picture.jpg',
    description: 'Professional ML Engineering and AI Development services in Islamabad, Pakistan. Specializing in Computer Vision, NLP, MLOps, and Geospatial AI solutions.',
    url: 'https://tayyabmanan.vercel.app',
    email: 'haris.a.mannan@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'Islamabad',
      addressRegion: 'Islamabad Capital Territory',
      postalCode: '',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.6844,
      longitude: 73.0479
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    priceRange: '$$',
    areaServed: [
      {
        '@type': 'City',
        name: 'Islamabad',
        '@id': 'https://www.wikidata.org/wiki/Q1362'
      },
      {
        '@type': 'Country',
        name: 'Pakistan',
        '@id': 'https://www.wikidata.org/wiki/Q843'
      },
      {
        '@type': 'Place',
        name: 'Worldwide (Remote Services)'
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ML Engineering and AI Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Computer Vision Solutions',
            description: 'Custom computer vision models for object detection, image classification, and segmentation using PyTorch and TensorFlow.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NLP & LangChain Development',
            description: 'Natural Language Processing solutions and LangChain-powered applications for intelligent text processing and chatbots.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'MLOps & Model Deployment',
            description: 'Production ML pipeline setup, model deployment, monitoring, and optimization for scalable AI systems.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Geospatial AI Solutions',
            description: 'ML-powered geospatial analysis and satellite imagery processing for environmental and agricultural applications.'
          }
        }
      ]
    },
    sameAs: [
      'https://www.linkedin.com/in/muhammad-tayyab-3962a2373',
      'https://github.com/TayyabManan',
      'https://www.upwork.com/users/~0155edcc7d42fc5b51'
    ]
  }
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <SmoothScrollProvider>
              <ClientLayout>
                {children}
                <Analytics />
              </ClientLayout>
            </SmoothScrollProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <SpeedInsights/>
      </body>
    </html>
  )
}