import type { ComponentType } from 'react';
import {
  SiReact,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiDocker,
  SiGit,
  SiGitlab,
  SiPostgresql,
  SiMongodb,
  SiPostman,
  SiTemporal,
  SiCoolify,
  SiJira,
  SiHtml5,
} from 'react-icons/si';

type IconComponent = ComponentType<{ className?: string }>;

/** Keyed by the exact tag/item text used in portfolioData.ts, uppercased. */
const iconsByName: Record<string, IconComponent> = {
  REACT: SiReact,
  'REACT 19': SiReact,
  TYPESCRIPT: SiTypescript,
  'NODE.JS': SiNodedotjs,
  EXPRESS: SiExpress,
  'EXPRESS.JS': SiExpress,
  DOCKER: SiDocker,
  GIT: SiGit,
  GITLAB: SiGitlab,
  POSTGRESQL: SiPostgresql,
  MONGODB: SiMongodb,
  POSTMAN: SiPostman,
  TEMPORAL: SiTemporal,
  COOLIFY: SiCoolify,
  JIRA: SiJira,
  'HTML & CSS': SiHtml5,
};

/** No official brand icon shipped in react-icons/simple-icons for these — rendered as monogram badges instead. */
export function getTechIcon(name: string): IconComponent | null {
  return iconsByName[name.trim().toUpperCase()] ?? null;
}
