/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE BULLET POOL                                                        │
 * │                                                                         │
 * │  Every résumé line, authored once and keyed. Seven role variants draw    │
 * │  from this pool; none of them holds its own copy of a fact. Correct a    │
 * │  number here and all seven are correct.                                 │
 * │                                                                         │
 * │  PROVENANCE. Every entry traces to `portfolioData.ts` — which is itself  │
 * │  sourced from Rohit's LinkedIn and his own confirmed answers. Nothing    │
 * │  here introduces a technology, metric, employer or responsibility that   │
 * │  is not already in that file. Do not add one.                           │
 * │                                                                         │
 * │  WHY THE TEXT IS AUTHORED HERE rather than imported from                 │
 * │  `experience[].points`: several bullets exist in role-angled variants    │
 * │  (see `lynqx.components*`) that say the same true thing with a           │
 * │  different lead, because a React advert and an Angular advert read the   │
 * │  same sentence differently. This mirrors the precedent already set by    │
 * │  `resumeSummary`, which is deliberately separate from                    │
 * │  `heroContent.description` for the same reason.                         │
 * │                                                                         │
 * │  Variants of one fact share a prefix and are MUTUALLY EXCLUSIVE — never  │
 * │  print two of them on the same document, or the page says the same       │
 * │  thing twice and every repeated-phrase check fires.                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export const resumeBullets: Record<string, string> = {
  // ── Cateina, role level ────────────────────────────────────────────────
  // What Rohit did, as distinct from what he built. A résumé made only of
  // "Built X" scores zero on every leadership and communication check there is,
  // so at least one of these prints on every variant.
  'cateina.ai':
    'Introduced AI-assisted development and spec-driven tooling into how the team ships, then trained 3+ engineers to adopt it.',
  'cateina.stakeholders':
    'Collaborated with bank and client stakeholders to shape integration requirements, and presented releases to management.',
  'cateina.mentoring':
    "Reviewed teammates' code and mentored a new developer through onboarding.",
  // Leads with a verb like every other line here. It read "Three production
  // platforms in one role — ..." until an ATS pass over the wording: a bullet
  // that opens on a noun is the one a keyword-and-verb screen scores lowest,
  // and it was the only line on any of the seven that did it.
  'cateina.platforms':
    'Delivered three production platforms in one role — Lynqx, EPS and Starfish — across Open Banking, card payments and embedded finance.',
  // End-to-end ownership, for the four full-stack variants. Sourced from
  // heroContent ("schema to shipped screen") and the full-stack service entry.
  'cateina.ownership':
    'Owned features end to end — database schema, REST contract, then the rendered screen — without waiting on a contract another team had to define first.',

  // ── Lynqx ──────────────────────────────────────────────────────────────
  'lynqx.connectivity':
    'Built the connectivity layer from scratch, integrating 25+ banks, institutions and third-party providers across the US, EU and APAC.',

  // Three angles on one fact — 20+ components, 30+ screens, three frameworks.
  // Mutually exclusive.
  'lynqx.components':
    'Shipped 20+ reusable React 19 and TypeScript components (Dashboard, Account Linking, Webhooks, Balance) and 30+ embedded console screens spanning React, Next.js and Angular 19.',
  'lynqx.components.react':
    'Built a 20+ component React 19 and TypeScript library — Dashboard, Account Linking, Webhooks and Balance — reused across 30+ embedded console screens.',
  'lynqx.components.angular':
    'Delivered 30+ embedded console screens across Angular 19, React 19 and Next.js, on a shared 20+ component TypeScript library.',
  'lynqx.components.ui':
    'Shipped 20+ reusable TypeScript components and 30+ embedded console screens across React 19, Next.js and Angular 19, presenting every banking and system metric in one centralized view.',

  'lynqx.apis':
    'Developed 10+ REST APIs on Node.js and Express — Institutions, Balances, Schemes and Account Data — alongside Country, Product and Schema services.',
  'lynqx.temporal':
    'Orchestrated bank onboarding and customer consent flows with DSL-driven Temporal workflows.',
  'lynqx.gateway':
    'Configured APISIX gateway routing and security (routes, upstreams, consumers) and built SigNoz dashboards tracking p50/p95/p99 latency and errors.',
  'lynqx.billing':
    'Integrated Lago for billing — plans, customers and pricing workflows — and built Kottster, a UI-based tool for database creation and management.',
  // Data layer, pulled out of the billing bullet for the variants that need
  // PostgreSQL stated rather than implied.
  'lynqx.data':
    'Designed PostgreSQL schemas behind the Institutions, Balances and Account Data services, and built Kottster, a UI-based tool for database creation and management.',

  // ── EPS ────────────────────────────────────────────────────────────────
  'eps.flows':
    'Engineered ONUS and OFFUS payment flows handling 50K+ ATM transactions a day, with APIs for routing, bank deductions, reversals and rollbacks.',
  'eps.recon':
    'Automated reconciliation, eliminating over 90% of manual effort and reducing disputes.',

  // ── Starfish ───────────────────────────────────────────────────────────
  'starfish.psd2':
    'Delivered security and core modules for PSD2-compliant financial data exchange between corporates and banks.',

  // ── Zeqon ──────────────────────────────────────────────────────────────
  'zeqon.perf': 'Cut page load times by 56% through frontend performance work.',
  'zeqon.sites':
    'Launched 10+ client websites in Angular, JavaScript, HTML and CSS — Eduwego.in the flagship build.',
  // Angular-led phrasing of the same two facts, for the Angular variant, where
  // the framework belongs at the front of the line rather than mid-sentence.
  'zeqon.angular':
    'Launched 10+ Angular client websites — Eduwego.in the flagship build — cutting page load times by 56%.',
};

/** Resolve an ordered list of bullet ids to text, failing loudly on a typo. */
export function bulletsFor(ids: readonly string[]): string[] {
  return ids.map((id) => {
    const text = resumeBullets[id];
    if (!text) throw new Error(`Unknown résumé bullet id: ${id}`);
    return text;
  });
}
