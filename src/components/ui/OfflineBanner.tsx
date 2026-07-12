'use client'

import { WifiIcon } from '@heroicons/react/24/outline'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useMountTransition } from '@/hooks/useMountTransition'

/**
 * A subtle, fixed banner shown only while the browser reports being offline.
 * Uses the warning token family and is announced politely to screen readers.
 * Bottom-fixed, so enter/exit slide is transform-only (board: absent -> open
 * -> closed); useMountTransition holds it mounted 200ms for the exit.
 */
export default function OfflineBanner() {
  const isOnline = useOnlineStatus()
  const { mounted, state } = useMountTransition(!isOnline, 200)

  if (!mounted) return null

  return (
    <div
      role="status"
      aria-live="polite"
      data-state={state}
      className="fixed bottom-0 left-0 right-0 z-[110] flex items-center justify-center gap-2 px-4 py-3 text-sm border-t bg-[var(--warning)]/10 border-[var(--warning)]/30 text-[var(--text)] backdrop-blur data-[state=open]:animate-in data-[state=open]:slide-in-from-bottom-full data-[state=open]:fade-in-0 data-[state=open]:duration-morph data-[state=open]:ease-out data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom-full data-[state=closed]:fade-out-0 data-[state=closed]:duration-200 data-[state=closed]:ease-in data-[state=closed]:fill-mode-forwards"
    >
      <WifiIcon className="h-4 w-4 flex-shrink-0 text-[var(--warning)]" />
      <span>You&apos;re offline. Reading still works, sending won&apos;t.</span>
    </div>
  )
}
