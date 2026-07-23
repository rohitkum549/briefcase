import { useStackTags } from '@/hooks/useStackTags';

export function TechMarquee() {
  const { data: tags } = useStackTags();
  const items = tags ?? [];

  return (
    <section
      className="overflow-hidden bg-deep py-[22px]"
      aria-label="Technology stack"
    >
      <div className="flex w-max animate-[marquee_30s_linear_infinite]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex gap-14 pr-14 font-mono text-sm tracking-wider whitespace-nowrap text-on-deep/60"
            aria-hidden={copy === 1}
          >
            {items.map((tag, i) => (
              <span key={`${copy}-${i}`}>{tag}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
