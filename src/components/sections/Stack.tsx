import { TechIcon } from '@/components/ui/tech-icon';
import { TiltCard } from '@/components/ui/tilt-card';
import { HandNote } from '@/components/ui/hand-note';
import { InkArrow } from '@/components/ui/ink';
import { useCapabilities } from '@/hooks/useCapabilities';

export function Stack() {
  const capabilities = useCapabilities();

  return (
    <section id="stack" className="bg-muted/40 py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            Capabilities
          </span>
        </div>
        <div className="relative mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
            A full-stack toolkit, from interface to infrastructure.
          </h2>
          {/*
            The note travels; only the arrow is desktop-only.
            This whole block used to be `hidden lg:block`, which meant a phone
            got no handwriting in this section at all — and the handwriting is
            the site's signature. The arrow genuinely needs a gutter to point
            across, so it stays behind lg; the words just move inline.
          */}
          <div className="relative w-full pb-2 lg:w-[195px]">
            <InkArrow
              direction="down-left"
              className="-top-8 left-4 hidden h-10 w-10 text-accent-brand/55 lg:block"
              length={150}
            />
            <HandNote tilt={2.5} className="block">
              not a list of tutorials — all of this is in production
            </HandNote>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((group) => (
            <TiltCard key={group.id} className="rounded-2xl border bg-card p-6">
              <div className="mb-5 border-b pb-3.5 font-mono text-[11px] tracking-[1.5px] text-muted-foreground uppercase">
                {group.group}
              </div>
              <div className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-[15px]"
                  >
                    <TechIcon
                      name={item}
                      className="size-4 flex-none text-accent-brand"
                    />
                    {item}
                  </div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
