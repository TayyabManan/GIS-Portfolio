'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CalendarIcon, ClockIcon, TagIcon, FolderIcon } from '@heroicons/react/24/outline'
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text)] mb-4">
            AI/ML Engineering, Built in Public
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)]">
            Technical deep-dives on building AI/ML systems: LLM fine-tuning, computer vision, NLP, and production ML, with the metrics, trade-offs, and failures behind each project.
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
                className="text-[var(--primary)] font-medium hover:underline"
              >
                Show all posts
              </button>
            ) : (
              <Link
                href="/projects"
                className="text-[var(--primary)] font-medium hover:underline"
              >
                Browse projects instead
              </Link>
            )}
          </div>
        ) : (
          <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.slug} data-flip-id={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-[var(--background)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-[var(--primary)] h-full"
                >
                  {/* Image (next/image so blog thumbnails are indexable + alt'd) */}
                  {post.image && (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    {/* Category & Date */}
                    <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)] mb-3">
                      <div className="flex items-center gap-1">
                        <FolderIcon className="h-4 w-4" />
                        <span>{post.category}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-3">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-[var(--text-tertiary)]">
                        <ClockIcon className="h-4 w-4" />
                        <span>{post.readTime || '5 min read'}</span>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-1 text-[var(--text-tertiary)]">
                          <TagIcon className="h-4 w-4" />
                          <span className="line-clamp-1">{post.tags[0]}</span>
                          {post.tags.length > 1 && (
                            <span className="text-[var(--text-tertiary)]">+{post.tags.length - 1}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
