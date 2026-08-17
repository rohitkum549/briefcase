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
  /** The Certifications line, selected for what this role screens on. */
  certificationsLine: string;
}
