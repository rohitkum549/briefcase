import { useCallback } from 'react';
import { toast } from 'sonner';
import { downloadResume } from '@/services/resumeService';

export function useResumeDownload(): () => void {
  return useCallback(() => {
    try {
      downloadResume();
      toast.success('Résumé downloaded.');
    } catch {
      toast.error('Could not generate the résumé. Please try again.');
    }
  }, []);
}
