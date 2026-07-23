import { useAsyncData } from '@/hooks/useAsyncData';
import { portfolioContentService } from '@/services/portfolioContentService';

export function useAbout() {
  return useAsyncData(portfolioContentService.getAbout);
}
