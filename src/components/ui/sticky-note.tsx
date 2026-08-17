import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

export type StickyTone = 'amber' | 'teal' | 'pink';

/*
 * Paper colours are hand-picked per tone rather than derived from the theme —
 * a sticky note that inherits `bg-card` stops reading as paper. In dark mode the
 * paper stays warm but drops in luminance, which is what real sites do; a pure
 * inverted note reads as a UI card again.
 */
const toneClasses: Record<StickyTone, string> = {
  amber:
    'bg-[#fdf0c4] text-[#4a3c12] dark:bg-[#8a7434] dark:text-[#fdf6e0] [--tape:#f2e3a8] dark:[--tape:#9d8845]',
  teal: 'bg-[#cdeeea] text-[#12403c] dark:bg-[#2c6f68] dark:text-[#e4f7f4] [--tape:#b3e2dc] dark:[--tape:#3a827a]',
  pink: 'bg-[#fbdce4] text-[#4d1f2c] dark:bg-[#8a4859] dark:text-[#fce9ee] [--tape:#f3c6d2] dark:[--tape:#9d5a6b]',
};

interface StickyNoteProps {
  children: ReactNode;
  tone?: StickyTone;
  /** Degrees of rotation — keep under ~4 or it reads as a mistake. */
  tilt?: number;
  /**
   * Milliseconds to hold before the note settles in. Use it to place several
   * notes in reading order rather than having them all land together.
   */
  delay?: number;
  className?: string;
  /**
   * Render children in a plain container instead of a paragraph. Needed when the
   * note holds block content — a `<div>` inside the default `<p>` is invalid
   * nesting and the browser silently closes the paragraph early, which drops the
   * handwriting styles from everything after it.
   */
  asBlock?: boolean;
}

/** Handwriting scale shared by both wrappers. */
const bodyClass = 'font-hand text-[20px] leading-[1.35] md:text-[22px]';

/**
 * The shadow is the whole trick: a real sticky note is only adhered along its
 * top edge, so it lifts at the bottom. A uniform box-shadow on all four sides is
 * the tell that gives away a fake one — hence the asymmetric offset plus a
 * tighter contact shadow near the top.
 */
export function StickyNote({
  children,
  tone = 'amber',
  tilt = -2,
  delay = 0,
  className,
  asBlock = false,
}: StickyNoteProps) {
  /*
   * The note is placed as you reach it rather than being there already — see the
   * note-enter utility in index.css for why only this layer animates.
   *
   * The resting rotation moved out of an inline `transform` and into the
   * `--note-tilt` custom property: the keyframe has to own transform to animate
   * it, and an inline style would win over the animation and pin the note to its
   * final angle for the whole entrance.
   */
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'relative isolate w-full max-w-[230px] px-5 pt-7 pb-6',
        'shadow-[0_1px_2px_rgba(0,0,0,0.14),0_10px_18px_-8px_rgba(0,0,0,0.32)]',
        'transition-transform duration-(--duration-quick) hover:-translate-y-0.5 hover:rotate-0',
        'note-enter',
        inView && 'note-enter-run',
        toneClasses[tone],
        className,
      )}
      style={
        {
          '--note-tilt': `${tilt}deg`,
          '--note-delay': `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {/* Tape across the top edge. */}
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-[var(--tape)] opacity-80 shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
      />
      {asBlock ? (
        <div className={bodyClass}>{children}</div>
      ) : (
        <p className={bodyClass}>{children}</p>
      )}
    </div>
  );
}
