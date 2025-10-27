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
    default: 'Tayyab Manan - AI Engineering Student | ML & Computer Vision Portfolio',
    template: '%s | Tayyab Manan'
  },
  description: 'AI Engineering graduate student specializing in Computer Vision, NLP, and Geospatial AI. Building production ML systems with PyTorch, TensorFlow, and LangChain. Portfolio showcasing machine learning projects, deep learning applications, and AI-powered solutions. Seeking Summer 2026 ML/AI internships.',
  keywords: [
    // Primary AI/ML Keywords
    'AI Engineering Student',
    'Machine Learning Student',
    'Computer Vision Student',
    'AI Graduate Student',
    'ML Engineering Student',
    'Deep Learning Student',
    'AI Student Portfolio',
    'ML Student Portfolio',

    // Technical Skills - Frameworks
    'PyTorch Developer',
    'TensorFlow Developer',
    'Scikit-learn',
    'LangChain Developer',
    'Keras',
    'Hugging Face Transformers',

    // Technical Skills - Domains
    'Computer Vision',
    'Natural Language Processing',
    'NLP Student',
    'Geospatial AI',
    'MLOps',
    'Model Deployment',
    'Deep Learning',
    'Neural Networks',
    'Time Series Forecasting',
    'Predictive Analytics',

    // GIS & Geospatial (Secondary)
    'Geospatial Machine Learning',
    'Google Earth Engine',
    'Remote Sensing AI',
    'Satellite Imagery Analysis',
    'GIS Python',
    'GeoPandas',

    // Programming & Tools
    'Python Machine Learning',
    'Python AI Developer',
    'Pandas',
    'NumPy',
    'Matplotlib',
    'Data Science',
    'FastAPI',
    'Flask ML API',

    // Project Types
    'ML Projects',
    'AI Applications',
    'Computer Vision Projects',
    'NLP Projects',
    'Geospatial AI Projects',
    'ML Portfolio Projects',

    // Career & Location
    'Tayyab Manan',
    'ML Internship 2026',
    'AI Internship Summer 2026',
    'ML Student Pakistan',
    'AI Engineering COMSATS',
    'Remote ML Internship',
    'ML Engineer Entry Level',

    // Education
    'AI Engineering Masters',
    'MS AI Engineering',
    'COMSATS University',
    'AI Graduate Program'
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
    title: 'Tayyab Manan - AI Engineering Student | ML & Computer Vision Portfolio',
    description: 'AI Engineering graduate student specializing in Computer Vision, NLP, and Geospatial AI. Building production ML systems with PyTorch, TensorFlow & LangChain. Portfolio showcasing innovative machine learning projects and AI-powered applications. Seeking Summer 2026 ML/AI internships.',
    url: 'https://tayyabmanan.vercel.app',
    siteName: 'Tayyab Manan - AI Engineering Portfolio',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'Tayyab Manan - AI Engineering Student Portfolio - Machine Learning & Computer Vision Projects',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tayyab Manan - AI Engineering Student | ML & Computer Vision',
    description: 'AI Engineering graduate student building ML systems with PyTorch, TensorFlow & LangChain. Specializing in Computer Vision, NLP & Geospatial AI. View portfolio of ML projects.',
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
    jobTitle: 'AI Engineering Graduate Student',
    seeks: {
      '@type': 'JobPosting',
      title: 'Machine Learning Internship',
      jobStartDate: '2026-05',
      employmentType: 'INTERN'
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'University of the Punjab',
        location: 'Lahore, Pakistan'
      }
    ],
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'COMSATS University Islamabad',
      location: 'Islamabad, Pakistan'
    },
    description: 'AI Engineering graduate student specializing in Computer Vision, Natural Language Processing, and Geospatial AI. Building production machine learning systems with PyTorch, TensorFlow, and LangChain. Experienced in developing ML models for computer vision tasks, NLP applications, time-series forecasting, and geospatial analysis. Proficient in Python, deep learning frameworks, MLOps, model deployment, and AI system architecture. Portfolio showcases projects in groundwater prediction, satellite imagery analysis, multi-agent systems, and intelligent applications.',
    knowsAbout: [
      'Machine Learning',
      'Artificial Intelligence',
      'Computer Vision',
      'Natural Language Processing (NLP)',
      'Deep Learning',
      'PyTorch',
      'TensorFlow',
      'Scikit-learn',
      'Keras',
      'LangChain',
      'Hugging Face Transformers',
      'OpenAI GPT',
      'Neural Networks',
      'Convolutional Neural Networks (CNN)',
      'Recurrent Neural Networks (RNN)',
      'Transformer Models',
      'BERT',
      'GPT',
      'Object Detection',
      'Image Classification',
      'Semantic Segmentation',
      'Text Classification',
      'Named Entity Recognition',
      'Sentiment Analysis',
      'MLOps',
      'Model Deployment',
      'FastAPI',
      'Flask',
      'Docker',
      'Time Series Forecasting',
      'Predictive Analytics',
      'Geospatial AI',
      'Google Earth Engine',
      'Satellite Imagery Analysis',
      'Remote Sensing',
      'GeoPandas',
      'Python Programming',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'Data Science',
      'Feature Engineering',
      'Model Optimization',
      'Hyperparameter Tuning',
      'Cross Validation',
      'Data Visualization',
      'Jupyter Notebooks',
      'Git',
      'GitHub',
      'Multi-agent Systems',
      'AutoGen',
      'CrewAI',
      'Reinforcement Learning',
      'Transfer Learning',
      'Model Fine-tuning'
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
    name: 'Tayyab Manan - AI Engineering Student Portfolio',
    description: 'AI Engineering graduate student portfolio showcasing machine learning projects, computer vision applications, NLP systems, and geospatial AI solutions. Expertise in PyTorch, TensorFlow, LangChain, and production ML deployment. Available for Summer 2026 ML/AI internships.',
    url: 'https://tayyabmanan.vercel.app',
    email: 'haris.a.mannan@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'Pakistan'
    },
    priceRange: 'Internship',
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide (Remote Work Available)'
    },
    serviceType: [
      'Machine Learning Development',
      'Computer Vision Applications',
      'Natural Language Processing',
      'Deep Learning Projects',
      'MLOps & Model Deployment',
      'Geospatial AI Solutions',
      'Time Series Forecasting',
      'Predictive Analytics'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ML & AI Project Portfolio',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Computer Vision Projects',
            description: 'Object detection, image classification, and semantic segmentation using PyTorch, TensorFlow, and OpenCV. Experience with CNNs, Vision Transformers, and transfer learning.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'NLP & LangChain Applications',
            description: 'Natural language processing projects including text classification, sentiment analysis, and LLM-powered applications using LangChain and Hugging Face Transformers.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Geospatial AI & Predictive Analytics',
            description: 'Machine learning for geospatial analysis, satellite imagery processing, time-series forecasting, and predictive modeling using Google Earth Engine and Scikit-learn.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'MLOps & Model Deployment',
            description: 'Experience deploying ML models as REST APIs using FastAPI/Flask, containerization with Docker, and building end-to-end ML pipelines.'
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
    name: 'Tayyab Manan - AI Engineering Student Portfolio',
    description: 'AI Engineering graduate student portfolio showcasing machine learning projects, computer vision applications, NLP systems, deep learning implementations, and geospatial AI solutions built with PyTorch, TensorFlow, and LangChain.',
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
    '@type': 'EducationalOccupationalCredential',
    '@id': 'https://tayyabmanan.vercel.app/#education',
    name: 'AI Engineering Graduate Student',
    credentialCategory: 'degree',
    educationalLevel: 'Master\'s Degree',
    competencyRequired: [
      'Machine Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Deep Learning',
      'PyTorch',
      'TensorFlow',
      'Python Programming'
    ],
    recognizedBy: {
      '@type': 'CollegeOrUniversity',
      name: 'COMSATS University Islamabad',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Islamabad',
        addressCountry: 'Pakistan'
      }
    }
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