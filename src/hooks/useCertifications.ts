import { useAsyncData } from '@/hooks/useAsyncData';
import { portfolioContentService } from '@/services/portfolioContentService';

export function useCertifications() {
  return useAsyncData(portfolioContentService.getCertifications);
}
