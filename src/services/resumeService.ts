import { jsPDF } from 'jspdf';
import { siteConfig } from '@/config/site';
import {
  resumeSummary,
  experience,
  capabilities,
  award,
} from '@/services/data/portfolioData';

const MARGIN = 46;
const FONT_BODY = 9.6;
const BULLET_INDENT = 10;
const SUB_INDENT = 12;

type Rgb = readonly [number, number, number];
const INK: Rgb = [26, 26, 26];
const MUTED: Rgb = [110, 110, 110];
const ACCENT: Rgb = [15, 118, 110]; // matches --accent-brand on the site
const RULE: Rgb = [205, 205, 205];
const BAND: Rgb = [238, 246, 245]; // accent at ~8% over white

function stripUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * jsPDF's built-in Helvetica is WinAnsi-encoded, so glyphs outside that set
 * (arrows, bullets, ellipsis) render as mojibake rather than failing loudly.
 * Everything that reaches the page goes through here first.
 */
function sanitize(value: string): string {
  return value
    .replace(/[→⇒➡]/g, '->')
    .replace(/[←⇐]/g, '<-')
    .replace(/[↑↓]/g, '|')
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...');
}

function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0] ?? '';
  const last = words[words.length - 1] ?? '';
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

/**
 * Dated filename so the newest download is obvious in a folder of them.
 *
 * Built from LOCAL date parts on purpose. `toISOString()` converts to UTC, which
 * for an evening download in IST (UTC+5:30) reports yesterday — the one thing a
 * "this is the latest one" filename must never do.
 */
export function resumeFileName(now: Date = new Date()): string {
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const yyyy = now.getFullYear();
  const name = siteConfig.name.trim().replace(/\s+/g, '_');
  // No parentheses: some ATS upload forms reject or mangle them.
  return `${name}_Resume_${dd}-${mm}-${yyyy}.pdf`;
}

interface TextOptions {
  size?: number;
  bold?: boolean;
  gap?: number;
  color?: Rgb;
  indent?: number;
}

/**
 * Single-column, text-only PDF builder. No tables, no text boxes, no images,
 * no multi-column flow — an ATS parser walks it top to bottom and recovers
 * every line in reading order. Colour and weight carry the design.
 */
class ResumeWriter {
  readonly doc: jsPDF;
  private y: number;
  private readonly pageWidth: number;
  private readonly pageHeight: number;
  private readonly contentWidth: number;

  constructor() {
    this.doc = new jsPDF({ unit: 'pt', format: 'a4' });
    this.pageWidth = this.doc.internal.pageSize.getWidth();
    this.pageHeight = this.doc.internal.pageSize.getHeight();
    this.contentWidth = this.pageWidth - MARGIN * 2;
    this.y = MARGIN;
  }

  private ensureSpace(height: number) {
    if (this.y + height > this.pageHeight - MARGIN) {
      this.doc.addPage();
      this.y = MARGIN;
    }
  }

  private get rightEdge(): number {
    return this.pageWidth - MARGIN;
  }

  text(
    value: string,
    {
      size = FONT_BODY,
      bold = false,
      gap,
      color = INK,
      indent = 0,
    }: TextOptions = {},
  ) {
    const lineGap = gap ?? size + 3.2;
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setFontSize(size);
    this.doc.setTextColor(...color);
    const wrapped = this.doc.splitTextToSize(
      sanitize(value),
      this.contentWidth - indent,
    ) as string[];
    for (const row of wrapped) {
      this.ensureSpace(lineGap);
      this.doc.text(row, MARGIN + indent, this.y);
      this.y += lineGap;
    }
  }

  /**
   * The one piece of decoration in the document: a tinted band holding the three
   * facts worth reading first.
   *
   * ATS-safe by construction. The rect is drawn first and the text after it, at
   * the normal left margin and full content width — so extraction, which orders
   * text geometrically rather than by draw order, still reads these lines in
   * place. Nothing is inside a table cell, a text box, or a second column.
   */
  highlightsBand(lines: string[]) {
    const lineGap = 12.4;
    const padX = 10;
    const padY = 9;
    const size = 9.4;

    // Wrap BEFORE drawing the rect: the band's height depends on the wrapped
    // line count, and text drawn with a bare doc.text() call does not wrap at
    // all — a long line would run straight out past the right margin.
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(size);
    const rows = lines.flatMap(
      (line) =>
        this.doc.splitTextToSize(
          sanitize(line),
          this.contentWidth - padX * 2,
        ) as string[],
    );

    const height = rows.length * lineGap + padY * 2 - 3;
    this.ensureSpace(height + 8);

    this.doc.setFillColor(...BAND);
    this.doc.roundedRect(MARGIN, this.y, this.contentWidth, height, 3, 3, 'F');

    this.y += padY + 8;
    for (const row of rows) {
      this.doc.setFont('helvetica', 'normal');
      this.doc.setFontSize(size);
      this.doc.setTextColor(...INK);
      this.doc.text(row, MARGIN + padX, this.y);
      this.y += lineGap;
    }
    this.y += padY - 6;
  }

  /** Role on the left, dates flush right — the classic senior-résumé line. */
  roleLine(left: string, right: string) {
    this.ensureSpace(15);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10.6);
    this.doc.setTextColor(...INK);
    this.doc.text(sanitize(left), MARGIN, this.y);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.2);
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(right), this.rightEdge, this.y, { align: 'right' });
    this.y += 12.5;
  }

  companyLine(left: string, right: string) {
    this.ensureSpace(13);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.6);
    this.doc.setTextColor(...ACCENT);
    this.doc.text(sanitize(left), MARGIN, this.y);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.2);
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(right), this.rightEdge, this.y, { align: 'right' });
    this.y += 13;
  }

  /** Named platform inside a role — "Lynqx — Open Banking platform · FinTech". */
  projectLine(name: string, kind: string) {
    this.ensureSpace(13);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.6);
    this.doc.setTextColor(...INK);
    const label = `${sanitize(name)}  `;
    this.doc.text(label, MARGIN + SUB_INDENT, this.y);
    const width = this.doc.getTextWidth(label);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(8.6);
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(kind), MARGIN + SUB_INDENT + width, this.y);
    this.y += 12;
  }

  /**
   * Bullet with a hanging indent.
   *
   * Deliberately single-weight. Bolding metrics mid-sentence would mean drawing
   * each run at a hand-computed x, and with jsPDF's base-14 Helvetica the
   * measured width doesn't match what a viewer renders — the substituted font
   * runs ~1.7% wider here, enough for a long run to overlap the next word. The
   * drift depends on the reader's font substitution, so no correction factor is
   * portable. Fixing it properly means embedding a TTF (~800KB base64 for two
   * weights, un-subsettable without fontTools), which isn't worth it: one text()
   * call per line is measurement-free and correct in every viewer.
   */
  bullet(value: string, indent = 0) {
    const lineGap = 12.2;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(FONT_BODY);
    const left = MARGIN + indent;
    const wrapped = this.doc.splitTextToSize(
      sanitize(value),
      this.contentWidth - indent - BULLET_INDENT,
    ) as string[];

    wrapped.forEach((row, i) => {
      this.ensureSpace(lineGap);
      if (i === 0) {
        this.doc.setTextColor(...ACCENT);
        this.doc.text('•', left + 1, this.y);
      }
      this.doc.setTextColor(...INK);
      this.doc.text(row, left + BULLET_INDENT, this.y);
      this.y += lineGap;
    });
  }

  sectionHeading(title: string) {
    this.gap(8);
    this.ensureSpace(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.4);
    this.doc.setTextColor(...ACCENT);
    this.doc.text(title.toUpperCase(), MARGIN, this.y, { charSpace: 1.1 });
    this.y += 5;
    this.doc.setDrawColor(...ACCENT);
    this.doc.setLineWidth(1.1);
    this.doc.line(MARGIN, this.y, MARGIN + 24, this.y);
    this.doc.setDrawColor(...RULE);
    this.doc.setLineWidth(0.6);
    this.doc.line(MARGIN + 24, this.y, this.rightEdge, this.y);
    this.y += 11;
  }

  header(): void {
    const mark = 30;
    const initials = initialsOf(siteConfig.name);
    const top = this.y;

    // The monogram sits top-right, not top-left. Text extraction is geometric,
    // so a mark to the left of the name would make "RJ" the first token an ATS
    // reads instead of the name itself.
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(19);
    this.doc.setTextColor(...INK);
    this.doc.text(siteConfig.name.toUpperCase(), MARGIN, top + 13, {
      charSpace: 0.4,
    });

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(10.4);
    this.doc.setTextColor(...ACCENT);
    this.doc.text(
      `${siteConfig.role}  ·  ${siteConfig.discipline}`,
      MARGIN,
      top + 27,
    );

    const markX = this.rightEdge - mark;
    this.doc.setFillColor(...ACCENT);
    this.doc.roundedRect(markX, top, mark, mark, 4.5, 4.5, 'F');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(12.5);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(
      initials,
      markX + mark / 2 - this.doc.getTextWidth(initials) / 2,
      top + mark / 2 + 4.4,
    );

    this.y = top + mark + 12;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9);
    this.doc.setTextColor(...MUTED);
    this.doc.text(
      [
        siteConfig.email,
        siteConfig.phone,
        siteConfig.location,
        stripUrl(siteConfig.linkedinUrl),
      ].join('   ·   '),
      MARGIN,
      this.y,
    );
    this.y += 10;

    this.doc.setDrawColor(...RULE);
    this.doc.setLineWidth(0.6);
    this.doc.line(MARGIN, this.y, this.rightEdge, this.y);
    this.y += 12;
  }

  /**
   * "Label: value" on one line, label bold — reads cleanly, parses cleanly.
   *
   * Continuation lines sit at a small flush indent rather than aligned under the
   * value. Aligning under the value is the usual convention, but these labels
   * run to ~120pt ("Fintech & Open Banking: "), and a continuation line that far
   * in aligns with nothing above or below it — it reads as floating in mid-air.
   * A capped indent looked worse still, landing between the two. Lines are
   * wrapped against the *full* label width, so a continuation line starting
   * further left than it was measured for is shorter than it could be but can
   * never overrun the right margin.
   */
  skillRow(label: string, value: string) {
    const lineGap = 12.2;
    const CONTINUATION_INDENT = 12;
    this.doc.setFontSize(FONT_BODY);
    this.doc.setFont('helvetica', 'bold');
    const labelText = `${label}: `;
    const labelWidth = this.doc.getTextWidth(labelText);
    const hangingIndent = Math.min(labelWidth, CONTINUATION_INDENT);

    this.doc.setFont('helvetica', 'normal');
    const valueLines = this.doc.splitTextToSize(
      sanitize(value),
      this.contentWidth - labelWidth,
    ) as string[];

    valueLines.forEach((line, i) => {
      this.ensureSpace(lineGap);
      if (i === 0) {
        this.doc.setFont('helvetica', 'bold');
        this.doc.setTextColor(...INK);
        this.doc.text(labelText, MARGIN, this.y);
      }
      this.doc.setFont('helvetica', 'normal');
      this.doc.setTextColor(...INK);
      this.doc.text(
        line,
        MARGIN + (i === 0 ? labelWidth : hangingIndent),
        this.y,
      );
      this.y += lineGap;
    });
  }

  gap(height: number) {
    this.y += height;
  }
}

export function generateResumePdf(): jsPDF {
  const w = new ResumeWriter();

  w.header();

  w.highlightsBand([
    'Built Lynqx from scratch - Open Banking connectivity across the US, EU and APAC.',
    'Three production fintech platforms in one role: Open Banking, card payments, embedded finance.',
    `${award.title} award at ${award.org} for ownership and technical contribution on Lynqx.`,
  ]);

  w.sectionHeading('Summary');
  w.text(resumeSummary, { gap: 12.2 });

  w.sectionHeading('Technical Skills');
  capabilities.forEach((group) => {
    w.skillRow(group.group, group.items.join(', '));
  });

  w.sectionHeading('Professional Experience');
  experience
    .filter((entry) => entry.id !== 'education')
    .forEach((entry, index) => {
      if (index > 0) w.gap(9);
      w.roleLine(entry.role, entry.period);
      w.companyLine(entry.company, entry.location);
      // Role-level points are only rendered when the role has no named projects.
      // For Cateina they restate "three platforms in one role" and the award,
      // both of which the highlights band already says at the top of the page —
      // and a résumé that repeats itself twice in ten lines reads careless.
      if (!entry.projects?.length) {
        entry.points.forEach((point) => w.bullet(point));
      }
      entry.projects?.forEach((project) => {
        w.gap(3);
        w.projectLine(project.name, project.kind);
        project.points.forEach((point) => w.bullet(point, SUB_INDENT));
      });
    });

  const education = experience.find((entry) => entry.id === 'education');
  if (education) {
    w.sectionHeading('Education');
    w.roleLine(education.role, education.period);
    w.companyLine(education.company, education.location);
    // The diploma stays on the site but not here: the degree, institution and
    // dates are what a résumé's education section is for, and the line buys
    // nothing worth a page break.
  }

  return w.doc;
}

export function downloadResume(): void {
  const doc = generateResumePdf();
  doc.save(resumeFileName());
}
