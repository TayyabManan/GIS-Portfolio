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
export const EASE_MORPH_GSAP = 'power2.out' // closest core ease; no CustomEase plugin
