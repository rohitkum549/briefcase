/**
 * Frontend / full-stack framing only. 'DevOps' and 'AI' were dropped as card
 * kinds: the gateway, observability and AI-tooling work is real, but leading
 * with it positioned Rohit as a platform engineer rather than the frontend and
 * full-stack developer he is hiring as.
 */
export type ProjectKind = 'Full-stack' | 'Frontend' | 'Backend' | 'Tooling';

/**
 * Which visual fills the card's preview slot. Every card used to render the same
 * empty grey box, which made six different platforms look interchangeable.
 */
export type ProjectVisual =
  | 'integration-mesh'
  | 'api-surface'
  | 'txn-flow'
  | 'security-layers'
  | 'schema-grid'
  | 'perf-delta';

export interface Project {
  id: string;
  index: string;
  kind: ProjectKind;
  title: string;
  desc: string;
  tags: string[];
  /** Headline outcome — the number a reader remembers. */
  impact?: string;
  visual?: ProjectVisual;
}
