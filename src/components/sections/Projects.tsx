import { ProjectsSkeleton } from '@/components/skeletons/ProjectsSkeleton';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { useProjects } from '@/hooks/useProjects';

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <section id="work" className="py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-2.5 flex items-center gap-2.5">
              <span className="size-2 rounded-sm bg-accent-brand" />
              <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
                Selected work
              </span>
            </div>
            <h2 className="max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
              Things I&apos;ve designed, built and shipped.
            </h2>
          </div>
          <a
            href="#contact"
            className="font-mono text-xs tracking-wider text-muted-foreground uppercase"
          >
            All projects →
          </a>
        </div>

        {isLoading || !projects ? (
          <ProjectsSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
