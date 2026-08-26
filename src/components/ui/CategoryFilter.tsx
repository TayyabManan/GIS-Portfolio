'use client'

interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
  /** Optional display transform (e.g. blog capitalizes its lowercase categories). */
  formatLabel?: (category: string) => string
}

/**
 * Category filter pill row shared by the projects and blog grids. Pure
 * presentation - each page supplies its own onSelect (both wrap the FLIP
 * capture(); projects also resets pagination).
 */
export default function CategoryFilter({ categories, selected, onSelect, formatLabel }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 min-h-[44px] rounded-lg font-medium transition-colors text-sm sm:text-base cursor-pointer ${
            selected === category
              ? 'bg-[var(--primary)] text-[var(--on-primary)]'
              : 'bg-[var(--background-secondary)] text-[var(--text)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--primary)]'
          }`}
        >
          {formatLabel ? formatLabel(category) : category}
        </button>
      ))}
    </div>
  )
}
