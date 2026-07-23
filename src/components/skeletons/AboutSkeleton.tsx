import { Skeleton } from '@/components/ui/skeleton';

export function AboutSkeleton() {
  return (
    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.8fr_1.2fr]">
      <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
      <div>
        <Skeleton className="mb-5 h-4 w-24" />
        <Skeleton className="mb-2 h-8 w-full" />
        <Skeleton className="mb-6 h-8 w-3/4" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-8 h-4 w-2/3" />
        <div className="grid grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-t pt-3.5">
              <Skeleton className="mb-2 h-3 w-16" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
