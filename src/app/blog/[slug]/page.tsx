import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/markdown'
import BlogPostClient from './BlogPostClient'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  const imageUrl = post.image || '/images/profile-picture.jpg'
  const postUrl = `https://tayyabmanan.vercel.app/blog/${post.slug}`

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    keywords: [
      post.title,
      'AI engineering blog',
      'ML student blog',
      'machine learning',
      'computer vision',
      'deep learning',
      post.category,
      ...(post.tags || []),
      'AI student',
      'ML tutorials'
    ],
    openGraph: {
      title: `${post.title} | Tayyab Manan`,
      description: post.description,
      url: postUrl,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags || [],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [imageUrl],
      creator: '@tayyabmanan',
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}
