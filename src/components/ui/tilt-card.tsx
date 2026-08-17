import type { ReactNode } from 'react';
import { usePointerTilt } from '@/hooks/usePointerTilt';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  /**
   * Rotation at the card's edge. Kept below the project cards' 9°: these appear
   * three and four to a row, and a tilt that reads as poise on one large card
   * reads as a nervous tic when the grid is dense.
   */
  max?: number;
  className?: string;
}

/**
 * The plain version of the project card's motion — tilt, lift and a travelling
 * highlight, with no parallax layer.
 *
 * Three sections render a grid of otherwise identical bordered cards, and the
 * only thing they need from `usePointerTilt` is a ref plus the sheen element in
 * the right place. Wrapping that here keeps the hook call and the overlay
 * markup from being copied into each of them, where they would drift.
 */
export function TiltCard({ children, max = 7, className }: TiltCardProps) {
  const tiltRef = usePointerTilt<HTMLDivElement>({ max });

  return (
    <div ref={tiltRef} className={cn('card-3d relative', className)}>
      {children}
      <span aria-hidden="true" className="card-sheen rounded-[inherit]" />
    </div>
  );
}
