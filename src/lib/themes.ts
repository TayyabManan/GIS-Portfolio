export const themes = {
  light: {
    // Primary colors
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primaryLight: '#dbeafe',
    
    // Background colors
    background: '#ffffff',
    backgroundRgb: '255, 255, 255',
    backgroundSecondary: '#f9fafb',
    backgroundTertiary: '#f3f4f6',
    
    // Text colors
    text: '#111827',
    textSecondary: '#6b7280',
    textTertiary: '#9ca3af',
    
    // Border colors
    border: '#e5e7eb',
    borderRgb: '229, 231, 235',
    borderHover: '#d1d5db',
    
    // Status colors
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    
    // Special colors
    accent: '#059669',
    highlight: '#fbbf24',
    
    // Animated background colors
    heroBackground: '#f9fafb',
    heroGradientStart: '#dbeafe',
    heroGradientMid: '#f3f4f6',
    heroGradientEnd: '#d1fae5',
    heroGridColor: 'rgba(0, 0, 0, 0.04)',
    heroPatternStroke: '#93c5fd',
    heroPatternStrokeAlt: '#6ee7b7',
    heroDotColor: '#93c5fd',
    heroOverlayStart: 'rgba(219, 234, 254, 0.9)',
    heroOverlayMid: 'rgba(249, 250, 251, 0.95)',
    heroOverlayEnd: 'rgba(209, 250, 229, 0.9)',
    
    projectsGradientStart: '#eff6ff',
    projectsGradientMid: '#ffffff',
    projectsGradientEnd: '#ecfdf5',
    projectsOrbPrimary: '#bfdbfe',
    projectsOrbSecondary: '#a7f3d0',
    projectsPatternStroke: '#dbeafe',
    projectsFloatColor: '#93c5fd',
    projectsFloatColorAlt: '#6ee7b7',
    
    skillsGradientStart: '#f3e8ff',
    skillsGradientMid: '#ffffff',
    skillsGradientEnd: '#eff6ff',
    skillsOrbPrimary: '#e9d5ff',
    skillsOrbSecondary: '#bfdbfe',
    skillsPatternStroke: '#e0e7ff',
    skillsFloatColor: '#c084fc',
    skillsFloatColorAlt: '#93c5fd',
    skillsGearColor: '#d8b4fe',
    
    // Shadows
    shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
  },
  
  dark: {
    // Primary colors - brighter and more vibrant
    primary: '#60a5fa',
    primaryHover: '#93c5fd',
    primaryLight: '#3b82f6',

    // Background colors - richer dark tones
    background: '#0a0f1e',
    backgroundRgb: '10, 15, 30',
    backgroundSecondary: '#151b2e',
    backgroundTertiary: '#1e2842',

    // Text colors - higher contrast
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    textTertiary: '#94a3b8',

    // Border colors - more visible
    border: '#2d3748',
    borderRgb: '45, 55, 72',
    borderHover: '#4a5568',

    // Status colors - brighter and more visible
    success: '#4ade80',
    error: '#fb7185',
    warning: '#fbbf24',
    info: '#60a5fa',

    // Special colors
    accent: '#10b981',
    highlight: '#fcd34d',
    
    // Animated background colors - more vibrant gradients
    heroBackground: '#0a0f1e',
    heroGradientStart: '#1e3a8a',
    heroGradientMid: '#0a0f1e',
    heroGradientEnd: '#065f46',
    heroGridColor: 'rgba(96, 165, 250, 0.05)',
    heroPatternStroke: '#60a5fa',
    heroPatternStrokeAlt: '#10b981',
    heroDotColor: '#93c5fd',
    heroOverlayStart: 'rgba(59, 130, 246, 0.15)',
    heroOverlayMid: 'rgba(10, 15, 30, 0.85)',
    heroOverlayEnd: 'rgba(16, 185, 129, 0.15)',

    projectsGradientStart: '#0a0f1e',
    projectsGradientMid: '#151b2e',
    projectsGradientEnd: '#0a0f1e',
    projectsOrbPrimary: '#3b82f6',
    projectsOrbSecondary: '#10b981',
    projectsPatternStroke: '#60a5fa',
    projectsFloatColor: '#60a5fa',
    projectsFloatColorAlt: '#34d399',

    skillsGradientStart: '#0a0f1e',
    skillsGradientMid: '#151b2e',
    skillsGradientEnd: '#0a0f1e',
    skillsOrbPrimary: '#7c3aed',
    skillsOrbSecondary: '#3b82f6',
    skillsPatternStroke: '#8b5cf6',
    skillsFloatColor: '#a78bfa',
    skillsFloatColorAlt: '#60a5fa',
    skillsGearColor: '#818cf8',
    
    // Shadows - enhanced for dark mode with subtle glow
    shadowSm: '0 1px 3px 0 rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(96, 165, 250, 0.05)',
    shadowMd: '0 4px 12px -2px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(96, 165, 250, 0.08)',
    shadowLg: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(96, 165, 250, 0.1)',
  }
} as const;

export type Theme = typeof themes.light;
export type ThemeKey = keyof typeof themes;