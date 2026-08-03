import { useMemo, useState, useCallback, useRef } from 'react';
import { CertificationsSkeleton } from '@/components/skeletons/CertificationsSkeleton';
import { AwardFeature } from '@/components/ui/award-feature';
import { StoryRing } from '@/components/ui/story-ring';
import { StoryViewer } from '@/components/ui/story-viewer';
import { StickyNote } from '@/components/ui/sticky-note';
import { useCertifications } from '@/hooks/useCertifications';
import { certShortTitles } from '@/services/data/certificationsData';
import type { Certification } from '@/types/certification';

/**
 * Recognition: the Tech Ninja Pro award as a featured block, then the thirteen
 * certifications as a story rail — circular ringed bubbles, oldest to newest,
 * with a hairline year tick between groups. The rail is the timeline.
 *
 * The award leads because it is categorically different: an employer chose to
 * give it, where a course certificate issues on completion. Putting the two in
 * one section makes that distinction the point rather than hiding it — and the
 * certificates are honestly framed as foundations, since all 13 predate the
 * Cateina fintech work and are Java-oriented learning-path credentials.
 * Presented as a trajectory they read as momentum; presented as current
 * qualifications they'd invite the wrong question.
 */
function groupByYear(items: Certification[]) {
  const groups = new Map<number, Certification[]>();
  for (const item of items) {
    const bucket = groups.get(item.year);
    if (bucket) bucket.push(item);
    else groups.set(item.year, [item]);
  }
  return [...groups.entries()].sort((a, b) => a[0] - b[0]);
}

export function Certifications() {
  const { data: certifications, isLoading } = useCertifications();
  const [openAt, setOpenAt] = useState<number | null>(null);
  const [seen, setSeen] = useState<Set<string>>(new Set());
  /** Which bubble opened the viewer, so focus can go back to it on close. */
  const openerRef = useRef<HTMLButtonElement | null>(null);

  const markSeen = useCallback((id: string) => {
    setSeen((current) => {
      if (current.has(id)) return current; // avoid a pointless re-render
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const grouped = useMemo(
    () => groupByYear(certifications ?? []),
    [certifications],
  );

  return (
    <section id="recognition" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            Recognition
          </span>
        </div>
        <div className="mb-10 flex flex-wrap items-start justify-between gap-8">
          <div>
            <h2 className="mb-4 max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
              One award from the work. Thirteen certificates before it.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Cateina gave me Tech Ninja Pro for taking AI workflows and
              automation into how we ship. Everything under it is the Java and
              full-stack foundation I built first.
            </p>
          </div>
          <StickyNote tone="teal" tilt={2.5} className="max-w-[204px]">
            Paper doesn&apos;t ship software. It did teach me where to start.
          </StickyNote>
        </div>

        <AwardFeature />

        {/* Rail label. A hairline plus a mono tick demotes the certificates
            below the award without hiding them — same device the experience
            timeline uses to separate the current role from earlier ones. */}
        <div className="mt-14 mb-8 flex items-center gap-4">
          <h3 className="font-mono text-[11px] font-medium tracking-[2px] whitespace-nowrap text-muted-foreground uppercase">
            Foundations · 2021—2023
          </h3>
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
          {/* Dropped on the smallest screens: with the label kept on one line
              there isn't room for both, and the count is the lesser of the two
              (the rail is right underneath, and it says 13 by being 13). */}
          {certifications && (
            <span className="hidden font-mono text-[11px] tracking-[1.5px] whitespace-nowrap text-muted-foreground tabular-nums sm:inline">
              {certifications.length} certificates
            </span>
          )}
        </div>

        {isLoading || !certifications ? (
          <CertificationsSkeleton />
        ) : (
          <>
            {/*
              Horizontal scroll with snap: 13 bubbles fit no viewport, and a
              swipeable rail is the native behaviour this borrows from. The
              scrollbar is hidden but the region stays keyboard-scrollable.

              The negative margin plus matching padding lets the rail bleed to
              the viewport edge while its first bubble still lines up with the
              heading above it. `scroll-pl-*` is required for that to hold:
              mandatory snapping otherwise performs an initial snap that pulls
              the first item flush to the container's border edge, eating the
              padding and leaving the rail visibly misaligned with the text.
            */}
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-pl-5 gap-5 overflow-x-auto px-5 pb-2 md:-mx-10 md:scroll-pl-10 md:px-10">
              {grouped.map(([year, items], groupIndex) => (
                <div key={year} className="flex flex-none items-start gap-5">
                  {/* Year tick — the timeline marker between groups. Reuses the
                      hairline + mono-tick language of the experience timeline. */}
                  {groupIndex > 0 && (
                    <div
                      aria-hidden="true"
                      className="mt-2 flex h-[100px] flex-none items-center"
                    >
                      <span className="h-full w-px bg-border" />
                    </div>
                  )}
                  <div className="flex flex-col gap-4">
                    <span className="font-mono text-[11px] tracking-[2px] text-muted-foreground tabular-nums">
                      {year}
                    </span>
                    <div className="flex gap-4">
                      {items.map((item) => {
                        const index = certifications.indexOf(item);
                        return (
                          <StoryRing
                            key={item.id}
                            issuerId={item.issuerId}
                            label={certShortTitles[item.id] ?? item.title}
                            meta={item.month ?? String(item.year)}
                            viewed={seen.has(item.id)}
                            onClick={(element) => {
                              openerRef.current = element;
                              setOpenAt(index);
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[13px] text-muted-foreground">
              Tap any one for its credential ID and a link that verifies it.
            </p>

            <StoryViewer
              items={certifications}
              openAt={openAt}
              onClose={() => setOpenAt(null)}
              onSeen={markSeen}
              restoreFocusRef={openerRef}
            />
          </>
        )}
      </div>
    </section>
  );
}
