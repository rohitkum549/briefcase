import { TechIcon } from '@/components/ui/tech-icon';
import { cn } from '@/lib/utils';

interface StoryRingProps {
  /** Issuer key for the brand-icon lookup. */
  issuerId: string;
  /** Short label under the bubble. */
  label: string;
  meta: string;
  viewed?: boolean;
  /**
   * Receives the button element so the caller can restore focus to it when the
   * story viewer closes — the viewer has no Dialog.Trigger to fall back to.
   */
  onClick: (element: HTMLButtonElement) => void;
}

/**
 * A story bubble: ringed circular avatar, Instagram-style.
 *
 * The ring is TWO concentric rings, not one thick border — a coloured outer ring
 * with a gap in the surface colour inside it. That gap is what makes the ring
 * read as separate from the avatar rather than as a chunky outline, and it's the
 * same surface-ring mechanism the chart markers use.
 *
 * Unviewed carries the brand accent; viewed drops to the ordinary border weight,
 * so "what have I already opened" is visible at a glance. That state lives in
 * React only — which certificates a visitor has clicked is not worth persisting
 * to their device.
 */
export function StoryRing({
  issuerId,
  label,
  meta,
  viewed = false,
  onClick,
}: StoryRingProps) {
  return (
    <button
      type="button"
      onClick={(event) => onClick(event.currentTarget)}
      /*
       * The ring is the focus target, not the button box: a rectangular outline
       * around a circular bubble plus its two-line label reads as a stray box.
       * `outline-none` here, ring drawn on the child below, and the hover lift
       * is matched on focus so keyboard and pointer get the same feedback.
       */
      className="group flex w-[92px] flex-none snap-start flex-col items-center gap-2.5 outline-none md:w-[104px]"
    >
      <span
        className={cn(
          'rounded-full p-[2px] transition-colors',
          'group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-2 group-focus-visible:outline-accent-brand',
          viewed ? 'bg-border' : 'bg-accent-brand',
        )}
      >
        {/* The surface gap. */}
        <span className="block rounded-full bg-background p-[2px]">
          <span
            className={cn(
              'flex size-[68px] items-center justify-center rounded-full border bg-card transition-transform md:size-[76px]',
              'group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5',
            )}
          >
            <TechIcon
              name={issuerId}
              className={cn(
                'size-7 md:size-8',
                viewed ? 'text-muted-foreground' : 'text-accent-brand',
              )}
            />
          </span>
        </span>
      </span>
      <span className="flex flex-col items-center gap-0.5">
        {/* Two lines' worth of height whether or not the label needs it, so the
            date under every bubble sits on one baseline across the rail. */}
        <span className="line-clamp-2 min-h-[27px] text-center font-mono text-[10px] leading-[1.35] tracking-[0.5px] text-foreground">
          {label}
        </span>
        <span className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
          {meta}
        </span>
      </span>
    </button>
  );
}
