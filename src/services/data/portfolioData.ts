import type { HeroContent } from '@/types/hero';
import type { Service } from '@/types/service';
import type { Project } from '@/types/project';
import type { CapabilityGroup } from '@/types/capability';
import type { AiStage, AiPrinciple } from '@/types/ai-system';
import type { ExperienceEntry } from '@/types/experience';
import type { AboutFact } from '@/types/about';
import type { CurrentlyShippingItem } from '@/types/currently-shipping';

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SOURCE OF TRUTH                                                        │
 * │                                                                         │
 * │  Everything in this file traces to one of two sources:                  │
 * │    1. Rohit's LinkedIn profile (roles, dates, platforms, all figures)   │
 * │    2. Tools Rohit named himself when briefing this build                │
 * │                                                                         │
 * │  An earlier revision of this file was largely invented — fabricated     │
 * │  projects, the wrong university, and ~15 placeholder metrics. Do not    │
 * │  add a number here to fill a gap. If a claim has no source, cut it.     │
 * │                                                                         │
 * │  The figures added for ATS scoring — 25+ institutions on Lynqx, 50K+    │
 * │  ATM transactions a day, ~90% of manual reconciliation removed — and    │
 * │  the stakeholder, mentoring and AI-tooling bullets on the Cateina role  │
 * │  are all Rohit's own answers, confirmed directly. Nothing was inferred. │
 * │                                                                         │
 * │  STILL NEEDS ROHIT'S CONFIRMATION:                                      │
 * │    · Location. LinkedIn's header says "Greater Kolkata Area" but the    │
 * │      Cateina role says Mumbai. Currently showing Mumbai.                │
 * │    · Role title shows "Full-Stack Engineer" (his LinkedIn headline).    │
 * │      His formal HR title is Junior Software Developer.                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export const heroContent: HeroContent = {
  eyebrow: 'Full-stack engineer · Fintech & Open Banking',
  heading: 'I build the platforms banks connect through.',
  description:
    "I'm Rohit — a full-stack engineer working in fintech and Open Banking. I built Lynqx at Cateina from scratch: a financial connectivity platform linking banks, institutions and third-party services across the US, EU and APAC. React 19, Next.js and Angular 19 on the front, Node.js and Express behind it, Temporal for the flows that must not fail, and PostgreSQL underneath. Frontend is where I'm strongest, but I own the feature end to end — schema to shipped screen.",
  stats: [
    { id: 'years', value: '3+', label: 'Years shipping' },
    { id: 'platforms', value: '3', label: 'Fintech platforms' },
    { id: 'screens', value: '30+', label: 'Console screens' },
  ],
};

/**
 * Résumé summary — deliberately not `heroContent.description`.
 *
 * The hero paragraph is conversational because it opens a web page; a résumé
 * summary is read in about four seconds by someone holding forty of them, so it
 * leads with the role, the domain and the single biggest thing shipped. Keeping
 * them separate also means editing the site's voice can't quietly push the
 * résumé onto a second page.
 */
export const resumeSummary =
  'Full-stack engineer with 3+ years in fintech, shipping three production platforms in one role — Open Banking connectivity, ATM payment processing and embedded finance. Took Lynqx from an empty repository to production, serving 25+ banks and institutions. Strongest on the frontend, owning features from schema to shipped screen across React 19, Node.js and PostgreSQL.';

export const services: Service[] = [
  {
    id: 'frontend',
    no: '01',
    title: 'Frontend engineering',
    body: 'Reusable component libraries in React 19 and TypeScript, plus Next.js and Angular 19 where a product already lives there. SPA architecture for navigation that never blocks on a round trip, and interfaces dense enough for financial data without becoming unreadable.',
  },
  {
    id: 'full-stack',
    no: '02',
    title: 'Full-stack product delivery',
    body: 'REST APIs on Node.js and Express over PostgreSQL, typed the whole way through to the rendered component. Owning both ends means a feature never stalls waiting on a contract someone else has to define first.',
  },
  {
    id: 'fintech',
    no: '03',
    title: 'Fintech & Open Banking integration',
    body: 'Bank onboarding and consent flows as durable Temporal workflows, traffic through an APISIX gateway, billing through Lago, and transaction reconciliation that resolves itself instead of landing in someone’s inbox. Money movement is unforgiving about partial failure, so none of it is best-effort.',
  },
  {
    id: 'ai-engineering',
    no: '04',
    title: 'AI-assisted engineering',
    body: 'Spec-driven delivery with Claude Code and Spec Kit — wireframe to shipped UI — over a Model Context Protocol toolchain. The work that repeats gets packaged as a reusable skill so it runs the same way every time instead of being rebuilt by hand.',
  },
];

export const projects: Project[] = [
  {
    id: 'lynqx',
    index: '01',
    kind: 'Full-stack',
    title: 'Lynqx — Open Banking platform',
    desc: 'Built from scratch. A financial connectivity and research platform linking banks, institutions and third-party services across the US, EU and APAC — so teams can evaluate and compare Open Banking providers on payments, financial data access, corporate treasury and scalability.',
    tags: ['React 19', 'Node.js', 'Temporal', 'PostgreSQL'],
    impact: 'Built from scratch — US, EU and APAC connectivity',
    visual: 'integration-mesh',
  },
  {
    id: 'lynqx-console',
    index: '02',
    kind: 'Frontend',
    title: 'Lynqx console UI',
    desc: '30+ embedded console screens across React, Next.js and Angular 19, built on 20+ reusable TypeScript components — Dashboard, Account Linking, Webhooks, Balance and Institutions — with one centralized view for every banking and system metric.',
    tags: ['React 19', 'Next.js', 'Angular 19', 'ShadCN'],
    impact: '20+ components · 30+ screens · 10+ REST APIs',
    visual: 'api-surface',
  },
  {
    id: 'eps-atm',
    index: '03',
    kind: 'Backend',
    title: 'EPS — ATM transaction processing',
    desc: 'High-volume ATM transaction and reconciliation system on Node.js v22, handling both ONUS and OFFUS flows with APIs for routing, bank deductions, reversals and rollbacks.',
    tags: ['Node.js v22', 'Payments', 'Reconciliation'],
    impact: 'Automated reconciliation, cutting disputes and manual work',
    visual: 'txn-flow',
  },
  {
    id: 'starfish',
    index: '04',
    kind: 'Backend',
    title: 'Starfish — embedded finance platform',
    desc: 'Security and core functional modules for an enterprise embedded-finance connectivity platform, enabling PSD2-compliant financial data exchange between corporates and banks over API-driven workflows.',
    tags: ['B2B SaaS', 'PSD2', 'API security'],
    impact: 'PSD2-compliant corporate-to-bank exchange',
    visual: 'security-layers',
  },
  {
    id: 'kottster',
    index: '05',
    kind: 'Tooling',
    title: 'Kottster — database management UI',
    desc: 'A UI-based tool for creating and managing databases, built to replace hand-written migrations and ad-hoc SQL for routine schema work.',
    tags: ['Internal tooling', 'PostgreSQL', 'DX'],
    impact: 'Schema work without leaving the browser',
    visual: 'schema-grid',
  },
  {
    id: 'eduwego',
    index: '06',
    kind: 'Frontend',
    title: 'Eduwego & client web platforms',
    desc: '10+ websites at Zeqon in Angular, JavaScript, HTML and CSS — dynamic, interactive interfaces with a sustained focus on render and load performance. Eduwego.in was the flagship build.',
    tags: ['Angular', 'JavaScript', 'Web performance'],
    impact: '56% faster load times',
    visual: 'perf-delta',
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    id: 'frontend',
    group: 'Frontend',
    items: [
      'React 19',
      'Next.js',
      'Angular 19',
      'TypeScript',
      'ShadCN',
      'Tailwind CSS',
    ],
  },
  {
    id: 'backend',
    group: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'REST API design',
      'PostgreSQL',
      'Supabase',
      'Schema design',
    ],
  },
  {
    id: 'fintech',
    group: 'Fintech & Open Banking',
    items: [
      'Bank onboarding',
      'Consent flows',
      'Payment routing',
      'Reconciliation',
      'Institution APIs',
      'Lago billing',
    ],
  },
  {
    id: 'integration',
    group: 'Integration & workflows',
    items: ['Temporal', 'APISIX', 'Kuma', 'Keycloak', 'Webhooks', 'JWT auth'],
  },
  {
    id: 'delivery',
    group: 'Delivery & observability',
    items: ['Docker', 'GitLab CI/CD', 'Coolify', 'SigNoz', 'Postman', 'Jira'],
  },
  {
    id: 'ai',
    group: 'AI-assisted engineering',
    items: [
      'Claude Code',
      'Spec-driven development',
      'MCP integration',
      'Agent orchestration',
      'LLM tool calling',
      'Workflow automation',
    ],
  },
];

export const aiStages: AiStage[] = [
  {
    id: 'spec',
    step: '01',
    label: 'SPEC',
    title: 'Written spec',
    sub: 'Spec Kit · versioned',
  },
  {
    id: 'agent',
    step: '02',
    label: 'AGENT',
    title: 'Claude Code',
    sub: 'Wireframe to UI',
  },
  {
    id: 'mcp',
    step: '03',
    label: 'MCP LAYER',
    title: 'Typed tool calls',
    sub: '7 servers · real systems',
  },
  {
    id: 'orchestration',
    step: '04',
    label: 'ORCHESTRATION',
    title: 'Temporal · Zigflow',
    sub: 'Durable · idempotent',
  },
  {
    id: 'delivery',
    step: '05',
    label: 'DELIVERY',
    title: 'Deploy via GitLab MCP',
    sub: 'Traced in SigNoz',
  },
];

export const aiPrinciples: AiPrinciple[] = [
  {
    id: 'spec-driven',
    title: 'Spec-driven',
    body: 'Every change starts as a written, reviewable spec — not a prompt guess.',
  },
  {
    id: 'tool-grounded',
    title: 'Tool-grounded',
    body: 'Agents act through typed MCP servers against real systems, never blind shell commands.',
  },
  {
    id: 'durable',
    title: 'Durable',
    body: 'Multi-step processes run on Temporal and Zigflow: retryable, resumable, idempotent.',
  },
  {
    id: 'repeatable',
    title: 'Repeatable',
    body: 'Work that recurs becomes a reusable skill, so it runs identically every time.',
  },
];

/**
 * The award. It leads the Recognition section on the site and gets its own
 * résumé section, because it is the only credential here that an employer
 * awarded rather than a course issuing on completion.
 *
 * Every field is read off the certificate Rohit received — including `citation`,
 * which is verbatim. An earlier revision of this file attributed the award to
 * "ownership and technical contribution on Lynqx"; the certificate says
 * otherwise, and the certificate is the source.
 */
export const award = {
  title: 'Tech Ninja Pro',
  org: 'Cateina Technologies',
  issuedOn: '1 February 2026',
  shortDate: 'Feb 2026',
  signedBy: 'Rajish Rajan',
  signedByRole: 'Chief Executive Officer',
  /** Verbatim from the certificate. */
  citation: 'For integrating AI workflows and introducing automation.',
  /** Lower-case fragment for mid-sentence use (résumé, experience bullet). */
  reason: 'integrating AI workflows and introducing automation',
  /** Rohit's own announcement — the closest thing to a public verify link. */
  postUrl:
    'https://www.linkedin.com/feed/update/urn:li:activity:7424189876302028800/',
};

export const experience: ExperienceEntry[] = [
  {
    id: 'cateina',
    period: 'Jan 2024 — Present',
    location: 'Mumbai, India',
    role: 'Full-Stack Engineer',
    company: 'Cateina Technologies Pvt. Ltd',
    span: { from: 2024.0, to: 2026.58 },
    stack: [
      'React 19',
      'Next.js',
      'Angular 19',
      'TypeScript',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Temporal',
      'APISIX',
      'SigNoz',
      'Lago',
    ],
    /*
     * Role-level points carry what the project bullets structurally cannot: the
     * things Rohit did rather than the things he built. Every one of these is
     * confirmed by him directly — the AI tooling he introduced and taught, the
     * bank and client stakeholder work, the reviews and the mentoring.
     *
     * Order matters twice over. The résumé prints the first MAX_ROLE_BULLETS of
     * this array (see resumeService), so the three confirmed ownership facts sit
     * first and the platform count last — that one is on the résumé already, in
     * the summary line, and repeating it here would cost a bullet and trip a
     * repetition check.
     *
     * Note what the first bullet does NOT say: "AI workflows" and "automation".
     * Those exact words are the award citation, quoted in the résumé's Awards
     * section, and a checker that flags repeated phrases does not care that the
     * two mentions are 30 lines apart.
     */
    points: [
      'Introduced AI-assisted development and spec-driven tooling into how the team ships, then trained 3+ engineers to adopt it.',
      'Collaborated with bank and client stakeholders to shape integration requirements, and presented releases to management.',
      "Reviewed teammates' code and mentored a new developer through onboarding.",
      'Three production platforms in one role — Lynqx, EPS and Starfish — across Open Banking, card payments and embedded finance.',
    ],
    projects: [
      {
        id: 'lynqx',
        name: 'Lynqx',
        kind: 'Open Banking research & integration platform · FinTech',
        points: [
          'Built the connectivity layer from scratch, integrating 25+ banks, institutions and third-party providers across the US, EU and APAC.',
          'Shipped 20+ reusable React 19 and TypeScript components (Dashboard, Account Linking, Webhooks, Balance) and 30+ embedded console screens spanning React, Next.js and Angular 19.',
          'Developed 10+ REST APIs on Node.js and Express — Institutions, Balances, Schemes and Account Data — alongside Country, Product and Schema services.',
          'Orchestrated bank onboarding and customer consent flows with DSL-driven Temporal workflows.',
          'Configured APISIX gateway routing and security (routes, upstreams, consumers) and built SigNoz dashboards tracking p50/p95/p99 latency and errors.',
          'Integrated Lago for billing — plans, customers and pricing workflows — and built Kottster, a UI-based tool for database creation and management.',
        ],
      },
      {
        id: 'eps',
        name: 'EPS',
        kind: 'ATM transaction processing & reconciliation · Core Banking',
        points: [
          'Engineered ONUS and OFFUS payment flows handling 50K+ ATM transactions a day, with APIs for routing, bank deductions, reversals and rollbacks.',
          'Automated reconciliation, eliminating over 90% of manual effort and reducing disputes.',
        ],
      },
      {
        id: 'starfish',
        name: 'Starfish Digital Domain',
        kind: 'Enterprise embedded finance platform · B2B SaaS',
        points: [
          'Delivered security and core modules for PSD2-compliant financial data exchange between corporates and banks.',
        ],
      },
    ],
  },
  {
    id: 'zeqon',
    period: 'Apr 2023 — Dec 2023',
    location: 'Kolkata, India',
    role: 'Web Developer',
    company: 'Zeqon Technologies Pvt Ltd',
    span: { from: 2023.25, to: 2023.99 },
    stack: ['Angular', 'JavaScript', 'HTML & CSS'],
    // Strongest first. The résumé caps how many bullets it prints per role, so
    // the order here decides what survives the cut — see resumeService.
    //
    // A third point used to sit here: "Built dynamic, interactive interfaces in
    // Angular, improving the overall user experience." It went because it says
    // nothing the two above don't — no metric, no specific system, and "improving
    // the overall user experience" is the kind of phrase résumé scorers count as
    // filler. Two real bullets beat three where one is padding.
    points: [
      'Cut page load times by 56% through frontend performance work.',
      'Launched 10+ client websites in Angular, JavaScript, HTML and CSS — Eduwego.in the flagship build.',
    ],
  },
  {
    id: 'education',
    period: '2019 — 2022',
    location: 'Kolkata, India',
    role: 'B.Tech, Computer Science Engineering',
    company: 'Future Institute of Engineering & Management',
    points: [
      'Diploma in Computer Science Technology — Swami Vivekananda Institute of Science & Technology (2016 — 2019).',
    ],
  },
];

export const aboutText =
  "Three years in, most of what I've built moves money or the data behind it — Open Banking connectivity, card transaction reconciliation, corporate-to-bank exchange. That work teaches you to care about the third retry, the partial failure, the reconciliation that has to balance at the end of the day. Frontend is where I'm strongest and where I started, but fintech doesn't let you stop at the API boundary, so I didn't. Off the keyboard: AI tooling, podcasts and games with genuinely good systems design.";

export const aboutFacts: AboutFact[] = [
  {
    id: 'education',
    label: 'Education',
    value: 'B.Tech, CSE — FIEM (2022)',
  },
  { id: 'based-in', label: 'Based in', value: 'Mumbai, India' },
  { id: 'languages', label: 'Languages', value: 'English · Hindi · Bengali' },
  {
    id: 'currently',
    label: 'Currently',
    value: 'Full-Stack Engineer @ Cateina',
  },
];

/*
 * Reserved slot for in-flight work — see CurrentlyShipping.tsx. The section is
 * built but deliberately not mounted in App.tsx yet: an empty section on a live
 * portfolio reads as unfinished, so it stays off until there's real content.
 *
 * To go live: fill this array, uncomment the <CurrentlyShipping /> line in
 * App.tsx and the matching navLinks entry in config/site.ts. Nothing else.
 */
export const currentlyShipping: CurrentlyShippingItem[] = [];

/** Handwritten sticky notes in the About section — the human layer. */
export const stickyNotes = [
  {
    id: 'debug',
    text: 'Best debugging tool ever built: explaining it out loud to someone else.',
    tone: 'amber' as const,
  },
  {
    id: 'reconcile',
    text: 'In payments, "mostly worked" is just a bug you haven’t found yet.',
    tone: 'teal' as const,
  },
  {
    id: 'reading',
    text: 'Currently reading: Designing Data-Intensive Applications (again)',
    tone: 'pink' as const,
  },
];

export const stackTags = [
  'REACT 19',
  'NEXT.JS',
  'ANGULAR 19',
  'TYPESCRIPT',
  'SHADCN',
  'TAILWIND CSS',
  'NODE.JS',
  'EXPRESS',
  'POSTGRESQL',
  'SUPABASE',
  'TEMPORAL',
  'APISIX',
  'KUMA',
  'LAGO',
  'SIGNOZ',
  'DOCKER',
  'GITLAB',
  'COOLIFY',
  'POSTMAN',
  'JIRA',
  'CLAUDE CODE',
  'GIT',
  'CI/CD',
];
