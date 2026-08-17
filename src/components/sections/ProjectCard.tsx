import { Boxes } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ProjectVisual } from '@/components/charts/ProjectVisual';
import type { Project } from '@/types/project';
import type { ComponentPropsWithoutRef } from 'react';
import { usePointerTilt } from '@/hooks/usePointerTilt';
import { cn } from '@/lib/utils';

interface ProjectCardProps extends ComponentPropsWithoutRef<'article'> {
  project: Project;
}

export function ProjectCard({
  project,
  className,
  ...props
}: ProjectCardProps) {
  const tiltRef = usePointerTilt<HTMLElement>({ max: 9 });

  return (
    <article
      ref={tiltRef}
      className={cn(
        // `overflow-hidden` used to live here and had to go: the spec resets
        // `transform-style` to flat on any element that clips, which silently
        // kills the parallax below. The visual slot rounds its own top corners
        // instead, which is all the clipping this card ever needed.
        'card-3d relative rounded-2xl border bg-card',
        className,
      )}
      {...props}
    >
      {/* Same slot geometry as before — aspect-video, border-b, muted wash.
          Only the contents changed: a visual specific to this project instead of
          the identical placeholder every card used to show.

          `transform-3d` so the diagram inside can hold real distance from the
          card face; without it the slot flattens its children into its own
          plane and `card-pop` becomes a no-op. */}
      <div className="flex aspect-video transform-3d flex-col items-center justify-center gap-2.5 rounded-t-2xl border-b bg-muted/60 p-4">
        <div className="card-pop flex flex-col items-center gap-2.5">
          {project.visual ? (
            <ProjectVisual variant={project.visual} />
          ) : (
            <>
              <Boxes
                className="size-6 text-accent-brand/60"
                strokeWidth={1.4}
              />
              <span className="font-mono text-[10px] tracking-[1.5px] text-muted-foreground uppercase">
                Project preview
              </span>
            </>
          )}
        </div>
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

      {/* The travelling highlight. Last in the DOM and pointer-events-none, so
          it lights the card without intercepting the pointer that drives it. */}
      <span aria-hidden="true" className="card-sheen rounded-2xl" />
    </article>
  );
}
