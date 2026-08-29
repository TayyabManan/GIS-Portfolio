'use client'

import { useEffect, type RefObject } from 'react'
import { desktopMotionOK, MOTION, loadScrollCore } from '@/lib/gsap'

/**
 * Scroll-triggered section reveal (desktop + fine-pointer only, plays once).
 *
 * Looks for `[data-reveal-group]` elements inside the scope; within each group,
 * `[data-reveal="heading"]` rises first and `[data-reveal="item"]` elements
 * stagger in behind it. An optional `data-reveal-stagger` on the group overrides
 * the item stagger.
 *
 * Hiding is JS-only (gsap.set after the lazy chunk loads), so SSR markup ships
 * fully visible for no-JS/mobile/crawlers, and a group already inside the
 * viewport is never hidden - the failure direction is always "visible without
 * animation", never "hidden content".
 *
 * Pass `ready=false` while a section's content is still loading (e.g. async
 * cards) so triggers are created only once real elements exist.
 */
export function useSectionReveal(scopeRef: RefObject<HTMLElement | null>, ready = true) {
  useEffect(() => {
    if (!ready || !scopeRef.current) return
    // Gate the import itself: touch / narrow viewports never download GSAP,
    // and reduced-motion users keep everything statically visible.
    if (!desktopMotionOK()) return
    let cancelled = false
    let revert: (() => void) | null = null
    loadScrollCore().then(({ gsap }) => {
      const scope = scopeRef.current
      if (cancelled || !scope) return
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        // toArray finds descendants only - include the scope itself when the ref
        // sits directly on the group element (e.g. FeaturedProjects' <section>).
        const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-group]', scope)
        if (scope.matches('[data-reveal-group]')) groups.unshift(scope)
        const cleanups = groups.map((group) => {
          // Anti-FOUC: never hide a group the user can already MEANINGFULLY see
          // (scroll restoration, slow chunk + fast fling, retry re-arms). The 40px
          // grace matters for the section flush against the fold (FeaturedProjects
          // sits exactly at 100dvh): fractional layout offsets must not skip it.
          if (group.getBoundingClientRect().top < window.innerHeight - 40) return () => {}
          const heading = group.querySelector<HTMLElement>('[data-reveal="heading"]')
          const items = gsap.utils.toArray<HTMLElement>('[data-reveal="item"]', group)
          const targets = (heading ? [heading, ...items] : items) as HTMLElement[]
          if (!targets.length) return () => {}
          const stagger = parseFloat(group.dataset.revealStagger ?? '') || MOTION.stagger
          if (heading) gsap.set(heading, { autoAlpha: 0, y: MOTION.rise })
          if (items.length) gsap.set(items, { autoAlpha: 0, y: MOTION.riseItem })
          const tl = gsap.timeline({
            scrollTrigger: { trigger: group, start: MOTION.start, once: true },
            // clearProps is mandatory: a leftover inline transform would create
            // a containing block (breaking descendants' fixed/absolute layers)
            // and silently pin any future hover transform on the cards.
            onComplete: () => gsap.set(targets, { clearProps: 'transform,opacity,visibility' }),
          })
          if (heading) {
            tl.to(heading, { autoAlpha: 1, y: 0, duration: MOTION.dur, ease: MOTION.ease })
          }
          if (items.length) {
            tl.to(
              items,
              { autoAlpha: 1, y: 0, duration: MOTION.durItem, ease: MOTION.ease, stagger },
              heading ? '-=0.35' : 0
            )
          }
          return () => {
            tl.scrollTrigger?.kill()
            tl.kill()
          }
        })
        return () => cleanups.forEach((dispose) => dispose())
      })
      revert = () => mm.revert()
    }).catch(() => {
      // Motion is progressive enhancement: a failed gsap chunk load just leaves
      // the sections statically visible (they're never hidden before this resolves).
    })
    return () => {
      cancelled = true
      revert?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])
}
