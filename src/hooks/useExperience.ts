import { portfolioContentService } from '@/services/portfolioContentService';

/** Static content — see portfolioContentService for why this is not async. */
export function useExperience() {
  return portfolioContentService.getExperience();
}
