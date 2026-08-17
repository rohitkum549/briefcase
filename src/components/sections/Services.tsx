import { StickyNote } from '@/components/ui/sticky-note';
import { useServices } from '@/hooks/useServices';

export function Services() {
  const services = useServices();

  return (
    <section id="services" className="bg-card py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            What I do
          </span>
        </div>
        <h2 className="mb-5 max-w-2xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
          From the first commit to production — with an AI layer on top.
        </h2>
        <div className="flex flex-wrap items-start justify-between gap-8">
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Frontend is where I&apos;m strongest, but fintech doesn&apos;t let
            you stop at the API boundary — so I own the feature end to end. Four
            things I&apos;m hired to do well.
          </p>
          <StickyNote tone="amber" tilt={-2.5} className="max-w-[210px]">
            Ask me about the third retry. That&apos;s where the real design
            lives.
          </StickyNote>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-14">
            {services.map((service) => (
              /*
                These are rows on a rule, not cards, so they get no tilt — a
                tipping rectangle needs edges to tip, and these have one line.
                What they get instead is the rule taking the accent under the
                pointer: the gesture of running a pen along the line you are
                reading, which is the same idea the rest of the page is built on.
              */
              <div
                key={service.id}
                className="group flex gap-5 border-t py-7 transition-colors duration-(--duration-instant) hover:border-accent-brand/45"
              >
                <span className="flex-none font-heading text-xl font-bold tracking-tight text-accent-brand transition-transform duration-(--duration-quick) ease-(--ease-settle) group-hover:-translate-y-0.5">
                  {service.no}
                </span>
                <div>
                  <h3 className="mb-2 font-heading text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground text-pretty">
                    {service.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
