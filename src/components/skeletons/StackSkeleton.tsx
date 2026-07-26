import { Skeleton } from '@/components/ui/skeleton';

export function StackSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-card p-6">
          <Skeleton className="mb-5 h-3 w-20" />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-3.5 w-4/5" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
