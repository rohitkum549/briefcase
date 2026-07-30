import { Button } from '@/components/ui/button';
import { HandNote } from '@/components/ui/hand-note';
import { InkArrow, InkCheck, InkUnderline } from '@/components/ui/ink';
import { StickyNote } from '@/components/ui/sticky-note';
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
        <span className="text-[#8FD98A]">&quot;Full-Stack Engineer&quot;</span>,
        {'\n'} domain:{' '}
        <span className="text-[#8FD98A]">
          &quot;Fintech · Open Banking&quot;
        </span>
        ,{'\n'} based:{' '}
        <span className="text-[#8FD98A]">&quot;Mumbai, India&quot;</span>,{'\n'}{' '}
        frontend: [<span className="text-[#8FD98A]">&quot;React 19&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Next.js&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Angular 19&quot;</span>],
        {'\n'} backend: [
        <span className="text-[#8FD98A]">&quot;Node.js&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Postgres&quot;</span>,{' '}
        <span className="text-[#8FD98A]">&quot;Temporal&quot;</span>],
        {'\n'} built:{' '}
        <span className="text-[#8FD98A]">&quot;Lynqx, from scratch&quot;</span>,
        {'\n'} years: <span className="text-[#C9A2FF]">3</span>,{'\n'} status:{' '}
        <span className="text-[#8FD98A]">&quot;shipping&quot;</span>{' '}
        <span className="text-[#4ADE80]">●</span>
        {'\n'}
        {'}'};
      </pre>
    </div>
  );
}

/** Same tone order as the About cluster, so the two read as one visual system. */
const statTones = ['amber', 'teal', 'pink'] as const;
const statTilts = [-2.5, 1.8, -1.4];

/**
 * The eyebrow is a "role · specialism · specialism" string, and only the role
 * gets underlined. Underlining the whole thing looked like a stray horizontal
 * rule: at this column width the string wraps to two lines, so a full-width
 * underline sat beneath the short second line and ran well past its last word.
 */
function splitEyebrow(eyebrow: string): { role: string; rest: string } {
  const [role, ...rest] = eyebrow.split(' · ');
  return { role: role ?? eyebrow, rest: rest.join(' · ') };
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
              {/*
                The underline is the pointing gesture, so this aside needs no
                arrow — one mark instead of two is what keeps it from competing
                with the headline directly beneath it.
              */}
              <div className="mb-7">
                <div className="flex items-center gap-2.5">
                  <span className="size-2 flex-none rounded-sm bg-accent-brand" />
                  {/*
                    Relaxed leading on the wrapper plus leading-none on the
                    underlined run: this string wraps to two lines at every
                    desktop width, and an inline-block's box is a full
                    line-height tall, so an underline hung off its bottom edge
                    landed on top of the second line. leading-none shrinks the
                    box to hug the glyphs; the wrapper's leading buys the
                    clearance below.
                  */}
                  <span className="font-mono text-[11px] leading-[2.1] font-medium tracking-[2px] text-muted-foreground uppercase">
                    <span className="relative inline-block leading-none">
                      {splitEyebrow(hero.eyebrow).role}
                      <InkUnderline className="-bottom-1.5 left-0 h-2 w-full text-accent-brand/50" />
                    </span>
                    {splitEyebrow(hero.eyebrow).rest &&
                      ` · ${splitEyebrow(hero.eyebrow).rest}`}
                  </span>
                </div>
                <HandNote tilt={-2.5} className="mt-3 hidden lg:inline-block">
                  this is the actual job, not the title
                </HandNote>
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
              {/*
                The stats used to be three plain type stacks, which made the
                headline number — years shipping — the least designed thing in
                the hero. On paper they read as something pinned up on purpose.

                Alternating tilt directions rather than a uniform lean: notes
                stuck on a wall by hand don't all list the same way, and a
                repeated angle is the tell that gives away a template.

                No ink circle here any more. The paper is the emphasis now, and
                circling a number that already sits on a highlighted note is two
                gestures doing one job.
              */}
              <div className="flex flex-wrap gap-x-3.5 gap-y-5 border-t pt-9">
                {hero.stats.map((stat, i) => (
                  <div key={stat.id} className="relative">
                    <StickyNote
                      asBlock
                      tone={statTones[i % statTones.length] ?? 'amber'}
                      tilt={statTilts[i] ?? -2}
                      className="max-w-[162px] px-4 pt-6 pb-4"
                    >
                      <div className="font-heading text-[30px] leading-none font-bold tracking-tight">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-[17px] leading-[1.2] md:text-[18px]">
                        {stat.label.toLowerCase()}
                      </div>
                    </StickyNote>
                    {/*
                      Grader's tick on the lead metric only. Sits above the
                      paper rather than across its corner: over the note the
                      teal lost contrast against gold in dark mode, and the
                      short flick of the tick disappeared into the tape. Kept
                      right of centre so it clears the tape either way.
                    */}
                    {i === 0 && (
                      <InkCheck className="-top-7 right-0 size-8 text-accent-brand dark:text-emerald-300" />
                    )}
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
