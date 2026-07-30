import { Skeleton } from '@/components/ui/skeleton';

/*
 * These used to be hardcoded `bg-white/10` / `border-white/10`, which only
 * worked because the Experience section was permanently dark. Now that the
 * section follows the theme, they use the default Skeleton surface — white/10 on
 * a light background is invisible.
 */
export function ExperienceSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 gap-6 border-t py-8 md:grid-cols-[220px_1fr] md:gap-10"
        >
          <div>
            <Skeleton className="h-3 w-28" />
            <Skeleton className="mt-3 h-3 w-20" />
          </div>
          <div>
            <Skeleton className="mb-2 h-6 w-56" />
            <Skeleton className="mb-5 h-3.5 w-40" />
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-3.5 w-full" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
