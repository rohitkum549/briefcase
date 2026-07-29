import { ExperienceSkeleton } from '@/components/skeletons/ExperienceSkeleton';
import { HandNote } from '@/components/ui/hand-note';
import { InkArrow } from '@/components/ui/ink';
import { useExperience } from '@/hooks/useExperience';

export function Experience() {
  const { data: experience, isLoading } = useExperience();

  return (
    <section id="experience" className="bg-deep py-20 text-on-deep md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-on-deep/60 uppercase">
            Experience
          </span>
        </div>
        <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight text-on-deep md:text-[40px]">
            Building in production, day to day.
          </h2>
          <div className="relative hidden w-[210px] pb-2 lg:block">
            <InkArrow
              direction="down-left"
              className="-top-9 left-6 h-11 w-11 text-accent-brand/60"
              length={150}
            />
            <HandNote tilt={-2.5} className="block text-accent-brand/90">
              every number here is one I can walk you through
            </HandNote>
          </div>
        </div>

        {isLoading || !experience ? (
          <ExperienceSkeleton />
        ) : (
          <div className="flex flex-col">
            {experience.map((entry) => (
              <div
                key={entry.id}
                className="grid grid-cols-1 gap-6 border-t border-on-deep/10 py-8 md:grid-cols-[220px_1fr] md:gap-10"
              >
                <div>
                  <div className="font-mono text-xs tracking-wider text-accent-brand">
                    {entry.period}
                  </div>
                  <div className="mt-2 text-sm text-on-deep/60">
                    {entry.location}
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 font-heading text-[22px] font-bold tracking-tight text-on-deep">
                    {entry.role}
                  </h3>
                  <div className="mb-3 text-[15px] text-on-deep/60">
                    {entry.company}
                  </div>
                  {entry.stack && (
                    <div className="mb-4 flex flex-wrap gap-x-2.5 gap-y-1.5 font-mono text-[11px] tracking-wider text-accent-brand/85">
                      {entry.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  )}
                  <div className="flex flex-col gap-2.5">
                    {entry.points.map((point, i) => (
                      <div
                        key={i}
                        className="flex gap-3 text-[15px] leading-relaxed text-on-deep/82"
                      >
                        <span className="flex-none text-accent-brand">→</span>
                        {point}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
