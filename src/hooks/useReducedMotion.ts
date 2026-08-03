import { useEffect, useState } from 'react';

/**
 * Tracks `prefers-reduced-motion`. The rest of the site handles this in CSS, but
 * the story viewer needs it in JS: its auto-advance is a `setTimeout`, and a
 * media query can't stop a timer. Auto-advancing timed content is precisely what
 * this setting exists to prevent, so the timer must not start at all.
 *
 * Subscribed rather than read once — the user can flip the OS setting while the
 * page is open, and a stale `true` would leave the viewer permanently manual.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
