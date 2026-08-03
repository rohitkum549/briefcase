import { Skeleton } from '@/components/ui/skeleton';

/** Matches the story rail's geometry: ringed circle + two label lines. */
export function CertificationsSkeleton() {
  return (
    <div className="flex gap-5 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex w-[92px] flex-none flex-col items-center gap-2.5 md:w-[104px]"
        >
          <Skeleton className="size-[76px] rounded-full md:size-[84px]" />
          <Skeleton className="h-2.5 w-16" />
          <Skeleton className="h-2 w-9" />
        </div>
      ))}
    </div>
  );
}
