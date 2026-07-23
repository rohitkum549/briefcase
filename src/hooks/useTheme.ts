import { useCallback, useLayoutEffect, useState } from 'react';
import type { ThemeMode } from '@/types/theme';

const STORAGE_KEY = 'rj-portfolio-theme';

function getPreferredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage unavailable (private mode, SSR) — fall through to media query.
  }
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches)
    return 'dark';
  return 'light';
}

export interface UseThemeResult {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeResult {
  const [theme, setTheme] = useState<ThemeMode>(getPreferredTheme);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore write failures (private mode / storage quota).
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, isDark: theme === 'dark', toggleTheme };
}
