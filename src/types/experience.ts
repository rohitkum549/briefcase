/**
 * A named piece of work inside a role. Rohit shipped three separate platforms
 * at one employer, so the projects nest under the role rather than becoming
 * their own entries — otherwise the company, dates and location repeat three
 * times and the résumé reads as job-hopping instead of growing scope.
 */
export interface ExperienceProject {
  id: string;
  name: string;
  /** Short qualifier, e.g. "FinTech · Open Banking". */
  kind: string;
  points: string[];
}

export interface ExperienceEntry {
  id: string;
  period: string;
  location: string;
  role: string;
  company: string;
  points: string[];
  /** Keyword line rendered under the role — also feeds the résumé PDF. */
  stack?: string[];
  /** Named platforms delivered within this role. */
  projects?: ExperienceProject[];
  /** Start/end as fractional years, for the timeline chart only. */
  span?: { from: number; to: number };
}
