import { Skeleton } from '@/components/ui/skeleton';

export function ServicesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-0 md:grid-cols-2 md:gap-x-14">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-5 border-t py-7">
          <Skeleton className="h-6 w-8 flex-none" />
          <div className="w-full">
            <Skeleton className="mb-3 h-5 w-2/3" />
            <Skeleton className="mb-1.5 h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
