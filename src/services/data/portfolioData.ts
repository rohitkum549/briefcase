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
 * │  VERIFY BEFORE YOU SEND THIS ANYWHERE                                   │
 * │                                                                         │
 * │  Every number below is a realistic placeholder, not a measurement.      │
 * │  Replace each one with your real figure (or soften the claim) before    │
 * │  this résumé goes to a recruiter. Search this file for these values:    │
 * │                                                                         │
 * │    heroContent.stats   12+ platforms · 99.9% uptime                     │
 * │    experience/cateina  4 platforms · 12k MAU · p95 820ms→450ms ·        │
 * │                        6 services · 30+ endpoints · 90% retry work ·    │
 * │                        MTTR hours→20min · 15+ deploys/week · 4 mentees  │
 * │    experience/early    20+ features · build time 60%                    │
 * │    projects[].impact   every figure                                     │
 * │                                                                         │
 * │  One CLAIM also needs your sign-off, not just a number:                 │
 * │    experience/early bullet 3 — rewritten away from the old (inaccurate) │
 * │    RAG-assistant claim. Confirm it matches what you actually did in     │
 * │    2023–24, or replace it outright.                                     │
 * │                                                                         │
 * │  Anything you can't stand behind in an interview, cut. A vague true     │
 * │  bullet beats a precise one you can't defend.                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export const heroContent: HeroContent = {
  eyebrow: 'Senior full-stack engineer · Distributed systems · AI platforms',
  heading: 'I architect systems that survive production.',
  description:
    "I'm Rohit — a senior full-stack engineer who owns delivery end to end: React 19 and TypeScript on the front, Node.js services behind an APISIX gateway, durable Temporal and Zigflow workflows for anything that must not fail, and OpenTelemetry tracing so we find problems before users report them. I run our AI-assisted delivery layer — spec-driven development with Claude Code and Spec Kit over an integrated Model Context Protocol (MCP) toolchain — set the standards my team codes to, and care most about the decisions that never show up in a screenshot.",
  stats: [
    { id: 'years', value: '3+', label: 'Years in production' },
    { id: 'systems', value: '12+', label: 'Platforms shipped' },
    { id: 'uptime', value: '99.9%', label: 'Uptime maintained' },
  ],
};

export const services: Service[] = [
  {
    id: 'architecture',
    no: '01',
    title: 'Architecture & distributed systems',
    body: 'Service boundaries, data models and API contracts that scale from first users to real traffic without a rewrite. I design for the failure modes — idempotency, retries, backpressure — and document the decisions so the next engineer inherits reasoning, not archaeology.',
  },
  {
    id: 'product-engineering',
    no: '02',
    title: 'Full-stack product delivery',
    body: 'End-to-end ownership across React 19, TypeScript and Node.js — schema to accessible UI — so features never stall at a handoff. Typed contracts from database row to rendered component mean refactors are safe and regressions surface at compile time.',
  },
  {
    id: 'platform',
    no: '03',
    title: 'Platform, delivery & observability',
    body: 'Containerized services, gateway-managed traffic and CI/CD pipelines that make deploys boring. Distributed tracing and RED-metric dashboards wired in from day one — because you cannot operate what you cannot see, and MTTR is a design decision.',
  },
  {
    id: 'ai-engineering',
    no: '04',
    title: 'AI-assisted engineering',
    body: 'Spec-driven delivery with Claude Code and Spec Kit — wireframe to shipped UI — over a Model Context Protocol toolchain where Keycloak, APISIX, GitLab, Playwright, Supabase, SigNoz and Zigflow are all callable from one place. Multi-step processes like employee onboarding and offboarding run as durable Temporal and Zigflow workflows, and the work that repeats gets packaged as a reusable skill so it executes identically every time instead of being rebuilt by hand.',
  },
];

export const projects: Project[] = [
  {
    id: 'treasury-dashboard',
    index: '01',
    kind: 'Full-stack',
    title: 'Treasury operations platform',
    desc: 'React 19 front end over Node.js REST APIs and PostgreSQL — real-time balance reconciliation, server-driven filtering and role-based access control across four business units.',
    tags: ['React 19', 'Node.js', 'PostgreSQL', 'RBAC'],
    impact: 'Cut daily reconciliation from 3 hours to under 10 minutes',
  },
  {
    id: 'payments-service',
    index: '02',
    kind: 'Backend',
    title: 'Payments orchestration service',
    desc: 'Node.js service normalizing seven bank statement formats into one ledger schema, with durable Temporal workflows handling retries, partial failures and automated compensation.',
    tags: ['Temporal', 'Node.js', 'Idempotency'],
    impact: 'Eliminated ~90% of manual retry intervention',
  },
  {
    id: 'gateway-platform',
    index: '03',
    kind: 'DevOps',
    title: 'API gateway & delivery platform',
    desc: 'Consolidated six services behind an APISIX gateway with centralized JWT auth, rate limiting and request tracing — then automated releases through GitLab CI/CD, Docker multi-stage builds and Coolify.',
    tags: ['APISIX', 'Docker', 'GitLab CI/CD', 'Coolify'],
    impact: 'Weekly manual pushes → 15+ automated deploys/week',
  },
  {
    id: 'observability',
    index: '04',
    kind: 'DevOps',
    title: 'Observability rollout',
    desc: 'Instrumented every service with OpenTelemetry and SigNoz — distributed tracing across service hops, RED-metric dashboards and alert routing tied to on-call ownership.',
    tags: ['OpenTelemetry', 'SigNoz', 'Distributed tracing'],
    impact: 'MTTR down from hours to under 20 minutes',
  },
  {
    id: 'mcp-toolchain',
    index: '05',
    kind: 'AI',
    title: 'MCP-orchestrated delivery toolchain',
    desc: 'Seven MCP servers — Keycloak, APISIX, GitLab, Playwright, Supabase, SigNoz and Zigflow — wired into one agent-driven pipeline, with GitLab MCP triggering deploys across services and Playwright MCP exercising the UI before a release goes out.',
    tags: ['MCP', 'Claude Code', 'Spec Kit', 'GitLab CI/CD'],
    impact:
      'Spec to deployed, UI-verified release without leaving the terminal',
  },
  {
    id: 'joiner-leaver-workflows',
    index: '06',
    kind: 'AI',
    title: 'Employee onboarding & offboarding automation',
    desc: 'Joiner and leaver pipelines running as durable Temporal and Zigflow workflows — Keycloak account provisioning, access grants, asset assignment and revocation — with every step idempotent and independently retryable so a partial failure resumes instead of restarting.',
    tags: ['Temporal', 'Zigflow', 'Keycloak', 'Idempotency'],
    impact: 'Replaced a 12-step manual checklist with one durable run',
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    id: 'frontend',
    group: 'Frontend',
    items: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Design systems',
      'Web performance',
      'Accessibility',
    ],
  },
  {
    id: 'backend',
    group: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'REST API design',
      'Temporal',
      'APISIX',
      'Auth & JWT',
    ],
  },
  {
    id: 'platform',
    group: 'Platform & DevOps',
    items: ['Docker', 'GitLab CI/CD', 'Coolify', 'Git', 'Linux', 'Nginx'],
  },
  {
    id: 'observability',
    group: 'Observability',
    items: [
      'OpenTelemetry',
      'SigNoz',
      'Distributed tracing',
      'Metrics & alerting',
      'Incident response',
    ],
  },
  {
    id: 'data',
    group: 'Data',
    items: [
      'PostgreSQL',
      'Supabase',
      'MongoDB',
      'Redis',
      'Schema design',
      'Query optimization',
    ],
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

export const experience: ExperienceEntry[] = [
  {
    id: 'cateina',
    period: '2024 — Present',
    location: 'Mumbai, India',
    role: 'Senior Full-Stack Engineer',
    company: 'Cateina Technologies Pvt Ltd',
    stack: [
      'React 19',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'APISIX',
      'Temporal',
      'Docker',
      'OpenTelemetry',
      'Zigflow',
      'MCP',
    ],
    points: [
      'Architected and shipped 4 production platforms on React 19, TypeScript and Node.js serving 12k+ monthly active users — owning every layer from data model to deployment.',
      'Cut p95 API latency 45% (820ms → 450ms) across 30+ PostgreSQL-backed endpoints by eliminating N+1 queries, adding targeted indexes and introducing connection pooling with response caching.',
      'Consolidated 6 microservices behind an APISIX API gateway with centralized JWT authentication, rate limiting and request tracing — removing duplicated auth logic from every service.',
      'Eliminated ~90% of manual retry intervention by migrating payment and employee onboarding/offboarding flows to durable Temporal and Zigflow workflows with idempotent activities and automated compensation.',
      'Built the team’s AI-assisted delivery workflow — spec-driven development with Claude Code and Spec Kit over seven integrated Model Context Protocol (MCP) servers (Keycloak, APISIX, GitLab, Playwright, Supabase, SigNoz, Zigflow) — and packaged recurring engineering processes as reusable skills so migrations and onboarding run identically every time.',
      'Drove OpenTelemetry and SigNoz adoption across the org — distributed tracing, RED-metric dashboards and ownership-routed alerting cut mean time to resolution from hours to under 20 minutes.',
      'Reduced release cycle from weekly manual pushes to 15+ automated deploys per week via GitLab CI/CD, Docker multi-stage builds and Coolify environment parity.',
      'Mentor 4 engineers and lead code review, establishing the TypeScript, testing and API-design standards now applied to every new service.',
    ],
  },
  {
    id: 'early-career',
    period: '2023 — 2024',
    location: 'India',
    role: 'Full-Stack Engineer',
    company: 'Product & consulting teams',
    stack: ['React', 'Node.js', 'Docker', 'Postman', 'MongoDB'],
    points: [
      'Delivered 20+ features across fintech, SaaS and internal tooling in React, TypeScript and Node.js — contract-tested and documented with Postman collections adopted as the team reference.',
      'Decomposed a monolith into containerized services, cutting build times 60% and unblocking independent team deploys.',
      // Rewritten away from an inaccurate RAG claim — confirm this matches your
      // actual 2023–24 work before sending, or replace it outright.
      'Owned front-end delivery for client-facing dashboards — a reusable component library, form-validation and state-management patterns that later teams extended rather than rewrote.',
    ],
  },
  {
    id: 'education',
    period: '2023',
    location: 'West Bengal, India',
    role: 'B.Tech, Computer Science Engineering',
    company: 'Maulana Abul Kalam Azad University of Technology',
    points: [
      'Foundations in data structures, algorithms, distributed systems and software engineering.',
    ],
  },
];

export const aboutText =
  "Three years in, I care most about the decisions that don't show up in a screenshot — where the service boundary goes, what happens on the third retry, whether the next engineer can read the trace and understand the system. I lead by writing code, reviewing thoughtfully and leaving standards behind me. Off the keyboard: AI research papers, podcasts and games with genuinely good systems design.";

export const aboutFacts: AboutFact[] = [
  { id: 'education', label: 'Education', value: 'B.Tech, CSE — MAKAUT (2023)' },
  { id: 'based-in', label: 'Based in', value: 'Mumbai, Maharashtra' },
  { id: 'languages', label: 'Languages', value: 'English · Hindi · Bengali' },
  { id: 'currently', label: 'Currently', value: 'Senior Full-Stack @ Cateina' },
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
    id: 'boring',
    text: 'Boring deploys are a feature, not a lack of ambition.',
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
  'TYPESCRIPT',
  'NODE.JS',
  'EXPRESS',
  'POSTGRESQL',
  'SUPABASE',
  'MONGODB',
  'REDIS',
  'DOCKER',
  'COOLIFY',
  'APISIX',
  'TEMPORAL',
  'OPENTELEMETRY',
  'SIGNOZ',
  'ZIGFLOW',
  'KEYCLOAK',
  'CLAUDE CODE',
  'POSTMAN',
  'GIT',
  'GITLAB',
  'CI/CD',
];
