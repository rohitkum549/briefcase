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
import { navLinks } from '@/config/site';
import { cn } from '@/lib/utils';

interface MobileDrawerProps {
  activeId: string | null;
}

export function MobileDrawer({ activeId }: MobileDrawerProps) {
  const [open, setOpen] = useState(false);

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
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Navigate</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
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
              className="mt-2 rounded-full bg-primary px-3 py-2.5 text-center text-base font-semibold text-primary-foreground"
            >
              Get in touch →
            </a>
          </SheetClose>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
