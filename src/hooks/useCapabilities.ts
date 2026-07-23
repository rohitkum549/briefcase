import { useAsyncData } from '@/hooks/useAsyncData';
import { portfolioContentService } from '@/services/portfolioContentService';

export function useCapabilities() {
  return useAsyncData(portfolioContentService.getCapabilities);
}
