export type ProjectKind =
  'Full-stack' | 'Backend' | 'DevOps' | 'Frontend' | 'AI';

export interface Project {
  id: string;
  index: string;
  kind: ProjectKind;
  title: string;
  desc: string;
  tags: string[];
  /** Headline outcome — the number a reader remembers. */
  impact?: string;
}
