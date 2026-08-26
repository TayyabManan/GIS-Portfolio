/**
 * Favicon/app-icon generator - renders every raster icon from the ink mark so
 * the brand can never drift across formats again (the blue -> ink migration
 * left stale blue PNGs behind exactly this way).
 *
 * Outputs (public/):
 * - favicon-16x16.png / favicon-32x32.png - ink mark on a rounded paper plate
 *   (the plate keeps the mark visible on dark tab bars in browsers that don't
 *   take the theme-aware favicon.svg, i.e. Safari and legacy).
 * - favicon.ico - 16/32/48 plates bundled.
 * - apple-touch-icon.png (180) - paper mark on solid ink tile (iOS rounds it).
 * - android-chrome-192x192.png / -512x512.png - maskable: paper mark inside
 *   the 60% safe zone on solid ink.
 *
 * favicon.svg (theme-aware) and logo.svg are hand-maintained - not generated.
 * Run: npm run generate:favicons
 */
import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { writeFile } from 'node:fs/promises'

const INK = '#1c1917'
const PAPER = '#fafaf9'

// The logo path (viewBox 33.8 33.8 232.9 233) - single source: public/logo.svg
const MARK =
  'M227.9,33.8h-38.8v38.8h-77.7v-38.8h-38.8c-21.5,0-38.8,17.4-38.8,38.8v155.4c0,21.5,17.4,38.8,38.8,38.8h38.8v-77.7h-38.8v-77.7h38.8v38.8h77.7v-38.8h38.8v77.7h-38.8v77.7h38.8c21.5,0,38.8-17.4,38.8-38.8V72.7c0-21.5-17.4-38.8-38.8-38.8Z'

/** size: canvas px; markRatio: mark width as a fraction of canvas;
 *  bg: fill or null for transparent; rx: corner radius (plate look). */
function iconSvg({ size, markRatio, bg, fg, rx = 0 }) {
  const m = Math.round(size * markRatio)
  const off = Math.round((size - m) / 2)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${bg ? `<rect width="${size}" height="${size}" rx="${rx}" fill="${bg}"/>` : ''}
  <svg x="${off}" y="${off}" width="${m}" height="${m}" viewBox="33.8 33.8 232.9 233"><path d="${MARK}" fill="${fg}"/></svg>
</svg>`
}

const png = (svg) => sharp(Buffer.from(svg)).png().toBuffer()

async function main() {
  // Tab favicons: ink on rounded paper plate
  const plate = (size) =>
    png(iconSvg({ size, markRatio: 0.72, bg: PAPER, fg: INK, rx: Math.round(size * 0.19) }))
  const [p16, p32, p48] = await Promise.all([plate(16), plate(32), plate(48)])
  await writeFile('public/favicon-16x16.png', p16)
  await writeFile('public/favicon-32x32.png', p32)
  await writeFile('public/favicon.ico', await pngToIco([p16, p32, p48]))

  // iOS tile: paper mark on ink (iOS applies its own corner mask)
  await writeFile(
    'public/apple-touch-icon.png',
    await png(iconSvg({ size: 180, markRatio: 0.58, bg: INK, fg: PAPER }))
  )

  // Android maskable: mark inside the safe zone on ink
  for (const size of [192, 512]) {
    await writeFile(
      `public/android-chrome-${size}x${size}.png`,
      await png(iconSvg({ size, markRatio: 0.52, bg: INK, fg: PAPER }))
    )
  }
  console.log('favicons regenerated (favicon.svg / logo.svg are hand-maintained)')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
