import { Boxes } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/types/project';
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

interface ProjectCardProps extends ComponentPropsWithoutRef<'article'> {
  project: Project;
}

export function ProjectCard({
  project,
  className,
  ...props
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        'overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg',
        className,
      )}
      {...props}
    >
      <div className="flex aspect-video flex-col items-center justify-center gap-2.5 border-b bg-muted/60">
        <Boxes className="size-6 text-accent-brand/60" strokeWidth={1.4} />
        <span className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
          Project preview
        </span>
      </div>
      <div className="p-7">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
            {project.index}
          </span>
          <Badge
            variant="secondary"
            className="h-auto rounded-full bg-accent-brand/10 px-2.5 py-1 text-[10px] tracking-wider text-accent-brand uppercase"
          >
            {project.kind}
          </Badge>
        </div>
        <h3 className="mb-2.5 font-heading text-[22px] font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground text-pretty">
          {project.desc}
        </p>
        {project.impact && (
          <p className="mb-5">
            {/* Marker highlight: a skewed, soft-edged band behind the text
                rather than a rectangle, so it reads as a pen stroke. */}
            <span className="relative inline-block font-medium">
              <span
                aria-hidden="true"
                className="absolute -inset-x-1 bottom-0 -z-10 h-[62%] -skew-x-6 rounded-[2px] bg-accent-brand/22"
              />
              <span className="relative text-[14.5px] text-foreground">
                {project.impact}
              </span>
            </span>
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-2.5 py-1 font-mono text-[11px] text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
