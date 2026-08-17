import type { ResumeRole, ResumeRoleId } from '@/types/resume';

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ROLE CONFIGURATION — the segregation layer                             │
 * │                                                                         │
 * │  Seven targeted résumés, one set of facts. Each entry below decides      │
 * │  ONLY four things: what the summary leads with, which skills print and   │
 * │  in what order, which bullets are drawn from the pool, and which         │
 * │  certifications are worth the space. No entry may state a fact that      │
 * │  `portfolioData.ts` / `certificationsData.ts` does not already contain.  │
 * │                                                                         │
 * │  ── ONE THING TO KNOW BEFORE EDITING THE JAVA VARIANT ──                 │
 * │                                                                         │
 * │  There is NO production Java in this record. All three platforms are     │
 * │  Node.js v22, Express, PostgreSQL and Temporal. Java appears only as     │
 * │  certification: Simplilearn's Full Stack Java Developer Master's         │
 * │  Program (graduated with distinction), its Capstone and Job Readiness    │
 * │  modules, Phase-1 OOPS with Data Structures, two Udemy Java courses and  │
 * │  a timed HackerRank Java assessment.                                     │
 * │                                                                         │
 * │  So `java-full-stack` positions on exactly that — certified Java         │
 * │  foundations plus three years of production full-stack delivery — and    │
 * │  it does NOT claim Spring, Spring Boot, Hibernate or microservices.      │
 * │  Those words appear nowhere in this file. Adding one to improve a        │
 * │  keyword match would put a fabrication in front of a technical           │
 * │  interviewer who will ask about it. If Rohit ships production Java,      │
 * │  add it to portfolioData first and it will flow here.                    │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export const resumeRoles: ResumeRole[] = [
  // ─── General ───────────────────────────────────────────────────────────
  {
    id: 'frontend',
    group: 'General',
    label: 'Frontend Developer',
    fileSlug: 'Frontend',
    blurb:
      'React 19, Next.js, Angular 19 and TypeScript — component libraries, SPA architecture, data-dense UI and frontend performance.',
    headline: 'Frontend Engineer  ·  React, Angular & TypeScript',
    summary:
      'Frontend-focused engineer with 3+ years in fintech, building production interfaces in React 19, Next.js and Angular 19. Shipped a 20+ component TypeScript library and 30+ embedded console screens for Lynqx, an Open Banking platform connecting 25+ banks and institutions across the US, EU and APAC. Cut page load times by 56% on earlier client work, and owns each feature from REST contract through to rendered screen.',
    skills: [
      {
        label: 'Frontend',
        items: [
          'React 19',
          'Next.js',
          'Angular 19',
          'TypeScript',
          'JavaScript',
          'HTML & CSS',
        ],
      },
      {
        label: 'UI Engineering',
        items: [
          'Reusable component libraries',
          'SPA architecture',
          'Responsive design',
          'Data-dense financial interfaces',
          'Frontend performance',
        ],
      },
      { label: 'UI Systems', items: ['ShadCN', 'Tailwind CSS'] },
      {
        label: 'API Integration',
        items: ['REST APIs', 'JWT auth', 'Webhooks', 'Postman'],
      },
      {
        label: 'Backend & Delivery',
        items: [
          'Node.js',
          'Express.js',
          'PostgreSQL',
          'Docker',
          'GitLab CI/CD',
          'Git',
        ],
      },
    ],
    cateinaPoints: [
      'cateina.ai',
      'cateina.stakeholders',
      'cateina.mentoring',
      'cateina.platforms',
    ],
    platforms: [
      {
        id: 'lynqx',
        points: [
          'lynqx.components.ui',
          'lynqx.connectivity',
          'lynqx.apis',
          'lynqx.temporal',
        ],
      },
    ],
    zeqonPoints: ['zeqon.perf', 'zeqon.sites'],
    certificationsLine:
      "Frontend Web Application Development, Simplilearn (Jan 2023) · Full Stack Java Developer Master's Program, Simplilearn (Sep 2022 - Jul 2023, completed with distinction)",
  },

  {
    id: 'backend',
    group: 'General',
    label: 'Backend Developer',
    fileSlug: 'Backend',
    blurb:
      'Node.js, Express, PostgreSQL and Temporal — REST API design, payment flows, reconciliation, gateway security and observability.',
    headline: 'Backend Engineer  ·  Node.js, APIs & Payment Systems',
    summary:
      'Backend-focused engineer with 3+ years in fintech, building REST services on Node.js, Express and PostgreSQL. Developed 10+ APIs for Lynqx, an Open Banking platform connecting 25+ banks and institutions, and engineered ONUS and OFFUS payment flows handling 50K+ ATM transactions a day. Automated reconciliation to remove over 90% of manual effort, with durable Temporal workflows behind the processes that cannot partially fail.',
    skills: [
      {
        label: 'Backend',
        items: [
          'Node.js v22',
          'Express.js',
          'TypeScript',
          'REST API design',
          'Server-side architecture',
        ],
      },
      {
        label: 'Databases',
        items: ['PostgreSQL', 'Supabase', 'Schema design'],
      },
      {
        label: 'Workflows & Reliability',
        items: [
          'Temporal',
          'DSL-driven orchestration',
          'Idempotent retries',
          'Reversals & rollbacks',
        ],
      },
      {
        label: 'API Gateway & Security',
        items: [
          'APISIX',
          'Keycloak',
          'JWT auth',
          'Kuma',
          'PSD2 compliance',
          'Swagger / OpenAPI',
        ],
      },
      {
        label: 'Payments & Reconciliation',
        items: [
          'ONUS / OFFUS routing',
          'Bank deductions',
          'Automated reconciliation',
          'Lago billing',
        ],
      },
      {
        label: 'Observability & Delivery',
        items: [
          'SigNoz (p50/p95/p99)',
          'Docker',
          'GitLab CI/CD',
          'Coolify',
          'Postman',
        ],
      },
    ],
    cateinaPoints: ['cateina.stakeholders', 'cateina.ai', 'cateina.mentoring'],
    platforms: [
      {
        id: 'lynqx',
        points: ['lynqx.apis', 'lynqx.temporal', 'lynqx.gateway', 'lynqx.data'],
      },
      { id: 'eps', points: ['eps.flows', 'eps.recon'] },
      { id: 'starfish', points: ['starfish.psd2'] },
    ],
    zeqonPoints: ['zeqon.perf'],
    certificationsLine:
      "Become a Back-End Expert, Simplilearn (Nov 2022) · ASP.NET Core Web API, Udemy (Feb 2022) · Full Stack Java Developer Master's Program, Simplilearn (Sep 2022 - Jul 2023, completed with distinction)",
  },

  {
    id: 'integration',
    group: 'General',
    label: 'Integration Developer',
    fileSlug: 'Integration',
    blurb:
      'Bank and third-party connectivity — Temporal workflows, APISIX gateway, consent flows, webhooks, PSD2 data exchange and REST integration.',
    headline: 'Integration Engineer  ·  Open Banking, APIs & Workflows',
    summary:
      'Integration engineer with 3+ years in fintech and Open Banking, connecting banks, institutions and third-party providers across the US, EU and APAC. Built the Lynqx connectivity layer from an empty repository to 25+ integrated institutions, orchestrating bank onboarding and customer consent as DSL-driven Temporal workflows behind an APISIX gateway. Delivered PSD2-compliant corporate-to-bank data exchange and 10+ REST APIs on Node.js and Express.',
    skills: [
      {
        label: 'Integration & Workflows',
        items: [
          'Temporal',
          'DSL-driven workflows',
          'APISIX gateway',
          'Kuma',
          'Keycloak',
          'Webhooks',
        ],
      },
      {
        label: 'API Engineering',
        items: [
          'REST API design',
          'Institution APIs',
          'Swagger / OpenAPI',
          'JSON data exchange',
          'JWT auth',
          'Postman',
        ],
      },
      {
        label: 'Open Banking & Payments',
        items: [
          'Bank onboarding',
          'Consent flows',
          'PSD2 compliance',
          'Payment routing',
          'Reconciliation',
          'Lago billing',
        ],
      },
      {
        label: 'Backend & Data',
        items: [
          'Node.js',
          'Express.js',
          'PostgreSQL',
          'Supabase',
          'Schema design',
        ],
      },
      {
        label: 'Observability & Delivery',
        items: ['SigNoz', 'Docker', 'GitLab CI/CD', 'Coolify', 'Git'],
      },
    ],
    cateinaPoints: ['cateina.stakeholders', 'cateina.ai', 'cateina.mentoring'],
    platforms: [
      {
        id: 'lynqx',
        points: [
          'lynqx.connectivity',
          'lynqx.temporal',
          'lynqx.gateway',
          'lynqx.apis',
        ],
      },
      { id: 'eps', points: ['eps.flows', 'eps.recon'] },
      { id: 'starfish', points: ['starfish.psd2'] },
    ],
    zeqonPoints: ['zeqon.sites'],
    certificationsLine:
      'Full Stack Java Developer Job Readiness — REST APIs and Swagger/OpenAPI, Simplilearn (Jul 2023) · ASP.NET Core Web API, Udemy (Feb 2022) · Network Fundamentals, Udemy (Feb 2022)',
  },

  {
    id: 'full-stack',
    group: 'General',
    label: 'Full Stack Developer',
    fileSlug: 'Full-Stack',
    blurb:
      'End-to-end delivery — frontend, APIs, databases, workflow orchestration and deployment across three production fintech platforms.',
    headline: 'Full-Stack Engineer  ·  Fintech & Open Banking',
    summary:
      'Full-stack engineer with 3+ years in fintech, shipping three production platforms in one role — Open Banking connectivity, ATM payment processing and embedded finance. Took Lynqx from an empty repository to production, serving 25+ banks and institutions, across React 19, Node.js, Express and PostgreSQL. Owns features end to end, from schema and REST contract to the shipped screen, with Temporal orchestration and Docker and GitLab CI/CD delivery.',
    skills: [
      {
        label: 'Frontend',
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
        label: 'Backend & Data',
        items: [
          'Node.js v22',
          'Express.js',
          'REST API design',
          'PostgreSQL',
          'Supabase',
          'Schema design',
        ],
      },
      {
        label: 'Fintech & Open Banking',
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
        label: 'Integration & Workflows',
        items: [
          'Temporal',
          'APISIX',
          'Kuma',
          'Keycloak',
          'Webhooks',
          'JWT auth',
        ],
      },
      {
        label: 'Delivery & Observability',
        items: [
          'Docker',
          'GitLab CI/CD',
          'Coolify',
          'SigNoz',
          'Postman',
          'Jira',
        ],
      },
      {
        label: 'AI-Assisted Engineering',
        items: [
          'Claude Code',
          'Spec-driven development',
          'MCP integration',
          'Workflow automation',
        ],
      },
    ],
    cateinaPoints: ['cateina.ai', 'cateina.stakeholders', 'cateina.mentoring'],
    platforms: [
      {
        id: 'lynqx',
        points: [
          'lynqx.connectivity',
          'lynqx.components',
          'lynqx.apis',
          'lynqx.temporal',
        ],
      },
      { id: 'eps', points: ['eps.flows', 'eps.recon'] },
      { id: 'starfish', points: ['starfish.psd2'] },
    ],
    zeqonPoints: ['zeqon.perf', 'zeqon.sites'],
    certificationsLine:
      "Full Stack Java Developer Master's Program, Simplilearn (Sep 2022 - Jul 2023, completed with distinction) · Java (Basic), HackerRank (2022)",
  },

  // ─── Specialized Full Stack ────────────────────────────────────────────
  {
    id: 'java-full-stack',
    group: 'Specialized Full Stack',
    label: 'Java Full Stack Developer',
    fileSlug: 'Java-Full-Stack',
    blurb:
      "Certified Full Stack Java Developer (Simplilearn Master's Program, distinction) — Core Java, OOP, data structures and JDBC, with 3+ years of production full-stack delivery.",
    headline: 'Full-Stack Engineer  ·  Certified Full Stack Java Developer',
    /*
     * Reads honestly in the first sentence: the Java is certified, the
     * production delivery is Node.js. A recruiter screening for the Java
     * keyword finds it; an interviewer asking "where did you use Java?" gets
     * an answer the document already gave them. See the header note.
     */
    summary:
      "Certified Full Stack Java Developer — Simplilearn Master's Program, graduated with distinction — with 3+ years of production full-stack engineering in fintech. Java foundations in OOP, data structures, JDBC and network programming, backed by a timed HackerRank Java assessment; production delivery to date on Node.js, Express, TypeScript and PostgreSQL. Built Lynqx from an empty repository to 25+ integrated banks and institutions, developing 10+ REST APIs and 30+ console screens end to end.",
    skills: [
      {
        label: 'Java & Foundations',
        items: [
          'Core Java',
          'OOP',
          'Data structures',
          'JDBC',
          'Socket programming',
          'Problem solving',
        ],
      },
      {
        label: 'Backend',
        items: [
          'Node.js v22',
          'Express.js',
          'TypeScript',
          'REST API design',
          'Temporal orchestration',
        ],
      },
      {
        label: 'Databases',
        items: ['PostgreSQL', 'Supabase', 'Schema design'],
      },
      {
        label: 'Frontend',
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
        label: 'API & Security',
        items: [
          'APISIX gateway',
          'Keycloak',
          'JWT auth',
          'Swagger / OpenAPI',
          'PSD2 compliance',
        ],
      },
      {
        label: 'Delivery & Tooling',
        items: [
          'Docker',
          'GitLab CI/CD',
          'Coolify',
          'SigNoz',
          'Postman',
          'Git',
          'Jira',
        ],
      },
    ],
    cateinaPoints: ['cateina.ownership', 'cateina.stakeholders', 'cateina.ai'],
    platforms: [
      {
        id: 'lynqx',
        points: [
          'lynqx.connectivity',
          'lynqx.apis',
          'lynqx.components',
          'lynqx.temporal',
        ],
      },
      { id: 'eps', points: ['eps.flows', 'eps.recon'] },
      { id: 'starfish', points: ['starfish.psd2'] },
    ],
    zeqonPoints: ['zeqon.sites'],
    certificationsLine:
      "Full Stack Java Developer Master's Program, Simplilearn (Sep 2022 - Jul 2023, graduated with distinction) · Full Stack Java Developer Capstone Project, Simplilearn (Feb 2023) · Java (Basic), HackerRank timed assessment (Nov 2022) · Implement OOPS using Java with Data Structures, Simplilearn (Oct 2022) · Java In-Depth, Udemy (Apr 2021)",
  },

  {
    id: 'react-full-stack',
    group: 'Specialized Full Stack',
    label: 'React Full Stack Developer',
    fileSlug: 'React-Full-Stack',
    blurb:
      'React 19 and TypeScript on the front, Node.js, Express and PostgreSQL behind it — component libraries through to schema.',
    headline: 'Full-Stack Engineer  ·  React 19 & Node.js',
    summary:
      'Full-stack engineer with 3+ years in fintech, strongest in React 19 and TypeScript and equally at home in the Node.js services behind them. Built a 20+ component React library powering 30+ embedded console screens for Lynqx, an Open Banking platform serving 25+ banks and institutions, alongside 10+ REST APIs on Node.js, Express and PostgreSQL. Owns features from schema and API contract through to the shipped screen.',
    skills: [
      {
        label: 'Frontend',
        items: [
          'React 19',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'ShadCN',
          'Tailwind CSS',
        ],
      },
      {
        label: 'React Engineering',
        items: [
          'Reusable component libraries',
          'SPA architecture',
          'Responsive design',
          'Data-dense interfaces',
          'Frontend performance',
        ],
      },
      {
        label: 'Backend',
        items: [
          'Node.js v22',
          'Express.js',
          'REST API design',
          'Temporal',
          'Server-side architecture',
        ],
      },
      {
        label: 'Databases',
        items: ['PostgreSQL', 'Supabase', 'Schema design'],
      },
      {
        label: 'Integration & Security',
        items: [
          'APISIX gateway',
          'Keycloak',
          'JWT auth',
          'Webhooks',
          'Swagger / OpenAPI',
        ],
      },
      {
        label: 'Delivery',
        items: [
          'Docker',
          'GitLab CI/CD',
          'Coolify',
          'SigNoz',
          'Postman',
          'Git',
        ],
      },
    ],
    cateinaPoints: ['cateina.ownership', 'cateina.ai', 'cateina.stakeholders'],
    platforms: [
      {
        id: 'lynqx',
        points: [
          'lynqx.components.react',
          'lynqx.apis',
          'lynqx.connectivity',
          'lynqx.temporal',
        ],
      },
      { id: 'eps', points: ['eps.flows', 'eps.recon'] },
    ],
    zeqonPoints: ['zeqon.perf', 'zeqon.sites'],
    certificationsLine:
      "Frontend Web Application Development, Simplilearn (Jan 2023) · Full Stack Java Developer Master's Program, Simplilearn (Sep 2022 - Jul 2023, completed with distinction) · Full Stack Java Developer Capstone Project, Simplilearn (Feb 2023)",
  },

  {
    id: 'angular-full-stack',
    group: 'Specialized Full Stack',
    label: 'Angular Full Stack Developer',
    fileSlug: 'Angular-Full-Stack',
    blurb:
      'Angular 19 and TypeScript console interfaces over Node.js, Express and PostgreSQL services — plus 10+ Angular client sites.',
    headline: 'Full-Stack Engineer  ·  Angular 19 & Node.js',
    summary:
      'Full-stack engineer with 3+ years in fintech, delivering Angular 19 console interfaces over Node.js and PostgreSQL services. Shipped embedded console screens for Lynqx across Angular 19, React 19 and Next.js on a shared TypeScript component library, and launched 10+ Angular client websites at Zeqon while cutting page load times by 56%. Also developed 10+ REST APIs on Node.js and Express behind an APISIX gateway.',
    skills: [
      {
        label: 'Frontend',
        items: [
          'Angular 19',
          'TypeScript',
          'JavaScript',
          'HTML & CSS',
          'React 19',
          'Next.js',
        ],
      },
      {
        label: 'Angular Engineering',
        items: [
          'Components & services',
          'Reusable component libraries',
          'SPA architecture',
          'Responsive design',
          'Frontend performance',
        ],
      },
      {
        label: 'Backend',
        items: [
          'Node.js v22',
          'Express.js',
          'REST API design',
          'Temporal',
          'Server-side architecture',
        ],
      },
      {
        label: 'Databases',
        items: ['PostgreSQL', 'Supabase', 'Schema design'],
      },
      {
        label: 'Integration & Security',
        items: [
          'APISIX gateway',
          'Keycloak',
          'JWT auth',
          'Webhooks',
          'Swagger / OpenAPI',
        ],
      },
      {
        label: 'Delivery',
        items: [
          'Docker',
          'GitLab CI/CD',
          'Coolify',
          'SigNoz',
          'Postman',
          'Git',
        ],
      },
    ],
    cateinaPoints: ['cateina.ownership', 'cateina.ai', 'cateina.stakeholders'],
    platforms: [
      {
        id: 'lynqx',
        points: [
          'lynqx.components.angular',
          'lynqx.apis',
          'lynqx.connectivity',
          'lynqx.temporal',
        ],
      },
      { id: 'eps', points: ['eps.flows', 'eps.recon'] },
    ],
    zeqonPoints: ['zeqon.angular'],
    certificationsLine:
      "Frontend Web Application Development, Simplilearn (Jan 2023) · Full Stack Java Developer Master's Program, Simplilearn (Sep 2022 - Jul 2023, completed with distinction) · Full Stack Java Developer Capstone Project, Simplilearn (Feb 2023)",
  },
];

/** The variant the site's own "Download résumé" button has always produced. */
export const DEFAULT_RESUME_ROLE: ResumeRoleId = 'full-stack';

export function getResumeRole(id: ResumeRoleId): ResumeRole {
  const role = resumeRoles.find((entry) => entry.id === id);
  if (!role) throw new Error(`Unknown résumé role: ${id}`);
  return role;
}
