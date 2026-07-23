import { useAsyncData } from '@/hooks/useAsyncData';
import { portfolioContentService } from '@/services/portfolioContentService';

export function useStackTags() {
  return useAsyncData(portfolioContentService.getStackTags);
}
