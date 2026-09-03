import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/markdown'
import BlogPageContent from './BlogPageContent'

export const metadata: Metadata = {
  title: 'AI/ML Engineering Blog',
  description: 'Deep-dives on building AI/ML systems: LLM fine-tuning, computer vision, NLP & production ML, with the metrics and trade-offs behind each project.',
  keywords: [
    'AI engineering blog',
    'machine learning insights',
    'ML project tutorials',
    'computer vision blog',
    'deep learning blog',
    'ML engineering blog',
    'AI/ML tutorials',
    'production ML blog'
  ],
  openGraph: {
    title: 'Blog - Tayyab Manan | AI/ML Engineer',
    description: 'Write-ups on LLM fine-tuning, computer vision, NLP, and production ML, with the numbers and the failures kept in.',
    url: 'https://tayyabmanan.com/blog',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.webp',
        width: 1200,
        height: 630,
        alt: 'AI/ML Engineering Blog - Tayyab Manan',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Tayyab Manan | AI/ML Engineer',
    description: 'Write-ups on LLM fine-tuning, computer vision, and production ML, with the numbers kept in.',
    images: ['/images/profile-picture.webp'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.com/blog',
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://tayyabmanan.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://tayyabmanan.com/blog' },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPageContent posts={posts} />
    </>
  )
}
