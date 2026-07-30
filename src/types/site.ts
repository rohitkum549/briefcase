export type SocialIcon = 'github' | 'linkedin' | 'phone';

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: SocialIcon;
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
}
