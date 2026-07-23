import { useAsyncData } from '@/hooks/useAsyncData';
import { portfolioContentService } from '@/services/portfolioContentService';

export function useAiSystemContent() {
  return useAsyncData(portfolioContentService.getAiSystemContent);
}
