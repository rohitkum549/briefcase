import { useCallback, useEffect, useState } from 'react';
import { Dialog } from 'radix-ui';
import { ExternalLink, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { TechIcon } from '@/components/ui/tech-icon';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { Certification } from '@/types/certification';
import { cn } from '@/lib/utils';

const STEP_MS = 6000;

interface StoryViewerProps {
  items: Certification[];
  /** Index to open at, or null when closed. */
  openAt: number | null;
  onClose: () => void;
  /** Called as each story is shown, so the rail can mark rings viewed. */
  onSeen: (id: string) => void;
  /** The bubble that opened the viewer, to hand focus back to on close. */
  restoreFocusRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Instagram-style story viewer for the certifications.
 *
 * Built on Radix Dialog (already a dependency — sheet.tsx uses the same import),
 * which brings the focus trap, Esc handling, scroll lock, aria-modal and
 * focus-return-on-close. Hand-rolling an overlay means reimplementing all of
 * that, usually incompletely.
 *
 * Auto-advance is suppressed entirely under prefers-reduced-motion: a timer that
 * moves content out from under the reader is the exact thing that setting asks us
 * not to do, and a CSS media query cannot stop a setTimeout. In that mode the
 * segments still show position, and navigation is manual.
 */
export function StoryViewer({
  items,
  openAt,
  onClose,
  onSeen,
  restoreFocusRef,
}: StoryViewerProps) {
  const isOpen = openAt !== null;
  const [index, setIndex] = useState(openAt ?? 0);
  const [lastOpenAt, setLastOpenAt] = useState(openAt);
  /**
   * Hovering the card holds the current story.
   *
   * Not decoration: each story now carries a Verify link, and a 6s timer that
   * moves the card out from under a cursor already reaching for that link makes
   * the primary action a race. Pointer-only on purpose — the dialog traps focus,
   * so pausing on focus-within would pause permanently and never resume.
   */
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  /*
   * Re-seat the index when a new bubble opens the viewer.
   *
   * Done during render, not in an effect: syncing state from a prop in an effect
   * causes a second render pass and is what the cascading-render lint rule flags.
   * Keying the component on `openAt` would also work, but remounting tears down
   * Radix's Dialog.Content mid-close and takes the focus restoration with it.
   */
  if (openAt !== lastOpenAt) {
    setLastOpenAt(openAt);
    if (openAt !== null) setIndex(openAt);
    // A new bubble always starts running, even if the previous card was closed
    // while the pointer sat on it.
    setPaused(false);
  }

  const current = items[index];

  useEffect(() => {
    if (isOpen && current) onSeen(current.id);
  }, [isOpen, current, onSeen]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1 < items.length ? i + 1 : i));
  }, [items.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i > 0 ? i - 1 : i));
  }, []);

  const isLast = index === items.length - 1;

  // Auto-advance. Skipped under reduced motion, and stops on the last story
  // rather than looping — a viewer that never ends is a trap.
  useEffect(() => {
    if (!isOpen || reducedMotion || isLast || paused) return;
    const timer = setTimeout(next, STEP_MS);
    return () => clearTimeout(timer);
  }, [isOpen, reducedMotion, isLast, paused, index, next]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, next, prev]);

  if (!current) return null;

  const issued = current.month
    ? `${current.month} ${current.year}`
    : `${current.year}`;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          /*
           * Radix restores focus to Dialog.Trigger on close, and there is no
           * trigger here — the story bubbles sit outside the dialog, in the
           * rail. Without this, closing drops focus to <body> and a keyboard
           * user is thrown back to the top of the document, losing their place.
           */
          onCloseAutoFocus={(event) => {
            if (restoreFocusRef?.current) {
              event.preventDefault();
              restoreFocusRef.current.focus();
            }
          }}
          className={cn(
            'fixed top-1/2 left-1/2 z-50 w-[calc(100vw-2rem)] max-w-[440px]',
            '-translate-x-1/2 -translate-y-1/2',
            'rounded-2xl border bg-card p-6 shadow-2xl focus:outline-none',
          )}
        >
          <Dialog.Title className="sr-only">
            {current.title} — certification details
          </Dialog.Title>

          {/* Segmented progress: one per story, like Instagram. */}
          <div className="mb-6 flex gap-1.5">
            {items.map((item, i) => (
              <span
                key={item.id}
                className="h-[3px] flex-1 overflow-hidden rounded-full bg-border"
              >
                <span
                  /*
                   * Remount the active fill whenever pause state flips, so the
                   * bar restarts from zero exactly when the timer does. Resuming
                   * the CSS animation mid-way instead would leave the bar full
                   * and stalled for the remainder of a freshly restarted timer.
                   */
                  key={i === index ? `${index}-${paused}` : undefined}
                  className={cn(
                    'block h-full rounded-full bg-accent-brand transition-[width] duration-300',
                    i < index && 'w-full',
                    i === index && 'w-full',
                    i > index && 'w-0',
                  )}
                  style={
                    i === index && !reducedMotion && !paused
                      ? { animation: `story-fill ${STEP_MS}ms linear forwards` }
                      : undefined
                  }
                />
              </span>
            ))}
          </div>

          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-full border bg-background">
                <TechIcon
                  name={current.issuerId}
                  className="size-4 text-accent-brand"
                />
              </span>
              <span className="flex flex-col">
                <span className="text-[13px] font-medium">
                  {current.issuer}
                </span>
                <span className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
                  {issued}
                </span>
              </span>
            </div>
            <Dialog.Close
              aria-label="Close"
              className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <h3 className="mb-3 font-heading text-[21px] leading-[1.2] font-bold tracking-tight text-pretty">
            {current.title}
          </h3>

          {current.note && (
            <p className="mb-4 text-[13px] leading-relaxed text-muted-foreground text-pretty">
              {current.note}
            </p>
          )}

          {current.skills.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {current.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="h-auto rounded-full bg-accent-brand/10 px-2.5 py-1 text-[10px] tracking-wider text-accent-brand"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          )}

          {(current.credentialId || current.verifyUrl) && (
            <div className="flex items-end justify-between gap-4 border-t pt-3.5">
              {current.credentialId && (
                <div className="min-w-0">
                  <div className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
                    Credential ID
                  </div>
                  <div className="mt-1 font-mono text-[11px] break-all text-foreground">
                    {current.credentialId}
                  </div>
                </div>
              )}
              {/* The icon belongs here — unlike beside the counter below, this
                  one really does open something. */}
              {current.verifyUrl && (
                <a
                  href={current.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-none items-center gap-1.5 rounded-full bg-accent-brand px-3 py-1.5 font-mono text-[11px] tracking-wider text-background uppercase transition-opacity hover:opacity-90"
                >
                  Verify
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t pt-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prev}
                disabled={index === 0}
                className="rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors hover:bg-muted disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={next}
                disabled={isLast}
                className="rounded-full border px-3.5 py-1.5 font-mono text-[11px] tracking-wider uppercase transition-colors hover:bg-muted disabled:opacity-40"
              >
                Next
              </button>
            </div>
            {/* No icon here: an external-link glyph beside a position counter
                reads as "click to open", which this doesn't do. */}
            <span className="font-mono text-[11px] tracking-wider text-muted-foreground tabular-nums">
              {index + 1} / {items.length}
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
