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
cp .env.example .env   # optional — sensible defaults are used if omitted
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
(see `src/config/env.ts` and `src/vite-env.d.ts`). Copy `.env.example` to
`.env` to override any of them:

| Variable                | Purpose                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `VITE_SITE_NAME`        | Display name used across the site                                                                                     |
| `VITE_CONTACT_EMAIL`    | Contact email shown in the hero/contact sections                                                                      |
| `VITE_CONTACT_PHONE`    | Contact phone number                                                                                                  |
| `VITE_GITHUB_URL`       | GitHub profile link                                                                                                   |
| `VITE_LINKEDIN_URL`     | LinkedIn profile link                                                                                                 |
| `VITE_CONTACT_ENDPOINT` | Optional POST endpoint for the contact form. When unset, submissions are simulated and fall back to a `mailto:` link. |

None are required — the app falls back to sensible defaults (with a console
warning in dev) when a variable is missing.

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
  actions. No secrets required — it only uses the repo's built-in
  `GITHUB_TOKEN`.

Because this repo (`rohitkum549/briefcase`) is a project site rather than a
`<user>.github.io` repo, `vite.config.ts` sets `base: '/briefcase/'` for
production builds so asset URLs resolve correctly once deployed. The site
then serves at `https://rohitkum549.github.io/briefcase/`.

**One-time setup before the first deploy runs:** in the GitHub repo, go to
**Settings → Pages** and set **Source** to **GitHub Actions**. After that,
every push to `main` redeploys automatically.
