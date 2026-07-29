import { getTechIcon } from '@/lib/techIcons';
import { cn } from '@/lib/utils';

interface TechIconProps {
  name: string;
  className?: string;
}

/** Brand icon when available; otherwise a monogram badge sized to match. */
export function TechIcon({ name, className }: TechIconProps) {
  const Icon = getTechIcon(name);

  if (Icon) {
    // Icon is a stable reference from a module-level lookup table, not
    // created per render — safe despite the static-components heuristic.
    // eslint-disable-next-line react-hooks/static-components
    return <Icon aria-hidden="true" className={className} />;
  }

  const initials = name
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 2)
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-current/10 font-mono font-bold',
        className,
      )}
      style={{ fontSize: '0.55em' }}
    >
      {initials}
    </span>
  );
}
