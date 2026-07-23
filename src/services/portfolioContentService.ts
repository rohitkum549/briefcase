import type { HeroContent } from '@/types/hero';
import type { Service } from '@/types/service';
import type { Project } from '@/types/project';
import type { CapabilityGroup } from '@/types/capability';
import type { AiStage, AiPrinciple } from '@/types/ai-system';
import type { ExperienceEntry } from '@/types/experience';
import type { AboutFact } from '@/types/about';
import { simulateNetwork } from '@/services/network';
import * as data from '@/services/data/portfolioData';

export interface AboutContent {
  text: string;
  facts: AboutFact[];
}

export interface AiSystemContent {
  stages: AiStage[];
  principles: AiPrinciple[];
}

export const portfolioContentService = {
  getHero(): Promise<HeroContent> {
    return simulateNetwork(data.heroContent);
  },
  getServices(): Promise<Service[]> {
    return simulateNetwork(data.services);
  },
  getProjects(): Promise<Project[]> {
    return simulateNetwork(data.projects);
  },
  getCapabilities(): Promise<CapabilityGroup[]> {
    return simulateNetwork(data.capabilities);
  },
  getAiSystemContent(): Promise<AiSystemContent> {
    return simulateNetwork({
      stages: data.aiStages,
      principles: data.aiPrinciples,
    });
  },
  getExperience(): Promise<ExperienceEntry[]> {
    return simulateNetwork(data.experience);
  },
  getAbout(): Promise<AboutContent> {
    return simulateNetwork({ text: data.aboutText, facts: data.aboutFacts });
  },
  getStackTags(): Promise<string[]> {
    return simulateNetwork(data.stackTags, 0);
  },
};
