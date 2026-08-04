import path from 'node:path';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ENV_DEFAULTS, type EnvDefaultKey } from './src/config/env.defaults.ts';

/**
 * Variables that must be present for a production build to be publishable.
 *
 * VITE_CONTACT_ENDPOINT is intentionally absent: when it is unset the contact
 * form falls back to a mailto: message, which is a supported state rather than
 * a misconfiguration.
 */
const REQUIRED_ENV = [
  'VITE_SITE_NAME',
  'VITE_CONTACT_EMAIL',
  'VITE_CONTACT_PHONE',
  'VITE_GITHUB_URL',
  'VITE_LINKEDIN_URL',
] as const;

/*
 * Fail the build when config is missing, instead of publishing placeholders.
 *
 * src/config/env.ts falls back to obviously-fake defaults so a fresh clone still
 * runs, which is right for development and dangerous for a deploy — a renamed or
 * deleted repository variable would otherwise put "Your Name" on the live site
 * with a green checkmark. This check has to live here rather than in env.ts:
 * env.ts is evaluated in the browser, so throwing there yields a blank page for
 * visitors, where throwing here yields a red X on the workflow and no deploy.
 *
 * Strict mode is opt-in via STRICT_ENV=1, set on the deploy workflow only.
 * ci.yml deliberately runs lenient, because GitHub withholds variables from pull
 * requests opened from forks and those builds still have to pass.
 */
function assertEnv(env: Record<string, string>, strict: boolean) {
  const missing = REQUIRED_ENV.filter((key) => !env[key]?.trim());
  if (missing.length === 0) return;

  const detail = missing.join(', ');
  if (strict) {
    throw new Error(
      `Missing required environment variable(s): ${detail}.\n` +
        'Set them under Settings -> Secrets and variables -> Actions -> Variables, ' +
        'and check the build step in .github/workflows passes them through. ' +
        'Refusing to build: the site would publish placeholder contact details.',
    );
  }
  console.warn(
    `[vite] building WITHOUT ${detail} — falling back to the placeholder ` +
      'defaults in src/config/env.ts. Fine for CI and forks, never for a deploy.',
  );
}

/*
 * Templates %VITE_*% placeholders in index.html from the resolved environment.
 *
 * index.html is static: it is not part of the module graph, so `import.meta.env`
 * cannot reach the <title>, the OpenGraph tags or the JSON-LD block. Left
 * hardcoded, those keep stale contact details after a repository variable
 * changes — the search result and the share preview quietly disagree with the
 * site. Vite's own %VAR% substitution is not used here because it has no
 * fallback for an unset variable; this resolves through the same placeholder
 * table the app falls back to, so metadata and UI always tell the same story.
 */
function htmlEnv(env: Record<string, string>): Plugin {
  return {
    name: 'html-env',
    transformIndexHtml(html) {
      return html.replace(/%(VITE_[A-Z_]+)%/g, (whole, key: string) => {
        const value =
          env[key]?.trim() || ENV_DEFAULTS[key as EnvDefaultKey] || '';
        if (!value) return whole;
        // One of these values is interpolated into a JSON-LD <script> block,
        // where HTML entities are NOT decoded — so escaping would corrupt the
        // JSON. Quotes and angle brackets are stripped instead. No legitimate
        // name, email or URL contains them.
        return value.replace(/["'<>\\]/g, '');
      });
    },
  };
}

// Served from https://rohitkum549.github.io/briefcase/ in production (GitHub
// Pages project site), so assets need the repo name as the base path there.
export default defineConfig(({ command, mode }) => {
  // Merges .env files with prefixed variables already in process.env, which is
  // how the values arrive on a runner — Actions sets real env vars, not files.
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  if (command === 'build') {
    assertEnv(env, process.env.STRICT_ENV === '1');
  }

  return {
    base: command === 'build' ? '/briefcase/' : '/',
    plugins: [react(), tailwindcss(), htmlEnv(env)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
