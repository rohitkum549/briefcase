import { useState } from 'react';
import { ExternalLink, Code2, Trophy, Network } from 'lucide-react';
import { socialLinks } from '@/config/site';
import { getSocialIcon, platformColors } from '@/lib/socialIcons';
import { StickyNote } from '@/components/ui/sticky-note';
import { cn } from '@/lib/utils';
import type { PlatformCategory } from '@/types/site';

const categories: {
  id: 'all' | PlatformCategory;
  label: string;
  icon: typeof Code2;
}[] = [
  { id: 'all', label: 'All Profiles', icon: Code2 },
  { id: 'coding', label: 'DSA & Practice', icon: Code2 },
  { id: 'competitive', label: 'Competitive', icon: Trophy },
  { id: 'social', label: 'Social & Network', icon: Network },
];

export function CodingProfilesSection() {
  const [activeCategory, setActiveCategory] = useState<
    'all' | PlatformCategory
  >('all');

  const filteredLinks = socialLinks.filter((link) => {
    if (link.id === 'phone') return false;
    if (activeCategory === 'all') return true;
    return link.category === activeCategory;
  });

  return (
    <section
      id="profiles"
      className="py-20 md:py-24 bg-muted/30 border-y border-border/50"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            Coding Profiles &amp; Socials
          </span>
        </div>

        <div className="mb-10 flex flex-wrap items-start justify-between gap-8">
          <div>
            <h2 className="mb-4 max-w-2xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
              Where I write code, solve algorithms, and compete.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Explore my public repositories, competitive programming handles,
              algorithm problem-solving stats, and professional profiles.
            </p>
          </div>
          <StickyNote tone="amber" tilt={-2} className="max-w-[210px]">
            Consistent practice across LeetCode, HackerEarth &amp; GitHub keeps
            problem-solving sharp.
          </StickyNote>
        </div>

        {/* Filter Category Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  'flex items-center gap-2 rounded-full px-4 py-2 text-xs font-mono tracking-wider transition-all duration-200',
                  isActive
                    ? 'bg-foreground text-background font-semibold shadow-md'
                    : 'bg-background border border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground',
                )}
              >
                <Icon className="size-3.5" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLinks.map((link) => {
            const Icon = getSocialIcon(link.icon);
            const style = platformColors[link.icon];

            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/30 hover:shadow-lg',
                  style?.glow ? `hover:${style.glow}` : '',
                )}
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div
                      className={cn(
                        'flex size-11 items-center justify-center rounded-xl border p-2.5 transition-transform duration-300 group-hover:scale-110',
                        style?.bg,
                        style?.text,
                        style?.border,
                      )}
                    >
                      <Icon className="size-full" />
                    </div>
                    {link.badge && (
                      <span className="rounded-full bg-muted px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                        {link.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-accent-brand transition-colors">
                    {link.label}
                  </h3>
                  {link.handle && (
                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                      {link.handle}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-3 text-xs font-mono text-muted-foreground group-hover:text-foreground">
                  <span>Visit Profile</span>
                  <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
