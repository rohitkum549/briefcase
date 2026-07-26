import { StackSkeleton } from '@/components/skeletons/StackSkeleton';
import { useCapabilities } from '@/hooks/useCapabilities';

export function Stack() {
  const { data: capabilities, isLoading } = useCapabilities();

  return (
    <section id="stack" className="bg-muted/40 py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            Capabilities
          </span>
        </div>
        <h2 className="mb-14 max-w-xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
          A full-stack toolkit, from interface to infrastructure.
        </h2>

        {isLoading || !capabilities ? (
          <StackSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {capabilities.map((group) => (
              <div key={group.id} className="rounded-2xl border bg-card p-6">
                <div className="mb-5 border-b pb-3.5 font-mono text-[11px] tracking-[1.5px] text-muted-foreground uppercase">
                  {group.group}
                </div>
                <div className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 text-[15px]"
                    >
                      <span className="size-1.5 flex-none rounded-full bg-accent-brand" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
