import { useEffect, useRef } from 'react';

interface PointerTiltOptions {
  /**
   * Rotation in degrees at the very edge of the card.
   *
   * This was originally set at 5.5 on the theory that restraint was the safer
   * error. It was not: rendered and compared side by side against 9 and 13, the
   * conservative setting was simply invisible unless you already knew to look
   * for it, which makes it worse than no effect at all. 13 shears the body text
   * badly enough to notice. Nine is the setting that reads as a page tipping
   * under your hand.
   */
  max?: number;
}

/**
 * Tips a card toward the pointer and moves a light source across it.
 *
 * The values are written to the element as custom properties rather than to
 * React state, and the write is batched into an animation frame.
 *
 * Neither of those is folklore. React state would re-render the card's whole
 * subtree on every pointer sample, and this component renders a 400-line hand
 * authored SVG — that is real work, repeated for movement that only ever changes
 * two numbers. The frame batch matters less than it looks, because Chrome
 * already coalesces raw mouse input down to about one `pointermove` per frame
 * before a listener ever sees it (measured: 160 dispatched events arrived as 5).
 * It is kept because that coalescing is a browser implementation detail rather
 * than a guarantee, and because holding only the latest coordinate means a
 * backlog is dropped rather than replayed — the card follows where the pointer
 * *is*, never where it has been.
 *
 * Composition lives in CSS (see `card-3d` in index.css) — this hook supplies
 * four numbers and nothing else, so the visual language stays in one place.
 */
export function usePointerTilt<T extends HTMLElement>({
  max = 6,
}: PointerTiltOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined' || !window.matchMedia) return;

    /*
     * Two gates, and both are load-bearing.
     *
     * `pointer: fine` — on a touchscreen `pointermove` only fires while a finger
     * is down and there is no `pointerleave` when it lifts, so a tilt driven by
     * it would apply on tap and then stay frozen at whatever angle the finger
     * left it. The card would be permanently crooked for the rest of the visit.
     *
     * `prefers-reduced-motion` — this is the largest continuous movement on the
     * site, so it is the first thing that should not exist for someone who has
     * asked for less of it. The CSS carries a matching guard; this stops the
     * listeners being attached at all.
     *
     * Both are subscribed rather than read once: a tablet with a keyboard case
     * attached flips `pointer: fine` mid-session, and the OS setting can be
     * changed with the page open.
     */
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');

    let frame = 0;
    let point: { x: number; y: number } | null = null;
    /** The card's resting geometry, captured once per hover. See `enter`. */
    let base: {
      left: number;
      top: number;
      w: number;
      h: number;
      sx: number;
      sy: number;
    } | null = null;

    const paint = () => {
      frame = 0;
      if (!point || !base) return;

      /*
       * Positions are measured against the geometry captured on entry, adjusted
       * for any scrolling since, rather than against a fresh rect each frame.
       *
       * Measuring fresh is the obvious implementation and it is wrong, because
       * getBoundingClientRect reports the RENDERED box — transform included. The
       * moment the card tilts and scales, the rect it returns is the inflated
       * envelope of the tilted card (542x668 for a card that lays out at
       * 520x637), so the divisor changes as a result of the very value it is
       * being used to compute. That is a feedback loop, and it has two visible
       * consequences: the tilt settles at the wrong angle (measured: 7.1deg of
       * yaw for a pointer sitting exactly at the card's centre, where the
       * correct answer is 0), and every geometry change re-runs hit-testing, so
       * Chrome emits synthetic pointermove events under a stationary cursor and
       * the card oscillates. A stationary pointer produced 90 moves and six
       * enter/leave cycles.
       *
       * With the frame of reference held constant the tilt becomes a pure
       * function of pointer position, which ends the loop at its source.
       */
      const left = base.left - (window.scrollX - base.sx);
      const top = base.top - (window.scrollY - base.sy);

      const x = (point.x - left) / base.w;
      const y = (point.y - top) / base.h;

      // Rotating about Y follows the horizontal position; about X it opposes
      // the vertical one, so the edge nearest the pointer is the one that lifts.
      el.style.setProperty('--tilt-y', `${(x - 0.5) * 2 * max}deg`);
      el.style.setProperty('--tilt-x', `${(0.5 - y) * 2 * max}deg`);
      el.style.setProperty('--sheen-x', `${x * 100}%`);
      el.style.setProperty('--sheen-y', `${y * 100}%`);
    };

    const track = (event: PointerEvent) => {
      point = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      point = null;
      base = null;
      // Removing rather than zeroing: each property falls back to the
      // `initial-value` in its @property registration, and dropping the
      // `--tilt-ms` override hands the transition back to `--duration-quick`
      // so the card eases flat instead of snapping.
      for (const prop of [
        '--tilt-ms',
        '--tilt-x',
        '--tilt-y',
        '--sheen-x',
        '--sheen-y',
      ])
        el.style.removeProperty(prop);
    };

    const enter = (event: PointerEvent) => {
      /*
       * Capture the resting geometry now, while the card is still flat — the
       * :hover transition has not started at the instant this fires.
       *
       * Size comes from offsetWidth/offsetHeight rather than the rect: those are
       * layout values that no transform can move, so even if this were somehow
       * reached mid-transition the scale stays honest. The origin is recentred
       * by the difference, since every transform here is applied about the
       * card's centre and therefore leaves that centre where it was.
       */
      const rect = el.getBoundingClientRect();
      const w = el.offsetWidth || rect.width;
      const h = el.offsetHeight || rect.height;
      if (!w || !h) return;
      base = {
        left: rect.left + (rect.width - w) / 2,
        top: rect.top + (rect.height - h) / 2,
        w,
        h,
        sx: window.scrollX,
        sy: window.scrollY,
      };
      el.style.setProperty('--tilt-ms', '0ms');
      track(event);
    };

    const unbind = () => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', track);
      el.removeEventListener('pointerleave', reset);
      reset();
    };

    const bind = () => {
      unbind();
      if (!fine.matches || still.matches) return;
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointermove', track);
      el.addEventListener('pointerleave', reset);
    };

    bind();
    fine.addEventListener('change', bind);
    still.addEventListener('change', bind);

    return () => {
      fine.removeEventListener('change', bind);
      still.removeEventListener('change', bind);
      unbind();
    };
  }, [max]);

  return ref;
}
