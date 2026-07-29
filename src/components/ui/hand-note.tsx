import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface HandNoteProps {
  children: ReactNode;
  className?: string;
  /** Slight rotation so it reads as written, not typeset. */
  tilt?: number;
}

/**
 * Handwritten margin note. Caveat at 17px+ stays legible; below that it turns
 * to mush, so the size floor is baked in rather than left to callers.
 */
export function HandNote({ children, className, tilt = -3 }: HandNoteProps) {
  return (
    <span
      className={cn(
        'font-hand text-[19px] leading-[1.25] text-accent-brand md:text-[21px]',
        className,
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </span>
  );
}
