import type { ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface HandNoteProps {
  children: ReactNode;
  className?: string;
  /** Slight rotation so it reads as written, not typeset. */
  tilt?: number;
  /**
   * Milliseconds to hold before the note appears. Where a note accompanies an
   * ink mark, give it ~180ms more than the mark so the stroke is drawn first and
   * the words follow — the order a person would actually annotate in.
   */
  delay?: number;
}

/**
 * Handwritten margin note. Caveat at 17px+ stays legible; below that it turns
 * to mush, so the size floor is baked in rather than left to callers.
 *
 * Appears on scroll rather than being present from the start: it belongs to the
 * handwritten layer, and on this site that layer is what moves. See the
 * note-enter utility in index.css.
 */
export function HandNote({
  children,
  className,
  tilt = -3,
  delay = 0,
}: HandNoteProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();

  return (
    <span
      ref={ref}
      className={cn(
        'font-hand text-[19px] leading-[1.25] text-accent-brand md:text-[21px]',
        'note-enter',
        inView && 'note-enter-run',
        className,
      )}
      style={
        {
          '--note-tilt': `${tilt}deg`,
          '--note-delay': `${delay}ms`,
        } as React.CSSProperties
      }
    >
      {children}
    </span>
  );
}
