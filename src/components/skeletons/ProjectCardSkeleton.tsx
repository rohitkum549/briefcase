import { Skeleton } from '@/components/ui/skeleton';

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-card">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-7">
        <div className="mb-3 flex items-center justify-between">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="mb-2.5 h-6 w-3/4" />
        <Skeleton className="mb-1.5 h-3.5 w-full" />
        <Skeleton className="mb-5 h-3.5 w-2/3" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>
    </div>
  );
}
