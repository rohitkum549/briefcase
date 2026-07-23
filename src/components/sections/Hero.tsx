import { Button } from '@/components/ui/button';
import { HeroSkeleton } from '@/components/skeletons/HeroSkeleton';
import { useHeroContent } from '@/hooks/useHeroContent';

function DeveloperCodeCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#12131F] shadow-2xl">
      <div className="flex items-center gap-2 border-b border-white/10 bg-[#1B1D2C] px-[18px] py-3.5">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[11px] tracking-wider text-white/35">
          developer.ts
        </span>
      </div>
      <pre className="overflow-x-auto p-6 font-mono text-[13px] leading-[1.9] whitespace-pre text-white/85">
        <span className="text-[#FF8A6B]">const</span> engineer = {'{'}
        {'\n'} name:{' '}
        <span className="text-[#8FD98A]">&quot;Rohit Kumar Jha&quot;</span>,
        {'\n'} role:{' '}
        <span className="text-[#8FD98A]">&quot;Senior Full-Stack&quot;</span>,
        {'\n'} based:{' '}
        <span className="text-[#8FD98A]">&quot;Mumbai, India&quot;</span>,{'\n'}{' '}
        stack: [<span className="text-[#8FD98A]">&quot;Angular&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Node.js&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Spring&quot;</span>],
        {'\n'} cloud: [
        <span className="text-[#8FD98A]">&quot;Docker&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;AWS&quot;</span>],
        {'\n'} leads:{' '}
        <span className="text-[#8FD98A]">&quot;architecture & AI&quot;</span>,
        {'\n'} years: <span className="text-[#C9A2FF]">3</span>,{'\n'} status:{' '}
        <span className="text-[#8FD98A]">&quot;shipping&quot;</span>{' '}
        <span className="text-[#4ADE80]">●</span>
        {'\n'}
        {'}'};
      </pre>
    </div>
  );
}

export function Hero() {
  const { data: hero, isLoading } = useHeroContent();

  return (
    <section id="top" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        {isLoading || !hero ? (
          <HeroSkeleton />
        ) : (
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="mb-6 flex items-center gap-2.5">
                <span className="size-2 rounded-sm bg-accent-brand" />
                <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
                  {hero.eyebrow}
                </span>
              </div>
              <h1 className="mb-6 font-heading text-[42px] leading-[1.03] font-bold tracking-tight text-balance md:text-[54px] lg:text-[62px]">
                {hero.heading}
              </h1>
              <p className="mb-9 max-w-lg text-lg leading-relaxed text-muted-foreground text-pretty">
                {hero.description}
              </p>
              <div className="mb-12 flex flex-wrap gap-3.5">
                <Button asChild size="lg" className="rounded-full px-6">
                  <a href="#work">View selected work →</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-foreground px-6 text-foreground"
                >
                  <a href="#contact">Download résumé</a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-12 border-t pt-8">
                {hero.stats.map((stat) => (
                  <div key={stat.id}>
                    <div className="font-heading text-[32px] font-bold tracking-tight">
                      {stat.value}
                    </div>
                    <div className="mt-1 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <DeveloperCodeCard />
          </div>
        )}
      </div>
    </section>
  );
}
