import { AboutSkeleton } from '@/components/skeletons/AboutSkeleton';
import { StickyNote } from '@/components/ui/sticky-note';
import { HandNote } from '@/components/ui/hand-note';
import { InkArrow } from '@/components/ui/ink';
import { useAbout } from '@/hooks/useAbout';
import { stickyNotes } from '@/services/data/portfolioData';

export function About() {
  const { data: about, isLoading } = useAbout();

  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        {isLoading || !about ? (
          <AboutSkeleton />
        ) : (
          <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Sticky-note cluster — the human layer, pinned like a real desk. */}
            <div className="relative flex flex-col items-center gap-6 pt-4 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-col lg:items-start lg:pl-6">
              {stickyNotes.map((note, i) => (
                <StickyNote
                  key={note.id}
                  tone={note.tone}
                  tilt={[-2.5, 1.8, -1.2][i] ?? -2}
                  className={['lg:ml-0', 'lg:ml-14', 'lg:ml-4'][i] ?? undefined}
                >
                  {note.text}
                </StickyNote>
              ))}
            </div>

            <div>
              <div className="mb-5 flex items-center gap-2.5">
                <span className="size-2 rounded-sm bg-accent-brand" />
                <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
                  About
                </span>
              </div>
              <h2 className="mb-5 font-heading text-[26px] leading-[1.15] font-bold tracking-tight md:text-[34px]">
                Three years of shipping — and the judgment that comes with it.
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground text-pretty">
                {about.text}
              </p>
              <div className="relative mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {about.facts.map((fact) => (
                  <div key={fact.id} className="border-t pt-3.5">
                    <div className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
                      {fact.label}
                    </div>
                    <div className="mt-1.5 text-[15px]">{fact.value}</div>
                  </div>
                ))}

                {/* Aside anchored to the facts grid, desktop only. */}
                <div className="pointer-events-none absolute -right-4 top-full hidden w-[150px] pt-6 xl:block">
                  <InkArrow
                    direction="down-left"
                    className="-top-1 -left-8 h-11 w-11 text-accent-brand/60"
                    length={150}
                  />
                  <HandNote tilt={3}>
                    always up for a good systems chat
                  </HandNote>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
