'use client'

import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import {
  MagnifyingGlassIcon,
  HomeIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  UserIcon,
  EnvelopeIcon,
  CommandLineIcon,
  ArrowRightIcon,
  NewspaperIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { motionOK } from '@/lib/motion-tokens'

interface CommandItem {
  id: string
  title: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
  action: () => void
  keywords?: string[]
  category?: string
  shortcut?: string
}

interface CommandPaletteProps {
  onClose: () => void
  additionalCommands?: CommandItem[]
}

/**
 * Panel CONTENT of the command palette (search input, results, footer).
 * The backdrop/panel shell, enter animation, scroll lock, and Escape handling
 * live in CommandPaletteProvider's shell so this chunk can lazy-load and be
 * swapped in by Suspense without remounting the overlay. Mounted only while
 * the palette is open, so all state starts fresh on each open.
 */
export function CommandPalette({ onClose, additionalCommands = [] }: CommandPaletteProps) {
  const router = useRouter()
  const { theme, preference, setPreference, toggleTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  // Lazy-read so the FIRST committed DOM already contains the Recent group -
  // the mount-only row stagger below animates the final grouping instead of a
  // tree that a post-mount setState immediately reshuffles. (This component
  // only mounts client-side, when the palette opens; the guard is defensive.)
  const [recentCommands, setRecentCommands] = useState<string[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      return JSON.parse(localStorage.getItem('recentCommands') || '[]')
    } catch {
      return []
    }
  })
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Motion override (only meaningful when the OS asks for reduced motion):
  // signature JS motion honors prefers-reduced-motion by default; this
  // personal escape hatch sets localStorage 'motion'='always' (see motionOK in
  // src/lib/motion-tokens.ts). Reload after toggling - effects bind at mount.
  const [reducedMotionOS] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [motionOverride] = useState(() => {
    try {
      return localStorage.getItem('motion') === 'always'
    } catch {
      return false
    }
  })

  const navigate = useCallback((path: string) => {
    router.push(path)
    setTimeout(() => {
      if (window.location.pathname !== path) {
        window.location.href = path
      }
    }, 100)
  }, [router])

  const defaultCommands: CommandItem[] = useMemo(() => [
    {
      id: 'home',
      title: 'Go to Home',
      icon: HomeIcon,
      action: () => { navigate('/'); onClose() },
      keywords: ['home', 'main', 'index'],
      category: 'Navigation',
      shortcut: 'Alt+H',
    },
    {
      id: 'projects',
      title: 'View Projects',
      icon: BriefcaseIcon,
      action: () => { navigate('/projects'); onClose() },
      keywords: ['work', 'portfolio'],
      category: 'Navigation',
      shortcut: 'Alt+P',
    },
    {
      id: 'blog',
      title: 'Read Blog',
      icon: NewspaperIcon,
      action: () => { navigate('/blog'); onClose() },
      keywords: ['blog', 'articles', 'posts', 'writing'],
      category: 'Navigation',
      shortcut: 'Alt+B',
    },
    {
      id: 'about',
      title: 'About Me',
      icon: UserIcon,
      action: () => { navigate('/about'); onClose() },
      keywords: ['bio', 'background', 'experience'],
      category: 'Navigation',
      shortcut: 'Alt+A',
    },
    {
      id: 'resume',
      title: 'View Resume',
      icon: DocumentTextIcon,
      action: () => { navigate('/resume'); onClose() },
      keywords: ['cv', 'download', 'pdf'],
      category: 'Navigation',
      shortcut: 'Alt+R',
    },
    {
      id: 'contact',
      title: 'Contact Me',
      description: 'Get in touch',
      icon: EnvelopeIcon,
      action: () => { navigate('/contact'); onClose() },
      keywords: ['email', 'message', 'reach'],
      category: 'Navigation',
      shortcut: 'Alt+C',
    },
    {
      id: 'source',
      title: 'View Source Code',
      description: 'Open GitHub repository',
      icon: CommandLineIcon,
      action: () => { window.open('https://github.com/TayyabManan/Portfolio', '_blank'); onClose() },
      keywords: ['github', 'code', 'repository'],
      category: 'External',
      shortcut: 'Alt+G',
    },
    {
      id: 'toggle-theme',
      title: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      description: theme === 'dark' ? 'Use the light color scheme' : 'Use the dark color scheme',
      icon: theme === 'dark' ? SunIcon : MoonIcon,
      action: () => { toggleTheme(); onClose() },
      keywords: ['theme', 'dark', 'light', 'mode', 'toggle'],
      category: 'Settings',
    },
    ...(preference !== 'system' ? [{
      id: 'system-theme',
      title: 'Use System Theme',
      description: 'Follow your operating system preference',
      icon: ComputerDesktopIcon,
      action: () => { setPreference('system'); onClose() },
      keywords: ['theme', 'system', 'auto', 'os'],
      category: 'Settings',
    }] : []),
    // Offered only to reduced-motion users - everyone else already has motion.
    ...(reducedMotionOS ? [{
      id: 'toggle-motion',
      title: motionOverride ? 'Restore Reduced Motion' : 'Enable Motion',
      description: motionOverride
        ? 'Follow your system reduced-motion setting again'
        : 'Play animations despite your reduced-motion setting',
      icon: SparklesIcon,
      action: () => {
        try {
          if (motionOverride) localStorage.removeItem('motion')
          else localStorage.setItem('motion', 'always')
        } catch { /* storage blocked - nothing to toggle */ }
        window.location.reload()
      },
      keywords: ['motion', 'animation', 'reduced', 'accessibility', 'prefers-reduced-motion'],
      category: 'Settings',
    }] : []),
  ], [navigate, onClose, theme, preference, toggleTheme, setPreference, reducedMotionOS, motionOverride])

  const executeCommand = useCallback((command: CommandItem) => {
    const updated = [command.id, ...recentCommands.filter(id => id !== command.id)].slice(0, 5)
    setRecentCommands(updated)
    localStorage.setItem('recentCommands', JSON.stringify(updated))
    command.action()
  }, [recentCommands])

  const allCommands = useMemo(() => [...defaultCommands, ...additionalCommands], [defaultCommands, additionalCommands])

  const filteredCommands = useMemo(() => {
    if (!search) return allCommands
    const searchLower = search.toLowerCase()
    return allCommands.filter(command => {
      return command.title.toLowerCase().includes(searchLower)
        || command.description?.toLowerCase().includes(searchLower)
        || command.keywords?.some(k => k.toLowerCase().includes(searchLower))
        || command.category?.toLowerCase().includes(searchLower)
    })
  }, [search, allCommands])

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}

    if (!search && recentCommands.length > 0) {
      const recentItems = recentCommands
        .map(id => allCommands.find(cmd => cmd.id === id))
        .filter(Boolean) as CommandItem[]
      if (recentItems.length > 0) groups['Recent'] = recentItems
    }

    filteredCommands.forEach(command => {
      if (!search && recentCommands.includes(command.id)) return
      const category = command.category || 'Other'
      if (!groups[category]) groups[category] = []
      groups[category].push(command)
    })

    return groups
  }, [filteredCommands, search, recentCommands, allCommands])

  // Flat list for keyboard nav
  const flatCommands = useMemo(() => {
    return Object.values(groupedCommands).flat()
  }, [groupedCommands])

  // Focus input on mount (the component mounts each time the palette opens)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Reset selection on search change
  useEffect(() => { setSelectedIndex(0) }, [search])

  // Keyboard navigation (Escape is handled by the shell in CommandPaletteProvider)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % flatCommands.length)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + flatCommands.length) % flatCommands.length)
          break
        case 'Enter':
          e.preventDefault()
          if (flatCommands[selectedIndex]) executeCommand(flatCommands[selectedIndex])
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [flatCommands, selectedIndex, executeCommand])

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const selected = listRef.current.querySelector(`[data-index="${selectedIndex}"]`) as HTMLElement
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' })
    }
  }, [selectedIndex])

  // First-open row cascade (board: shell-open -> populating -> settled).
  // WAAPI for zero bundle cost; gated on motionOK() so reduced-motion users
  // get instant rows (they already get the shell without its CSS enter).
  // Mount-only by design: this content chunk remounts fresh per open, and
  // filtering while typing must never stagger (rows re-render per keystroke).
  // fill 'backwards' holds delayed rows invisible until their turn; missing
  // WAAPI -> rows appear instantly.
  useEffect(() => {
    if (!motionOK()) return
    const rows = listRef.current?.querySelectorAll<HTMLElement>('[data-index]')
    if (!rows || rows.length === 0 || typeof rows[0].animate !== 'function') return
    Array.from(rows)
      .slice(0, 10)
      .forEach((row, i) => {
        row.animate(
          [
            { opacity: 0, transform: 'translateY(4px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          { duration: 150, easing: 'ease-out', delay: i * 30, fill: 'backwards' }
        )
      })
  }, [])

  let itemIndex = -1

  return (
    <>
      {/* Search Input */}
      <div className="relative">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-[var(--text-tertiary)]"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          type="text"
          className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-[var(--text)] placeholder:text-[var(--text-tertiary)] focus:ring-0 focus:outline-none sm:text-sm"
          placeholder="Search commands..."
          aria-label="Search commands"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Keyboard hints are desktop-only - touch devices have no ESC key, and
            the badge crowds the input at narrow widths. */}
        <div className="absolute right-4 top-3 hidden text-xs text-[var(--text-tertiary)] sm:block">
          Press <kbd className="px-1.5 py-0.5 bg-[var(--background-secondary)] rounded">ESC</kbd> to close
        </div>
      </div>

      {/* Results */}
      {flatCommands.length > 0 ? (
        <div ref={listRef} className="max-h-80 overflow-y-auto overscroll-contain py-2 text-sm text-[var(--text)]">
          {Object.entries(groupedCommands).map(([category, commands]) => (
            <div key={category}>
              <div className="bg-[var(--background-secondary)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                {category}
              </div>
              {commands.map((command) => {
                itemIndex++
                const idx = itemIndex
                const isSelected = idx === selectedIndex
                const Icon = command.icon

                return (
                  <div
                    key={command.id}
                    data-index={idx}
                    className={cn(
                      'cursor-pointer select-none px-4 py-2.5 flex items-center justify-between group transition-colors duration-75',
                      isSelected
                        ? 'bg-[var(--primary)] text-[var(--on-primary)]'
                        : 'hover:bg-[var(--background-secondary)]'
                    )}
                    onClick={() => executeCommand(command)}
                    onMouseMove={() => setSelectedIndex(idx)}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon className={cn('h-5 w-5 flex-shrink-0', isSelected ? 'text-[var(--on-primary)]' : 'text-[var(--text-tertiary)]')} />
                      )}
                      <div>
                        <p className={cn('font-medium', isSelected ? 'text-[var(--on-primary)]' : 'text-[var(--text)]')}>
                          {command.title}
                        </p>
                        {command.description && (
                          <p className={cn('text-xs', isSelected ? 'text-[var(--on-primary)]/80' : 'text-[var(--text-secondary)]')}>
                            {command.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {command.shortcut && (
                        <kbd className={cn(
                          'hidden sm:inline-block px-1.5 py-0.5 text-xs rounded',
                          isSelected ? 'bg-[var(--on-primary)]/20 text-[var(--on-primary)]' : 'bg-[var(--background-tertiary)] text-[var(--text-secondary)]'
                        )}>
                          {command.shortcut}
                        </kbd>
                      )}
                      <ArrowRightIcon
                        className={cn(
                          'h-4 w-4 transition-[opacity,translate] duration-75 ease-out',
                          isSelected
                            ? 'text-[var(--on-primary)] opacity-100 translate-x-0'
                            : 'text-[var(--text-tertiary)] opacity-0 -translate-x-0.5 group-hover:opacity-100 group-hover:translate-x-0'
                        )}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="px-6 py-14 text-center text-sm sm:px-14">
          <CommandLineIcon className="mx-auto h-6 w-6 text-[var(--text-tertiary)]" aria-hidden="true" />
          <p className="mt-4 font-medium text-[var(--text)]">
            {search ? `No results for "${search}"` : 'No commands found'}
          </p>
          {search && (
            <p className="mt-2 text-xs text-[var(--text-secondary)]">
              Try &quot;projects&quot; or &quot;theme&quot;
            </p>
          )}
        </div>
      )}

      {/* Footer - keyboard legend only, so it's hidden entirely on touch widths
          rather than left as an empty bar. */}
      <div className="hidden items-center justify-between border-t border-[var(--border)] bg-[var(--background-secondary)] px-4 py-2.5 text-xs text-[var(--text-secondary)] sm:flex">
        <div className="flex gap-2">
          <span>Navigate</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--background)] rounded">↑↓</kbd>
        </div>
        <div className="flex gap-2">
          <span>Select</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--background)] rounded">Enter</kbd>
        </div>
        <div className="flex gap-2">
          <span>Close</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--background)] rounded">ESC</kbd>
        </div>
      </div>
    </>
  )
}
