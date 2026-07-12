'use client'

import { useLayoutEffect, useRef } from 'react'
import { DESKTOP_MOTION, loadCore } from '@/lib/gsap'

// Set once the gsap core chunk has resolved. A handoff that finds the chunk
// cold skips animating (the class swap already painted; replaying it late
// would be a visible double-take) - same fallback as no-JS/below-gate.
let coreReady = false

/**
 * Warm the gsap core chunk on intent (nav hover / focus), mirroring
 * preloadCommandPalette. Deliberately NOT on mount: the Header is in every
 * route's shell, and an unconditional warm-up would ship gsap (~26KB gz) to
 * desktop loads of routes that otherwise use none of it. loadCore caches its
 * promise, so repeated calls are free.
 */
export function warmNavUnderline() {
  if (window.matchMedia(DESKTOP_MOTION).matches) {
    loadCore()
      .then(() => {
        coreReady = true
      })
      .catch(() => {})
  }
}

/**
 * Nav active-underline handoff (board: rest -> handoff-out -> handoff-in -> rest').
 *
 * Each link owns its own absolutely-positioned bar, so bars ride along with the
 * header's pill morph and any resize for free - no measurement, unlike a single
 * sliding indicator (whose coordinates go stale mid CSS-transition) or framer
 * layoutId (which would put framer-motion in every route's shell bundle).
 *
 * On route change the old bar shrinks toward the new link (120ms, ease-in) and
 * the new bar grows from the side facing the old one (180ms, power3.out, +60ms).
 * Tweens end in clearProps so the Tailwind classes own the resting state again.
 * Rapid navigation interrupts cleanly: killTweensOf leaves the in-flight inline
 * transform in place, and the next handoff's from-values read it instead of
 * hard-resetting to the resting scale.
 *
 * Resting classes must set the `transform` property directly
 * ([transform:scaleX(1)] / [transform:scaleX(0)]), NOT Tailwind's scale-x-*
 * utilities: v4's scale-x-* uses the standalone `scale` property, which
 * composes multiplicatively with GSAP's inline transform and would zero the
 * bar out mid-handoff.
 *
 * Deviation from the gsap.matchMedia convention, documented: these tweens are
 * transient (<=300ms) with nothing persistent to revert, so a matchMedia check
 * at tween time suffices. Below DESKTOP_MOTION (and with no JS / a failed or
 * cold chunk) the class swap is instant - today's behavior.
 */
export function useNavUnderline(activeHref: string | null, hrefs: readonly string[]) {
  const barsRef = useRef(new Map<string, HTMLElement>())
  const prevActiveRef = useRef<string | null>(activeHref)

  // useLayoutEffect + an already-cached loader promise means the fromTo runs
  // before paint on warm navigations - the freshly-flipped classes never flash.
  useLayoutEffect(() => {
    const prev = prevActiveRef.current
    if (prev === activeHref) return
    prevActiveRef.current = activeHref

    if (!window.matchMedia(DESKTOP_MOTION).matches) return

    const oldBar = prev ? barsRef.current.get(prev) : undefined
    const newBar = activeHref ? barsRef.current.get(activeHref) : undefined
    if (!oldBar && !newBar) return

    let cancelled = false
    loadCore()
      .then(({ gsap }) => {
        const wasReady = coreReady
        coreReady = true
        // Cold chunk: it resolved after the class swap already painted -
        // animating now would replay the handoff detached from the click.
        if (cancelled || !wasReady) return
        const oldIdx = prev ? hrefs.indexOf(prev) : -1
        const newIdx = activeHref ? hrefs.indexOf(activeHref) : -1
        // Arriving from outside the nav (e.g. /resume) plays handoff-in only.
        const movingRight = oldIdx === -1 || newIdx === -1 || newIdx > oldIdx

        gsap.killTweensOf([oldBar, newBar].filter(Boolean)) // rapid-nav interrupt safety
        // An interrupted bar still carries its in-flight inline transform
        // (killTweensOf doesn't clear it) - resume from there, not the rest pose.
        const fromScale = (el: HTMLElement, rest: number) =>
          el.style.transform ? Number(gsap.getProperty(el, 'scaleX')) : rest
        if (oldBar) {
          gsap.fromTo(
            oldBar,
            { scaleX: fromScale(oldBar, 1) },
            {
              scaleX: 0,
              transformOrigin: movingRight ? 'right center' : 'left center',
              duration: 0.12,
              ease: 'power2.in',
              clearProps: 'transform,transformOrigin',
            }
          )
        }
        if (newBar) {
          gsap.fromTo(
            newBar,
            { scaleX: fromScale(newBar, 0) },
            {
              scaleX: 1,
              transformOrigin: movingRight ? 'left center' : 'right center',
              duration: 0.18,
              delay: oldBar ? 0.06 : 0,
              ease: 'power3.out',
              clearProps: 'transform,transformOrigin',
            }
          )
        }
      })
      .catch(() => {
        /* fail-visible: the class swap already happened */
      })

    return () => {
      cancelled = true
    }
  }, [activeHref, hrefs])

  /** Callback-ref factory: attach to each link's underline bar. */
  return (href: string) => (el: HTMLElement | null) => {
    if (el) barsRef.current.set(href, el)
    else barsRef.current.delete(href)
  }
}
