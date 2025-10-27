import { Metadata } from 'next'
import { getAllBlogPosts } from '@/lib/markdown'
import BlogPageContent from './BlogPageContent'

export const metadata: Metadata = {
  title: 'Blog - AI Engineering Student Insights & Learning Journey',
  description: 'Read about my learning journey in AI Engineering, ML projects, technical insights, and experiences with Computer Vision, NLP, and Deep Learning. Student perspectives on AI/ML development.',
  keywords: [
    'AI engineering blog',
    'ML student blog',
    'machine learning insights',
    'AI learning journey',
    'ML project tutorials',
    'computer vision blog',
    'deep learning student',
    'AI student experiences',
    'ML engineering blog',
    'tech blog',
    'student developer blog',
    'AI/ML tutorials'
  ],
  openGraph: {
    title: 'Blog - AI Engineering Student | Tayyab Manan',
    description: 'Follow my AI Engineering journey through blog posts about ML projects, learning experiences, and technical insights in Computer Vision, NLP & Deep Learning.',
    url: 'https://tayyabmanan.vercel.app/blog',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Engineering Blog - Tayyab Manan',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - AI Engineering Student',
    description: 'Read about my AI Engineering learning journey, ML projects, and technical insights.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/blog',
  },
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  return <BlogPageContent posts={posts} />
}
