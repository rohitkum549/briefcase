import { Skeleton } from '@/components/ui/skeleton';

export function CurrentlyShippingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-card p-6">
          <Skeleton className="mb-4 h-3 w-24" />
          <Skeleton className="mb-3 h-5 w-3/4" />
          <Skeleton className="mb-2 h-3.5 w-full" />
          <Skeleton className="h-3.5 w-2/3" />
        </div>
      ))}
    </div>
  );
}
