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
import type { ResumeFormat, ResumeRoleGroup } from '@/types/resume';
import { cn } from '@/lib/utils';

const GROUPS: ResumeRoleGroup[] = ['General', 'Specialized Full Stack'];

/**
 * Two builds of the same document, because applications ask for it two ways.
 *
 * The PDF is what you attach. The plain-text build is for the forms that give
 * you a textarea instead and expect the résumé pasted into it — pasting out of
 * a PDF there arrives shredded, so this is the same content re-rendered as
 * 7-bit ASCII with nothing in it a form can fail to encode.
 */
const FORMATS: { id: ResumeFormat; label: string; hint: string }[] = [
  { id: 'pdf', label: 'PDF', hint: 'The file to attach or upload.' },
  {
    id: 'txt',
    label: 'Plain text',
    hint: 'Plain ASCII, for forms that ask you to paste it in.',
  },
];

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
  const [format, setFormat] = useState<ResumeFormat>('pdf');
  const { download, pending } = useResumeDownload();

  const handleSelect = async (roleId: (typeof resumeRoles)[number]['id']) => {
    await download(roleId, format);
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

          {/*
            Two <button aria-pressed> toggles rather than a radiogroup. A real
            radiogroup owes the keyboard arrow-key navigation and a roving
            tabindex; pressed buttons owe nothing beyond Tab and Enter, which
            is what a two-option control in a dialog actually needs.
          */}
          <div className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span
              id="resume-format-label"
              className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase"
            >
              Format
            </span>
            <div
              role="group"
              aria-labelledby="resume-format-label"
              className="inline-flex rounded-lg border bg-muted/60 p-0.5"
            >
              {FORMATS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={format === option.id}
                  onClick={() => setFormat(option.id)}
                  className={cn(
                    'cursor-pointer rounded-[7px] px-2.5 py-1 text-[12px] font-medium',
                    'transition-colors duration-(--duration-instant)',
                    'focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:outline-none',
                    format === option.id
                      ? 'bg-background text-foreground ring-1 ring-accent-brand/45'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <span className="text-[12px] leading-snug text-muted-foreground">
              {FORMATS.find((option) => option.id === format)?.hint}
            </span>
          </div>
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
