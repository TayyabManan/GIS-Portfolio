'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
  MagnifyingGlassIcon,
  HomeIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  UserIcon,
  EnvelopeIcon,
  CommandLineIcon,
  ArrowRightIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { toast } from '@/components/ui/Toast'
import { useTheme } from '@/contexts/ThemeContext'

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
  isOpen: boolean
  onClose: () => void
  additionalCommands?: CommandItem[]
}

export function CommandPalette({ isOpen, onClose, additionalCommands = [] }: CommandPaletteProps) {
  const router = useRouter()
  const { toggleTheme, actualTheme } = useTheme()
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const listRef = React.useRef<HTMLUListElement>(null)

  const defaultCommands: CommandItem[] = useMemo(() => [
    {
      id: 'home',
      title: 'Go to Home',
      description: 'Navigate to the homepage',
      icon: HomeIcon,
      action: () => {
        router.push('/')
        onClose()
      },
      keywords: ['home', 'main', 'index'],
      category: 'Navigation',
      shortcut: 'Alt+H',
    },
    {
      id: 'projects',
      title: 'View Projects',
      description: 'Browse all GIS projects',
      icon: BriefcaseIcon,
      action: () => {
        router.push('/projects')
        onClose()
      },
      keywords: ['work', 'portfolio', 'gis'],
      category: 'Navigation',
      shortcut: 'Alt+P',
    },
    {
      id: 'about',
      title: 'About Me',
      description: 'Learn more about my background',
      icon: UserIcon,
      action: () => {
        router.push('/about')
        onClose()
      },
      keywords: ['bio', 'background', 'experience'],
      category: 'Navigation',
      shortcut: 'Alt+A',
    },
    {
      id: 'resume',
      title: 'View Resume',
      description: 'Download or view my resume',
      icon: DocumentTextIcon,
      action: () => {
        router.push('/resume')
        onClose()
      },
      keywords: ['cv', 'download', 'pdf'],
      category: 'Navigation',
      shortcut: 'Alt+R',
    },
    {
      id: 'contact',
      title: 'Contact Me',
      description: 'Get in touch',
      icon: EnvelopeIcon,
      action: () => {
        router.push('/contact')
        onClose()
      },
      keywords: ['email', 'message', 'reach'],
      category: 'Navigation',
      shortcut: 'Alt+C',
    },
    {
      id: 'theme-toggle',
      title: 'Toggle Theme',
      description: 'Switch between light and dark mode',
      icon: SunIcon,
      action: () => {
        toggleTheme()
        const newTheme = actualTheme === 'light' ? 'dark' : 'light'
        toast.success(`Switched to ${newTheme === 'light' ? 'Light' : 'Dark'} theme`)
        onClose()
      },
      keywords: ['theme', 'dark', 'light', 'switch', 'toggle', 'mode', 'appearance'],
      category: 'Settings',
      shortcut: 'Alt+T',
    },
    {
      id: 'source',
      title: 'View Source Code',
      description: 'Open GitHub repository',
      icon: CommandLineIcon,
      action: () => {
        window.open('https://github.com/TayyabManan/GIS-Portfolio', '_blank')
        onClose()
      },
      keywords: ['github', 'code', 'repository'],
      category: 'External',
      shortcut: 'Alt+G',
    },
  ], [router, onClose, toggleTheme, actualTheme])

  const allCommands = useMemo(() => {
    return [...defaultCommands, ...additionalCommands]
  }, [defaultCommands, additionalCommands])

  const filteredCommands = useMemo(() => {
    if (!search) return allCommands

    const searchLower = search.toLowerCase()
    return allCommands.filter(command => {
      const titleMatch = command.title.toLowerCase().includes(searchLower)
      const descMatch = command.description?.toLowerCase().includes(searchLower)
      const keywordMatch = command.keywords?.some(k => k.toLowerCase().includes(searchLower))
      const categoryMatch = command.category?.toLowerCase().includes(searchLower)
      
      return titleMatch || descMatch || keywordMatch || categoryMatch
    })
  }, [search, allCommands])

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    
    filteredCommands.forEach(command => {
      const category = command.category || 'Other'
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(command)
    })
    
    return groups
  }, [filteredCommands])

  const scrollToItem = useCallback((index: number) => {
    requestAnimationFrame(() => {
      const selectedElement = document.querySelector(`[data-command-index="${index}"]`) as HTMLElement
      const container = listRef.current
      
      if (selectedElement && container) {
        const containerRect = container.getBoundingClientRect()
        const elementRect = selectedElement.getBoundingClientRect()
        
        if (elementRect.bottom > containerRect.bottom) {
          container.scrollTop += elementRect.bottom - containerRect.bottom + 10
        } else if (elementRect.top < containerRect.top) {
          container.scrollTop -= containerRect.top - elementRect.top + 10
        }
      }
    })
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return
    
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      e.stopPropagation()
      setSelectedIndex(prev => {
        const newIndex = prev < filteredCommands.length - 1 ? prev + 1 : 0
        scrollToItem(newIndex)
        return newIndex
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      e.stopPropagation()
      setSelectedIndex(prev => {
        const newIndex = prev > 0 ? prev - 1 : filteredCommands.length - 1
        scrollToItem(newIndex)
        return newIndex
      })
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault()
      e.stopPropagation()
      filteredCommands[selectedIndex].action()
    }
  }, [filteredCommands, selectedIndex, isOpen, scrollToItem, onClose])

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  useEffect(() => {
    if (isOpen) {
      setSearch('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  let currentIndex = -1

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Escape') {
            e.preventDefault()
            e.stopPropagation()
            onClose()
          }
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 transition-all">
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 sm:text-sm"
                  placeholder="Search commands..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <div className="absolute right-4 top-3 text-xs text-gray-400 dark:text-gray-500">
                  Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">ESC</kbd> to close
                </div>
              </div>

              {filteredCommands.length > 0 ? (
                <ul ref={listRef} className="max-h-80 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-700 dark:text-gray-200">
                  {Object.entries(groupedCommands).map(([category, commands]) => (
                    <li key={category}>
                      <h2 className="bg-gray-50 dark:bg-gray-800/50 px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400">
                        {category}
                      </h2>
                      <ul className="text-sm">
                        {commands.map((command) => {
                          currentIndex++
                          const isSelected = currentIndex === selectedIndex
                          const Icon = command.icon

                          return (
                            <li
                              key={command.id}
                              data-command-index={currentIndex}
                              className={cn(
                                'cursor-pointer select-none px-4 py-2 flex items-center justify-between group',
                                isSelected
                                  ? 'bg-blue-500 text-white'
                                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                              )}
                              onClick={command.action}
                              onMouseEnter={() => setSelectedIndex(currentIndex)}
                            >
                              <div className="flex items-center gap-3">
                                {Icon && (
                                  <Icon
                                    className={cn(
                                      'h-5 w-5 flex-shrink-0',
                                      isSelected
                                        ? 'text-white'
                                        : 'text-gray-400 dark:text-gray-500'
                                    )}
                                  />
                                )}
                                <div>
                                  <p className={cn(
                                    'font-medium',
                                    isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-100'
                                  )}>
                                    {command.title}
                                  </p>
                                  {command.description && (
                                    <p className={cn(
                                      'text-xs',
                                      isSelected ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                    )}>
                                      {command.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {command.shortcut && (
                                  <kbd className={cn(
                                    'px-1.5 py-0.5 text-xs rounded',
                                    isSelected
                                      ? 'bg-blue-400 text-white'
                                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                                  )}>
                                    {command.shortcut}
                                  </kbd>
                                )}
                                <ArrowRightIcon
                                  className={cn(
                                    'h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity',
                                    isSelected ? 'text-white opacity-100' : 'text-gray-400'
                                  )}
                                />
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-14 text-center text-sm sm:px-14">
                  <CommandLineIcon
                    className="mx-auto h-6 w-6 text-gray-400 dark:text-gray-500"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-medium text-gray-900 dark:text-gray-100">
                    No commands found
                  </p>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Try searching for something else.
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex gap-2">
                  <span>Navigate</span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded">↑↓</kbd>
                </div>
                <div className="flex gap-2">
                  <span>Select</span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded">Enter</kbd>
                </div>
                <div className="flex gap-2">
                  <span>Close</span>
                  <kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-900 rounded">ESC</kbd>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        // Mark that user has used the command palette
        localStorage.setItem('command-palette-used', 'true')
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return {
    isOpen,
    open: () => {
      setIsOpen(true)
      localStorage.setItem('command-palette-used', 'true')
    },
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(prev => !prev),
  }
}