import { HandNote } from '@/components/ui/hand-note';
import { TechIcon } from '@/components/ui/tech-icon';
import { useCurrentlyShipping } from '@/hooks/useCurrentlyShipping';

/*
 * Reserved section for in-flight work — not yet mounted in App.tsx. See the
 * `currentlyShipping` array in services/data/portfolioData.ts for how to go live.
 *
 * Named "Currently shipping" rather than "Building in production" on purpose:
 * the Experience section already carries the headline "Building in production,
 * day to day", and two near-identical titles one scroll apart read as an
 * editing mistake.
 *
 * Renders nothing while the data array is empty, so an accidental early mount
 * can't leave a bare heading over blank space on the live site.
 */
export function CurrentlyShipping() {
  const items = useCurrentlyShipping();

  if (items.length === 0) return null;

  return (
    <section id="now" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 animate-pulse rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            Currently shipping
          </span>
        </div>
        <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
            What&apos;s on the bench right now.
          </h2>
          <div className="hidden w-[190px] pb-2 lg:block">
            <HandNote tilt={2} className="block">
              updated as things land, not once a year
            </HandNote>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl border bg-card p-6">
              <div className="mb-4 font-mono text-[10px] tracking-[1.5px] text-accent-brand uppercase">
                {item.status}
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold tracking-tight">
                {item.title}
              </h3>
              <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                {item.desc}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-muted-foreground"
                  >
                    <TechIcon
                      name={tag}
                      className="size-3.5 flex-none text-accent-brand"
                    />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
