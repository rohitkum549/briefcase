import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import { AiSystemsSkeleton } from '@/components/skeletons/AiSystemsSkeleton';
import { StickyNote } from '@/components/ui/sticky-note';
import { useAiSystemContent } from '@/hooks/useAiSystemContent';

export function AiSystems() {
  const { data: content, isLoading } = useAiSystemContent();

  return (
    <section
      id="ai"
      className="bg-emerald-50/40 py-20 md:py-24 dark:bg-emerald-950/10"
    >
      <div className="mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="mb-2.5 flex items-center gap-2.5">
          <span className="size-2 rounded-sm bg-accent-brand" />
          <span className="font-mono text-[11px] font-medium tracking-[2px] text-muted-foreground uppercase">
            AI-assisted engineering
          </span>
        </div>
        <h2 className="mb-5 max-w-3xl font-heading text-[28px] leading-[1.1] font-bold tracking-tight md:text-[40px]">
          AI as engineering leverage — spec-driven, tool-grounded, durable.
        </h2>
        <div className="flex flex-wrap items-start justify-between gap-8">
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Anyone can prompt a model — the engineering is in what it&apos;s
            allowed to touch. Every change starts as a written spec, the agent
            acts through typed MCP servers wired to real systems rather than
            guessing, and anything with more than a few steps runs as a durable
            Temporal or Zigflow workflow that can resume instead of restart. The
            work that recurs becomes a reusable skill. That&apos;s the
            difference between a workflow and a party trick.
          </p>
          <StickyNote tone="pink" tilt={2.5} className="max-w-[200px]">
            This is how this very portfolio got built, start to finish.
          </StickyNote>
        </div>

        {isLoading || !content ? (
          <div className="mt-12">
            <AiSystemsSkeleton />
          </div>
        ) : (
          <>
            <div className="mt-12 rounded-2xl bg-deep p-7 shadow-xl md:p-8">
              <div className="mb-5 flex items-center gap-2">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="font-mono text-[11px] tracking-[1.5px] text-on-deep/60 uppercase">
                  How a change ships
                </span>
              </div>
              <div className="flex flex-col items-stretch gap-2 md:flex-row md:gap-0">
                {content.stages.map((stage, i) => (
                  <Fragment key={stage.id}>
                    <div className="flex flex-1 flex-col gap-1.5 rounded-xl border border-on-deep/10 bg-on-deep/5 p-4">
                      <span className="font-mono text-[11px] tracking-wider text-emerald-400">
                        {stage.step}
                      </span>
                      <span className="font-mono text-[9px] tracking-[1.5px] text-on-deep/60 uppercase">
                        {stage.label}
                      </span>
                      <span className="mt-0.5 font-heading text-[15px] font-bold tracking-tight text-on-deep">
                        {stage.title}
                      </span>
                      <span className="font-mono text-[10px] tracking-wide text-on-deep/60">
                        {stage.sub}
                      </span>
                    </div>
                    {i < content.stages.length - 1 && (
                      <div className="flex items-center justify-center px-2.5 text-emerald-400 md:rotate-0">
                        <ArrowRight className="size-4 rotate-90 md:rotate-0" />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {content.principles.map((principle) => (
                <div
                  key={principle.id}
                  className="rounded-xl border bg-card p-6"
                >
                  <div className="mb-1.5 font-heading text-base font-bold">
                    {principle.title}
                  </div>
                  <div className="text-[13px] leading-relaxed text-muted-foreground">
                    {principle.body}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
