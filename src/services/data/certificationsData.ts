import type { Certification } from '@/types/certification';

/*
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PROVENANCE                                                             │
 * │                                                                         │
 * │  Two sources, in order of authority:                                    │
 * │                                                                         │
 * │  1. THE CERTIFICATES THEMSELVES. Rohit supplied the share links, and     │
 * │     every Simplilearn PDF was fetched and read. Titles, exact dates and  │
 * │     credential IDs below come from those documents, so they match what   │
 * │     a visitor sees after clicking "Verify".                              │
 * │  2. Screenshots of his LinkedIn "Licenses & certifications" page, for    │
 * │     the records the links don't cover.                                   │
 * │                                                                         │
 * │  LinkedIn itself CANNOT be fetched programmatically — it answers         │
 * │  unauthenticated requests with HTTP 999. Do not add a scraper here.      │
 * │  (The profile-PDF export is no substitute: its sidebar listed only 5 of  │
 * │  these 13.)                                                             │
 * │                                                                         │
 * │  Reading the PDFs corrected four records LinkedIn had shown              │
 * │  incompletely — two missing months, two truncated titles — and turned    │
 * │  two null credential IDs into real ones. Where a title differs from      │
 * │  LinkedIn's wording, the certificate's own wording wins and the LinkedIn │
 * │  variant is noted inline.                                                │
 * │                                                                         │
 * │  STILL NEEDS ROHIT — one record, `programming-network-java`:             │
 * │    · no issue date on LinkedIn, and no share link supplied               │
 * │    · its credential ID was transcribed from a screenshot, so it is NOT   │
 * │      turned into a verify URL: a guessed link that 404s is worse than    │
 * │      no link. Send the udemy.com/certificate/... URL and both are fixed. │
 * │                                                                         │
 * │  SKILLS are named from each certificate's own subject matter. LinkedIn's │
 * │  skill tags were unusable — most records were tagged "English", which is │
 * │  the platform's course-language metadata leaking into a skills field.    │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

const SIMPLILEARN_SHARE = 'https://certificates.simplicdn.net/share';

/** Oldest first — the rail reads left to right as a timeline. */
export const certifications: Certification[] = [
  {
    id: 'java-in-depth',
    title: 'Java In-Depth: Become A Complete Java Engineer!',
    issuer: 'Udemy',
    issuerId: 'Udemy',
    year: 2021,
    month: 'Apr',
    credentialId: 'UC-d5ac785b-4f23-4aa1-bf67-4f1f8ab5ad29',
    verifyUrl:
      'https://www.udemy.com/certificate/UC-d5ac785b-4f23-4aa1-bf67-4f1f8ab5ad29/',
    skills: ['Core Java', 'OOP'],
  },
  {
    id: 'aspnet-core-web-api',
    title: 'ASP.NET Core Web API',
    issuer: 'Udemy',
    issuerId: 'Udemy',
    year: 2022,
    month: 'Feb',
    credentialId: 'UC-61a8a4fe-30a6-4bb0-b40b-87edd6854597',
    verifyUrl:
      'https://www.udemy.com/certificate/UC-61a8a4fe-30a6-4bb0-b40b-87edd6854597/',
    skills: ['ASP.NET Core', 'REST APIs', 'C#'],
  },
  {
    id: 'network-fundamentals',
    title: 'Network Fundamentals',
    issuer: 'Udemy',
    issuerId: 'Udemy',
    year: 2022,
    month: 'Feb',
    credentialId: 'UC-9e51c86a-5325-4ccf-85e0-84f39af2e807',
    verifyUrl:
      'https://www.udemy.com/certificate/UC-9e51c86a-5325-4ccf-85e0-84f39af2e807/',
    skills: ['Networking', 'TCP/IP', 'HTTP'],
  },
  {
    id: 'programming-network-java',
    title: 'Programming Network Application in Java',
    issuer: 'Udemy',
    issuerId: 'Udemy',
    year: 2022,
    // No issue date anywhere: LinkedIn shows none and no share link exists.
    // The year is inferred from the entries LinkedIn placed it between, which
    // is safe because the rail groups by year and the UI hides a null month.
    month: null,
    credentialId: 'ude.my/UC-5052b061-e887-1c2a-Be35-3be7c36ab1a1',
    // Transcribed from a screenshot — see the header. Not linked deliberately.
    verifyUrl: null,
    skills: ['Core Java', 'Socket Programming', 'Networking'],
  },
  {
    id: 'welcome-full-stack-java',
    title: 'Welcome Class for Full Stack Java Developer',
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2022,
    month: 'Sep',
    credentialId: '3797152',
    verifyUrl: `${SIMPLILEARN_SHARE}/3797152.pdf`,
    skills: ['Git', 'GitHub'],
  },
  {
    id: 'phase-1-oops-java',
    title: 'Phase-1: Implement OOPS using JAVA with Data Structures and Beyond',
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2022,
    month: 'Oct',
    credentialId: '3867134',
    verifyUrl: `${SIMPLILEARN_SHARE}/3867134.pdf`,
    skills: ['Core Java', 'OOP', 'Data Structures'],
  },
  {
    id: 'java-basic',
    title: 'Java (Basic)',
    issuer: 'HackerRank',
    issuerId: 'HackerRank',
    year: 2022,
    month: 'Nov',
    credentialId: '2ef70ecc3466',
    // The link Rohit sent was the /iframe/ embed variant; this is the page a
    // human should land on.
    verifyUrl: 'https://www.hackerrank.com/certificates/2ef70ecc3466',
    note: 'Timed skills assessment, not a course completion.',
    skills: ['Core Java', 'Problem Solving'],
  },
  {
    id: 'become-backend-expert',
    title: 'Become a back-end expert',
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2022,
    // Both the month and the credential ID came from the PDF: 21 Nov 2022.
    // LinkedIn had shown neither.
    month: 'Nov',
    credentialId: '3951332',
    verifyUrl: `${SIMPLILEARN_SHARE}/3951332.pdf`,
    skills: ['JDBC', 'Back-end Development'],
  },
  {
    id: 'implement-frameworks-devops',
    // LinkedIn truncated this to "Implement Frameworks the DevOps".
    title: 'Implement Frameworks the DevOps way',
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2022,
    month: 'Dec',
    credentialId: '4026140',
    verifyUrl: `${SIMPLILEARN_SHARE}/4026140.pdf`,
    skills: ['DevOps', 'CI/CD'],
  },
  {
    id: 'frontend-web-app-dev',
    title: 'Frontend Web Application Development',
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2023,
    month: 'Jan',
    credentialId: '4115245',
    verifyUrl: `${SIMPLILEARN_SHARE}/4115245.pdf`,
    skills: ['HTML & CSS', 'JavaScript', 'Front-End Development'],
  },
  {
    id: 'capstone-full-stack-java',
    // LinkedIn showed "Capstone Project for a Full Stack Java Developer" with
    // no date; the certificate reads as below, issued 20 Feb 2023.
    title: 'Full Stack Java Developer Capstone Project',
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2023,
    month: 'Feb',
    credentialId: '4175712',
    verifyUrl: `${SIMPLILEARN_SHARE}/4175712.pdf`,
    skills: ['Full-Stack Development', 'REST APIs'],
  },
  {
    id: 'master-full-stack-java',
    // LinkedIn lists this as "Master Full Stack Java Developer". The certificate
    // reads "Full Stack Java Developer ... has successfully graduated from the
    // program", i.e. Simplilearn's Master's Program — named in full here so the
    // site and the résumé say the same thing.
    title: "Full Stack Java Developer Master's Program",
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2023,
    // 9 Jul 2023 — one day before the job-readiness certificate below, which is
    // why it sits here. This is the programme graduation, not a module.
    month: 'Jul',
    credentialId: '77338402',
    // Simplilearn's own verification page, printed inside the certificate.
    verifyUrl:
      'https://success.simplilearn.com/368aef92-ced7-43e7-8d4f-1b3e4e6f558d',
    note: 'Programme graduation — completed with distinction.',
    skills: ['Full-Stack Development', 'Front-End Development', 'Core Java'],
  },
  {
    id: 'full-stack-java-developer',
    // LinkedIn shortened this to "Full Stack Java Developer".
    title: 'Full Stack Java Developer Job readiness',
    issuer: 'Simplilearn',
    issuerId: 'Simplilearn',
    year: 2023,
    month: 'Jul',
    credentialId: '4401827',
    verifyUrl: `${SIMPLILEARN_SHARE}/4401827.pdf`,
    note: 'Two projects and the assessment passed.',
    skills: ['Full-Stack Development', 'Swagger / OpenAPI', 'REST APIs'],
  },
];

/** Short label for the story bubble, where the full title won't fit. */
export const certShortTitles: Record<string, string> = {
  'java-in-depth': 'Java In-Depth',
  'aspnet-core-web-api': 'ASP.NET Core API',
  'network-fundamentals': 'Network Fundamentals',
  'programming-network-java': 'Network Apps in Java',
  'welcome-full-stack-java': 'Full Stack Welcome',
  'phase-1-oops-java': 'OOPS & Data Structures',
  'java-basic': 'Java (Basic)',
  'become-backend-expert': 'Back-end Expert',
  'implement-frameworks-devops': 'DevOps Frameworks',
  'frontend-web-app-dev': 'Frontend Web Dev',
  'capstone-full-stack-java': 'Full Stack Capstone',
  'master-full-stack-java': "Master's Program",
  'full-stack-java-developer': 'Full Stack Job Ready',
};
