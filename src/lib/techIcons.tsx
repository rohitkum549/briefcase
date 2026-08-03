import type { ComponentType } from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiTypescript,
  SiShadcnui,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSupabase,
  SiTemporal,
  SiKeycloak,
  SiKuma,
  SiDocker,
  SiGit,
  SiGitlab,
  SiCoolify,
  SiPostman,
  SiJira,
  SiClaude,
  SiOpentelemetry,
  SiHtml5,
  SiUdemy,
  SiHackerrank,
} from 'react-icons/si';

type IconComponent = ComponentType<{ className?: string }>;

/** Keyed by the exact tag/item text used in portfolioData.ts, uppercased. */
const iconsByName: Record<string, IconComponent> = {
  REACT: SiReact,
  'REACT 19': SiReact,
  'NEXT.JS': SiNextdotjs,
  ANGULAR: SiAngular,
  'ANGULAR 19': SiAngular,
  TYPESCRIPT: SiTypescript,
  SHADCN: SiShadcnui,
  'TAILWIND CSS': SiTailwindcss,
  'NODE.JS': SiNodedotjs,
  'NODE.JS V22': SiNodedotjs,
  EXPRESS: SiExpress,
  'EXPRESS.JS': SiExpress,
  POSTGRESQL: SiPostgresql,
  SUPABASE: SiSupabase,
  TEMPORAL: SiTemporal,
  KEYCLOAK: SiKeycloak,
  KUMA: SiKuma,
  DOCKER: SiDocker,
  GIT: SiGit,
  GITLAB: SiGitlab,
  COOLIFY: SiCoolify,
  POSTMAN: SiPostman,
  JIRA: SiJira,
  'CLAUDE CODE': SiClaude,
  OPENTELEMETRY: SiOpentelemetry,
  'HTML & CSS': SiHtml5,
  // Certification issuers.
  UDEMY: SiUdemy,
  HACKERRANK: SiHackerrank,
};

/**
 * No official brand icon shipped in react-icons/simple-icons for these — they
 * fall through to a monogram badge instead: APISIX, SigNoz, Zigflow, Lago,
 * Simplilearn and Playwright (`SiPlaywright`, `SiLago` and `SiSimplilearn` do
 * not exist in react-icons 5.x — each export was checked before importing).
 *
 * MongoDB, Redis and Nginx were removed along with the capability items that
 * referenced them — those were never part of Rohit's actual stack.
 */
export function getTechIcon(name: string): IconComponent | null {
  return iconsByName[name.trim().toUpperCase()] ?? null;
}
