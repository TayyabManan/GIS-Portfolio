'use client'

import Link from 'next/link'
import Image from 'next/image'
import { DynamicReactMarkdown } from '@/lib/dynamic-imports'
import { CalendarIcon, ClockIcon, UserIcon, ArrowLeftIcon, ArrowRightIcon, TagIcon } from '@heroicons/react/24/outline'
import { BlogPostWithContent, BlogPost } from '@/lib/markdown'
import { readingComponents, READING_BODY_CLASS } from '@/lib/reading-prose'
import ShareButtons from '@/components/ui/ShareButtons'
import TableOfContents from '@/components/ui/TableOfContents'
import BackToTop from '@/components/ui/BackToTop'
import FAQ from '@/components/ui/FAQ'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { extractTextContent } from '@/lib/utils'

interface BlogPostClientProps {
  post: BlogPostWithContent
  adjacentPosts?: { prev: BlogPost | null; next: BlogPost | null }
}

export default function BlogPostClient({ post, adjacentPosts }: BlogPostClientProps) {
  const postUrl = `https://tayyabmanan.com/blog/${post.slug}`
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Helper function to generate heading IDs consistently with TableOfContents
  const generateHeadingId = (children: React.ReactNode): string => {
    const textContent = typeof children === 'string' ? children : extractTextContent(children)

    let id = textContent
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '')

    // Ensure ID starts with a letter (HTML requirement)
    if (!/^[a-z]/.test(id)) {
      id = `heading-${id}`
    }

    // Ensure ID is not empty
    if (!id) {
      id = `heading-${Math.random().toString(36).substr(2, 9)}`
    }

    return id
  }

  return (
    <>
      <div className="min-h-[100dvh] py-16 sm:py-24 bg-[var(--background)]">
      {/* px-6 on mobile (not the site's usual px-4): reading pages get a wider
          24px gutter so the serif measure breathes at the edges. */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: post.category, current: true },
            ]}
            size="sm"
          />
        </div>

        {/* Two-column layout: Content + TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          {/* Main Content */}
          <article className="min-w-0">
            {/* Header */}
            <header className="mb-8">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-[var(--text)] mb-4">
            {post.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-[var(--text-secondary)] mb-6">
            {post.description}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-tertiary)] pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              <Link href="/about" className="hover:text-[var(--primary)] transition-colors">
                {post.author}
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <TagIcon className="h-4 w-4 text-[var(--text-tertiary)]" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-[var(--background-secondary)] text-[var(--text-secondary)] rounded-full border border-[var(--border)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
            </header>

            {/* Featured Image */}
            {post.image && (
              <div className="mb-12 rounded-2xl overflow-hidden relative w-full aspect-video">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Mobile TOC - Shows before content */}
            <TableOfContents content={post.content} variant="mobile" />

            {/* Content */}
            <div className={READING_BODY_CLASS}>
          <DynamicReactMarkdown
            components={readingComponents({ headingId: generateHeadingId })}
          >
                {post.content}
              </DynamicReactMarkdown>
            </div>

            {/* FAQ (AEO): rendered from frontmatter so it matches FAQPage schema */}
            {post.faqs && post.faqs.length > 0 && (
              <FAQ items={post.faqs} className="mt-12 pt-8 border-t border-[var(--border)]" />
            )}

            {/* Previous / Next Post Navigation */}
            {adjacentPosts && (adjacentPosts.prev || adjacentPosts.next) && (
              <nav className="mt-12 pt-8 border-t border-[var(--border)]" aria-label="Adjacent posts">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {adjacentPosts.prev ? (
                    <Link
                      href={`/blog/${adjacentPosts.prev.slug}`}
                      className="group flex flex-col gap-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                    >
                      <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                        <ArrowLeftIcon className="h-3 w-3" /> Previous
                      </span>
                      <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                        {adjacentPosts.prev.title}
                      </span>
                    </Link>
                  ) : <div />}
                  {adjacentPosts.next && (
                    <Link
                      href={`/blog/${adjacentPosts.next.slug}`}
                      className="group flex flex-col items-end gap-1 p-4 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] transition-colors sm:col-start-2"
                    >
                      <span className="text-xs text-[var(--text-tertiary)] flex items-center gap-1">
                        Next <ArrowRightIcon className="h-3 w-3" />
                      </span>
                      <span className="text-sm font-medium text-[var(--text)] group-hover:text-[var(--primary)] transition-colors text-left">
                        {adjacentPosts.next.title}
                      </span>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            {/* Share Section */}
            <div className="mt-8 pt-8 border-t border-[var(--border)]">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors font-medium"
                >
                  <ArrowLeftIcon className="h-4 w-4" />
                  <span>Back to all posts</span>
                </Link>
                <ShareButtons
                  title={post.title}
                  url={postUrl}
                />
              </div>
            </div>
          </article>

          {/* Desktop TOC - Sticky Sidebar (right column) */}
          <TableOfContents content={post.content} variant="desktop" />
        </div>
      </div>
    </div>

    {/* Back to Top Button */}
    <BackToTop />
    </>
  )
}
