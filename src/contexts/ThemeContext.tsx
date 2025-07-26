'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { themes, ThemeKey } from '@/lib/themes';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: ThemeMode;
  actualTheme: ThemeKey; // The actual applied theme (light or dark)
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [actualTheme, setActualTheme] = useState<ThemeKey>('light');
  const [mounted, setMounted] = useState(false);

  // Get the actual theme to apply based on the theme mode
  const getActualTheme = (themeMode: ThemeMode): ThemeKey => {
    if (themeMode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeMode as ThemeKey;
  };

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem('theme') as ThemeMode) || 'system';
    const actualThemeToApply = getActualTheme(savedTheme);
    
    setTheme(savedTheme);
    setActualTheme(actualThemeToApply);
    applyTheme(actualThemeToApply);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        const newActualTheme = e.matches ? 'dark' : 'light';
        setActualTheme(newActualTheme);
        applyTheme(newActualTheme);
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update actual theme when theme mode changes
  useEffect(() => {
    if (mounted) {
      const newActualTheme = getActualTheme(theme);
      setActualTheme(newActualTheme);
      applyTheme(newActualTheme);
    }
  }, [theme, mounted]);

  // Apply theme to CSS variables
  const applyTheme = (themeName: ThemeKey) => {
    const root = document.documentElement;
    const selectedTheme = themes[themeName];
    
    // Add transition disable attribute
    root.setAttribute('data-theme-changing', 'true');
    
    Object.entries(selectedTheme).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });
    
    // Also set a data attribute for conditional styling
    root.setAttribute('data-theme', themeName);
    
    // Remove transition disable after a short delay
    setTimeout(() => {
      root.removeAttribute('data-theme-changing');
    }, 50);
  };

  const toggleTheme = () => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const updateTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, toggleTheme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};