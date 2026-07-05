'use client'

import { createContext, useContext, useState, useEffect, useCallback, lazy, Suspense } from 'react'

// Single source for the dynamic import so the lazy component and the preloader
// resolve the exact same chunk.
const importCommandPalette = () => import('@/components/ui/CommandPalette')

// Lazy load the (heavy) command list/search logic so it stays out of the initial
// bundle until the palette is actually opened. Only the panel CONTENT is lazy -
// the backdrop and panel shell below live in the provider so the Suspense swap
// happens inside an already-visible panel instead of remounting the whole
// overlay (which used to reset the enter animation and flash).
const CommandPalette = lazy(() =>
  importCommandPalette().then(mod => ({ default: mod.CommandPalette }))
)

// Warm the CommandPalette chunk ahead of first use so the first open is instant.
// Idempotent: the browser/bundler dedupes, and this guard avoids repeat calls.
let hasPreloaded = false
export function preloadCommandPalette() {
  if (hasPreloaded) return
  hasPreloaded = true
  importCommandPalette()
}

interface CommandPaletteContextValue {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const CommandPaletteContext = createContext<CommandPaletteContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
})

export function useCommandPalette() {
  return useContext(CommandPaletteContext)
}

// Placeholder rows shown inside the panel while the content chunk loads.
// Rendered as siblings of the real content sections, so the shell's divide-y
// separators and panel chrome stay identical across the swap.
function CommandPaletteContentSkeleton() {
  return (
    <>
      <div className="flex h-12 items-center gap-3 px-4" aria-hidden="true">
        <div className="h-5 w-5 rounded bg-[var(--background-tertiary)] animate-pulse" />
        <div className="h-4 w-44 rounded bg-[var(--background-tertiary)] animate-pulse" />
      </div>
      <div className="py-2" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-2.5">
            <div className="h-5 w-5 rounded bg-[var(--background-secondary)] animate-pulse" />
            <div
              className="h-3.5 rounded bg-[var(--background-secondary)] animate-pulse"
              style={{ width: `${42 - i * 5}%` }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

// Backdrop + centered panel with the enter animation. Owned by the provider
// (not the lazy chunk) so it mounts once per open and never restarts its
// animation when Suspense swaps the skeleton for the real content.
// Enter uses CSS animations (tw-animate-css) rather than JS-toggled transition
// classes: they play on mount with no state, and the resting style is fully
// visible, so the panel can't get stuck transparent if frames are throttled.
function CommandPaletteShell({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape lives in the shell so closing works even while the chunk is loading
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[120]" onWheel={(e) => e.stopPropagation()} data-lenis-prevent>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[var(--overlay)] backdrop-blur-sm animate-in fade-in-0 duration-200 ease-out"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20" onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="mx-auto max-w-2xl divide-y divide-[var(--border)] overflow-hidden rounded-xl bg-[var(--background)] shadow-2xl ring-1 ring-[var(--border)] animate-in fade-in-0 zoom-in-95 slide-in-from-top-4 duration-200 ease-out"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => {
    setIsOpen(true)
    localStorage.setItem('command-palette-used', 'true')
  }, [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  // Single global Cmd/Ctrl+K listener for the whole app.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        open()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  // Preload the palette chunk once the page is idle, so the first open doesn't
  // pay the fetch/parse cost. Falls back to a short timeout where idle isn't available.
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
      cancelIdleCallback?: (id: number) => void
    }
    let idleId: number | undefined
    let timerId: ReturnType<typeof setTimeout> | undefined
    if (typeof w.requestIdleCallback === 'function') {
      idleId = w.requestIdleCallback(preloadCommandPalette)
    } else {
      timerId = setTimeout(preloadCommandPalette, 1500)
    }
    return () => {
      if (idleId !== undefined && typeof w.cancelIdleCallback === 'function') {
        w.cancelIdleCallback(idleId)
      }
      if (timerId !== undefined) clearTimeout(timerId)
    }
  }, [])

  return (
    <CommandPaletteContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
      {isOpen && (
        <CommandPaletteShell onClose={close}>
          <Suspense fallback={<CommandPaletteContentSkeleton />}>
            <CommandPalette onClose={close} />
          </Suspense>
        </CommandPaletteShell>
      )}
    </CommandPaletteContext.Provider>
  )
}
