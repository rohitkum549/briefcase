/*
 * Runtime configuration. This file is the reader and validator — NOT the source.
 *
 * The real values live in GitHub -> Settings -> Secrets and variables -> Actions
 * -> Variables, and reach the bundle through the `env:` block on the build step
 * in .github/workflows. Nothing personal is hardcoded here on purpose: values
 * duplicated between code and CI drift apart silently, and that is precisely how
 * a placeholder `https://github.com/` once ended up on a published résumé.
 *
 * `defaults` below are deliberately fake. They exist so a fresh clone runs
 * without any setup, and so that seeing "Your Name" on a page is an unmistakable
 * signal that the variables did not load. A production build cannot fall back to
 * them by accident: vite.config.ts validates the required set at build time and
 * fails the deploy outright when one is missing.
 *
 * For local development with real values, copy .env.example to .env (gitignored)
 * and fill it in.
 */
import { ENV_DEFAULTS } from '@/config/env.defaults';

interface AppEnv {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  githubUrl: string;
  linkedinUrl: string;
  contactEndpoint: string | null;
}

// Mapped from the shared placeholder table rather than restated, so index.html
// and the app agree on what an unset variable renders as.
const defaults: Omit<AppEnv, 'contactEndpoint'> = {
  siteName: ENV_DEFAULTS.VITE_SITE_NAME,
  contactEmail: ENV_DEFAULTS.VITE_CONTACT_EMAIL,
  contactPhone: ENV_DEFAULTS.VITE_CONTACT_PHONE,
  githubUrl: ENV_DEFAULTS.VITE_GITHUB_URL,
  linkedinUrl: ENV_DEFAULTS.VITE_LINKEDIN_URL,
};

function readEnvVar(key: keyof ImportMetaEnv, fallback: string): string {
  const value = import.meta.env[key];
  if (typeof value === 'string' && value.trim().length > 0) return value;
  if (import.meta.env.DEV) {
    console.warn(`[env] "${key}" is not set, falling back to default value.`);
  }
  return fallback;
}

function buildEnv(): AppEnv {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
  return {
    siteName: readEnvVar('VITE_SITE_NAME', defaults.siteName),
    contactEmail: readEnvVar('VITE_CONTACT_EMAIL', defaults.contactEmail),
    contactPhone: readEnvVar('VITE_CONTACT_PHONE', defaults.contactPhone),
    githubUrl: readEnvVar('VITE_GITHUB_URL', defaults.githubUrl),
    linkedinUrl: readEnvVar('VITE_LINKEDIN_URL', defaults.linkedinUrl),
    contactEndpoint: endpoint && endpoint.trim().length > 0 ? endpoint : null,
  };
}

export const env: Readonly<AppEnv> = Object.freeze(buildEnv());
