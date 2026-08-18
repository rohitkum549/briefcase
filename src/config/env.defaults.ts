/**
 * Placeholder fallbacks for the VITE_* config, keyed by variable name.
 *
 * Deliberately fake. Real values live in GitHub repository variables (see
 * README) and reach the bundle through the build step's `env:` block. These
 * exist only so a fresh clone runs with no setup, and so that seeing "Your Name"
 * on a page is an unmistakable signal that the variables did not load.
 *
 * Shared on purpose: src/config/env.ts consumes these in the browser, and
 * vite.config.ts consumes them at build time to template index.html. Keeping one
 * copy means the page metadata and the rendered app can never disagree about
 * what "unset" looks like.
 */
export const ENV_DEFAULTS = {
  VITE_SITE_NAME: 'Your Name',
  VITE_CONTACT_EMAIL: 'you@example.com',
  VITE_CONTACT_PHONE: '+00 00000 00000',
  VITE_GITHUB_URL: 'https://github.com/rohitkum549',
  VITE_LINKEDIN_URL: 'https://www.linkedin.com/in/rohitkumarjha549/',
  VITE_LEETCODE_URL: 'https://leetcode.com/u/rohitkum549/',
  VITE_HACKEREARTH_URL: 'https://www.hackerearth.com/@rohitkum549',
  VITE_HACKERRANK_URL: 'https://www.hackerrank.com/rohitkum549',
  VITE_CODECHEF_URL: 'https://www.codechef.com/users/rohitkum549',
  VITE_CODEFORCES_URL: 'https://codeforces.com/profile/rohitkum549',
  VITE_GEEKSFORGEEKS_URL: 'https://www.geeksforgeeks.org/user/rohitkum549/',
  VITE_KAGGLE_URL: 'https://www.kaggle.com/rohitkum549',
} as const;

export type EnvDefaultKey = keyof typeof ENV_DEFAULTS;
