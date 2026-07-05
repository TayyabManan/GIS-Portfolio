import Image from 'next/image'
import Link from 'next/link'
import { author } from '@/lib/author'

/**
 * Author bio block for blog posts: avatar, name linked to /about, role, a short
 * credentialed bio, and an About link — the E-E-A-T signal the audit flagged as
 * missing on name-only bylines.
 */
export default function AuthorBio() {
  return (
    <aside className="mt-12 pt-8 border-t border-[var(--border)]">
      <div className="flex items-start gap-4 sm:gap-6 rounded-2xl border border-[var(--border)] bg-[var(--background-secondary)] p-6">
        <Image
          src={author.image}
          alt={`${author.name}, ${author.role}`}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-[var(--text-tertiary)] mb-1">Written by</p>
          <Link
            href="/about"
            className="text-lg font-semibold text-[var(--text)] hover:text-[var(--primary)] transition-colors"
          >
            {author.name}
          </Link>
          <p className="text-sm font-medium text-[var(--primary)] mb-2">{author.role}</p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] mb-3">{author.bio}</p>
          <Link
            href="/about"
            className="inline-flex items-center gap-1 text-sm font-medium text-[var(--primary)] hover:underline"
          >
            More about me <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </aside>
  )
}
