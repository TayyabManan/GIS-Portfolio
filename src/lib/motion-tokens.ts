/**
 * JS mirror of the @theme motion tokens in globals.css (canonical source).
 * Same pattern as src/lib/themes.ts mirroring the light palette: keep the
 * literals in sync by hand; do not import anything here (zero-dependency so
 * framer/WAAPI consumers don't drag provider code along).
 *
 * micro 150ms ease-out - state decorations (icon swaps, chips, selection)
 * morph 300ms ease-morph - container height/size changes
 * exits run ~30% faster with ease-in
 */
export const DUR = { micro: 0.15, morph: 0.3 } as const // seconds
export const EASE_MORPH_CSS = 'cubic-bezier(0.32, 0.72, 0, 1)'

/**
 * Signature-motion gate. The GSAP/WAAPI tiers write inline styles, so the
 * global reduced-motion CSS rule can't touch them - every JS motion surface
 * checks this at bind/play time instead, honoring the OS setting by default.
 * localStorage 'motion' = 'always' is the personal override (toggled from the
 * command palette; the owner runs reduced-motion ON but wants the motion -
 * that preference is now theirs alone instead of the site's default for
 * everyone). Every gated surface must remain fully functional without motion:
 * end states stand alone, charts render fully drawn, swaps are instant.
 */
export function motionOK(): boolean {
  if (typeof window === 'undefined') return false
  try {
    if (window.localStorage.getItem('motion') === 'always') return true
  } catch {
    /* storage blocked - fall through to the media query */
  }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
