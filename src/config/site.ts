import { env } from '@/config/env';
import type { SiteConfig, SocialLink } from '@/types/site';
import type { NavLink } from '@/types/nav';

export const siteConfig: SiteConfig = {
  name: env.siteName,
  // Matches his public LinkedIn headline. His formal HR title at Cateina is
  // Junior Software Developer, so "Senior" here would contradict the first
  // thing a recruiter checks.
  role: 'Full-Stack Engineer',
  discipline: 'Fintech & Open Banking',
  location: 'Mumbai, India',
  email: env.contactEmail,
  phone: env.contactPhone,
  githubUrl: env.githubUrl,
  linkedinUrl: env.linkedinUrl,
};

export const navLinks: NavLink[] = [
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'stack', label: 'Stack', href: '#stack' },
  { id: 'ai', label: 'AI', href: '#ai' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  // Goes live with the CurrentlyShipping section — see portfolioData.ts.
  // { id: 'now', label: 'Now', href: '#now' },
];

export const socialLinks: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: siteConfig.githubUrl, icon: 'github' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: siteConfig.linkedinUrl,
    icon: 'linkedin',
  },
  {
    id: 'phone',
    label: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, '')}`,
    icon: 'phone',
  },
];
