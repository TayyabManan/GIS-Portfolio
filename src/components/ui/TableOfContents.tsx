'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [hoveredId, setHoveredId] = useState<string>('')

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const items: TocItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')

      items.push({ id, text, level })
    }

    setTocItems(items)

    // Add IDs to headings in the DOM
    const addIdsToHeadings = () => {
      items.forEach((item) => {
        const heading = Array.from(document.querySelectorAll('h2, h3')).find(
          (h) => h.textContent?.trim() === item.text
        )
        if (heading) {
          heading.id = item.id
        }
      })
    }

    // Wait for content to render
    setTimeout(addIdsToHeadings, 100)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-100px 0px -66%' }
    )

    const headings = document.querySelectorAll('h2[id], h3[id]')
    headings.forEach((heading) => observer.observe(heading))

    return () => observer.disconnect()
  }, [tocItems])

  if (tocItems.length === 0) return null

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const yOffset = -100
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <nav className="hidden md:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-3 items-end">
        {tocItems.map((item) => {
          const isActive = activeId === item.id
          const isHovered = hoveredId === item.id
          const isH3 = item.level === 3

          return (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId('')}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 shadow-xl whitespace-nowrap z-50">
                  <span className="text-xs font-medium text-[var(--text)]">
                    {item.text}
                  </span>
                  {/* Arrow */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                    <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-[var(--border)]" />
                  </div>
                </div>
              )}

              {/* Dot/Line */}
              <button
                onClick={() => scrollToHeading(item.id)}
                className="cursor-pointer transition-all duration-200 flex items-center gap-2"
                aria-label={`Go to ${item.text}`}
              >
                {/* Line indicator */}
                <div
                  className={`
                    transition-all duration-200
                    ${isH3 ? 'h-2' : 'h-3'}
                    ${
                      isActive
                        ? isH3
                          ? 'w-6 bg-[var(--primary)]'
                          : 'w-8 bg-[var(--primary)]'
                        : isH3
                        ? 'w-3 bg-[var(--text-tertiary)]'
                        : 'w-4 bg-[var(--text-tertiary)]'
                    }
                    ${isHovered && !isActive ? 'bg-[var(--text-secondary)]' : ''}
                    rounded-full
                  `}
                />
              </button>
            </div>
          )
        })}
      </div>

      {/* Progress indicator */}
      <div className="mt-6 flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
        <div className="h-px w-8 bg-[var(--border)]" />
        <span>{Math.round(((tocItems.findIndex((item) => item.id === activeId) + 1) / tocItems.length) * 100)}%</span>
      </div>
    </nav>
  )
}
