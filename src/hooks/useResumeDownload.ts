import { useCallback } from 'react';
import { toast } from 'sonner';

/**
 * The résumé module is imported on click, not at module scope. jspdf and its
 * dependencies are ~380 kB and were sitting in the initial bundle for a feature
 * most visitors never trigger; a dynamic import moves them into their own chunk
 * fetched only by the people who actually want the PDF.
 */
export function useResumeDownload(): () => void {
  return useCallback(async () => {
    try {
      const { downloadResume } = await import('@/services/resumeService');
      downloadResume();
      toast.success('Résumé downloaded.');
    } catch {
      toast.error('Could not generate the résumé. Please try again.');
    }
  }, []);
}
