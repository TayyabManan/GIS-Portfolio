'use client'

import { useEffect, useState } from 'react'

/**
 * Delayed-unmount for exit animations without framer-motion (which must never
 * enter ClientLayout's tree - it would land in every route's First Load JS).
 *
 * `mounted` stays true for `exitMs` after `open` flips false so
 * `data-[state=closed]:animate-out` classes can play before removal.
 * Under prefers-reduced-motion the zeroed animation lands on its end state
 * instantly and the element simply unmounts `exitMs` later - no flash.
 *
 * Usage:
 *   const { mounted, state } = useMountTransition(isOpen, 100)
 *   {mounted && <div data-state={state} className="data-[state=open]:animate-in ..." />}
 */
export function useMountTransition(open: boolean, exitMs: number) {
  const [mounted, setMounted] = useState(open)

  useEffect(() => {
    if (open) {
      setMounted(true)
      return
    }
    const t = setTimeout(() => setMounted(false), exitMs)
    return () => clearTimeout(t)
  }, [open, exitMs])

  return { mounted, state: open ? ('open' as const) : ('closed' as const) }
}
