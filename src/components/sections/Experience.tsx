import { ExperienceSkeleton } from '@/components/skeletons/ExperienceSkeleton';
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
        <h2 className="mb-14 max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight text-on-deep md:text-[40px]">
          Building in production, day to day.
        </h2>

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
                  <div className="mb-4 text-[15px] text-on-deep/60">
                    {entry.company}
                  </div>
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
