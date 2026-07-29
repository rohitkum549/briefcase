export interface ExperienceEntry {
  id: string;
  period: string;
  location: string;
  role: string;
  company: string;
  points: string[];
  /** Keyword line rendered under the role — also feeds the résumé PDF. */
  stack?: string[];
}
