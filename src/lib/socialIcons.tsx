import type { ComponentType } from 'react';
import {
  SiGithub,
  SiLeetcode,
  SiHackerearth,
  SiHackerrank,
  SiCodechef,
  SiCodeforces,
  SiGeeksforgeeks,
  SiKaggle,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { Phone, ExternalLink } from 'lucide-react';
import type { SocialIcon } from '@/types/site';

type IconComponent = ComponentType<{ className?: string }>;

const iconMap: Record<SocialIcon, IconComponent> = {
  github: SiGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  hackerearth: SiHackerearth,
  hackerrank: SiHackerrank,
  codechef: SiCodechef,
  codeforces: SiCodeforces,
  geeksforgeeks: SiGeeksforgeeks,
  kaggle: SiKaggle,
  phone: Phone,
};

/**
 * Brand accent colors for authentic badge rendering.
 */
export const platformColors: Record<
  SocialIcon,
  { bg: string; text: string; border: string; glow: string }
> = {
  github: {
    bg: 'bg-zinc-900 dark:bg-zinc-100',
    text: 'text-zinc-100 dark:text-zinc-900',
    border: 'border-zinc-700 dark:border-zinc-300',
    glow: 'shadow-zinc-500/20',
  },
  linkedin: {
    bg: 'bg-[#0a66c2]/10',
    text: 'text-[#0a66c2] dark:text-[#388bfd]',
    border: 'border-[#0a66c2]/30',
    glow: 'shadow-[#0a66c2]/20',
  },
  leetcode: {
    bg: 'bg-[#ffa116]/10',
    text: 'text-[#ffa116]',
    border: 'border-[#ffa116]/30',
    glow: 'shadow-[#ffa116]/20',
  },
  hackerearth: {
    bg: 'bg-[#323754]/10 dark:bg-[#5b6391]/20',
    text: 'text-[#323754] dark:text-[#9fa8da]',
    border: 'border-[#323754]/30',
    glow: 'shadow-[#323754]/20',
  },
  hackerrank: {
    bg: 'bg-[#2ec4b6]/10',
    text: 'text-[#2ec4b6]',
    border: 'border-[#2ec4b6]/30',
    glow: 'shadow-[#2ec4b6]/20',
  },
  codechef: {
    bg: 'bg-[#5b4638]/10 dark:bg-[#a67c52]/20',
    text: 'text-[#5b4638] dark:text-[#d4a373]',
    border: 'border-[#5b4638]/30',
    glow: 'shadow-[#5b4638]/20',
  },
  codeforces: {
    bg: 'bg-[#1f8acb]/10',
    text: 'text-[#1f8acb]',
    border: 'border-[#1f8acb]/30',
    glow: 'shadow-[#1f8acb]/20',
  },
  geeksforgeeks: {
    bg: 'bg-[#2f9d51]/10',
    text: 'text-[#2f9d51]',
    border: 'border-[#2f9d51]/30',
    glow: 'shadow-[#2f9d51]/20',
  },
  kaggle: {
    bg: 'bg-[#20beff]/10',
    text: 'text-[#20beff]',
    border: 'border-[#20beff]/30',
    glow: 'shadow-[#20beff]/20',
  },
  phone: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-500',
    border: 'border-emerald-500/30',
    glow: 'shadow-emerald-500/20',
  },
};

export function getSocialIcon(iconName: SocialIcon): IconComponent {
  return iconMap[iconName] ?? ExternalLink;
}
