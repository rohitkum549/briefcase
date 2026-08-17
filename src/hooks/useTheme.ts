import { useContext } from 'react';
import {
  ThemeContext,
  type ThemeContextValue,
} from '@/providers/theme-context';

/**
 * Reads the shared theme. State lives in ThemeProvider — see the note there for
 * why this stopped owning it.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used inside <ThemeProvider>.');
  }
  return context;
}

export type UseThemeResult = ThemeContextValue;
