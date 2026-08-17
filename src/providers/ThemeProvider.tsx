import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import {
  getPreferredTheme,
  ThemeContext,
  THEME_STORAGE_KEY,
  type ThemeContextValue,
} from '@/providers/theme-context';
import type { ThemeMode } from '@/types/theme';

/**
 * One source of theme state for the whole app.
 *
 * `useTheme` used to own its own `useState`, and it is called in two places —
 * the header toggle and the Toaster. Each got an independent copy, so toggling
 * updated the header while the Toaster kept whatever it read at mount: switch to
 * dark, download the résumé, and the success toast arrived light-on-dark. A
 * provider is the fix; the hook signature is unchanged so call sites are not.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(getPreferredTheme);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore write failures (private mode / storage quota).
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = () =>
      setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

    /*
     * Cross-fade the repaint where the browser supports it. Swapping every
     * surface colour in a single frame is the one moment this site visibly
     * snaps, and a view transition costs nothing when it is unavailable — the
     * feature check falls through to a plain state update.
     *
     * Skipped under reduced motion: a full-page cross-fade is exactly the kind
     * of large-area change that setting exists to suppress.
     */
    const reduced = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (!document.startViewTransition || reduced) {
      next();
      return;
    }
    document.startViewTransition(() => {
      flushSync(next);
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, isDark: theme === 'dark', toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}
