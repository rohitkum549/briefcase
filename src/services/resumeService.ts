import { jsPDF } from 'jspdf';
import { siteConfig } from '@/config/site';
import {
  heroContent,
  experience,
  capabilities,
  projects,
} from '@/services/data/portfolioData';

const MARGIN = 46;
const FONT_BODY = 10;
const BULLET_INDENT = 11;

type Rgb = readonly [number, number, number];
const INK: Rgb = [26, 26, 26];
const MUTED: Rgb = [110, 110, 110];
const ACCENT: Rgb = [15, 118, 110]; // matches --accent-brand on the site
const RULE: Rgb = [205, 205, 205];

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
    .replace(/…/g, '...');
}

function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/);
  const first = words[0] ?? '';
  const last = words[words.length - 1] ?? '';
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

interface TextOptions {
  size?: number;
  bold?: boolean;
  gap?: number;
  color?: Rgb;
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
    { size = FONT_BODY, bold = false, gap, color = INK }: TextOptions = {},
  ) {
    const lineGap = gap ?? size + 3.5;
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setFontSize(size);
    this.doc.setTextColor(...color);
    const wrapped = this.doc.splitTextToSize(
      sanitize(value),
      this.contentWidth,
    ) as string[];
    for (const row of wrapped) {
      this.ensureSpace(lineGap);
      this.doc.text(row, MARGIN, this.y);
      this.y += lineGap;
    }
  }

  /** Role on the left, dates flush right — the classic senior-résumé line. */
  roleLine(left: string, right: string) {
    this.ensureSpace(15);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(10.8);
    this.doc.setTextColor(...INK);
    this.doc.text(sanitize(left), MARGIN, this.y);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.3);
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(right), this.rightEdge, this.y, { align: 'right' });
    this.y += 13;
  }

  companyLine(left: string, right: string) {
    this.ensureSpace(14);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.8);
    this.doc.setTextColor(...ACCENT);
    this.doc.text(sanitize(left), MARGIN, this.y);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.3);
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(right), this.rightEdge, this.y, { align: 'right' });
    this.y += 14;
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
  bullet(value: string) {
    const lineGap = 13.2;
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(FONT_BODY);
    const wrapped = this.doc.splitTextToSize(
      sanitize(value),
      this.contentWidth - BULLET_INDENT,
    ) as string[];

    wrapped.forEach((row, i) => {
      this.ensureSpace(lineGap);
      if (i === 0) {
        this.doc.setTextColor(...ACCENT);
        this.doc.text('•', MARGIN + 1, this.y);
      }
      this.doc.setTextColor(...INK);
      this.doc.text(row, MARGIN + BULLET_INDENT, this.y);
      this.y += lineGap;
    });
  }

  /** Project outcome — own line, single weight, so no measured positioning. */
  impactLine(value: string) {
    const lineGap = 13.2;
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.4);
    this.doc.setTextColor(...ACCENT);
    const wrapped = this.doc.splitTextToSize(
      sanitize(value),
      this.contentWidth,
    ) as string[];
    for (const row of wrapped) {
      this.ensureSpace(lineGap);
      this.doc.text(row, MARGIN, this.y);
      this.y += lineGap;
    }
  }

  sectionHeading(title: string) {
    this.gap(9);
    this.ensureSpace(26);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.6);
    this.doc.setTextColor(...ACCENT);
    this.doc.text(title.toUpperCase(), MARGIN, this.y, { charSpace: 1.1 });
    this.y += 5.5;
    this.doc.setDrawColor(...ACCENT);
    this.doc.setLineWidth(1.1);
    this.doc.line(MARGIN, this.y, MARGIN + 26, this.y);
    this.doc.setDrawColor(...RULE);
    this.doc.setLineWidth(0.6);
    this.doc.line(MARGIN + 26, this.y, this.rightEdge, this.y);
    this.y += 12;
  }

  header(): void {
    const mark = 32;
    const initials = initialsOf(siteConfig.name);
    const textX = MARGIN;
    const top = this.y;

    // The monogram sits top-right, not top-left. Text extraction is geometric,
    // so a mark to the left of the name would make "RJ" the first token an ATS
    // reads instead of the name itself.
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(20);
    this.doc.setTextColor(...INK);
    this.doc.text(siteConfig.name.toUpperCase(), textX, top + 14, {
      charSpace: 0.4,
    });

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(11);
    this.doc.setTextColor(...ACCENT);
    this.doc.text(siteConfig.role, textX, top + 28.5);

    const markX = this.rightEdge - mark;
    this.doc.setFillColor(...ACCENT);
    this.doc.roundedRect(markX, top, mark, mark, 4.5, 4.5, 'F');
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(13);
    this.doc.setTextColor(255, 255, 255);
    this.doc.text(
      initials,
      markX + mark / 2 - this.doc.getTextWidth(initials) / 2,
      top + mark / 2 + 4.6,
    );

    this.y = top + mark + 14;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9.2);
    this.doc.setTextColor(...MUTED);
    this.doc.text(
      [
        siteConfig.email,
        siteConfig.phone,
        siteConfig.location,
        stripUrl(siteConfig.linkedinUrl),
        stripUrl(siteConfig.githubUrl),
      ].join('   ·   '),
      MARGIN,
      this.y,
    );
    this.y += 12;

    this.doc.setDrawColor(...RULE);
    this.doc.setLineWidth(0.6);
    this.doc.line(MARGIN, this.y, this.rightEdge, this.y);
    this.y += 15;
  }

  /** "Label: value" on one line, label bold — reads cleanly, parses cleanly. */
  skillRow(label: string, value: string) {
    const lineGap = 13.2;
    this.doc.setFontSize(FONT_BODY);
    this.doc.setFont('helvetica', 'bold');
    const labelText = `${label}: `;
    const labelWidth = this.doc.getTextWidth(labelText);

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
      this.doc.text(line, MARGIN + labelWidth, this.y);
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

  w.sectionHeading('Summary');
  w.text(heroContent.description, { gap: 13.2 });

  w.sectionHeading('Technical Skills');
  capabilities.forEach((group) => {
    w.skillRow(group.group, group.items.join(', '));
  });

  w.sectionHeading('Professional Experience');
  experience
    .filter((entry) => entry.id !== 'education')
    .forEach((entry, index) => {
      if (index > 0) w.gap(11);
      w.roleLine(entry.role, entry.period);
      w.companyLine(entry.company, entry.location);
      entry.points.forEach((point) => w.bullet(point));
    });

  w.sectionHeading('Selected Projects');
  projects.forEach((project, index) => {
    if (index > 0) w.gap(8);
    w.roleLine(project.title, project.kind);
    w.text(project.tags.join('  ·  '), {
      size: 8.8,
      color: ACCENT,
      gap: 12.5,
    });
    w.text(project.desc, { color: MUTED, gap: 13 });
    if (project.impact) w.impactLine(project.impact);
  });

  const education = experience.find((entry) => entry.id === 'education');
  if (education) {
    w.sectionHeading('Education');
    w.roleLine(education.role, education.period);
    w.companyLine(education.company, education.location);
  }

  return w.doc;
}

export function downloadResume(): void {
  const doc = generateResumePdf();
  const filename = `${siteConfig.name.replace(/\s+/g, '-')}-Resume.pdf`;
  doc.save(filename);
}
