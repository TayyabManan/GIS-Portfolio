import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug, getAllBlogSlugs, getAdjacentBlogPosts } from '@/lib/markdown'
import { truncateAtWord } from '@/lib/utils'
import { faqPageSchema, howToSchema } from '@/lib/faqs'
import { author, PERSON_ID } from '@/lib/author'
import BlogPostClient from './BlogPostClient'

// Force static generation for all blog pages
export const dynamic = 'force-static'
export const dynamicParams = false

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

  const imageUrl = post.image || '/images/profile-picture.webp'
  const postUrl = `https://tayyabmanan.com/blog/${post.slug}`

  return {
    title: post.seoTitle || post.title,
    description: truncateAtWord(post.description),
    keywords: [
      post.title,
      'AI engineering blog',
      'machine learning engineering',
      'LLM fine-tuning',
      'computer vision',
      'deep learning',
      'MLOps',
      post.category,
      ...(post.tags || []),
      'production ML',
      'ML tutorials',
      'Tayyab Manan',
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

  // Generate Article schema for SEO
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['BlogPosting', 'TechArticle'],
    headline: post.title,
    description: post.description,
    image: post.image || 'https://tayyabmanan.com/images/profile-picture.webp',
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: post.author || author.name,
      url: author.url,
      jobTitle: author.role,
      description: author.bio,
      image: `https://tayyabmanan.com${author.image}`,
      sameAs: author.sameAs,
    },
    publisher: {
      '@type': 'Person',
      name: 'Tayyab Manan',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tayyabmanan.com/logo.svg'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tayyabmanan.com/blog/${post.slug}`
    },
    articleSection: post.category,
    keywords: post.tags?.join(', ') || 'AI, Machine Learning, Computer Vision',
    about: {
      '@type': 'Thing',
      name: post.category
    },
    inLanguage: 'en-US',
    isAccessibleForFree: 'True',
    isPartOf: {
      '@type': 'Blog',
      '@id': 'https://tayyabmanan.com/blog',
      name: 'AI/ML Engineering Blog - Tayyab Manan'
    }
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://tayyabmanan.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://tayyabmanan.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://tayyabmanan.com/blog/${post.slug}`
      }
    ]
  }

  // FAQPage / HowTo only when the frontmatter supplies them (and their text is
  // rendered on the page via <FAQ> / the post body, so schema matches content).
  const postImage = post.image ? `https://tayyabmanan.com${post.image}` : undefined
  const schemas = [
    articleSchema,
    breadcrumbSchema,
    post.faqs && post.faqs.length > 0 ? faqPageSchema(post.faqs) : null,
    post.howTo ? howToSchema(post.howTo, { image: postImage }) : null,
  ].filter(Boolean)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <BlogPostClient post={post} adjacentPosts={getAdjacentBlogPosts(slug)} />
    </>
  )
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}
