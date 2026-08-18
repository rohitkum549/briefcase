export type SocialIcon =
  | 'github'
  | 'linkedin'
  | 'leetcode'
  | 'hackerearth'
  | 'hackerrank'
  | 'codechef'
  | 'codeforces'
  | 'geeksforgeeks'
  | 'kaggle'
  | 'phone';

export type PlatformCategory = 'social' | 'coding' | 'competitive' | 'contact';

export interface SocialLink {
  id: string;
  label: string;
  handle?: string;
  href: string;
  icon: SocialIcon;
  category?: PlatformCategory;
  accentColor?: string;
  badge?: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  /** Domain qualifier shown beside the role, e.g. on the résumé letterhead. */
  discipline: string;
  location: string;
  email: string;
  phone: string;
  githubUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  hackerearthUrl: string;
  hackerrankUrl: string;
  codechefUrl: string;
  codeforcesUrl: string;
  geeksforgeeksUrl: string;
  kaggleUrl: string;
}
