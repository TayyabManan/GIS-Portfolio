/**
 * Single loader for GSAP + plugins. Every motion surface goes through here so
 * registration, the lenis sync, and the global refresh plumbing happen exactly once.
 *
 * House rules (established by the hero effect in src/components/sections/Hero.tsx):
 * - Callers gate on DESKTOP_MOTION *before* calling a loader, so touch/narrow
 *   viewports never download a single gsap byte.
 * - GSAP is used (not CSS transitions) so motion survives the global
 *   prefers-reduced-motion rule in globals.css, which zeroes CSS transitions only.
 *   That bypass is deliberate: the owner runs reduced-motion ON but wants the motion.
 */

import { getLenis } from '@/components/providers/SmoothScrollProvider'

type GsapCore = typeof import('gsap')['default']
type ScrollTriggerType = typeof import('gsap/ScrollTrigger')['ScrollTrigger']
type FlipType = typeof import('gsap/Flip')['Flip']
type SplitTextType = typeof import('gsap/SplitText')['SplitText']
type MorphSVGType = typeof import('gsap/MorphSVGPlugin')['MorphSVGPlugin']

/** Gate checked before any dynamic import - matches the hero's pill effect. */
export const DESKTOP_MOTION = '(min-width: 1024px) and (pointer: fine)'

/** Shared motion language, matched to the hero (framer 0.6s / [0.25,0.1,0.25,1] ~ power3.out). */
export const MOTION = {
  ease: 'power3.out',
  dur: 0.6, // headings / primary reveals
  durItem: 0.55, // cards
  rise: 24, // heading y offset
  riseItem: 28, // card y offset
  stagger: 0.1,
  start: 'top 78%',
} as const

let corePromise: Promise<{ gsap: GsapCore; ScrollTrigger: ScrollTriggerType }> | null = null
let flipPromise: Promise<{ gsap: GsapCore; Flip: FlipType }> | null = null
let splitTextPromise: Promise<{ gsap: GsapCore; SplitText: SplitTextType }> | null = null
let gsapCorePromise: Promise<{ gsap: GsapCore }> | null = null
let morphPromise: Promise<{ gsap: GsapCore; MorphSVG: MorphSVGType }> | null = null
let wired = false

/** gsap core + MorphSVG (hero focus-index readout chart morphs). Free in the
 * public package since GSAP 3.13. */
export function loadMorphSVG() {
  if (!morphPromise) {
    morphPromise = Promise.all([import('gsap'), import('gsap/MorphSVGPlugin')]).then(([g, m]) => {
      const gsap = g.default
      gsap.registerPlugin(m.MorphSVGPlugin)
      return { gsap, MorphSVG: m.MorphSVGPlugin }
    }).catch((err) => {
      morphPromise = null // don't cache the rejection - allow retry
      throw err
    })
  }
  return morphPromise
}

/** gsap core only, no plugins (transient micro tweens, e.g. the nav underline
 * handoff). Same module instance as the plugin loaders - pattern consistency,
 * not extra bytes. */
export function loadCore() {
  if (!gsapCorePromise) {
    gsapCorePromise = import('gsap').then((g) => ({ gsap: g.default })).catch((err) => {
      gsapCorePromise = null // don't cache the rejection - allow retry
      throw err
    })
  }
  return gsapCorePromise
}

/** gsap core + ScrollTrigger, registered, with the one-time global wiring. */
export function loadScrollCore() {
  if (!corePromise) {
    corePromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
      const gsap = g.default
      gsap.registerPlugin(st.ScrollTrigger)
      if (!wired) {
        wired = true
        // Same-frame sync with lenis smooth scroll (null on Safari/mobile, where
        // native scroll events drive ScrollTrigger directly).
        getLenis()?.on('scroll', () => st.ScrollTrigger.update())
        // Webfonts settling shifts layout (footer name, headings) - remeasure.
        document.fonts?.ready?.then(() => st.ScrollTrigger.refresh())
        // Page height changes without a window resize: route changes under the
        // persistent footer trigger, FeaturedProjects skeleton->cards, read-more
        // expansions. A debounced body observer covers them all.
        let refreshTimer: number | undefined
        const ro = new ResizeObserver(() => {
          window.clearTimeout(refreshTimer)
          refreshTimer = window.setTimeout(() => st.ScrollTrigger.refresh(), 150)
        })
        ro.observe(document.body)
        // Dev-only probe so trigger bookkeeping is assertable in a headless preview.
        if (process.env.NODE_ENV !== 'production') {
          ;(window as unknown as { __ST: unknown }).__ST = st.ScrollTrigger
        }
      }
      return { gsap, ScrollTrigger: st.ScrollTrigger }
    }).catch((err) => {
      // Never cache a rejection: one failed chunk load must not disable all
      // scroll motion until a full reload - reset so the next call retries.
      corePromise = null
      throw err
    })
  }
  return corePromise
}

/** gsap core + Flip (grid filter morphs). */
export function loadFlip() {
  if (!flipPromise) {
    flipPromise = Promise.all([import('gsap'), import('gsap/Flip')]).then(([g, f]) => {
      const gsap = g.default
      gsap.registerPlugin(f.Flip)
      return { gsap, Flip: f.Flip }
    }).catch((err) => {
      flipPromise = null // don't cache the rejection - allow retry
      throw err
    })
  }
  return flipPromise
}

/** gsap core + SplitText (footer name reveal). */
export function loadSplitText() {
  if (!splitTextPromise) {
    splitTextPromise = Promise.all([import('gsap'), import('gsap/SplitText')]).then(([g, s]) => {
      const gsap = g.default
      gsap.registerPlugin(s.SplitText)
      return { gsap, SplitText: s.SplitText }
    }).catch((err) => {
      splitTextPromise = null // don't cache the rejection - allow retry
      throw err
    })
  }
  return splitTextPromise
}
