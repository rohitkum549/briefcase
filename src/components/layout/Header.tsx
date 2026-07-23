import { useLayoutEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import { useTheme } from '@/hooks/useTheme';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useDOMMeasure } from '@/hooks/useDOMMeasure';
import { navLinks } from '@/config/site';
import { cn } from '@/lib/utils';

const sectionIds = navLinks.map((link) => link.id);

export function Header() {
  const { isDark, toggleTheme } = useTheme();
  const activeId = useScrollSpy(sectionIds);
  const { ref: headerRef, size } = useDOMMeasure<HTMLElement>();

  const linkRefs = useRef(new Map<string, HTMLAnchorElement>());
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (
      document.documentElement.style.getPropertyValue('--header-h') !==
      `${size.height}px`
    ) {
      document.documentElement.style.setProperty(
        '--header-h',
        `${size.height}px`,
      );
    }
  }, [size.height]);

  useLayoutEffect(() => {
    const activeLink = activeId ? linkRefs.current.get(activeId) : null;
    if (!activeLink) {
      setIndicator(null);
      return;
    }
    setIndicator({
      left: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
    });
  }, [activeId]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 flex h-[74px] items-center border-b bg-background/90 backdrop-blur"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 md:px-10">
        <a href="#top" className="flex items-center gap-3 text-foreground">
          <svg
            width="30"
            height="30"
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
              className="fill-foreground"
            />
            <path
              d="M12 10l-4 5 4 5M18 10l4 5-4 5"
              className="stroke-accent-brand"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-heading text-lg font-bold tracking-tight">
            rohit jha
          </span>
        </a>

        <nav className="relative hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              ref={(el) => {
                if (el) linkRefs.current.set(link.id, el);
                else linkRefs.current.delete(link.id);
              }}
              href={link.href}
              className={cn(
                'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground',
                activeId === link.id && 'text-foreground',
              )}
            >
              {link.label}
            </a>
          ))}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[27px] h-[2px] bg-accent-brand transition-all duration-300 ease-out"
            style={{
              left: indicator?.left ?? 0,
              width: indicator?.width ?? 0,
              opacity: indicator ? 1 : 0,
            }}
          />
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Toggle light and dark theme"
            onClick={toggleTheme}
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button asChild className="hidden rounded-full sm:inline-flex">
            <a href="#contact">Get in touch →</a>
          </Button>
          <MobileDrawer activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
