/**
 * Role-targeted résumé variants.
 *
 * The site is one document; a résumé is seven, because the same three years of
 * work answers a frontend advert and an integration advert with different
 * evidence in a different order. What changes per role is emphasis, ordering and
 * selection — never the facts, which live in `portfolioData` and
 * `certificationsData` and are the source of truth for all of them.
 */
export type ResumeRoleId =
  | 'frontend'
  | 'backend'
  | 'integration'
  | 'full-stack'
  | 'java-full-stack'
  | 'react-full-stack'
  | 'angular-full-stack';

export type ResumeRoleGroup = 'General' | 'Specialized Full Stack';

/**
 * PDF for sending, plain text for pasting.
 *
 * Plenty of application forms ask you to paste the résumé into a textarea
 * rather than upload it, and every one of them shreds a PDF copy-paste: the
 * bullets arrive as boxes, the two-column role/date lines interleave, and the
 * hanging indents come through as stray spaces. The `.txt` build is the same
 * document rendered for that field — one column, 7-bit ASCII, no glyph the
 * form can fail to encode.
 */
export type ResumeFormat = 'pdf' | 'txt';

/**
 * A certification named on a résumé, referenced by id into
 * `certificationsData` rather than retyped.
 *
 * The reference is the point: title, issuer, date and verification URL all
 * come from the record, so a résumé cannot name a credential that does not
 * exist or print a date the site contradicts. The three optional fields exist
 * because some certificate titles are longer than a résumé line can spend
 * ("Phase-1: Implement OOPS using JAVA with Data Structures and Beyond") and
 * because two records carry detail the data model has no field for.
 */
export interface ResumeCertificationRef {
  /** Must match an entry in `certificationsData`. Validated at render time. */
  id: string;
  /** Shorter display title. Defaults to the certificate's own title. */
  label?: string;
  /** Overrides the printed date — used for the one multi-month programme. */
  date?: string;
  /** Parenthetical detail, e.g. "graduated with distinction". */
  note?: string;
}

/** One "Label: a, b, c" line in the Technical Skills block. */
export interface ResumeSkillRow {
  label: string;
  items: string[];
}

/**
 * Which named platform to print inside a role, and which of its bullets.
 *
 * Bullets are referenced by id into `resumeBullets` rather than written inline,
 * so a fact that appears on five résumés is authored and corrected once.
 */
export interface ResumePlatformSelection {
  id: string;
  points: string[];
}

export interface ResumeRole {
  id: ResumeRoleId;
  group: ResumeRoleGroup;
  /** Shown on the picker card and used in the download toast. */
  label: string;
  /** Filename fragment — `Rohit_Jha-Frontend_17-08-2026_1432.pdf`. */
  fileSlug: string;
  /** One line on the picker card: what this version leads with. */
  blurb: string;
  /** Printed under the name, in place of the site's generic role line. */
  headline: string;
  /** Role-specific professional summary. */
  summary: string;
  /** Technical Skills rows, already ordered most-relevant-first. */
  skills: ResumeSkillRow[];
  /** Role-level bullet ids for the Cateina entry, in print order. */
  cateinaPoints: string[];
  /** Named platforms to print under Cateina, in print order. */
  platforms: ResumePlatformSelection[];
  /** Role-level bullet ids for the Zeqon entry, in print order. */
  zeqonPoints: string[];
  /** Certifications to name, in print order, selected for what this role screens on. */
  certifications: ResumeCertificationRef[];
}
