import { TechIcon } from '@/components/ui/tech-icon';
import { useStackTags } from '@/hooks/useStackTags';

export function TechMarquee() {
  const items = useStackTags();

  return (
    /*
     * The mask fades both ends into the band instead of letting tags collide
     * with a hard edge — the difference between a strip that scrolls and one
     * that reads as continuous.
     */
    <section
      className="overflow-hidden bg-deep py-[22px] [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label="Technology stack"
    >
      {/*
        Pauses on hover, and stops entirely under reduced motion.
        WCAG 2.2.2 requires a way to stop any motion that runs longer than five
        seconds; this ran forever with neither. `motion-reduce:animate-none`
        rather than a zeroed duration on purpose — an infinite loop with a ~0
        duration burns frames re-running instead of stopping.
      */}
      <div className="flex w-max animate-[marquee_30s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-14 pr-14 font-mono text-sm tracking-wider whitespace-nowrap text-on-deep/60"
            aria-hidden={copy === 1}
          >
            {items.map((tag, i) => (
              <span
                key={`${copy}-${i}`}
                className="inline-flex items-center gap-2"
              >
                <TechIcon name={tag} className="size-4 flex-none" />
                {tag}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
