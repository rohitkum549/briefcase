import { UserRound } from 'lucide-react';
import { AboutSkeleton } from '@/components/skeletons/AboutSkeleton';
import { useAbout } from '@/hooks/useAbout';

export function About() {
  const { data: about, isLoading } = useAbout();

  return (
    <section id="about" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        {isLoading || !about ? (
          <AboutSkeleton />
        ) : (
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="flex aspect-4/5 flex-col items-center justify-center gap-3 rounded-2xl border bg-card">
              <span className="flex size-14 items-center justify-center rounded-full border border-dashed text-muted-foreground">
                <UserRound className="size-6" strokeWidth={1.5} />
              </span>
              <span className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
                Portrait
              </span>
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
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {about.facts.map((fact) => (
                  <div key={fact.id} className="border-t pt-3.5">
                    <div className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
                      {fact.label}
                    </div>
                    <div className="mt-1.5 text-[15px]">{fact.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
