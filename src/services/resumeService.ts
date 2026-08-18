import { jsPDF } from 'jspdf';
import { siteConfig } from '@/config/site';
import { certifications } from '@/services/data/certificationsData';
import { experience, award } from '@/services/data/portfolioData';
import { bulletsFor } from '@/services/data/resumeBullets';
import {
  DEFAULT_RESUME_ROLE,
  getResumeRole,
} from '@/services/data/resumeRoles';
import type { ExperienceEntry, ExperienceProject } from '@/types/experience';
import type {
  ResumeCertificationRef,
  ResumeFormat,
  ResumeRole,
  ResumeRoleId,
} from '@/types/resume';

const MARGIN = 44;
const FONT_BODY = 9.6;
const BULLET_INDENT = 10;
const SUB_INDENT = 12;

/*
 * One page is a hard constraint, and the site is where the complete record
 * lives — so each résumé prints the strongest bullets per block and stops.
 *
 * That cut used to be a positional slice here (first 3 role bullets, first 4
 * project bullets). It is now the role configuration's job, because the budget
 * genuinely differs per variant: the frontend résumé drops two platform blocks
 * and spends the space on a fourth role bullet instead. A blanket slice would
 * have silently truncated that list back to three — the failure mode being an
 * edit that appears to work and quietly does nothing.
 *
 * `checkResumeBudget` below is what keeps the one-page promise honest now.
 */

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

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE CONTENT MODEL                                                      │
 * │                                                                         │
 * │  Two renderers read the same document now: the PDF a recruiter is sent,  │
 * │  and the plain-text build for the application forms that ask you to     │
 * │  paste rather than upload. Selection — which platforms print, in which  │
 * │  order, carrying which bullets — is resolved once, here, so the two can │
 * │  differ in layout and cannot differ in content.                         │
 * │                                                                         │
 * │  A .txt that quietly dropped a platform the PDF shows would be the      │
 * │  worst shape of bug available: invisible until a recruiter compares the │
 * │  document you uploaded against the one you pasted.                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

interface ResumeBlock {
  entry: ExperienceEntry;
  /** Role-level bullets, already resolved from the pool. */
  points: string[];
  platforms: { project: ExperienceProject; points: string[] }[];
}

function experienceBlocks(role: ResumeRole): ResumeBlock[] {
  const plan: Record<string, string[]> = {
    cateina: role.cateinaPoints,
    zeqon: role.zeqonPoints,
  };
  return (
    experience
      .filter((entry) => entry.id !== 'education')
      // Platform order and selection are the role's call: the Angular variant
      // has no reason to spend eight lines on ATM reconciliation, and the
      // backend variant has no reason to lead with a component library.
      .map((entry) => ({
        entry,
        points: bulletsFor(plan[entry.id] ?? []),
        platforms: role.platforms.flatMap((selection) => {
          const project = entry.projects?.find((p) => p.id === selection.id);
          return project
            ? [{ project, points: bulletsFor(selection.points) }]
            : [];
        }),
      }))
  );
}

interface ResumeCredential {
  text: string;
  /** The certificate's own verification page, when one exists. */
  url: string | null;
}

/**
 * The Certifications block, resolved from `certificationsData` by id.
 *
 * The roles used to carry a hand-written string per variant, which meant seven
 * copies of the same titles and dates and no way for a correction on the site
 * to reach them. Referencing by id means a résumé cannot name a credential
 * that does not exist, cannot print a date the site contradicts, and gets the
 * verification URL for free — every certification a screener reads here is one
 * click from the issuer's own page.
 */
function credentialsFor(role: ResumeRole): ResumeCredential[] {
  return role.certifications.map((ref: ResumeCertificationRef) => {
    const cert = certifications.find((entry) => entry.id === ref.id);
    if (!cert) throw new Error(`Unknown résumé certification id: ${ref.id}`);
    const title = ref.label ?? cert.title;
    // `month` is null on the one record no source dates precisely, and it is
    // never guessed — the line then carries the year alone, exactly as the
    // site's certification rail does.
    const date = ref.date ?? [cert.month, cert.year].filter(Boolean).join(' ');
    const note = ref.note ? ` (${ref.note})` : '';
    return {
      text: `${title} — ${cert.issuer}, ${date}${note}`,
      url: cert.verifyUrl,
    };
  });
}

/** Contact details, in print order, with the ones worth clicking marked. */
interface ContactPart {
  text: string;
  href?: string;
  /** Rendered in the accent colour, so the reader can see it is a link. */
  link?: boolean;
}

function contactParts(): ContactPart[] {
  return [
    {
      text: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      link: true,
    },
    // Linked but not accented. A tel: URI is genuinely useful on a phone and
    // inert on the desktop where most of these are read, so it does not earn
    // the visual weight the other three do.
    {
      text: siteConfig.phone,
      href: `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`,
    },
    { text: siteConfig.location },
    {
      text: stripUrl(siteConfig.linkedinUrl),
      href: siteConfig.linkedinUrl,
      link: true,
    },
    {
      text: stripUrl(siteConfig.githubUrl),
      href: siteConfig.githubUrl,
      link: true,
    },
  ].map((part) => ({ ...part, text: sanitize(part.text) }));
}

/**
 * Role, date and time in the filename — `Rohit_Jha-Frontend_17-08-2026_1432.pdf`.
 *
 * The role slug is the point: seven of these land in one Downloads folder and
 * "which one did I send to that fintech?" has to be answerable without opening
 * them. The time is there because two variants downloaded the same afternoon
 * would otherwise collide in the filename and get a browser-appended "(1)" —
 * and parentheses are exactly what the character rule below exists to avoid.
 *
 * Built from LOCAL date parts on purpose. `toISOString()` converts to UTC, which
 * for an evening download in IST (UTC+5:30) reports yesterday — the one thing a
 * "this is the latest one" filename must never do.
 */
export function resumeFileName(
  roleId: ResumeRoleId = DEFAULT_RESUME_ROLE,
  format: ResumeFormat = 'pdf',
  now: Date = new Date(),
): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  const dd = pad(now.getDate());
  const mm = pad(now.getMonth() + 1);
  const yyyy = now.getFullYear();
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}`;
  const name = siteConfig.name.trim().replace(/\s+/g, '_');
  // Only letters, digits, hyphen and underscore reach the filename: some ATS
  // upload forms reject or mangle parentheses, spaces and diacritics.
  const slug = getResumeRole(roleId).fileSlug.replace(/[^A-Za-z0-9-]/g, '');
  return `${name}-${slug}_${dd}-${mm}-${yyyy}_${time}.${format}`;
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
  private readonly scale: number;

  /**
   * Every vertical metric and font size in this class is stated at scale 1 and
   * multiplied through `m()`. `fitToPage` below searches for the largest scale
   * a variant can carry and still hold one page, which is what stops the
   * shorter résumés ending two thirds of the way down an A4 sheet with a hand
   * of white space under them. Nothing is padded to achieve it — the same
   * words are simply set at the size the page can afford.
   */
  constructor(scale = 1) {
    this.scale = scale;
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

  /** Scale a metric stated at the base size. Margins are page geometry and stay put. */
  private m(value: number): number {
    return value * this.scale;
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
    const lineGap = this.m(gap ?? size + 3.2);
    const left = MARGIN + this.m(indent);
    this.doc.setFont('helvetica', bold ? 'bold' : 'normal');
    this.doc.setFontSize(this.m(size));
    this.doc.setTextColor(...color);
    const wrapped = this.doc.splitTextToSize(
      sanitize(value),
      this.rightEdge - left,
    ) as string[];
    for (const row of wrapped) {
      this.ensureSpace(lineGap);
      this.doc.text(row, left, this.y);
      this.y += lineGap;
    }
  }

  /** Role on the left, dates flush right — the classic senior-résumé line. */
  roleLine(left: string, right: string) {
    this.ensureSpace(this.m(15));
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(this.m(10.6));
    this.doc.setTextColor(...INK);
    this.doc.text(sanitize(left), MARGIN, this.y);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(this.m(9.2));
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(right), this.rightEdge, this.y, { align: 'right' });
    this.y += this.m(12.5);
  }

  companyLine(left: string, right: string) {
    this.ensureSpace(this.m(13));
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(this.m(9.6));
    this.doc.setTextColor(...ACCENT);
    this.doc.text(sanitize(left), MARGIN, this.y);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(this.m(9.2));
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(right), this.rightEdge, this.y, { align: 'right' });
    this.y += this.m(13);
  }

  /** Named platform inside a role — "Lynqx — Open Banking platform · FinTech". */
  projectLine(name: string, kind: string) {
    this.ensureSpace(this.m(13));
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(this.m(9.6));
    this.doc.setTextColor(...INK);
    const label = `${sanitize(name)}  `;
    const left = MARGIN + this.m(SUB_INDENT);
    this.doc.text(label, left, this.y);
    const width = this.doc.getTextWidth(label);

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(this.m(8.6));
    this.doc.setTextColor(...MUTED);
    this.doc.text(sanitize(kind), left + width, this.y);
    this.y += this.m(12);
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
  bullet(value: string, level = 0, href?: string | null) {
    const lineGap = this.m(12.2);
    const hang = this.m(BULLET_INDENT);
    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(this.m(FONT_BODY));
    const left = MARGIN + this.m(level * SUB_INDENT);
    const wrapped = this.doc.splitTextToSize(
      sanitize(value),
      this.rightEdge - left - hang,
    ) as string[];

    wrapped.forEach((row, i) => {
      this.ensureSpace(lineGap);
      if (i === 0) {
        this.doc.setTextColor(...ACCENT);
        this.doc.text('•', left + this.m(1), this.y);
      }
      this.doc.setTextColor(...INK);
      this.doc.text(row, left + hang, this.y);
      // A wrapped line needs its own rectangle: a link annotation is a box on
      // the page, not a property of a run of text, so one rect over the first
      // line would leave the rest of a two-line credential dead to the click.
      if (href) {
        this.linkOver(
          left + hang,
          this.doc.getTextWidth(row),
          this.m(FONT_BODY),
          href,
        );
      }
      this.y += lineGap;
    });
  }

  /**
   * Clickable rectangle over a run of text sitting on the current baseline.
   *
   * jsPDF's `link()` takes a top-left corner, while `text()` draws from a
   * baseline, so the two disagree by roughly the ascender. The 0.85/1.12 pair
   * covers cap height plus a little descender — generous enough that a click
   * anywhere on the glyphs registers, tight enough that two links on the same
   * line never overlap each other's boxes.
   *
   * Link annotations are not graphics. They add nothing to the content stream
   * a parser walks, so the single-column, text-only promise this document
   * makes to an ATS is untouched: the text still extracts identically, the
   * URL is just also live for the human reading it.
   */
  private linkOver(x: number, width: number, size: number, url: string) {
    this.doc.link(x, this.y - size * 0.85, width, size * 1.12, { url });
  }

  sectionHeading(title: string) {
    this.gap(4);
    this.ensureSpace(this.m(24));
    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(this.m(9.4));
    this.doc.setTextColor(...ACCENT);
    // No charSpace. Letter-spacing is applied by positioning each glyph
    // individually, and a naive text extractor reads that back as "S U M M A R Y"
    // — which stops it recognising the section header it was keying on. Bold,
    // uppercase and the accent rule carry the hierarchy without the risk.
    this.doc.text(title.toUpperCase(), MARGIN, this.y);
    this.y += this.m(5);
    const tick = MARGIN + this.m(24);
    this.doc.setDrawColor(...ACCENT);
    this.doc.setLineWidth(this.m(1.1));
    this.doc.line(MARGIN, this.y, tick, this.y);
    this.doc.setDrawColor(...RULE);
    this.doc.setLineWidth(this.m(0.6));
    this.doc.line(tick, this.y, this.rightEdge, this.y);
    this.y += this.m(10);
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
   *
   * Every string here goes through sanitize(), like every other draw site. That
   * used to be skipped on the grounds that these were known-safe literals — but
   * they are not literals any more: name, email, phone and both URLs come from
   * repository variables, so a curly apostrophe pasted into a GitHub settings
   * field would render as mojibake on the most important line of the document.
   */
  header(headline: string): void {
    const HEADER_BLOCK = this.m(42);
    const top = this.y;

    this.doc.setFont('helvetica', 'bold');
    this.doc.setFontSize(this.m(19));
    this.doc.setTextColor(...INK);
    // No charSpace. Section headings dropped their letter-spacing so naive
    // extractors could not read them back as "S U M M A R Y"; the name is the
    // single token where that failure would cost the most, so it follows the
    // same rule. 0.4pt of tracking is not worth the risk.
    this.doc.text(
      sanitize(siteConfig.name).toUpperCase(),
      MARGIN,
      top + this.m(13),
    );

    this.doc.setFont('helvetica', 'normal');
    this.doc.setFontSize(this.m(10.4));
    this.doc.setTextColor(...ACCENT);
    // The headline is role-specific — it is the first line under the name and
    // the one a six-second skim uses to decide whether this is the right pile,
    // so it says "Frontend Engineer" on the frontend variant rather than the
    // site's single generic title.
    this.doc.text(sanitize(headline), MARGIN, top + this.m(27));

    this.y = top + HEADER_BLOCK;

    this.doc.setFont('helvetica', 'normal');
    /*
     * The contact line is sized to fit, not to the scale.
     *
     * It is the one line on the page constrained by width rather than by
     * density: five values plus separators, and at the larger scales the
     * fit-to-page search picks for the shorter variants it stopped fitting on
     * one row and dropped a lone "github.com/…" onto a second. Glyph width is
     * linear in font size, so one measurement gives the exact size that fits —
     * take that or the scaled size, whichever is smaller, and never go below
     * 8pt, where the packing logic below takes over and wraps properly.
     */
    const SEP = '  ·  ';
    const parts = contactParts();
    this.doc.setFontSize(this.m(9));
    const natural = this.doc.getTextWidth(
      parts.map((part) => part.text).join(SEP),
    );
    // 0.5% under the exact fit: the packing loop below measures each value and
    // separator separately and its rounding sums a fraction wider than one
    // measurement of the joined string, which at the exact size is enough to
    // trip the wrap and drop a lone "github.com/…" onto its own row.
    const contactSize = Math.max(
      8,
      Math.min(this.m(9), (this.m(9) * this.contentWidth * 0.995) / natural),
    );
    this.doc.setFontSize(contactSize);
    this.doc.setTextColor(...MUTED);
    /*
     * Contact details, packed by measurement rather than by eye.
     *
     * doc.text() does not wrap, and the failure mode is silent and bad: the line
     * runs off the right edge of the page and an ATS recovers half a URL.
     *
     * Every row is measured, not just the first. An earlier version checked
     * whether all five parts fitted on one line and, when they did not, emitted
     * a fixed identity/links two-row split *unchecked* — so a longer email or a
     * renamed profile could still overflow, which is the exact bug the
     * measurement existed to prevent. Today all five fit with about 7pt to
     * spare, so that branch was one env-value change away from being reached.
     */
    const sepWidth = this.doc.getTextWidth(SEP);

    /*
     * Packed part by part rather than row by row, because the LinkedIn and
     * GitHub URLs are live links now and a link is a rectangle: it needs the
     * x and the width of its own run, which a pre-joined string has thrown
     * away. The measurement discipline is unchanged — every row is checked
     * against the content width, and the pathological case of one value wider
     * than the page still breaks mid-token rather than drawing off the edge.
     */
    const rows: ContactPart[][] = [];
    let row: ContactPart[] = [];
    let width = 0;

    const place = (part: ContactPart) => {
      const partWidth = this.doc.getTextWidth(part.text);
      const cost = row.length === 0 ? partWidth : sepWidth + partWidth;
      if (row.length > 0 && width + cost > this.contentWidth) {
        rows.push(row);
        row = [];
        width = 0;
        row.push(part);
        width = partWidth;
        return;
      }
      row.push(part);
      width += cost;
    };

    for (const part of parts) {
      if (this.doc.getTextWidth(part.text) <= this.contentWidth) {
        place(part);
        continue;
      }
      // Every fragment keeps the href: half a URL you can still click beats a
      // whole URL you cannot.
      for (const fragment of this.doc.splitTextToSize(
        part.text,
        this.contentWidth,
      ) as string[]) {
        if (row.length > 0) {
          rows.push(row);
          row = [];
          width = 0;
        }
        rows.push([{ ...part, text: fragment }]);
      }
    }
    if (row.length > 0) rows.push(row);

    rows.forEach((cells, rowIndex) => {
      let x = MARGIN;
      cells.forEach((cell, i) => {
        if (i > 0) {
          this.doc.setTextColor(...MUTED);
          this.doc.text(SEP, x, this.y);
          x += sepWidth;
        }
        const cellWidth = this.doc.getTextWidth(cell.text);
        this.doc.setTextColor(...(cell.link ? ACCENT : MUTED));
        this.doc.text(cell.text, x, this.y);
        if (cell.href) this.linkOver(x, cellWidth, contactSize, cell.href);
        x += cellWidth;
      });
      if (rowIndex < rows.length - 1) this.y += contactSize + this.m(1.5);
    });
    this.y += this.m(10);

    this.doc.setDrawColor(...RULE);
    this.doc.setLineWidth(this.m(0.6));
    this.doc.line(MARGIN, this.y, this.rightEdge, this.y);
    this.y += this.m(12);
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
    const lineGap = this.m(12.2);
    const CONTINUATION_INDENT = this.m(12);
    this.doc.setFontSize(this.m(FONT_BODY));
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
    this.y += this.m(height);
  }

  /** How far down the page the content reached, as a fraction of the usable height. */
  get fill(): number {
    return (this.y - MARGIN) / (this.pageHeight - MARGIN * 2);
  }
}

function buildResume(role: ResumeRole, scale: number): ResumeWriter {
  const w = new ResumeWriter(scale);

  w.header(role.headline);

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
  /*
   * Standard section names, and only standard section names: Summary, Skills,
   * Experience, Awards, Certifications, Education. An ATS keys on these exact
   * strings to decide which block it is reading — a cleverer heading ("What
   * I'm good at") is an unrecognised block, and even a reasonable-sounding
   * compound one is a risk: "Awards & Certifications" is a single header that
   * matches neither list on the older parsers, which is why it is two sections
   * below rather than one.
   */
  w.sectionHeading('Summary');
  w.text(role.summary, { gap: 12.2 });

  w.sectionHeading('Skills');
  role.skills.forEach((row) => {
    w.skillRow(row.label, row.items.join(', '));
  });

  /*
   * Experience is assembled from the shared record — company, role, dates and
   * location always print identically, because inconsistent titles or dates
   * across variants is the one thing a recruiter comparing two of these would
   * actually catch. Only the BULLETS are selected per role, and only from the
   * pool. Nothing here can invent a job.
   *
   * Projects stay nested under the employer that paid for them rather than
   * moving to a standalone Projects section. A separate section carries no
   * dates, so a parser has nowhere to place the work in time and a reader has
   * to guess who it was for; nested, all three platforms inherit the Cateina
   * dates and the attribution is unambiguous. The keyword indexing an ATS does
   * is identical either way.
   */
  w.sectionHeading('Experience');
  experienceBlocks(role).forEach((block, index) => {
    if (index > 0) w.gap(9);
    w.roleLine(block.entry.role, block.entry.period);
    w.companyLine(block.entry.company, block.entry.location);

    /*
     * Role-level points carry what no platform bullet can — the initiative,
     * the stakeholder work, the mentoring. At least one prints on every
     * variant: a résumé made only of "Built X" scores zero on every
     * leadership, teamwork and communication check there is.
     */
    block.points.forEach((point) => w.bullet(point));

    block.platforms.forEach(({ project, points }) => {
      w.gap(3);
      w.projectLine(project.name, project.kind);
      points.forEach((point) => w.bullet(point, 1));
    });
  });

  /*
   * The award earns its own section, above Certifications.
   *
   * It is the only credential here that an employer decided to give, so it
   * does not belong in a list alongside course completions — and a named
   * section header is also what an ATS keys on, where the same sentence buried
   * in a bullet is just another line of prose.
   */
  w.sectionHeading('Awards');
  w.roleLine(`${award.title} — ${award.org}`, award.shortDate);
  // Verb first, and the signatory before the citation: "Tech Ninja Pro" means
  // nothing outside Cateina, but an award a chief executive put their name to
  // does. This is the only place on the page the citation appears — the role
  // bullet about the same work deliberately uses different words for it.
  w.bullet(`Awarded by the ${award.signedByRole} — "${award.citation}"`);

  /*
   * Which certifications follow is the role's call. Thirteen would push the
   * page over and would read as padding, so each variant names the two to five
   * that a screener for THAT role is actually looking for — the frontend one
   * leads with Frontend Web Application Development, the integration one with
   * the REST/OpenAPI module. The full list lives on the site.
   *
   * `java-full-stack` is the one variant that spends real space here, naming
   * five, because for that role the certification track IS the Java evidence
   * (see the header note in resumeRoles.ts) and burying it would be the
   * dishonest kind of brevity.
   *
   * One credential per line, not a run-on string separated by dots. A parser
   * splitting a block into records splits it on line breaks; three titles,
   * three issuers and three dates sharing one paragraph is the shape that
   * comes back as a single unusable field. The line also carries the
   * certificate's own verification URL, so every claim here is one click from
   * the issuer's page.
   */
  w.sectionHeading('Certifications');
  const credentials = credentialsFor(role);
  credentials.forEach((credential) => {
    w.bullet(credential.text, 0, credential.url);
  });
  // Both counts come from the data, not literals, so adding a certificate to
  // the site can't leave a stale "13" on the résumé and reordering a role's
  // list can't leave a stale "3". The tail earns its place by telling a reader
  // that the ones named are a selection rather than the whole record.
  w.text(
    `${credentials.length} of ${certifications.length} completed — each title above links to its verification page.`,
    { size: 8.4, color: MUTED, gap: 9, indent: BULLET_INDENT },
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

  return w;
}

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FIT TO PAGE                                                            │
 * │                                                                         │
 * │  Seven variants carry different amounts of evidence, and set at one     │
 * │  fixed size they finished at wildly different points down the sheet —   │
 * │  the frontend résumé stopped at 85% of the page and left a hand of      │
 * │  white space beneath Education, while the full-stack one ran to 96%.    │
 * │  A page that stops three quarters of the way down reads as a document   │
 * │  with nothing left to say.                                              │
 * │                                                                         │
 * │  The wrong fix is padding: an extra bullet nobody needed, a filler      │
 * │  section, a certification that does not belong on that application.     │
 * │  So nothing is added. The document is simply SET at the largest size    │
 * │  the page can carry — every font size, leading and gap multiplied by    │
 * │  one factor, searched for here.                                         │
 * │                                                                         │
 * │  It has to be a search rather than arithmetic because the relationship  │
 * │  is not linear: bigger type means fewer characters per line, so a       │
 * │  paragraph can gain a whole line at one size and lose it at the next.   │
 * │  Twelve bisection steps land within ~0.01% of the largest scale that    │
 * │  still holds one page.                                                  │
 * │                                                                         │
 * │  The ceiling is real, not decorative. Uncapped, a very short variant    │
 * │  would keep growing until it looked like a large-print edition; 1.22    │
 * │  puts the body text at ~11.7pt, which is the top of the range a         │
 * │  recruiter reads as a normal résumé.                                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 */
/*
 * The floor is below 1, which makes this a two-way fit rather than a one-way
 * stretch: a variant that outgrows the page gets set a hair smaller instead of
 * spilling onto a second sheet nobody reads. It is a safety valve, not a
 * licence to overfill — the verification harness fails if any variant is
 * actually driven below 0.98, because past that the honest fix is to cut a
 * line, not to shrink the type until it fits.
 */
const MIN_SCALE = 0.94;
const MAX_SCALE = 1.22;
const FIT_STEPS = 12;

function fitScale(role: ResumeRole): number {
  if (buildResume(role, MAX_SCALE).doc.getNumberOfPages() === 1)
    return MAX_SCALE;

  let lo = MIN_SCALE;
  let hi = MAX_SCALE;
  for (let i = 0; i < FIT_STEPS; i++) {
    const mid = (lo + hi) / 2;
    if (buildResume(role, mid).doc.getNumberOfPages() === 1) lo = mid;
    else hi = mid;
  }
  return lo;
}

/*
 * Memoised per role. The search costs a dozen renders, and without this the
 * page-count check and the download path would each pay for it again — the
 * result is a pure function of data that cannot change at runtime.
 */
const scaleCache = new Map<ResumeRoleId, number>();

function scaleFor(role: ResumeRole): number {
  const cached = scaleCache.get(role.id);
  if (cached !== undefined) return cached;
  const scale = fitScale(role);
  scaleCache.set(role.id, scale);
  return scale;
}

export function generateResumePdf(
  roleId: ResumeRoleId = DEFAULT_RESUME_ROLE,
): jsPDF {
  const role = getResumeRole(roleId);
  return buildResume(role, scaleFor(role)).doc;
}

/** How much of the usable page a variant fills, 0-1. Used by the density check. */
export function resumeFill(roleId: ResumeRoleId = DEFAULT_RESUME_ROLE): number {
  const role = getResumeRole(roleId);
  return buildResume(role, scaleFor(role)).fill;
}

/**
 * Page count for a variant, used by the one-page regression check.
 *
 * Exported rather than inlined into a test script so the assertion runs against
 * the same code path the browser does — a check that measures a reimplementation
 * of the layout is a check that passes while the real document breaks.
 */
export function resumePageCount(
  roleId: ResumeRoleId = DEFAULT_RESUME_ROLE,
): number {
  return generateResumePdf(roleId).getNumberOfPages();
}

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE PLAIN-TEXT BUILD                                                   │
 * │                                                                         │
 * │  Same document, rendered for the field that will not take a file.       │
 * │                                                                         │
 * │  Plenty of application forms ask you to paste the résumé into a          │
 * │  textarea, and pasting out of a PDF into one of those is where a        │
 * │  carefully typeset document goes to die: the bullet glyphs arrive as    │
 * │  boxes, the right-aligned dates interleave with the role titles they    │
 * │  sat beside, and the hanging indents come through as runs of spaces     │
 * │  that a parser reads as column structure.                               │
 * │                                                                         │
 * │  So this build is 7-bit ASCII and nothing else — no em dash, no middle  │
 * │  dot, no typographic bullet, no curly quote. There is no glyph in it a  │
 * │  form can fail to encode. Content comes from the same model the PDF     │
 * │  uses, so the two cannot drift.                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

/** Hard wrap. Wide enough not to look shredded, narrow enough for a textarea. */
const TEXT_WIDTH = 98;

/**
 * Down to printable ASCII, deliberately and in this order.
 *
 * `sanitize` first, because it already knows how to fold the arrows and curly
 * quotes the WinAnsi PDF encoding could not carry either. Then the three
 * marks this document actually uses — em/en dash, middle dot, bullet — get
 * explicit ASCII equivalents rather than being dropped, because a silent
 * deletion turns "Express — Institutions" into "Express Institutions" and
 * loses the punctuation that made the sentence parse. Only after that does
 * anything still outside the printable range get stripped.
 */
function toAscii(value: string): string {
  return sanitize(value)
    .replace(/[—–]/g, '-')
    .replace(/·/g, '|')
    .replace(/•/g, '-')
    .replace(/[^ -~]/g, '');
}

/** Wrap to TEXT_WIDTH, with `first` on the opening line and `rest` hanging. */
function wrapText(value: string, first = '', rest = ''): string[] {
  const words = toAscii(value).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  let prefix = first;

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && prefix.length + candidate.length > TEXT_WIDTH) {
      lines.push(prefix + line);
      prefix = rest;
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(prefix + line);
  return lines;
}

/**
 * The résumé as plain text.
 *
 * Section names, order and content match the PDF exactly — a screener who
 * received the file and a screener reading the pasted field are looking at the
 * same document.
 */
export function generateResumeText(
  roleId: ResumeRoleId = DEFAULT_RESUME_ROLE,
): string {
  const role = getResumeRole(roleId);
  const out: string[] = [];
  const push = (...lines: string[]) => out.push(...lines);
  const heading = (title: string) => push('', title.toUpperCase());
  const bullet = (value: string, indent = '') =>
    push(...wrapText(value, `${indent}- `, `${indent}  `));

  push(toAscii(siteConfig.name).toUpperCase());
  push(toAscii(role.headline));
  push(
    toAscii(
      [siteConfig.email, siteConfig.phone, siteConfig.location].join('  ·  '),
    ),
  );
  // Labelled, and printed in full. The PDF can afford to strip the scheme
  // because the text is a live annotation there; here the string IS the link,
  // and a bare "linkedin.com/in/..." is not one a form will turn into an
  // anchor. The label also survives a parser that keeps only the line's tail.
  push(`LinkedIn: ${siteConfig.linkedinUrl}`);
  push(`GitHub: ${siteConfig.githubUrl}`);

  heading('Summary');
  push(...wrapText(role.summary));

  heading('Skills');
  role.skills.forEach((row) => {
    push(...wrapText(`${row.label}: ${row.items.join(', ')}`, '', '  '));
  });

  heading('Experience');
  experienceBlocks(role).forEach((block) => {
    push('');
    push(toAscii(block.entry.role));
    push(
      toAscii(
        [block.entry.company, block.entry.location, block.entry.period].join(
          '  ·  ',
        ),
      ),
    );
    block.points.forEach((point) => bullet(point));
    block.platforms.forEach(({ project, points }) => {
      push('');
      push(toAscii(`  ${project.name} — ${project.kind}`));
      points.forEach((point) => bullet(point, '  '));
    });
  });

  heading('Awards');
  push(toAscii(`${award.title} — ${award.org}  ·  ${award.shortDate}`));
  bullet(`Awarded by the ${award.signedByRole} — "${award.citation}"`);

  heading('Certifications');
  credentialsFor(role).forEach((credential) => {
    bullet(credential.text);
    // On its own line rather than inline, so a wrap can never split a URL.
    if (credential.url) push(`  ${credential.url}`);
  });

  const education = experience.find((entry) => entry.id === 'education');
  if (education) {
    heading('Education');
    push(toAscii(education.role));
    push(
      toAscii(
        [education.company, education.location, education.period].join('  ·  '),
      ),
    );
  }

  return `${out.join('\n')}\n`;
}

export function downloadResume(
  roleId: ResumeRoleId = DEFAULT_RESUME_ROLE,
  format: ResumeFormat = 'pdf',
): void {
  const fileName = resumeFileName(roleId, format);

  if (format === 'pdf') {
    generateResumePdf(roleId).save(fileName);
    return;
  }

  const blob = new Blob([generateResumeText(roleId)], {
    type: 'text/plain;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  // Next task, not this one. Revoking synchronously after click() races the
  // browser's own read of the blob in some engines, and the failure is a
  // zero-byte download rather than an error.
  setTimeout(() => URL.revokeObjectURL(url), 0);
}
