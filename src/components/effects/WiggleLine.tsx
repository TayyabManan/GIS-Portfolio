'use client'

import { useEffect, useRef } from 'react'

/**
 * The hero's hairline rule as an interactive quadratic bezier: the line bends
 * with the cursor while hovered and springs back elastically on leave.
 *
 * Port of Olivier Larose's svg-bezier-curve (typescript-tailwind-version),
 * adapted to: measure the container instead of the window, clamp the bend to a
 * tasteful amplitude, center the hover zone on the line, hold mutable state in
 * refs (parent re-renders must not reset a wiggle in flight), and use theme
 * tokens. rAF + attribute-driven, so it animates even under the global
 * prefers-reduced-motion rule, which only kills CSS animations/transitions.
 */
const AMPLITUDE = 60 // max px the line may bend either way
const MID = 80 // path baseline inside the 160px-tall overflow svg

export default function WiggleLine() {
  const container = useRef<HTMLDivElement>(null)
  const path = useRef<SVGPathElement>(null)
  const progress = useRef(0)
  const x = useRef(0.5)
  const time = useRef(Math.PI / 2)
  const reqId = useRef<number | null>(null)

  const setPath = (value: number) => {
    const width = container.current?.offsetWidth ?? 0
    const el = path.current
    if (!el) return
    el.setAttributeNS(
      null,
      'd',
      `M0 ${MID} Q${width * x.current} ${MID + value}, ${width} ${MID}`
    )
    // Bend-proportional ink: the more the line is bent, the more it tints toward
    // the accent and thickens - tension feedback that drains away as it settles.
    // Inline styles (not CSS transitions) so it tracks the rAF exactly and stays
    // immune to the global reduced-motion rule. At rest the inline styles clear
    // and the themed class styling takes back over (pixel-identical to before).
    const tension = Math.min(1, Math.abs(value) / AMPLITUDE)
    if (tension === 0) {
      el.style.stroke = ''
      el.style.strokeWidth = ''
    } else {
      el.style.stroke = `color-mix(in srgb, var(--primary) ${Math.round(tension * 100)}%, var(--border))`
      el.style.strokeWidth = `${1 + 0.5 * tension}px`
    }
  }

  useEffect(() => {
    // Width is unknown at SSR, so the first straight line is drawn on mount.
    setPath(progress.current)
    const onResize = () => setPath(progress.current)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      if (reqId.current) cancelAnimationFrame(reqId.current)
    }
  }, [])

  const lerp = (a: number, b: number, t: number) => a * (1 - t) + b * t

  const resetAnimation = () => {
    time.current = Math.PI / 2
    progress.current = 0
  }

  // Elastic spring-back: oscillate via sin(time) while damping progress to 0.
  const animateOut = () => {
    const newProgress = progress.current * Math.sin(time.current)
    progress.current = lerp(progress.current, 0, 0.025)
    time.current += 0.2
    setPath(newProgress)
    if (Math.abs(progress.current) > 0.75) {
      reqId.current = requestAnimationFrame(animateOut)
    } else {
      resetAnimation()
      setPath(0) // land perfectly straight
    }
  }

  const manageMouseEnter = () => {
    // Re-entering mid-wiggle: take over from the current state cleanly.
    if (reqId.current) {
      cancelAnimationFrame(reqId.current)
      resetAnimation()
    }
  }

  const manageMouseMove = (e: React.MouseEvent) => {
    const bound = container.current?.getBoundingClientRect()
    if (!bound) return
    x.current = (e.clientX - bound.left) / bound.width
    progress.current = Math.max(
      -AMPLITUDE,
      Math.min(AMPLITUDE, progress.current + e.movementY)
    )
    setPath(progress.current)
  }

  const manageMouseLeave = () => {
    animateOut()
  }

  return (
    <div ref={container} aria-hidden="true" className="relative h-px w-full">
      {/* Invisible hover zone centered on the line */}
      <div
        onMouseEnter={manageMouseEnter}
        onMouseMove={manageMouseMove}
        onMouseLeave={manageMouseLeave}
        className="absolute -top-5 z-10 h-10 w-full"
      />
      <svg className="pointer-events-none absolute -top-[80px] h-[160px] w-full overflow-visible text-[var(--border)]">
        <path ref={path} className="fill-none stroke-current stroke-[1px]" />
      </svg>
    </div>
  )
}
