import { useLayoutEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

export interface DOMSize {
  width: number;
  height: number;
}

export interface UseDOMMeasureResult<T extends HTMLElement> {
  ref: RefObject<T | null>;
  size: DOMSize;
}

export function useDOMMeasure<T extends HTMLElement>(): UseDOMMeasureResult<T> {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<DOMSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () =>
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
