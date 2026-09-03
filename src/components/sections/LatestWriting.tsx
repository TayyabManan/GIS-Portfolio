import Link from 'next/link'
import Eyebrow from '@/components/ui/Eyebrow'
import { type BlogPost } from '@/lib/markdown'

/**
 * Home writing rail (home restructure): the three latest posts in the blog
 * index's text-first card grammar - mono meta, title, three-line description,
 * read time. The writing earns the home's second act; Education moved to the
 * compact Background strip. Server-rendered from props so the cards ship in
 * the initial HTML; HomeScrollEffects reveals via the data-reveal hooks.
 */
export default function LatestWriting({ posts }: { posts: BlogPost[] }) {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section data-reveal-group className="relative border-t border-[var(--border)] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div data-reveal="heading" className="mb-12 max-w-4xl">
          <Eyebrow index="02">Writing</Eyebrow>
          <h2 className="mb-4 text-3xl font-semibold text-[var(--text)] sm:text-4xl">Notes from the projects</h2>
          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Write-ups on the projects above, with the numbers and the failures kept in.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} data-reveal="item">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl border border-[var(--border)] bg-[var(--background)] p-6 transition-[border-color] duration-200 hover:border-[var(--primary)] sm:p-8"
              >
                <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-tertiary)]">
                  {post.category} &middot; <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h3 className="mb-2 text-lg font-semibold text-[var(--text)] line-clamp-2 sm:text-xl">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-3">{post.description}</p>
                <p className="mt-auto pt-4 font-mono text-[10px] leading-none tracking-[0.08em] text-[var(--text-tertiary)]">
                  {post.readTime || '5 min read'}
                </p>
              </Link>
            </article>
          ))}
        </div>

        {/* Quiet section-end link on the grid's edge, matching FeaturedProjects */}
        <Link
          href="/blog"
          className="group mt-10 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] transition-colors hover:text-[var(--primary-hover)]"
        >
          All posts
          <span aria-hidden="true" className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">&rarr;</span>
        </Link>
      </div>
    </section>
  )
}
