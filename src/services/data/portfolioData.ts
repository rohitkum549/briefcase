import type { HeroContent } from '@/types/hero';
import type { Service } from '@/types/service';
import type { Project } from '@/types/project';
import type { CapabilityGroup } from '@/types/capability';
import type { AiStage, AiPrinciple } from '@/types/ai-system';
import type { ExperienceEntry } from '@/types/experience';
import type { AboutFact } from '@/types/about';

export const heroContent: HeroContent = {
  eyebrow: 'Senior full-stack engineer · System design',
  heading: 'Architecting scalable products — from schema to ship.',
  description:
    "I'm Rohit — a senior full-stack engineer with 3+ years designing and shipping cloud-native platforms in Angular, React, Node.js and Spring Boot, deployed on Docker and AWS. I own architecture and delivery end to end, lead the AI layer — retrieval-grounded assistants and tool-calling agents — and mentor the engineers building alongside me.",
  stats: [
    { id: 'years', value: '3+', label: 'Years shipping' },
    { id: 'systems', value: '40+', label: 'Systems shipped' },
    { id: 'uptime', value: '99.9%', label: 'Uptime maintained' },
  ],
};

export const services: Service[] = [
  {
    id: 'architecture',
    no: '01',
    title: 'Architecture & system design',
    body: 'I design systems that hold up — service boundaries, data models and API contracts that scale from first users to real traffic without a rewrite, documented so teams can move fast on top of them.',
  },
  {
    id: 'product-engineering',
    no: '02',
    title: 'Full-stack product engineering',
    body: 'End-to-end ownership across Angular, React and Node.js — from schema to responsive UI — so a product moves from spec to shipped without handoff friction or dropped detail.',
  },
  {
    id: 'ai-llm',
    no: '03',
    title: 'AI & LLM systems',
    body: 'Retrieval-augmented assistants, prompt pipelines and tool-calling agents — grounded in your data, evaluated against test sets, cost-budgeted and wrapped in sensible guardrails.',
  },
  {
    id: 'cloud-mentoring',
    no: '04',
    title: 'Cloud, delivery & mentoring',
    body: 'Dockerized services and automated AWS deployments with environment parity — plus code review, standards and mentoring that raise the whole team’s output, not just mine.',
  },
];

export const projects: Project[] = [
  {
    id: 'treasury-dashboard',
    index: '01',
    kind: 'Full-stack',
    title: 'Treasury operations dashboard',
    desc: 'Angular front end over Node.js REST APIs and PostgreSQL — real-time balances, filters and role-based views.',
    tags: ['Angular', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'payments-service',
    index: '02',
    kind: 'Backend',
    title: 'Payments integration service',
    desc: 'Spring Boot microservice normalizing bank statement formats, with tested endpoints and clean error handling.',
    tags: ['Java', 'Spring Boot', 'REST'],
  },
  {
    id: 'deploy-pipeline',
    index: '03',
    kind: 'DevOps',
    title: 'Containerized deploy pipeline',
    desc: 'Dockerized services with automated deployments to AWS — repeatable, environment-parity builds.',
    tags: ['Docker', 'AWS', 'CI/CD'],
  },
  {
    id: 'ui-library',
    index: '04',
    kind: 'Frontend',
    title: 'Component UI library',
    desc: 'Reusable TypeScript components and design tokens driving a consistent, accessible interface across screens.',
    tags: ['TypeScript', 'Angular', 'CSS'],
  },
  {
    id: 'rag-assistant',
    index: '05',
    kind: 'AI',
    title: 'RAG knowledge assistant',
    desc: 'Retrieval-augmented chat over internal docs — embeddings, vector search and an LLM orchestration layer that returns grounded, cited answers.',
    tags: ['LLM', 'RAG', 'Vector DB'],
  },
  {
    id: 'agentic-workflow',
    index: '06',
    kind: 'AI',
    title: 'Agentic workflow engine',
    desc: 'Tool-calling agents that plan multi-step tasks, call typed APIs and self-check outputs against evals before responding.',
    tags: ['Agents', 'Node.js', 'Evals'],
  },
];

export const capabilities: CapabilityGroup[] = [
  {
    id: 'frontend',
    group: 'Frontend',
    items: [
      'Angular',
      'TypeScript',
      'HTML & CSS',
      'Responsive UI',
      'Component design',
    ],
  },
  {
    id: 'backend',
    group: 'Backend',
    items: ['Java', 'Spring Boot', 'Node.js', 'Express.js', 'REST APIs'],
  },
  {
    id: 'cloud',
    group: 'Cloud & DevOps',
    items: ['Docker', 'AWS', 'CI/CD', 'Git', 'Deployment'],
  },
  {
    id: 'data',
    group: 'Databases & Tools',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Postman', 'JIRA'],
  },
  {
    id: 'ai',
    group: 'AI & LLM',
    items: [
      'LLM integration',
      'RAG pipelines',
      'Prompt design',
      'Vector search',
      'Agent orchestration',
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
    points: [
      'Own architecture and delivery for enterprise-scale platforms across Angular, Node.js and Docker.',
      'Designed and built versioned REST APIs on PostgreSQL, with auth, observability and clean error handling.',
      'Standardized Docker + AWS deployment pipelines for repeatable, environment-parity releases.',
      'Lead code review and mentor engineers, setting testing and API-design standards across the team.',
    ],
  },
  {
    id: 'early-career',
    period: '2023 — 2024',
    location: 'India',
    role: 'Full-Stack Engineer',
    company: 'Product & consulting teams',
    points: [
      'Shipped features and services across fintech, SaaS and internal-tooling products.',
      'Contributed to the move to microservices, CI/CD and containerized delivery — cutting release friction.',
      'Built the first production AI/LLM features: retrieval-grounded assistants and workflow agents.',
    ],
  },
  {
    id: 'education',
    period: '2023',
    location: 'West Bengal, India',
    role: 'B.Tech, Computer Science Engineering',
    company: 'Maulana Abul Kalam Azad University of Technology',
    points: [
      'Foundations in data structures, distributed systems and software engineering.',
    ],
  },
];

export const aboutText =
  "Three years in, I care most about the decisions that don't show up in a screenshot — clean architecture, well-drawn API boundaries, deployments that stay boring, and interfaces that feel effortless. I lead by writing code, reviewing thoughtfully and raising the bar for the teams I work with. Off the keyboard, I'm into AI research, podcasts and gaming.";

export const aboutFacts: AboutFact[] = [
  { id: 'education', label: 'Education', value: 'B.Tech, CSE — MAKAUT (2023)' },
  { id: 'based-in', label: 'Based in', value: 'Mumbai, Maharashtra' },
  { id: 'languages', label: 'Languages', value: 'English · Hindi · Bengali' },
  { id: 'currently', label: 'Currently', value: 'Full-Stack @ Cateina' },
];

export const stackTags = [
  'JAVA',
  'SPRING BOOT',
  'ANGULAR',
  'NODE.JS',
  'EXPRESS',
  'TYPESCRIPT',
  'POSTGRESQL',
  'MONGODB',
  'DOCKER',
  'AWS',
  'CI/CD',
  'GIT',
];
