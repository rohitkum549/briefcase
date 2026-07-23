import { ProjectCardSkeleton } from '@/components/skeletons/ProjectCardSkeleton';

export function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}
