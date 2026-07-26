import { Skeleton } from '@/components/ui/skeleton';

export function AiSystemsSkeleton() {
  return (
    <div>
      <div className="mb-6 rounded-2xl bg-foreground/95 p-8">
        <Skeleton className="mb-5 h-3 w-40 bg-background/20" />
        <div className="flex flex-col gap-3 md:flex-row">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-28 flex-1 rounded-xl bg-background/10"
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-5">
            <Skeleton className="mb-2 h-4 w-20" />
            <Skeleton className="h-3 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
