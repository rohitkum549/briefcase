import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import type { ProjectVisual as Variant } from '@/types/project';

/*
 * Card preview visuals. Every project card used to render the same empty grey
 * box with a generic icon, which made six different platforms look
 * interchangeable.
 *
 * Colour: brand accent + ink tokens only, no new palette. Two of these are real
 * charts (api-surface, perf-delta); the other four are structural diagrams. The
 * charts follow the mark specs — bars capped thin with a 4px rounded data-end
 * square at the baseline, hairline solid baselines, values direct-labelled at
 * the cap, and label text in ink tokens rather than the data colour.
 *
 * The three api-surface bars are deliberately ONE colour, not a light→dark
 * ramp: components / screens / APIs are nominal categories with no natural
 * order, and shading them by size would double-encode bar length as hue.
 *
 * All units are viewBox px at the card's natural render width, so the mark specs
 * (<=24px bars, 2px strokes, r>=4 markers) mean what they say. Every variant is
 * aria-hidden with the numbers repeated as real text in the card body, so
 * nothing here is the only way to read a value.
 */

const VIEWBOX = '0 0 520 292';

interface VisualProps {
  variant: Variant;
}

function Frame({ children }: { children: React.ReactNode }) {
  // Every variant draws itself in when it scrolls into view — see the
  // chart-draw utility in index.css. One wipe here covers all six.
  const { ref, inView } = useInView<SVGSVGElement>();

  return (
    <svg
      ref={ref}
      viewBox={VIEWBOX}
      aria-hidden="true"
      className={cn('h-full w-full chart-draw', inView && 'chart-draw-run')}
      preserveAspectRatio="xMidYMid meet"
    >
      {children}
    </svg>
  );
}

/** Mono uppercase caption, matching the capability-card header treatment. */
function Caption({
  x,
  y,
  children,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  children: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-muted-foreground font-mono text-[11px] tracking-[1.5px] uppercase"
    >
      {children}
    </text>
  );
}

function Value({
  x,
  y,
  children,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  children: string;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      className="fill-foreground font-heading text-[17px] font-bold"
    >
      {children}
    </text>
  );
}

/** Lynqx console — magnitude comparison across three nominal categories. */
function ApiSurface() {
  const bars = [
    { label: 'components', value: 20, display: '20+' },
    { label: 'screens', value: 30, display: '30+' },
    { label: 'apis', value: 10, display: '10+' },
  ];
  const baseline = 232;
  const maxHeight = 150;
  const barWidth = 22;

  return (
    <Frame>
      {bars.map((bar, i) => {
        const height = (bar.value / 30) * maxHeight;
        const cx = 118 + i * 142;
        const y = baseline - height;
        return (
          <g key={bar.label}>
            <Value x={cx} y={y - 14}>
              {bar.display}
            </Value>
            {/* Rounded at the data end, square at the baseline: the shape is a
                rounded rect over-extended past the baseline, then clipped by
                drawing it only down to the axis. */}
            <path
              d={`M${cx - barWidth / 2} ${baseline} L${cx - barWidth / 2} ${y + 4} Q${cx - barWidth / 2} ${y} ${cx - barWidth / 2 + 4} ${y} L${cx + barWidth / 2 - 4} ${y} Q${cx + barWidth / 2} ${y} ${cx + barWidth / 2} ${y + 4} L${cx + barWidth / 2} ${baseline} Z`}
              className="fill-accent-brand"
            />
            <Caption x={cx} y={baseline + 26}>
              {bar.label}
            </Caption>
          </g>
        );
      })}
      <line
        x1={56}
        y1={baseline}
        x2={464}
        y2={baseline}
        className="stroke-border"
        strokeWidth={1}
      />
    </Frame>
  );
}

/** Lynqx — connectivity fan-out. Structural, not measured. */
function IntegrationMesh() {
  const hub = { x: 128, y: 146 };
  const spokes = [
    { y: 74, label: 'banks' },
    { y: 146, label: 'institutions' },
    { y: 218, label: 'third parties' },
  ];
  return (
    <Frame>
      {spokes.map((spoke) => (
        <g key={spoke.label}>
          <path
            d={`M${hub.x + 26} ${hub.y} C 240 ${hub.y}, 250 ${spoke.y}, 322 ${spoke.y}`}
            className="stroke-accent-brand/45"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={332}
            cy={spoke.y}
            r={5}
            className="fill-accent-brand"
            stroke="var(--color-card)"
            strokeWidth={2}
          />
          <Caption x={348} y={spoke.y + 4} anchor="start">
            {spoke.label}
          </Caption>
        </g>
      ))}
      <circle cx={hub.x} cy={hub.y} r={38} className="fill-accent-brand/10" />
      <circle
        cx={hub.x}
        cy={hub.y}
        r={26}
        className="fill-accent-brand"
        stroke="var(--color-card)"
        strokeWidth={2}
      />
      <text
        x={hub.x}
        y={hub.y + 5}
        textAnchor="middle"
        className="fill-background font-mono text-[11px] font-bold tracking-[1px]"
      >
        LX
      </text>
      <Caption x={hub.x} y={62} anchor="middle">
        us · eu · apac
      </Caption>
    </Frame>
  );
}

/** EPS — ONUS/OFFUS routing and the failure paths. Structural. */
function TxnFlow() {
  const inputs = [
    { y: 96, label: 'onus' },
    { y: 196, label: 'offus' },
  ];
  const outputs = [
    { y: 74, label: 'deduct' },
    { y: 146, label: 'reverse' },
    { y: 218, label: 'rollback' },
  ];
  const gate = { x: 254, y: 146 };
  return (
    <Frame>
      {inputs.map((input) => (
        <g key={input.label}>
          <Caption x={56} y={input.y - 14} anchor="start">
            {input.label}
          </Caption>
          <rect
            x={56}
            y={input.y - 4}
            width={104}
            height={8}
            rx={4}
            className="fill-accent-brand"
          />
          <path
            d={`M168 ${input.y} C 210 ${input.y}, 214 ${gate.y}, ${gate.x - 26} ${gate.y}`}
            className="stroke-accent-brand/45"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
        </g>
      ))}
      <rect
        x={gate.x - 24}
        y={gate.y - 24}
        width={48}
        height={48}
        rx={10}
        className="fill-accent-brand/10 stroke-accent-brand"
        strokeWidth={2}
      />
      {outputs.map((output) => (
        <g key={output.label}>
          <path
            d={`M${gate.x + 26} ${gate.y} C 320 ${gate.y}, 324 ${output.y}, 366 ${output.y}`}
            className="stroke-accent-brand/45"
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
          />
          <circle
            cx={374}
            cy={output.y}
            r={4.5}
            className="fill-accent-brand"
          />
          <Caption x={388} y={output.y + 4} anchor="start">
            {output.label}
          </Caption>
        </g>
      ))}
    </Frame>
  );
}

/** Starfish — corporate to bank across a security layer. Structural. */
function SecurityLayers() {
  const rows = [
    { y: 78, label: 'corporates', wash: false },
    { y: 146, label: 'security modules', wash: true },
    { y: 214, label: 'banks', wash: false },
  ];
  return (
    <Frame>
      {rows.map((row) => (
        <g key={row.label}>
          <rect
            x={92}
            y={row.y - 22}
            width={336}
            height={44}
            rx={10}
            className={
              row.wash
                ? 'fill-accent-brand/10 stroke-accent-brand'
                : 'fill-transparent stroke-border'
            }
            strokeWidth={row.wash ? 2 : 1}
          />
          <Caption x={260} y={row.y + 4}>
            {row.label}
          </Caption>
        </g>
      ))}
      {[-1, 1].map((dir) => (
        <path
          key={dir}
          d={`M${260 + dir * 74} ${dir === -1 ? 100 : 192} L${260 + dir * 74} ${dir === -1 ? 120 : 172}`}
          className="stroke-accent-brand"
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </Frame>
  );
}

/** Kottster — schema-as-UI. Structural. */
function SchemaGrid() {
  const cols = [0, 1, 2, 3];
  const rows = [0, 1, 2];
  return (
    <Frame>
      <rect
        x={96}
        y={72}
        width={328}
        height={34}
        rx={8}
        className="fill-accent-brand"
      />
      {cols.map((c) => (
        <rect
          key={`h${c}`}
          x={116 + c * 80}
          y={85}
          width={44}
          height={8}
          rx={4}
          className="fill-background/70"
        />
      ))}
      {rows.map((r) =>
        cols.map((c) => (
          <rect
            key={`${r}-${c}`}
            x={116 + c * 80}
            y={128 + r * 38}
            width={44}
            height={8}
            rx={4}
            className={
              c === 0 ? 'fill-accent-brand/55' : 'fill-muted-foreground/30'
            }
          />
        )),
      )}
      <rect
        x={96}
        y={106}
        width={328}
        height={122}
        rx={8}
        className="fill-transparent stroke-border"
        strokeWidth={1}
      />
      <Caption x={260} y={254}>
        schema · rows · relations
      </Caption>
    </Frame>
  );
}

/** Zeqon — before/after load time. A dumbbell: one hue, two weights. */
function PerfDelta() {
  const y = 150;
  const before = 132;
  const after = 388;
  return (
    <Frame>
      <line
        x1={before}
        y1={y}
        x2={after}
        y2={y}
        className="stroke-accent-brand"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <circle
        cx={before}
        cy={y}
        r={7}
        className="fill-muted-foreground/45"
        stroke="var(--color-card)"
        strokeWidth={2}
      />
      <circle
        cx={after}
        cy={y}
        r={9}
        className="fill-accent-brand"
        stroke="var(--color-card)"
        strokeWidth={2}
      />
      <Caption x={before} y={y - 26}>
        before
      </Caption>
      <Caption x={after} y={y - 32}>
        after
      </Caption>
      <Value x={after} y={y - 52}>
        56% faster
      </Value>
      <Caption x={260} y={y + 44}>
        page load time
      </Caption>
    </Frame>
  );
}

const variants: Record<Variant, () => React.JSX.Element> = {
  'api-surface': ApiSurface,
  'integration-mesh': IntegrationMesh,
  'txn-flow': TxnFlow,
  'security-layers': SecurityLayers,
  'schema-grid': SchemaGrid,
  'perf-delta': PerfDelta,
};

export function ProjectVisual({ variant }: VisualProps) {
  const Render = variants[variant];
  return <Render />;
}
