'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/markdown'
import { useGridFlip } from '@/components/effects/useGridFlip'
import { EmptyAxes } from '@/components/effects/NotebookDoodles'
import CategoryFilter from '@/components/ui/CategoryFilter'

interface BlogPageContentProps {
  posts: BlogPost[]
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...Array.from(new Set(posts.map(p => p.category)))]

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory)

  // FLIP morph on filter change (desktop only; no-op hard swap on mobile)
  const { gridRef, capture } = useGridFlip(filteredPosts.map((p) => p.slug).join('|'))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-[100dvh] py-16 sm:py-24 bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header - Left aligned */}
        <div className="mb-12 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[var(--text)] mb-4">
            Notes on building ML systems
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)]">
            Write-ups on LLM fine-tuning, computer vision, NLP, and production ML, with the numbers and the failures kept in.
          </p>
        </div>

        {/* Category Filter - Left aligned */}
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={(category) => { capture(); setSelectedCategory(category) }}
          formatLabel={(category) => category.charAt(0).toUpperCase() + category.slice(1)}
        />

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="doodle mx-auto mb-4 w-28">
              <EmptyAxes className="w-full" />
              <p className="font-mono text-[10px] tracking-[0.08em] mt-1">n=0</p>
            </div>
            <p className="text-lg text-[var(--text-secondary)] mb-4">
              {selectedCategory !== 'all'
                ? 'No posts in this category yet.'
                : 'Nothing published yet. The projects have the receipts.'}
            </p>
            {selectedCategory !== 'all' ? (
              <button
                onClick={() => setSelectedCategory('all')}
                className="font-medium text-[var(--text)] underline decoration-[var(--text)]/30 underline-offset-[0.15em] transition-[text-decoration-color] duration-200 hover:decoration-[var(--text)]"
              >
                Show all posts
              </button>
            ) : (
              <Link
                href="/projects"
                className="font-medium text-[var(--text)] underline decoration-[var(--text)]/30 underline-offset-[0.15em] transition-[text-decoration-color] duration-200 hover:decoration-[var(--text)]"
              >
                Browse projects instead
              </Link>
            )}
          </div>
        ) : (
          <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} data-flip-id={post.slug}>
                {/* Text-first editorial card (premium pass): the annotation-voice
                    meta, title, and description do the selling - no thumbnail
                    (the raw screenshots live inside the posts as evidence).
                    One hover gesture: the border hairline turns primary. */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 transition-[border-color] duration-200 hover:border-[var(--primary)] sm:p-8"
                >
                  <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                    {post.category} &middot; <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </p>

                  <h2 className="mb-2 text-lg font-semibold text-[var(--text)] line-clamp-2 sm:text-xl">
                    {post.title}
                  </h2>

                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3">
                    {post.description}
                  </p>

                  <p className="mt-auto pt-4 font-mono text-[10px] leading-none tracking-[0.08em] text-[var(--text-tertiary)]">
                    {post.readTime || '5 min read'}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
