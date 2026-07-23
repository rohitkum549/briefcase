import { useAsyncData } from '@/hooks/useAsyncData';
import { portfolioContentService } from '@/services/portfolioContentService';

export function useHeroContent() {
  return useAsyncData(portfolioContentService.getHero);
}
