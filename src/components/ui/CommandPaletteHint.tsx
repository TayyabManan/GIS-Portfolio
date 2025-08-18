'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CommandLineIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils'

interface CommandPaletteHintProps {
  className?: string
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  delay?: number
  persistent?: boolean
}

export function CommandPaletteHint({ 
  className,
  position = 'bottom-right',
  delay = 2000,
  persistent = false
}: CommandPaletteHintProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [sessionDismissed, setSessionDismissed] = useState(false)

  useEffect(() => {
    // Check if user has ever used the command palette
    const hasUsedPalette = localStorage.getItem('command-palette-used') === 'true'
    
    // Don't show if:
    // 1. User has used the command palette already (they know about it)
    // 2. User has dismissed it this session (don't annoy them)
    if (hasUsedPalette || sessionDismissed) {
      return
    }

    // Show hint after delay - will show every page visit until they use the palette
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    // Auto-hide after 20 seconds if not persistent
    const hideTimer = !persistent ? setTimeout(() => {
      setIsVisible(false)
    }, delay + 20000) : null

    return () => {
      clearTimeout(timer)
      if (hideTimer) clearTimeout(hideTimer)
    }
  }, [delay, persistent, sessionDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setSessionDismissed(true) // Only dismiss for this session
  }

  const handleClick = () => {
    // Trigger command palette open
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      metaKey: true,
      bubbles: true
    })
    document.dispatchEvent(event)
    setIsVisible(false)
    // Mark that user has used the command palette
    localStorage.setItem('command-palette-used', 'true')
  }

  if (!isVisible) return null

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-20 right-4',
    'top-left': 'top-20 left-4'
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'fixed z-40',
            positionClasses[position],
            className
          )}
        >
          <div 
            className="group relative bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:shadow-xl transition-all duration-200 max-w-sm"
            onClick={handleClick}
          >
            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDismiss()
              }}
              className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
              aria-label="Dismiss hint"
            >
              <XMarkIcon className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" />
            </button>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <CommandLineIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Quick Command Palette
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Navigate quickly with keyboard shortcuts
                </p>
                
                <div className="flex items-center gap-2 mb-2">
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:text-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                    ⌘K
                  </kbd>
                  <span className="text-xs text-gray-500 dark:text-gray-400">or</span>
                  <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 dark:text-gray-100 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600">
                    Ctrl+K
                  </kbd>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    localStorage.setItem('command-palette-used', 'true')
                    setIsVisible(false)
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 underline"
                >
                  Don&apos;t show this again
                </button>
              </div>
            </div>

            {/* Pulse animation */}
            <div className="absolute -inset-1 bg-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Floating hint that appears in corner
export function FloatingCommandHint() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has used command palette before
    const hasUsedCommandPalette = localStorage.getItem('has-used-command-palette')
    if (hasUsedCommandPalette === 'true') {
      return
    }

    // Show after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'k',
      ctrlKey: true,
      metaKey: true,
      bubbles: true
    })
    document.dispatchEvent(event)
    setIsVisible(false)
    localStorage.setItem('has-used-command-palette', 'true')
  }

  if (!isVisible) return null

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className="fixed bottom-4 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 group"
    >
      <CommandLineIcon className="w-4 h-4" />
      <span className="text-sm font-medium">Press ⌘K</span>
      <motion.div
        className="absolute inset-0 rounded-full bg-blue-400"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={{ scale: 1.5, opacity: 0 }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeOut"
        }}
      />
    </motion.button>
  )
}