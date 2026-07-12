/**
 * Lab-notebook doodle family - the site's one illustration motif (kill-boring
 * personality layer, see DESIGN_SYSTEM.md "Personality layer").
 *
 * One pen for everything: 1-1.5px stroke, currentColor, round caps, wobble
 * BAKED into hand-authored path literals - no runtime randomness (identical
 * server/client output, hydration-safe), no filters, no dependencies.
 * Axis strokes overshoot their corners by a few px like a real pen.
 *
 * All exports are server-renderable (no hooks). Decorative by contract:
 * aria-hidden, focusable=false, pointer-events-none baked in; data-doodle
 * powers the global print rule. Callers set size/position/color via
 * className (typically with the .doodle wrapper treatment from globals.css).
 * The only non-currentColor ink is the outlier circle: var(--accent-ink) -
 * part of the site's closed lime budget.
 */

interface DoodleProps {
  className?: string
}

function doodleAttrs(className?: string) {
  return {
    fill: 'none',
    'aria-hidden': true,
    focusable: 'false',
    'data-doodle': true,
    className: `pointer-events-none select-none ${className ?? ''}`,
  } as const
}

const PEN = {
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  // ink stays 1-1.5px no matter how large or small a doodle renders
  vectorEffect: 'non-scaling-stroke',
} as const

/** Descending training-loss curve on hand-drawn axes. Pairs with a mono caption ("converging"). */
export function LossCurve({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 90" {...doodleAttrs(className)}>
      {/* axes, pen overshooting the corner */}
      <path d="M18.5 8 C18 30 18.2 55 17.6 82.5" {...PEN} strokeWidth="1.25" />
      <path d="M14 78.6 C45 78 90 78.8 134 77.6" {...PEN} strokeWidth="1.25" />
      {/* y ticks */}
      <path d="M15 25.5 L21.5 25" {...PEN} strokeWidth="1" />
      <path d="M15.2 44 L21 44.4" {...PEN} strokeWidth="1" />
      <path d="M14.8 61.5 L21.2 61.2" {...PEN} strokeWidth="1" />
      {/* x ticks */}
      <path d="M45 75.5 L44.6 81.5" {...PEN} strokeWidth="1" />
      <path d="M75.5 75.8 L75 81.2" {...PEN} strokeWidth="1" />
      <path d="M105 75.2 L105.4 81.6" {...PEN} strokeWidth="1" />
      {/* noisy convergence: steep drop, two bumps, flattens right */}
      <path
        d="M26 13 C29 32 33 44 41 52 C47 57.5 51.5 49.5 57.5 54.5 C65 61 73 56.5 81.5 61.5 C95 68.5 111 65.5 132 63.5"
        {...PEN}
        strokeWidth="1.25"
      />
    </svg>
  )
}

/** Scatter with one circled off-band point - the circle is the lime element. */
export function ScatterOutlier({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 150 100" {...doodleAttrs(className)}>
      <path d="M16 10 C15.4 35 15.8 62 15.4 88.5" {...PEN} strokeWidth="1.25" />
      <path d="M12 84.4 C50 83.6 100 84.6 144 83.2" {...PEN} strokeWidth="1.25" />
      <path d="M12.6 32 L19 31.6" {...PEN} strokeWidth="1" />
      <path d="M12.2 58.5 L18.8 58.9" {...PEN} strokeWidth="1" />
      <path d="M52 81.4 L51.6 87" {...PEN} strokeWidth="1" />
      <path d="M98 80.8 L98.4 86.6" {...PEN} strokeWidth="1" />
      {/* loose rising band */}
      {[
        [30, 72],
        [41, 66],
        [50, 69],
        [62, 58],
        [72, 54],
        [83, 57],
        [95, 46],
        [108, 42],
        [120, 38],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2" fill="currentColor" stroke="none" />
      ))}
      {/* the outlier */}
      <circle cx="126" cy="16" r="2.2" fill="currentColor" stroke="none" />
      {/* hand ellipse around it - open path, start/end strokes cross */}
      <path
        d="M138 13.5 C138.5 6.5 130 3 122.5 5.5 C114.5 8.2 111.5 16.5 115.5 22.5 C119.8 28.5 132 28.6 137 22.2 C140 18.2 139 11.5 134.5 8.6"
        stroke="var(--accent-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** A run of irregular axis ticks on a hairline - underline chrome. */
export function AxisTicks({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 96 12" {...doodleAttrs(className)}>
      <path d="M2 9.5 C22 8.7 45 9.7 94 8.9" {...PEN} strokeWidth="1" />
      <path d="M8 9.3 L8.3 4.5" {...PEN} strokeWidth="1" />
      <path d="M26 9 L25.6 3.6" {...PEN} strokeWidth="1" />
      <path d="M40 9.4 L40.5 4.2" {...PEN} strokeWidth="1" />
      <path d="M57 9.1 L56.7 1.5" {...PEN} strokeWidth="1" />
      <path d="M71 9.3 L71.4 4.6" {...PEN} strokeWidth="1" />
      <path d="M88 8.9 L87.6 3.9" {...PEN} strokeWidth="1" />
    </svg>
  )
}

/** Small rising annotation arrow; the two head strokes don't quite meet the shaft. */
export function TrendArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 28 20" {...doodleAttrs(className)}>
      <path d="M2 17.5 C8 15.5 11.5 8.5 17.5 6 C19.8 5 22 4.8 24.5 5.3" {...PEN} strokeWidth="1.25" />
      <path d="M20.5 2 L25.6 5.2" {...PEN} strokeWidth="1.25" />
      <path d="M21.5 10 L25.8 5.7" {...PEN} strokeWidth="1.25" />
    </svg>
  )
}

/**
 * Metric-chip micro-charts (40x12). Each project picks the shape that fits its
 * metric via frontmatter `metricChart`, so no two cards show the same doodle.
 * All share the one pen; fills use currentColor so the chip's --accent-ink
 * colors them. Unknown/absent variant falls back to the plain loss line.
 */
export type MetricChart =
  | 'line'
  | 'scatter-fit'
  | 'bars-up'
  | 'bars-down'
  | 'hbars'
  | 'accuracy'
  | 'coverage'
  | 'roc'

// Stroke paths carry data-draw + pathLength=100 so the .metric-chart hover
// rule in globals.css can re-sketch them left-to-right; fills (dots, area)
// carry data-pop to fade in alongside. Fully drawn at rest.
const DRAW = { 'data-draw': true, pathLength: 100 } as const

function metricChartBody(variant: MetricChart) {
  switch (variant) {
    case 'scatter-fit': // regression fit (R²): dots straddling a rising trend line
      return (
        <>
          <path d="M3 10 L37 2.6" {...PEN} {...DRAW} strokeWidth="1.5" />
          <g fill="currentColor" stroke="none" data-pop>
            <circle cx="7" cy="9.8" r="1" />
            <circle cx="14" cy="6.2" r="1" />
            <circle cx="21" cy="7" r="1" />
            <circle cx="28" cy="3.4" r="1" />
            <circle cx="34" cy="4" r="1" />
          </g>
        </>
      )
    case 'bars-up': // comparison bars climbing (win rate: base -> tuned)
      return (
        <g {...PEN} strokeWidth="1.75">
          <path d="M7 11 L7 8.6" {...DRAW} />
          <path d="M16 11 L16 6.4" {...DRAW} />
          <path d="M25 11 L25 4.3" {...DRAW} />
          <path d="M34 11 L34 2.2" {...DRAW} />
        </g>
      )
    case 'bars-down': // shrinking bars (−60% bundle)
      return (
        <g {...PEN} strokeWidth="1.75">
          <path d="M7 11 L7 2.2" {...DRAW} />
          <path d="M16 11 L16 4.7" {...DRAW} />
          <path d="M25 11 L25 7" {...DRAW} />
          <path d="M34 11 L34 9.3" {...DRAW} />
        </g>
      )
    case 'hbars': // horizontal importance bars (SHAP explainability)
      return (
        <g {...PEN} strokeWidth="1.75">
          <path d="M4 3 L31 3" {...DRAW} />
          <path d="M4 6 L21 6" {...DRAW} />
          <path d="M4 9 L35 9" {...DRAW} />
        </g>
      )
    case 'accuracy': // training-accuracy curve rising to a plateau
      return <path d="M3 10.4 C8 10.2 12 4.4 19 3.4 C26 2.6 31 2.8 37 2.6" {...PEN} {...DRAW} strokeWidth="1.5" />
    case 'coverage': // filled coverage area (spatial coverage)
      return (
        <>
          <path d="M3 9.5 L11 6.8 L19 7.6 L27 4.4 L37 3.4 L37 11 L3 11 Z" fill="currentColor" fillOpacity="0.18" stroke="none" data-pop />
          <path d="M3 9.5 L11 6.8 L19 7.6 L27 4.4 L37 3.4" {...PEN} {...DRAW} strokeWidth="1.5" />
        </>
      )
    case 'roc': // ROC-style curve bowing to the top-left (classifier)
      return <path d="M3 11 C6 4.5 11 3 19 2.7 C27 2.5 32 2.6 37 2.5" {...PEN} {...DRAW} strokeWidth="1.5" />
    case 'line':
    default: // plain descending loss line
      return (
        <>
          <path d="M2 2.5 L7 5 L13 4.2 L19 7.5 L25 6.6 L31 9 L36.5 9.6" {...PEN} {...DRAW} strokeWidth="1.5" />
          <circle cx="36.5" cy="9.6" r="1.5" fill="currentColor" stroke="none" data-pop />
        </>
      )
  }
}

export function MetricSparkline({ variant = 'line', className }: DoodleProps & { variant?: MetricChart }) {
  return (
    <svg viewBox="0 0 40 12" {...doodleAttrs(`metric-chart ${className ?? ''}`)}>
      {metricChartBody(variant)}
    </svg>
  )
}

/** Axes with an empty plot area - the n=0 empty state. */
export function EmptyAxes({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 80" {...doodleAttrs(className)}>
      <path d="M16 8 C15.5 28 15.8 50 15.4 70.5" {...PEN} strokeWidth="1.25" />
      <path d="M12 66.5 C42 65.8 80 66.7 114 65.4" {...PEN} strokeWidth="1.25" />
      <path d="M12.6 25 L19 24.6" {...PEN} strokeWidth="1" />
      <path d="M12.2 45.5 L18.8 45.8" {...PEN} strokeWidth="1" />
      <path d="M40 63.5 L39.6 69" {...PEN} strokeWidth="1" />
      <path d="M65 63.9 L65.4 69.3" {...PEN} strokeWidth="1" />
      <path d="M90 63.2 L89.7 68.8" {...PEN} strokeWidth="1" />
    </svg>
  )
}

/** Loss curve that diverges at the end, the kink circled in lime - the 500 page. */
export function DivergedCurve({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 90" {...doodleAttrs(className)}>
      <path d="M18.5 8 C18 30 18.2 55 17.6 82.5" {...PEN} strokeWidth="1.25" />
      <path d="M14 78.6 C45 78 90 78.8 134 77.6" {...PEN} strokeWidth="1.25" />
      <path d="M15 30.5 L21.5 30" {...PEN} strokeWidth="1" />
      <path d="M14.8 55.5 L21.2 55.2" {...PEN} strokeWidth="1" />
      <path d="M55 75.5 L54.6 81.5" {...PEN} strokeWidth="1" />
      <path d="M95 75.2 L95.4 81.6" {...PEN} strokeWidth="1" />
      {/* converging nicely... then diverging hard in the last quarter */}
      <path
        d="M26 20 C30 38 35 48 44 54 C52 59.5 62 56 72 58.5 C84 61.5 92 60.5 100 55 C108 49 113 36 118 18"
        {...PEN}
        strokeWidth="1.25"
      />
      {/* hand ellipse around the kink */}
      <path
        d="M128 22 C129 12.5 121 8 112.5 11 C104 14.2 101.5 24 106.5 30.5 C111.5 36.8 124 35.8 128 28.5 C130 24.8 129 17.5 125 14.5"
        stroke="var(--accent-ink)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/**
 * The 404 centerpiece: a large scatter where the lost page is the outlier.
 * Full-pressure ink (no .doodle opacity treatment) - the flood page is the
 * one place the pen presses hard. Ink follows currentColor; the double
 * hand-ellipse follows --on-flood-strong (defined by the 404 container).
 */
export function Scatter404({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 560 360" {...doodleAttrs(className)}>
      <path d="M42 40 C40.5 130 41.5 230 40.2 324" {...PEN} strokeWidth="1.5" />
      <path d="M34 318.5 C160 316.5 380 319 532 316" {...PEN} strokeWidth="1.5" />
      {/* ticks */}
      <path d="M33 100.5 L49 99.5" {...PEN} strokeWidth="1.25" />
      <path d="M32.5 170 L48.5 171" {...PEN} strokeWidth="1.25" />
      <path d="M33.2 240.5 L48 239.8" {...PEN} strokeWidth="1.25" />
      <path d="M140 312 L139 325" {...PEN} strokeWidth="1.25" />
      <path d="M250 313.5 L250.8 326" {...PEN} strokeWidth="1.25" />
      <path d="M360 311.8 L359.4 324.5" {...PEN} strokeWidth="1.25" />
      <path d="M465 313 L465.8 325.6" {...PEN} strokeWidth="1.25" />
      {/* 14 dots, loose rising band */}
      {[
        [78, 282],
        [104, 268],
        [126, 274],
        [152, 252],
        [180, 244],
        [205, 250],
        [232, 228],
        [262, 218],
        [288, 224],
        [318, 200],
        [348, 190],
        [380, 178],
        [412, 168],
        [444, 152],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4" fill="currentColor" stroke="none" />
      ))}
      {/* the outlier - far off-band, upper right */}
      <circle cx="470" cy="82" r="4.5" fill="currentColor" stroke="none" />
      {/* two overlapping hand ellipses, rotated, pen pressed hard */}
      <g stroke="var(--on-flood-strong, currentColor)" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
        {/* vector-effect is per-element, not inherited from <g> */}
        <path d="M500 76 C501 57 480 46 461 52 C441 58.5 435 80 447 93 C459 106 489 105 498 89 C503 79.5 500 64 489 57" fill="none" vectorEffect="non-scaling-stroke" />
        <path d="M497 88 C507 76 501 56 483 49.5 C464 43 444 53 441 71 C438 89 455 103 474 100.5 C486 99 495 91 497 82" fill="none" vectorEffect="non-scaling-stroke" />
      </g>
      {/* annotation arrow toward the circle from lower-left */}
      <path d="M368 128 C394 122 416 110 436 96 C440 93.2 443 91 446.5 88.5" {...PEN} strokeWidth="2" />
      <path d="M437 84 L448.5 87.5" {...PEN} strokeWidth="2" />
      <path d="M439 97.5 L448.8 88.2" {...PEN} strokeWidth="2" />
    </svg>
  )
}
