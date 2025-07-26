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
    // Primary colors
    primary: '#3b82f6',
    primaryHover: '#60a5fa',
    primaryLight: '#1e3a8a',
    
    // Background colors
    background: '#0f172a',
    backgroundRgb: '15, 23, 42',
    backgroundSecondary: '#1e293b',
    backgroundTertiary: '#334155',
    
    // Text colors
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    textTertiary: '#9ca3af',
    
    // Border colors
    border: '#334155',
    borderRgb: '51, 65, 85',
    borderHover: '#475569',
    
    // Status colors
    success: '#34d399',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
    
    // Special colors
    accent: '#10b981',
    highlight: '#fbbf24',
    
    // Animated background colors
    heroBackground: '#111827',
    heroGradientStart: '#1e3a8a',
    heroGradientMid: '#111827',
    heroGradientEnd: '#064e3b',
    heroGridColor: 'rgba(255, 255, 255, 0.03)',
    heroPatternStroke: '#3b82f6',
    heroPatternStrokeAlt: '#10b981',
    heroDotColor: '#60a5fa',
    heroOverlayStart: 'rgba(30, 58, 138, 0.9)',
    heroOverlayMid: 'rgba(17, 24, 39, 0.95)',
    heroOverlayEnd: 'rgba(6, 78, 59, 0.9)',
    
    projectsGradientStart: '#111827',
    projectsGradientMid: '#1f2937',
    projectsGradientEnd: '#111827',
    projectsOrbPrimary: '#1e3a8a',
    projectsOrbSecondary: '#064e3b',
    projectsPatternStroke: '#1e40af',
    projectsFloatColor: '#3b82f6',
    projectsFloatColorAlt: '#10b981',
    
    skillsGradientStart: '#111827',
    skillsGradientMid: '#1f2937',
    skillsGradientEnd: '#111827',
    skillsOrbPrimary: '#4c1d95',
    skillsOrbSecondary: '#1e3a8a',
    skillsPatternStroke: '#312e81',
    skillsFloatColor: '#8b5cf6',
    skillsFloatColorAlt: '#3b82f6',
    skillsGearColor: '#6366f1',
    
    // Shadows
    shadowSm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
    shadowMd: '0 4px 6px -1px rgb(0 0 0 / 0.4)',
    shadowLg: '0 10px 15px -3px rgb(0 0 0 / 0.5)',
  }
} as const;

export type Theme = typeof themes.light;
export type ThemeKey = keyof typeof themes;