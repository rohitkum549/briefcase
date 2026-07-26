import { useEffect, useState } from 'react';

export interface AsyncDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

/**
 * Resolves `fetcher` once per stable reference and exposes its lifecycle.
 * Pass a stable function (a service method, not an inline arrow) — a
 * changing reference re-triggers the fetch.
 */
export function useAsyncData<T>(fetcher: () => Promise<T>): AsyncDataState<T> {
  const [state, setState] = useState<AsyncDataState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    fetcher()
      .then((data) => {
        if (!cancelled) setState({ data, isLoading: false, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            data: null,
            isLoading: false,
            error:
              error instanceof Error ? error : new Error('Failed to load data'),
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [fetcher]);

  return state;
}
