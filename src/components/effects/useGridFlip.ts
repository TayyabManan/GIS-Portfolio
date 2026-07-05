'use client'

import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { DESKTOP_MOTION, MOTION, loadFlip } from '@/lib/gsap'

type FlipModule = Awaited<ReturnType<typeof loadFlip>>

/**
 * FLIP morph for filterable card grids (desktop + fine-pointer only).
 *
 * Usage: put `ref={gridRef}` on the (relatively positioned) grid container and
 * `data-flip-id` on each card wrapper; call `capture()` synchronously in the
 * click handler BEFORE the setState that changes the list; pass a string that
 * identifies the rendered list (e.g. slugs joined) as `itemsKey`.
 *
 * Flow: capture() snapshots positions -> React re-renders -> the layout effect
 * (after commit, before paint) runs Flip.from, so surviving cards glide to
 * their new slots and entering cards fade/scale in.
 *
 * Known tradeoff: React unmounts filtered-out cards before Flip runs, so
 * leavers vanish instantly - survivors' movement carries the transition.
 * On mobile (or before the lazy chunk loads) capture() is a no-op and filters
 * hard-swap exactly as before.
 */
export function useGridFlip(itemsKey: string) {
  const gridRef = useRef<HTMLDivElement>(null)
  const stateRef = useRef<ReturnType<FlipModule['Flip']['getState']> | null>(null)
  const modRef = useRef<FlipModule | null>(null)
  const flipRef = useRef<ReturnType<FlipModule['Flip']['from']> | null>(null)

  // Preload on mount (desktop-gated) so capture() can be synchronous at click time.
  useEffect(() => {
    if (!window.matchMedia(DESKTOP_MOTION).matches) return
    let cancelled = false
    loadFlip().then((mod) => {
      if (!cancelled) modRef.current = mod
    }).catch(() => {
      // Progressive enhancement: without Flip, capture() stays a no-op and
      // filters hard-swap exactly as on mobile.
    })
    return () => {
      cancelled = true
    }
  }, [])

  const capture = useCallback(() => {
    const mod = modRef.current
    if (!gridRef.current || !mod) return
    stateRef.current = mod.Flip.getState(gridRef.current.querySelectorAll('[data-flip-id]'))
  }, [])

  useLayoutEffect(() => {
    const state = stateRef.current
    stateRef.current = null
    const mod = modRef.current
    if (!state || !mod || !gridRef.current) return
    const { gsap, Flip } = mod
    const targets = gridRef.current.querySelectorAll<HTMLElement>('[data-flip-id]')
    if (!targets.length) return
    // Interrupt safety: a second filter click mid-flip starts cleanly from the
    // current rendered positions instead of compounding transforms.
    flipRef.current?.kill()
    gsap.killTweensOf(targets)
    // Pre-hide entering cards SYNCHRONOUSLY (still pre-paint, inside this layout
    // effect). Relying on the onEnter tween's from-state is not safe: Flip nests
    // the returned tween into its own timeline, where the 0.1s delay defeats
    // fromTo's immediateRender - the card painted fully visible for ~100ms, then
    // vanished, then faded in (the "blink"). A plain gsap.set can't be late.
    const capturedIds = new Set(
      (state.targets as HTMLElement[]).map((el) => el.dataset.flipId)
    )
    const enterers = [...targets].filter((t) => !capturedIds.has(t.dataset.flipId))
    if (enterers.length) gsap.set(enterers, { autoAlpha: 0, scale: 0.94, y: 16 })
    // NO `absolute: true` here: for a same-grid morph the items must stay in flow
    // at their final slots (gliding via transforms). Absolutizing them collapses
    // the grid's rows (content below jumps) and lets entering cards steal the
    // vacated first slots mid-animation.
    flipRef.current = Flip.from(state, {
      targets,
      duration: 0.5,
      ease: MOTION.ease,
      // Animate enterers up from the pre-hidden state set above. Returned so Flip
      // folds it into its timeline and onComplete waits for the enterers too.
      onEnter: (els) =>
        gsap.to(els, {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          stagger: 0.05,
          ease: MOTION.ease,
          clearProps: 'all',
        }),
      // clearProps keeps the Tailwind hover lifts alive after the morph; width/height
      // clear Flip's inline size locks so cards still reflow on window resize.
      onComplete: () => {
        flipRef.current = null
        gsap.set(targets, { clearProps: 'transform,opacity,visibility,width,height' })
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey])

  return { gridRef, capture }
}
