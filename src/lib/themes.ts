/**
 * Light-palette constants for the rare places that cannot read CSS variables:
 * route metadata in `layout.tsx` (mask-icon) and the self-contained
 * `global-error.tsx` page (which replaces the root layout, so globals.css
 * may not be applied).
 *
 * The CANONICAL theme definitions live in `src/app/globals.css`:
 * `:root` = light, `[data-theme="dark"]` = dark. Theme switching only flips
 * the `data-theme` attribute on <html> (see layout.tsx inline script and
 * ThemeContext). If you change a color there, mirror it here.
 */
export const themes = {
  light: {
    primary: '#292524',
    primaryHover: '#3f3b36',
    primaryLight: '#e9e7e4',
    onPrimary: '#fafaf9',

    background: '#fafaf9',
    backgroundSecondary: '#f5f5f4',
    backgroundTertiary: '#e7e5e4',

    text: '#292524',
    textReading: '#423d37',
    textSecondary: '#57534e',
    textTertiary: '#78716c',

    border: '#d6d3d1',
    borderHover: '#a8a29e',

    success: '#16a34a',
    error: '#dc2626',
    warning: '#d97706',

    accent: '#d9f21e',
    accentInk: '#4d5e00',
    accentContrast: '#1c1917',
    accentFlood: '#def33f',
    info: '#3568d4',

    overlay: 'rgba(28, 25, 23, 0.5)',
  },
} as const;

export type ThemeKey = 'light' | 'dark';
