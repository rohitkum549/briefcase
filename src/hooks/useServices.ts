import { useAsyncData } from '@/hooks/useAsyncData';
import { portfolioContentService } from '@/services/portfolioContentService';

export function useServices() {
  return useAsyncData(portfolioContentService.getServices);
}
