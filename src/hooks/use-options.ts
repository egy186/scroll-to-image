import { optionsParser, restoreOptions, saveOptions } from '../storage.js';
import { useCallback, useEffect, useState } from 'react';
import type { Options } from '../storage.js';

interface UseOptionsActions {
  readonly error: Error | null;
  readonly loading: boolean;
  readonly set: (partialOptions: unknown) => Promise<void>;
}

const useOptions = (initialOptions?: unknown): readonly [Options, UseOptionsActions] => {
  const [options, setOptions] = useState(optionsParser(initialOptions));
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const set = useCallback(async (nextOptions: unknown) => {
    try {
      setError(null);
      setLoading(true);
      const saved = await saveOptions(nextOptions);
      setOptions(saved);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    restoreOptions().then(nextOptions => {
      setOptions(nextOptions);
    }).catch((err: unknown) => {
      setError(err instanceof Error ? err : new Error(String(err)));
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  return [
    options,
    {
      error,
      loading,
      set
    }
  ];
};

export { useOptions };

export default useOptions;
