import { Award as AwardIcon, ExternalLink } from 'lucide-react';
import { InkCircle } from '@/components/ui/ink';
import { HandNote } from '@/components/ui/hand-note';
import { award } from '@/services/data/portfolioData';

/**
 * The featured award, sitting above the certification rail.
 *
 * It has to out-weigh thirteen story bubbles without introducing a new visual
 * language, so the emphasis comes from three things the theme already provides:
 * an accent-tinted surface instead of `bg-card`, a filled accent seal (the only
 * solid accent shape in the section), and the citation set in heading type at
 * body scale. No gradient, no shadow, no new colour — the rest of the page is
 * built from hairlines and mono labels and this stays inside that.
 *
 * The tint is an alpha of `accent-brand` rather than a hand-picked pair of hex
 * values, so it composites correctly over both themes' backgrounds. That is the
 * specific mistake the Experience section had: a fixed near-black surface that
 * looked identical in light and dark mode.
 */
export function AwardFeature() {
  return (
    <article className="relative rounded-2xl border border-accent-brand/25 bg-accent-brand/[0.06] p-6 md:p-8 dark:bg-accent-brand/[0.10]">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
        {/* The seal. Two concentric rings, same mechanism as the story bubbles,
            but filled — so it reads as the one pinned item, not another story. */}
        {/* `self-start` is load-bearing: in the stacked mobile layout a flex
            child stretches across the cross axis by default, which turned the
            round seal into a full-width pill. `flex-none` does not prevent
            that — it only governs the main axis. */}
        <span className="flex-none self-start rounded-full bg-accent-brand/25 p-[3px]">
          <span className="block rounded-full bg-background p-[3px]">
            <span className="flex size-[72px] items-center justify-center rounded-full bg-accent-brand md:size-[84px]">
              {/* `text-background`, not white: dark mode's accent is a bright
                  teal (#2dd4bf) that white sits on at about 1.6:1. The
                  background token inverts with the theme, so the mark stays
                  legible on both. */}
              <AwardIcon className="size-8 text-background md:size-9" />
            </span>
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-mono text-[10px] font-medium tracking-[2px] text-accent-brand uppercase">
              Award
            </span>
            <span aria-hidden="true" className="h-3 w-px bg-accent-brand/30" />
            <span className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
              {award.shortDate}
            </span>
          </div>

          {/*
            The circled bit. InkCircle was drawn for exactly this gesture — "this
            is the important one" — and had never been used anywhere, so the
            vocabulary carried a mark it never spoke. The award is the single
            thing on this page an employer chose to give rather than a course
            issuing on completion, which makes it the one item worth ringing.

            `inline-block` on the heading so the circle can size to the words
            rather than the column, and the delay lets the title land first.
          */}
          <h3 className="relative inline-block font-heading text-[26px] leading-[1.1] font-bold tracking-tight md:text-[32px]">
            {award.title}
            <InkCircle
              className="-top-2.5 -left-4 h-[calc(100%+22px)] w-[calc(100%+34px)] text-accent-brand/45"
              length={560}
              delayMs={320}
            />
          </h3>
          <p className="mt-1.5 text-[15px] text-muted-foreground">
            {award.org}
          </p>

          {/* Verbatim from the certificate — hence the quotation marks. */}
          <blockquote className="mt-5 border-l-2 border-accent-brand/40 pl-4 font-heading text-[17px] leading-snug font-semibold tracking-tight text-pretty md:text-[19px]">
            &ldquo;{award.citation}&rdquo;
          </blockquote>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-accent-brand/20 pt-4">
            <span className="font-mono text-[10px] leading-relaxed tracking-[1.5px] text-muted-foreground uppercase">
              Signed {award.signedBy} · {award.signedByRole}
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              Issued {award.issuedOn}
            </span>
            <a
              href={award.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-brand px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-background uppercase transition-opacity hover:opacity-90"
            >
              The announcement
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        {/* Hidden below md: at narrow widths it lands under the citation and
            reads as part of it rather than as a note in the margin. */}
        <HandNote tilt={-4} className="mt-1 max-w-[136px] flex-none md:mt-1">
          the one nobody handed out for finishing a course
        </HandNote>
      </div>
    </article>
  );
}
