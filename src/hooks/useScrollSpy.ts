import { useEffect, useState } from 'react';

export function useScrollSpy(
  sectionIds: string[],
  rootMargin = '-45% 0px -50% 0px',
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = sectionIds.join(',');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, rootMargin]);

  return activeId;
}
