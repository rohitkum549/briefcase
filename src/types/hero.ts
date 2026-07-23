export interface HeroStat {
  id: string;
  value: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  description: string;
  stats: HeroStat[];
}
