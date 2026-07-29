import { Button } from '@/components/ui/button';
import { HandNote } from '@/components/ui/hand-note';
import { InkArrow, InkCircle } from '@/components/ui/ink';
import { HeroSkeleton } from '@/components/skeletons/HeroSkeleton';
import { useHeroContent } from '@/hooks/useHeroContent';
import { useResumeDownload } from '@/hooks/useResumeDownload';

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
        stack: [<span className="text-[#8FD98A]">&quot;React 19&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Node.js&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;TypeScript&quot;</span>],
        {'\n'} infra: [
        <span className="text-[#8FD98A]">&quot;Docker&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Coolify&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;APISIX&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;SigNoz&quot;</span>],
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
  const handleDownloadResume = useResumeDownload();

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
              <div className="relative mb-12 flex flex-wrap gap-3.5">
                <Button asChild size="lg" className="rounded-full px-6">
                  <a href="#work">View selected work →</a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-2 border-foreground px-6 text-foreground"
                  onClick={handleDownloadResume}
                >
                  Download résumé
                </Button>

                {/* Handwritten aside pointing at the résumé button. */}
                <div className="pointer-events-none absolute top-full right-0 hidden w-[190px] pt-3 lg:block">
                  <InkArrow
                    direction="up-right"
                    className="top-1 -left-9 h-12 w-12 text-accent-brand/70"
                    length={150}
                  />
                  <HandNote tilt={-4} className="block">
                    generated live from this page — ATS-ready
                  </HandNote>
                </div>
              </div>
              <div className="flex flex-wrap gap-12 border-t pt-8">
                {hero.stats.map((stat, i) => (
                  <div key={stat.id} className="relative">
                    {i === 0 && (
                      <InkCircle className="-top-2.5 -left-4 h-[62px] w-[104px] text-accent-brand/45" />
                    )}
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
