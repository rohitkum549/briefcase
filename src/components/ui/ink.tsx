import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

/*
 * Hand-drawn accents. The path data is deliberately imperfect — control points
 * are off-grid and strokes overshoot their endpoints, which is what separates a
 * drawn line from a generated one. Stroke widths stay uneven for the same reason.
 *
 * All of these are decorative: aria-hidden, and they never carry meaning that
 * isn't already in the adjacent text.
 */

interface InkProps {
  className?: string;
  /** Approximate path length, for the draw-on dash animation. */
  length?: number;
  delayMs?: number;
}

/*
 * The delay is passed down as a custom property, not as `animationDelay`.
 *
 * It used to be an inline `animationDelay` on the <svg> while the animation runs
 * on the <path> inside it — and animation-delay is not an inherited property, so
 * it reached nothing. Every mark on the page has therefore been drawing at the
 * same instant since the stagger was written, which is why the 100/120/260/620ms
 * offsets never read as a sequence. Custom properties DO inherit, which is also
 * why --draw-length worked all along.
 */
function useInkAnimation(length: number, delayMs: number) {
  const { ref, inView } = useInView<SVGSVGElement>();
  return {
    ref,
    style: {
      '--draw-length': length,
      '--ink-delay': `${delayMs}ms`,
    } as React.CSSProperties,
    pathClass: cn('ink-draw', inView && 'ink-draw-run'),
  };
}

/** Loose underline that sits under a word or two. */
export function InkUnderline({
  className,
  length = 320,
  delayMs = 100,
}: InkProps) {
  const { ref, style, pathClass } = useInkAnimation(length, delayMs);
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 300 18"
      preserveAspectRatio="none"
      fill="none"
      className={cn('pointer-events-none absolute', className)}
      style={style}
    >
      <path
        d="M3 11.5c38-4.2 79-6.1 118-5.6 42 .5 84 3.1 126 6.4M14 15.8c46-3.4 93-4.6 139-4.1 34 .4 68 2 101 4"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        className={pathClass}
      />
    </svg>
  );
}

/** Lopsided circle for the "this is the important bit" gesture. */
export function InkCircle({
  className,
  length = 520,
  delayMs = 120,
}: InkProps) {
  const { ref, style, pathClass } = useInkAnimation(length, delayMs);
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 220 84"
      preserveAspectRatio="none"
      fill="none"
      className={cn('pointer-events-none absolute', className)}
      style={style}
    >
      <path
        d="M112 6C71 4 28 14 12 32 2 44 6 60 22 69c22 12 62 15 96 12 30-3 62-12 76-28 10-12 6-28-12-36C166 8 140 5 112 6c-14 .5-28 2-41 5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        className={pathClass}
      />
    </svg>
  );
}

/**
 * Grader's tick. Two strokes rather than one polyline: a real check is a fast
 * down-stroke and a longer up-stroke, and drawing them separately lets the dash
 * animation land the same way — short flick, then the long tail.
 */
export function InkCheck({ className, length = 90, delayMs = 620 }: InkProps) {
  const { ref, style, pathClass } = useInkAnimation(length, delayMs);
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 44 44"
      fill="none"
      className={cn('pointer-events-none absolute', className)}
      style={style}
    >
      <path
        d="M5 22.5c3.4 2.1 6.6 5.4 9.1 9.6"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
        className={pathClass}
      />
      <path
        d="M13.4 32.4C18.1 21 26.4 11.4 37.5 5.2"
        stroke="currentColor"
        strokeWidth="3.1"
        strokeLinecap="round"
        className={pathClass}
      />
    </svg>
  );
}

type ArrowDirection = 'down-right' | 'down-left' | 'right' | 'up-right';

const arrowPaths: Record<ArrowDirection, { d: string; head: string }> = {
  'down-right': {
    d: 'M6 6c2 20 10 38 26 50 12 9 27 13 42 14',
    head: 'M62 60l12 10-16 6',
  },
  'down-left': {
    d: 'M80 6c-2 20-11 38-27 50-11 8-25 12-39 14',
    head: 'M24 60l-12 10 16 6',
  },
  right: {
    d: 'M4 24c22-8 48-11 74-9 6 .4 12 1 18 2',
    head: 'M84 8l14 9-13 11',
  },
  'up-right': {
    d: 'M6 74c6-20 18-38 36-48 10-6 21-9 32-10',
    head: 'M62 10l14 6-10 13',
  },
};

interface InkArrowProps extends InkProps {
  direction?: ArrowDirection;
}

/** Curved arrow that points from a note to the thing it's about. */
export function InkArrow({
  className,
  direction = 'down-right',
  length = 180,
  delayMs = 260,
}: InkArrowProps) {
  const { ref, style, pathClass } = useInkAnimation(length, delayMs);
  const { d, head } = arrowPaths[direction];
  return (
    <svg
      ref={ref}
      aria-hidden="true"
      viewBox="0 0 100 84"
      fill="none"
      className={cn('pointer-events-none absolute', className)}
      style={style}
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={pathClass}
      />
      <path
        d={head}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={pathClass}
      />
    </svg>
  );
}
