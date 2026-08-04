import { jsPDF } from 'jspdf';
import { siteConfig } from '@/config/site';
import { certifications } from '@/services/data/certificationsData';
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

/*
 * One page is a hard constraint, and the site is where the complete record
 * lives — so the résumé prints the strongest bullets per block and stops. The
 * data files order their points strongest-first for exactly this reason, which
 * keeps the cut here positional and dumb rather than a second list of
 * hand-maintained exceptions that silently drifts from the first.
 */
const MAX_PROJECT_BULLETS = 4;
const MAX_ROLE_BULLETS = 3;

type Rgb = readonly [number, number, number];
const INK: Rgb = [26, 26, 26];
const MUTED: Rgb = [110, 110, 110];
const ACCENT: Rgb = [15, 118, 110]; // matches --accent-brand on the site
const RULE: Rgb = [205, 205, 205];

// `www.` too: the contact line carries two URLs now, and four characters of
// pure noise per link is width this document does not have to spare.
function stripUrl(url: string): string {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '');
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
    this.gap(6);
    this.ensureSpace(24);
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(9.4);
    this.doc.setTextColor(...ACCENT);
    // No charSpace. Letter-spacing is applied by positioning each glyph
    // individually, and a naive text extractor reads that back as "S U M M A R Y"
    // — which stops it recognising the section header it was keying on. Bold,
    // uppercase and the accent rule carry the hierarchy without the risk.
    this.doc.text(title.toUpperCase(), MARGIN, this.y);
    this.y += 5;
    this.doc.setDrawColor(...ACCENT);
    this.doc.setLineWidth(1.1);
    this.doc.line(MARGIN, this.y, MARGIN + 24, this.y);
    this.doc.setDrawColor(...RULE);
    this.doc.setLineWidth(0.6);
    this.doc.line(MARGIN + 24, this.y, this.rightEdge, this.y);
    this.y += 11;
  }

  /**
   * Name, tagline, contact details, rule. No graphics.
   *
   * There used to be a teal "RJ" monogram in the top-right corner. It cost a
   * point on every parser we tested: extraction is geometric, so the mark's two
   * letters landed on the same line as the tagline and came back as
   * "Full-Stack Engineer · Fintech & Open Banking RJ" — a junk token welded onto
   * the field a recruiter's search actually reads. Moving it elsewhere only moves
   * the problem, so it is gone.
   */
  header(): void {
    const HEADER_BLOCK = 42;
    const top = this.y;

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

    this.y = top + HEADER_BLOCK;

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(9);
    this.doc.setTextColor(...MUTED);
    /*
     * Contact details, split by measurement rather than by eye.
     *
     * doc.text() does not wrap. Adding GitHub alongside LinkedIn pushed this
     * past the content box, and the failure mode is silent and bad: the line
     * runs off the right edge of the page and an ATS recovers half a URL. So
     * measure, and drop the links to their own line only when they don't fit.
     */
    const SEP = '  ·  ';
    const identity = [siteConfig.email, siteConfig.phone, siteConfig.location];
    const links = [
      stripUrl(siteConfig.linkedinUrl),
      stripUrl(siteConfig.githubUrl),
    ];
    const oneLine = [...identity, ...links].join(SEP);
    const rows =
      this.doc.getTextWidth(oneLine) <= this.contentWidth
        ? [oneLine]
        : [identity.join(SEP), links.join(SEP)];

    rows.forEach((row, i) => {
      this.doc.text(row, MARGIN, this.y);
      if (i < rows.length - 1) this.y += 10.5;
    });
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

  /*
   * There is no highlights band above SUMMARY any more.
   *
   * It was three tinted lines restating the best facts on the page. Two problems.
   * It was unlabelled prose sitting before any recognised section header, which
   * is exactly the shape a parser mis-files — and it was the source of both
   * repeated-phrase flags, because it said "integrating AI workflows and
   * introducing automation" that the award section says again, and
   * "banks, institutions and third-party services" that the summary said again.
   * The facts all survive lower down, each in one place. Deleting it also freed
   * the 57pt that the ownership bullets below are spending.
   */
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
      /*
       * Role-level points print for every role, including ones with named
       * platforms under them. They used to be suppressed for Cateina because the
       * highlights band already said the same things; the band is gone, and these
       * bullets now carry what no project bullet can — the initiative, the
       * stakeholder work, the mentoring. A résumé made only of "Built X" scores
       * zero on every leadership, teamwork and communication check there is.
       */
      entry.points
        .slice(0, MAX_ROLE_BULLETS)
        .forEach((point) => w.bullet(point));
      entry.projects?.forEach((project) => {
        w.gap(3);
        w.projectLine(project.name, project.kind);
        project.points
          .slice(0, MAX_PROJECT_BULLETS)
          .forEach((point) => w.bullet(point, SUB_INDENT));
      });
    });

  /*
   * The award earns its own section, above Education.
   *
   * It is the only credential here that an employer decided to give, so it does
   * not belong in a list alongside course completions — and a named section
   * header is also what an ATS keys on, where the same sentence buried in a
   * bullet is just another line of prose.
   *
   * Only two certifications follow it. Thirteen would push the page over and
   * would read as padding; the programme graduation and the timed HackerRank
   * assessment are the two that carry information, and they bring the
   * "Full Stack Java Developer" keyword with them. The full list lives on the
   * site, where there is room for it.
   */
  w.sectionHeading('Awards & Certifications');
  w.roleLine(`${award.title} — ${award.org}`, award.shortDate);
  // Verb first, and the signatory before the citation: "Tech Ninja Pro" means
  // nothing outside Cateina, but an award a chief executive put their name to
  // does. This is the only place on the page the citation appears — the role
  // bullet about the same work deliberately uses different words for it.
  w.bullet(`Awarded by the ${award.signedByRole} — "${award.citation}"`);
  w.gap(2);
  /*
   * The programme carries its full date range, not just "2023".
   *
   * Between graduating in 2022 and starting at Zeqon in Apr 2023 there is a
   * ten-month gap, and an unexplained gap is a documented HR red flag that a
   * bare year does nothing to answer. The Simplilearn track ran Sep 2022 to
   * Jul 2023 — see certificationsData — so the range covers the window with a
   * fact rather than leaving a screener to guess at it.
   */
  // The count comes from the data, not a literal, so adding a certificate to the
  // site can't leave a stale "13" on the résumé. It earns its place by telling a
  // reader that the two named here are a selection rather than the whole record.
  w.skillRow(
    'Certifications',
    `Full Stack Java Developer Master's Program, Simplilearn (Sep 2022 - Jul 2023, completed with distinction) · Java (Basic), HackerRank (2022) · 2 of ${certifications.length} completed`,
  );

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
