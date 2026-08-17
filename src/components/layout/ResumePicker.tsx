import { useState } from 'react';
import { DownloadIcon, LoaderIcon } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HandNote } from '@/components/ui/hand-note';
import { useResumeDownload } from '@/hooks/useResumeDownload';
import { resumeRoles } from '@/services/data/resumeRoles';
import type { ResumeRoleGroup } from '@/types/resume';
import { cn } from '@/lib/utils';

const GROUPS: ResumeRoleGroup[] = ['General', 'Specialized Full Stack'];

/**
 * The hidden résumé selector, opened from the word "jha" in the footer.
 *
 * The trigger is the second half of the footer wordmark and is styled to be
 * indistinguishable from it at rest — that is the point, it is meant to be
 * found rather than advertised. "Subtle" stops at the visuals though: it is a
 * real <button> with an accessible name, it takes keyboard focus, and it shows
 * a full-strength focus ring when focused by keyboard. A discreet control that
 * a screen-reader user cannot reach is not discreet, it is broken.
 */
export function ResumePicker() {
  const [open, setOpen] = useState(false);
  const { download, pending } = useResumeDownload();

  const handleSelect = async (roleId: (typeof resumeRoles)[number]['id']) => {
    await download(roleId);
    /*
     * Close after the file is handed off, not on click. Closing immediately
     * would unmount the pending state that is the only signal anything is
     * happening during the dynamic import of jspdf, and on a slow connection
     * that reads as a dead button on a dialog that just vanished.
     */
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Choose a résumé to download"
          className="cursor-pointer rounded-sm underline-offset-4 transition-colors duration-(--duration-instant) hover:text-accent-brand hover:underline hover:decoration-dotted focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-deep focus-visible:outline-none"
        >
          jha
        </button>
      </DialogTrigger>

      <DialogContent aria-describedby="resume-picker-description">
        <DialogHeader>
          <DialogTitle>Choose your résumé</DialogTitle>
          <DialogDescription id="resume-picker-description">
            Select the version that best matches the role you&rsquo;re applying
            for. Each one is generated from the same record, reordered and
            reweighted for that role.
          </DialogDescription>
          <HandNote tilt={-2} className="mt-1 hidden sm:inline-block">
            same three years, told seven ways
          </HandNote>
        </DialogHeader>

        {/*
          The scroll container, not the panel. Seven cards plus a header do not
          fit a 667pt phone in landscape, and the heading and close button are
          the two things that must never be the part that scrolls away.
        */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-1 pb-6">
          {GROUPS.map((group) => (
            <section key={group} className="mb-6 last:mb-0">
              <h3 className="mb-3 font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
                {group}
              </h3>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {resumeRoles
                  .filter((role) => role.group === group)
                  .map((role) => {
                    const busy = pending === role.id;
                    return (
                      <button
                        key={role.id}
                        type="button"
                        // Disabled only while THIS card is generating. Greying
                        // out all seven on any click makes a fast download look
                        // like a page-wide stall.
                        disabled={busy}
                        onClick={() => void handleSelect(role.id)}
                        className={cn(
                          'group/resume relative flex flex-col gap-1.5 rounded-xl border bg-background p-4 text-left',
                          'transition-colors duration-(--duration-instant)',
                          'hover:border-accent-brand/45 hover:bg-muted/50',
                          'focus-visible:border-accent-brand focus-visible:ring-3 focus-visible:ring-accent-brand/30 focus-visible:outline-none',
                          'disabled:cursor-wait',
                        )}
                      >
                        <span className="flex items-center gap-2 font-heading text-[15px] font-bold tracking-tight text-foreground">
                          {role.label}
                          {busy ? (
                            <LoaderIcon className="size-3.5 animate-spin text-accent-brand" />
                          ) : (
                            <DownloadIcon
                              aria-hidden="true"
                              className="size-3.5 text-muted-foreground opacity-0 transition-opacity duration-(--duration-instant) group-hover/resume:opacity-100 group-focus-visible/resume:opacity-100"
                            />
                          )}
                        </span>
                        <span className="text-[13px] leading-relaxed text-muted-foreground">
                          {busy ? 'Preparing your résumé…' : role.blurb}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
