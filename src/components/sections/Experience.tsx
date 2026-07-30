import { ExperienceSkeleton } from '@/components/skeletons/ExperienceSkeleton';
import { ExperienceTimeline } from '@/components/charts/ExperienceTimeline';
import { HandNote } from '@/components/ui/hand-note';
import { InkArrow } from '@/components/ui/ink';
import { useExperience } from '@/hooks/useExperience';

/*
 * This section used to be `bg-deep` / `text-on-deep`, which looked identical in
 * light and dark mode — `--deep` is a near-black in both themes (#15171c and
 * #050609), so it never followed the toggle. It now sits on the ordinary theme
 * surfaces and flips properly.
 *
 * `bg-deep` is still right for the marquee, the AI diagram card, Contact and the
 * footer, so the token itself is untouched: the page keeps a dark beat between
 * light sections instead of turning into one long pale run.
 *
 * That fix also removes the reason the handwritten note here was forced to
 * emerald — brand teal was unreadable on a permanently-dark ground. On a
 * theme-aware surface `accent-brand` is already correct in both modes (#0f766e
 * light, #2dd4bf dark), so the override is gone.
 */
export function Experience() {
  const { data: experience, isLoading } = useExperience();

  return (
    <section id="experience" className="bg-muted/40 py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            Experience
          </span>
        </div>
        <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
            Three platforms, one role, three years.
          </h2>
          <div className="relative hidden w-[210px] pb-2 lg:block">
            <InkArrow
              direction="down-left"
              className="-top-9 left-6 h-11 w-11 text-accent-brand/60"
              length={150}
            />
            <HandNote tilt={-2.5} className="block">
              every number here is one I can walk you through
            </HandNote>
          </div>
        </div>

        {isLoading || !experience ? (
          <ExperienceSkeleton />
        ) : (
          <>
            <ExperienceTimeline entries={experience} />

            <div className="flex flex-col">
              {experience.map((entry) => (
                <div
                  key={entry.id}
                  className="grid grid-cols-1 gap-6 border-t py-8 md:grid-cols-[220px_1fr] md:gap-10"
                >
                  <div>
                    <div className="font-mono text-xs tracking-wider text-accent-brand">
                      {entry.period}
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      {entry.location}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-[22px] font-bold tracking-tight">
                      {entry.role}
                    </h3>
                    <div className="mb-3 text-[15px] text-muted-foreground">
                      {entry.company}
                    </div>
                    {entry.stack && (
                      <div className="mb-4 flex flex-wrap gap-x-2.5 gap-y-1.5 font-mono text-[11px] tracking-wider text-accent-brand">
                        {entry.stack.map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex flex-col gap-2.5">
                      {entry.points.map((point, i) => (
                        <div
                          key={i}
                          className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                        >
                          <span className="flex-none text-accent-brand">→</span>
                          {point}
                        </div>
                      ))}
                    </div>

                    {/* Platforms delivered inside this role. Nested rather than
                        promoted to their own entries, so the company, dates and
                        location aren't repeated three times. */}
                    {entry.projects && (
                      <div className="mt-7 flex flex-col gap-6 border-l-2 border-accent-brand/25 pl-5">
                        {entry.projects.map((project) => (
                          <div key={project.id}>
                            <div className="font-heading text-[17px] font-bold tracking-tight">
                              {project.name}
                            </div>
                            <div className="mt-0.5 mb-2.5 font-mono text-[11px] tracking-[1.5px] text-muted-foreground uppercase">
                              {project.kind}
                            </div>
                            <div className="flex flex-col gap-2">
                              {project.points.map((point, i) => (
                                <div
                                  key={i}
                                  className="flex gap-3 text-[14.5px] leading-relaxed text-muted-foreground"
                                >
                                  <span className="flex-none text-accent-brand/70">
                                    ·
                                  </span>
                                  {point}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
