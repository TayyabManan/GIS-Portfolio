'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--border-hover)] transition-all duration-200"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-[var(--text)]" />
      ) : (
        <Sun className="w-5 h-5 text-[var(--text)]" />
      )}
    </button>
  );
}