import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navLinks, socialLinks } from '@/config/site';
import { getSocialIcon, platformColors } from '@/lib/socialIcons';
import { cn } from '@/lib/utils';

interface MobileDrawerProps {
  activeId: string | null;
}

export function MobileDrawer({ activeId }: MobileDrawerProps) {
  const [open, setOpen] = useState(false);
  const profileLinks = socialLinks.filter((l) => l.id !== 'phone');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle>Navigate</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col gap-1 px-2">
            {navLinks.map((link) => (
              <SheetClose asChild key={link.id}>
                <a
                  href={link.href}
                  className={cn(
                    'rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                    activeId === link.id && 'bg-muted text-foreground',
                  )}
                >
                  {link.label}
                </a>
              </SheetClose>
            ))}
            <SheetClose asChild>
              <a
                href="#contact"
                className="mt-3 rounded-full bg-primary px-3 py-2.5 text-center text-base font-semibold text-primary-foreground"
              >
                Get in touch →
              </a>
            </SheetClose>
          </nav>
        </div>

        <div className="border-t border-border px-2 pt-4">
          <p className="mb-3 font-mono text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Coding Profiles &amp; Socials
          </p>
          <div className="grid grid-cols-2 gap-2">
            {profileLinks.slice(0, 6).map((link) => {
              const Icon = getSocialIcon(link.icon);
              const style = platformColors[link.icon];
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'flex items-center gap-2 rounded-lg border border-border p-2 text-xs font-medium transition-colors hover:border-foreground',
                    style?.bg,
                    style?.text,
                  )}
                >
                  <Icon className="size-3.5 flex-none" />
                  <span className="truncate">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
