import { siteConfig } from '@/config/site';

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
          <span className="font-heading text-sm font-bold">rohit jha</span>
        </div>
        <div className="font-mono text-[11px] tracking-wider text-on-deep/60">
          © {year} {siteConfig.name.toUpperCase()} · DESIGNED &amp; BUILT IN
          INDIA
        </div>
      </div>
    </footer>
  );
}
