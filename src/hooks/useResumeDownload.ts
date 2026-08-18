import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  DEFAULT_RESUME_ROLE,
  getResumeRole,
} from '@/services/data/resumeRoles';
import type { ResumeFormat, ResumeRoleId } from '@/types/resume';

interface ResumeDownload {
  /** Generate and save one variant. Resolves once the file has been handed off. */
  download: (roleId?: ResumeRoleId, format?: ResumeFormat) => Promise<void>;
  /** Which variant is generating right now, or null. Drives the button state. */
  pending: ResumeRoleId | null;
}

/**
 * The résumé module is imported on click, not at module scope. jspdf and its
 * dependencies are ~380 kB and were sitting in the initial bundle for a feature
 * most visitors never trigger; a dynamic import moves them into their own chunk
 * fetched only by the people who actually want the PDF.
 *
 * That import is also why `pending` exists rather than being decorative: the
 * first click pays for a network round trip before a single byte of PDF is
 * drawn, so on a slow connection there is a real, visible gap between the click
 * and the file appearing. Without a pending state that gap reads as a dead
 * button and gets clicked again.
 */
export function useResumeDownload(): ResumeDownload {
  const [pending, setPending] = useState<ResumeRoleId | null>(null);
  /*
   * A ref guards re-entry as well as the state, because `pending` is a snapshot
   * from render: two clicks inside one frame both see `null` and both start a
   * generation. The ref is written synchronously, so the second one loses.
   */
  const busy = useRef(false);

  const download = useCallback(
    async (
      roleId: ResumeRoleId = DEFAULT_RESUME_ROLE,
      format: ResumeFormat = 'pdf',
    ) => {
      if (busy.current) return;
      busy.current = true;
      setPending(roleId);
      try {
        const { downloadResume } = await import('@/services/resumeService');
        downloadResume(roleId, format);
        // Names the variant AND the format rather than saying "Résumé
        // downloaded." Seven of these exist in two builds now, and the only
        // moment the reader can cheaply confirm they picked the right one is
        // right here — a .txt landing when they wanted the PDF is otherwise
        // discovered in the Downloads folder, or worse, by the recruiter.
        toast.success(
          `Downloaded — ${getResumeRole(roleId).label} résumé (${
            format === 'pdf' ? 'PDF' : 'plain text'
          }).`,
        );
      } catch {
        toast.error('Could not generate the résumé. Please try again.');
      } finally {
        busy.current = false;
        setPending(null);
      }
    },
    [],
  );

  return { download, pending };
}
