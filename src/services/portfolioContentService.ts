import type { HeroContent } from '@/types/hero';
import type { Service } from '@/types/service';
import type { Project } from '@/types/project';
import type { CapabilityGroup } from '@/types/capability';
import type { AiStage, AiPrinciple } from '@/types/ai-system';
import type { ExperienceEntry } from '@/types/experience';
import type { AboutFact } from '@/types/about';
import type { CurrentlyShippingItem } from '@/types/currently-shipping';
import type { Certification } from '@/types/certification';
import * as data from '@/services/data/portfolioData';
import { certifications } from '@/services/data/certificationsData';

/*
 * Content access. Synchronous, on purpose.
 *
 * Every getter used to return `simulateNetwork(value, 450)` — a promise that
 * resolved after 450ms of nothing. The data is a module-scope import: it is in
 * memory before the timer starts, so the delay hid nothing and bought nothing.
 * What it cost was the first impression. All eight sections mounted at once, so
 * the entire viewport was skeleton shimmer for 450ms and then jumped as the real
 * content — taller than the skeletons in every case — pushed the page around.
 *
 * It also concealed a real failure mode. `useAsyncData` set `data: null` on a
 * rejected promise while every section branched on `isLoading || !data`, so a
 * failed load rendered the skeleton forever, and the `error` it captured was
 * never read by any of the nine consumers.
 *
 * This layer stays because it is still the seam: if any of this content ever
 * moves behind a real API, the getter changes and the hook changes with it, and
 * no component has to know. `simulateNetwork` remains for contactService, where
 * the wait is a real network call rather than a costume.
 */

export interface AboutContent {
  text: string;
  facts: AboutFact[];
}

export interface AiSystemContent {
  stages: AiStage[];
  principles: AiPrinciple[];
}

// Composed once at module scope so the object identity is stable across
// renders — a fresh object per call would break any consumer that puts these in
// a dependency array.
const aboutContent: AboutContent = {
  text: data.aboutText,
  facts: data.aboutFacts,
};

const aiSystemContent: AiSystemContent = {
  stages: data.aiStages,
  principles: data.aiPrinciples,
};

export const portfolioContentService = {
  getHero(): HeroContent {
    return data.heroContent;
  },
  getServices(): Service[] {
    return data.services;
  },
  getProjects(): Project[] {
    return data.projects;
  },
  getCapabilities(): CapabilityGroup[] {
    return data.capabilities;
  },
  getAiSystemContent(): AiSystemContent {
    return aiSystemContent;
  },
  getExperience(): ExperienceEntry[] {
    return data.experience;
  },
  getAbout(): AboutContent {
    return aboutContent;
  },
  getCertifications(): Certification[] {
    return certifications;
  },
  getCurrentlyShipping(): CurrentlyShippingItem[] {
    return data.currentlyShipping;
  },
  getStackTags(): string[] {
    return data.stackTags;
  },
};
