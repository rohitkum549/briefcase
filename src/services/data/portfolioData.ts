import type { HeroContent } from '@/types/hero';
import type { Service } from '@/types/service';
import type { Project } from '@/types/project';
import type { CapabilityGroup } from '@/types/capability';
import type { AiStage, AiPrinciple } from '@/types/ai-system';
import type { ExperienceEntry } from '@/types/experience';
import type { AboutFact } from '@/types/about';

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  VERIFY BEFORE YOU SEND THIS ANYWHERE                                   │
 * │                                                                         │
 * │  Every number below is a realistic placeholder, not a measurement.      │
 * │  Replace each one with your real figure (or soften the claim) before    │
 * │  this résumé goes to a recruiter. Search this file for these values:    │
 * │                                                                         │
 * │    heroContent.stats   12+ platforms · 40+ services · 99.9% uptime      │
 * │    experience/cateina  4 platforms · 12k MAU · p95 820ms→450ms ·        │
 * │                        6 services · 30+ endpoints · 90% retry work ·    │
 * │                        MTTR hours→20min · 15+ deploys/week · 4 mentees  │
 * │    experience/early    20+ features · build time 60% · 3 teams          │
 * │    projects[].impact   every figure                                     │
 * │                                                                         │
 * │  Anything you can't stand behind in an interview, cut. A vague true     │
 * │  bullet beats a precise one you can't defend.                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export const heroContent: HeroContent = {
  eyebrow: 'Senior full-stack engineer · Distributed systems · AI platforms',
  heading: 'I architect systems that survive production.',
  description:
    "I'm Rohit — a senior full-stack engineer who owns delivery end to end: React 19 and TypeScript on the front, Node.js services behind an APISIX gateway, durable Temporal workflows for anything that must not fail, and OpenTelemetry tracing so we find problems before users report them. I lead the AI layer, set the standards my team codes to, and care most about the decisions that never show up in a screenshot.",
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
    id: 'ai-llm',
    no: '04',
    title: 'AI & LLM systems',
    body: 'Retrieval-augmented assistants and tool-calling agents grounded in your data, orchestrated as durable workflows, evaluated against test sets and bounded by token and latency budgets. Systems, not demos — with the guardrails that distinction implies.',
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
    id: 'rag-assistant',
    index: '05',
    kind: 'AI',
    title: 'RAG knowledge assistant',
    desc: 'Retrieval-augmented chat over internal documentation — chunking strategy, embeddings, vector search and an orchestration layer returning grounded answers with citations back to source.',
    tags: ['LLM', 'RAG', 'Vector search', 'Evals'],
    impact: 'Adopted by 3 internal teams as first-line support',
  },
  {
    id: 'agentic-workflow',
    index: '06',
    kind: 'AI',
    title: 'Agentic workflow engine',
    desc: 'Tool-calling agents that decompose multi-step tasks onto Temporal, invoke typed APIs with schema validation, and self-check outputs against an eval suite before responding.',
    tags: ['Agents', 'Temporal', 'Tool calling'],
    impact: 'Automated a 12-step manual onboarding process',
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
      'MongoDB',
      'Schema design',
      'Query optimization',
      'Redis',
    ],
  },
  {
    id: 'ai',
    group: 'AI & LLM',
    items: [
      'LLM integration',
      'RAG pipelines',
      'Vector search',
      'Prompt engineering',
      'Agent orchestration',
      'Evals',
    ],
  },
];

export const aiStages: AiStage[] = [
  {
    id: 'client',
    step: '01',
    label: 'CLIENT',
    title: 'User query',
    sub: 'Chat / UI',
  },
  {
    id: 'gateway',
    step: '02',
    label: 'GATEWAY',
    title: 'Routing & auth',
    sub: 'Rate limits',
  },
  {
    id: 'orchestrator',
    step: '03',
    label: 'ORCHESTRATOR',
    title: 'LLM + context',
    sub: 'Prompt · tools',
  },
  {
    id: 'retrieval',
    step: '04',
    label: 'RETRIEVAL',
    title: 'Vector search',
    sub: 'Embeddings · KB',
  },
  {
    id: 'response',
    step: '05',
    label: 'RESPONSE',
    title: 'Grounded answer',
    sub: 'Cited · evaluated',
  },
];

export const aiPrinciples: AiPrinciple[] = [
  {
    id: 'grounded',
    title: 'Grounded',
    body: 'Retrieval-backed, cited answers — never free-floating hallucination.',
  },
  {
    id: 'evaluated',
    title: 'Evaluated',
    body: 'Test sets and regression checks gate every prompt change.',
  },
  {
    id: 'guardrailed',
    title: 'Guardrailed',
    body: 'Input validation, typed tool calls and graceful fallbacks.',
  },
  {
    id: 'efficient',
    title: 'Efficient',
    body: 'Token, latency and cost budgets tracked as first-class metrics.',
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
    ],
    points: [
      'Architected and shipped 4 production platforms on React 19, TypeScript and Node.js serving 12k+ monthly active users — owning every layer from data model to deployment.',
      'Cut p95 API latency 45% (820ms → 450ms) across 30+ PostgreSQL-backed endpoints by eliminating N+1 queries, adding targeted indexes and introducing connection pooling with response caching.',
      'Consolidated 6 microservices behind an APISIX API gateway with centralized JWT authentication, rate limiting and request tracing — removing duplicated auth logic from every service.',
      'Eliminated ~90% of manual retry intervention by migrating payment and onboarding flows to durable Temporal workflows with idempotent activities and automated compensation.',
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
      'Built the company’s first production LLM feature — a retrieval-augmented assistant over internal docs with vector search and citation grounding — adopted by 3 internal teams.',
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
  'MONGODB',
  'REDIS',
  'DOCKER',
  'COOLIFY',
  'APISIX',
  'TEMPORAL',
  'OPENTELEMETRY',
  'SIGNOZ',
  'ZIGFLOW',
  'POSTMAN',
  'GIT',
  'GITLAB',
  'CI/CD',
];
