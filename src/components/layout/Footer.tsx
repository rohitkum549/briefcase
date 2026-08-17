import { siteConfig } from '@/config/site';
import { ResumePicker } from '@/components/layout/ResumePicker';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-on-deep/10 bg-deep py-10 text-on-deep">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3.5 px-5 md:flex-row md:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <svg
            width="26"
            height="26"
            viewBox="0 0 30 30"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="1"
              width="28"
              height="28"
              rx="8"
              className="fill-on-deep"
            />
            <path
              d="M12 10l-4 5 4 5M18 10l4 5-4 5"
              className="stroke-accent-brand"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/*
            The wordmark reads "rohit jha" exactly as before — same font, size,
            weight and colour. "jha" is now the trigger for the résumé selector.
            Making the second half of an existing word the control is what keeps
            this an Easter egg: nothing was added to the footer, so there is no
            new affordance to notice until you hover it.
          */}
          <span className="font-heading text-sm font-bold">
            rohit <ResumePicker />
          </span>
        </div>
        <div className="font-mono text-[11px] tracking-wider text-on-deep/60">
          © {year} {siteConfig.name.toUpperCase()} · DESIGNED &amp; BUILT IN
          INDIA
        </div>
      </div>
    </footer>
  );
}
