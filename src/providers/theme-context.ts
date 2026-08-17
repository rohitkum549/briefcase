import { createContext } from 'react';
import type { ThemeMode } from '@/types/theme';

/**
 * Shared with the blocking script in index.html, which reads this same key
 * before first paint to set the `dark` class. If the key or the resolution
 * order below changes, that script has to change with it — otherwise the class
 * flips after hydration and the flash of the wrong theme comes back.
 */
export const THEME_STORAGE_KEY = 'rj-portfolio-theme';

export interface ThemeContextValue {
  theme: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/** Stored preference first, then the OS setting, then light. */
export function getPreferredTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
  } catch {
    // localStorage unavailable (private mode) — fall through to the media query.
  }
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches)
    return 'dark';
  return 'light';
}
