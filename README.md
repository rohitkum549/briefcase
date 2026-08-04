# Portfolio

Rohit Kumar Jha's personal developer portfolio — a single-page site built with
React 19, TypeScript (strict), Tailwind CSS v4 and shadcn/ui.

## Stack

- **Runtime:** Node.js v24+
- **Framework/build:** React 19 + Vite + TypeScript (strict mode)
- **Styling/UI:** Tailwind CSS v4, shadcn/ui (Radix UI primitives, CSS variable theming), Lucide + react-icons (Simple Icons) icons
- **Résumé:** jsPDF generates an ATS-friendly PDF from the same content in `services/data/portfolioData.ts` — click "Download résumé" in the hero
- **Code quality:** ESLint (flat config) + Prettier, enforced on commit via Husky + lint-staged

## Getting started

```bash
npm install
cp .env.example .env   # then fill it in — see Environment variables below
npm run dev
```

The app runs at `http://localhost:5173`.

## Scripts

| Script                 | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the Vite dev server                |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run typecheck`    | Run `tsc` with no emit                   |
| `npm run lint`         | Run ESLint                               |
| `npm run format`       | Format the codebase with Prettier        |
| `npm run format:check` | Check formatting without writing changes |

## Environment variables

All configuration is exposed as type-safe `import.meta.env.VITE_*` variables
(see `src/config/env.ts` and `src/vite-env.d.ts`). For local development, copy
`.env.example` to `.env` and fill it in. In production these come from GitHub
repository variables — see [CI/CD](#cicd).

| Variable                | Purpose                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_NAME`        | Display name used across the site                                                                                     |
| `VITE_CONTACT_EMAIL`    | Contact email shown in the hero/contact sections                                                                      |
| `VITE_CONTACT_PHONE`    | Contact phone number                                                                                                  |
| `VITE_GITHUB_URL`       | GitHub profile link                                                                                                   |
| `VITE_LINKEDIN_URL`     | LinkedIn profile link                                                                                                 |
| `VITE_CONTACT_ENDPOINT` | Optional POST endpoint for the contact form. When unset, submissions are simulated and fall back to a `mailto:` link. |

Locally, a missing variable falls back to a deliberately fake placeholder from
`src/config/env.defaults.ts` (with a console warning) — so `Your Name` and a dead
GitHub link are the intended signal that config is absent, not a bug. For a
production build all of them except `VITE_CONTACT_ENDPOINT` are **required**:
`vite.config.ts` fails the build rather than publishing placeholders.

## Project structure

```text
src/
├── assets/
├── components/
│   ├── ui/          # shadcn/ui primitives (Button, Card, Skeleton, ...)
│   ├── layout/       # Header, Footer, MobileDrawer
│   ├── sections/     # Hero, Services, Projects, Stack, AiSystems, Experience, About, Contact
│   └── skeletons/     # Loading-state components matched to each section's layout
├── config/            # env.ts (typed env access), site.ts (nav/social/site config)
├── hooks/              # useTheme, useProjects, useScrollSpy, useDOMMeasure, useContactForm, ...
├── services/           # portfolioContentService, contactService (data-access abstraction)
├── types/              # Small, per-domain TypeScript interfaces
├── lib/                # cn() and other shared utilities
├── App.tsx
├── main.tsx
└── index.css
```

Components stay presentation-only; data fetching and state live in hooks,
which depend on the `services/` abstraction rather than on raw data — so the
static content in `services/data/portfolioData.ts` can be swapped for a real
API later without touching any component.

## Git hooks

Husky runs `lint-staged` on `pre-commit`, which lints and formats staged
`.ts`/`.tsx` files and formats other staged files (`.js`, `.json`, `.css`,
`.md`). Hooks are installed automatically via the `prepare` script on
`npm install`.

## CI/CD

Two GitHub Actions workflows live in `.github/workflows/`:

- **`ci.yml`** — on every push/PR to `main`: installs deps, then runs
  `typecheck`, `lint`, `format:check` and `build`. This is the quality gate;
  a red run means the same commands would fail locally too.
- **`deploy.yml`** — on every push to `main` (or manually via
  `workflow_dispatch`): builds the app and publishes `dist/` to GitHub Pages
  using the official `actions/{configure-pages,upload-pages-artifact,deploy-pages}`
  actions. No _secrets_ required — it authenticates with the repo's built-in
  `GITHUB_TOKEN` — but it does require the repository **variables** below, and
  refuses to build without them.

Because this repo (`rohitkum549/briefcase`) is a project site rather than a
`<user>.github.io` repo, `vite.config.ts` sets `base: '/briefcase/'` for
production builds so asset URLs resolve correctly once deployed. The site
then serves at `https://rohitkum549.github.io/briefcase/`.

**One-time setup before the first deploy runs:**

1. **Settings → Pages** and set **Source** to **GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables** and add these as
   **repository** variables (not environment variables — the build job declares
   no `environment:`, so environment-scoped variables would not reach it):

   | Variable             | Example                                    |
   | -------------------- | ------------------------------------------ |
   | `VITE_SITE_NAME`     | `Your Name`                                |
   | `VITE_CONTACT_EMAIL` | `you@example.com`                          |
   | `VITE_CONTACT_PHONE` | `+00 00000 00000`                          |
   | `VITE_GITHUB_URL`    | `https://github.com/your-username`         |
   | `VITE_LINKEDIN_URL`  | `https://www.linkedin.com/in/your-handle/` |

   `VITE_CONTACT_ENDPOINT` is optional; leave it unset and the contact form
   falls back to a mailto: message.

After that, every push to `main` redeploys automatically.

These are the single source of truth for the deployed site's identity — nothing
personal is hardcoded in `src/`. `vite.config.ts` validates the required set at
build time and the deploy workflow runs it with `STRICT_ENV=1`, so a missing or
renamed variable fails the workflow instead of publishing the placeholder
defaults from `src/config/env.ts`. For local development, `cp .env.example .env`
and fill it in; without it you will see `Your Name` and a dead GitHub link,
which is the intended signal that config is absent.

Note that `index.html` (meta tags and JSON-LD) is templated from the same
variables at build time, so structured data and share previews stay in step with
the site.
