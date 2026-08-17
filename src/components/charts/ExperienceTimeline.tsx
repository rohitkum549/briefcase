import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import type { ExperienceEntry } from '@/types/experience';

/*
 * Role timeline. The point it makes: three platforms inside one role, which a
 * plain reverse-chronological list can't show.
 *
 * Form is emphasis, not categorical — the current role carries the accent, the
 * earlier one recedes to grey. Both bars are labelled with their company name
 * directly, so identity never depends on colour alone and no legend box is
 * needed.
 *
 * The platform names sit as a text line under the Cateina bar rather than as
 * positioned sub-bars. That is deliberate: LinkedIn gives no per-project start
 * or end dates, and drawing segments would invent them.
 *
 * Hidden below md. A ~3.5-year axis with readable labels needs horizontal room;
 * scaled into a 350px phone viewport the tick text drops to about 4px. The list
 * underneath already carries every fact, so there is nothing to recover.
 */

const DOMAIN = { from: 2023, to: 2026.75 };
const YEARS = [2023, 2024, 2025, 2026];

const WIDTH = 1000;
// Inset so the first and last year ticks aren't clipped: they are centred on
// their gridline, so a tick at x=0 loses its left half outside the viewBox —
// "2023" rendered as "023".
const PLOT_LEFT = 34;
const PLOT_RIGHT = 966;
const BAR_HEIGHT = 22;
const ROW_HEIGHT = 78;
const TOP = 34;

function xFor(year: number): number {
  const t = (year - DOMAIN.from) / (DOMAIN.to - DOMAIN.from);
  return PLOT_LEFT + t * (PLOT_RIGHT - PLOT_LEFT);
}

interface Props {
  entries: ExperienceEntry[];
}

export function ExperienceTimeline({ entries }: Props) {
  // Draws itself across the axis when reached, like the project visuals.
  // Above the early return: hooks have to run in the same order every render.
  const { ref, inView } = useInView<SVGSVGElement>();

  const rows = entries.filter((entry) => entry.span);
  if (rows.length === 0) return null;

  const height = TOP + rows.length * ROW_HEIGHT + 30;

  return (
    <div className="mb-14 hidden md:block">
      <svg
        ref={ref}
        viewBox={`0 0 ${WIDTH} ${height}`}
        className={cn('h-auto w-full chart-draw', inView && 'chart-draw-run')}
        role="img"
        aria-label={rows
          .map(
            (entry) =>
              `${entry.role} at ${entry.company}, ${entry.period}${
                entry.projects
                  ? `, covering ${entry.projects.map((p) => p.name).join(', ')}`
                  : ''
              }`,
          )
          .join('. ')}
      >
        {/* Year gridlines — solid hairlines, one step off the surface. */}
        {YEARS.map((year) => (
          <g key={year}>
            <line
              x1={xFor(year)}
              y1={TOP - 12}
              x2={xFor(year)}
              y2={height - 26}
              className="stroke-border"
              strokeWidth={1}
            />
            <text
              x={xFor(year)}
              y={height - 8}
              textAnchor="middle"
              className="fill-muted-foreground font-mono text-[12px] tracking-[1.5px] tabular-nums"
            >
              {year}
            </text>
          </g>
        ))}

        {rows.map((entry, i) => {
          const span = entry.span!;
          const x = xFor(span.from);
          const w = Math.max(xFor(span.to) - x, 6);
          const y = TOP + i * ROW_HEIGHT;
          const isCurrent = i === 0;
          return (
            <g key={entry.id}>
              <text
                x={x}
                y={y - 8}
                className="fill-foreground font-heading text-[16px] font-bold"
              >
                {entry.company}
              </text>
              <rect
                x={x}
                y={y}
                width={w}
                height={BAR_HEIGHT}
                rx={4}
                className={
                  isCurrent ? 'fill-accent-brand' : 'fill-muted-foreground/35'
                }
              />
              {/*
                Label ink is picked per bar, not shared. `fill-background`
                reads as white-on-teal on the accent bar, but the recessive bar
                is a pale grey in light mode — the same white on it was very
                nearly invisible.
              */}
              <text
                x={x + 12}
                y={y + 15}
                className={`font-mono text-[11px] tracking-[1px] ${
                  isCurrent ? 'fill-background' : 'fill-foreground'
                }`}
              >
                {entry.period}
              </text>
              <text
                x={x}
                y={y + BAR_HEIGHT + 20}
                className="fill-muted-foreground font-mono text-[11px] tracking-[1.5px] uppercase"
              >
                {entry.projects
                  ? entry.projects.map((p) => p.name).join('  ·  ')
                  : entry.role}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
