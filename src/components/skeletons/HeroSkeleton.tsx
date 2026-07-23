import { Skeleton } from '@/components/ui/skeleton';

export function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <Skeleton className="mb-6 h-4 w-64" />
        <Skeleton className="mb-3 h-12 w-full max-w-lg" />
        <Skeleton className="mb-8 h-12 w-4/5 max-w-md" />
        <Skeleton className="mb-2 h-4 w-full max-w-md" />
        <Skeleton className="mb-2 h-4 w-full max-w-md" />
        <Skeleton className="mb-9 h-4 w-2/3 max-w-md" />
        <div className="mb-12 flex gap-3.5">
          <Skeleton className="h-12 w-40 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
        <div className="flex gap-12 border-t pt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="mb-2 h-8 w-16" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className="aspect-[5/4] w-full rounded-2xl" />
    </div>
  );
}
