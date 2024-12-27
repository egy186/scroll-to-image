import { useCallback, useEffect, useState } from 'react';
import type { ScrollToImageOptions } from '../constant.js';

interface UseStorageActions {
  readonly error: Error | null;
  readonly loading: boolean;
  readonly set: (values: Partial<ScrollToImageOptions>) => Promise<void>;
}

const useStorage = (initialValues: ScrollToImageOptions): readonly [ScrollToImageOptions, UseStorageActions] => {
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const isValidKey = useCallback((key: string): key is keyof ScrollToImageOptions => Object.keys(initialValues).includes(key), [initialValues]);

  const set = useCallback(async (nextValues: Partial<ScrollToImageOptions>) => {
    try {
      setError(null);
      if (Object.keys(nextValues).some(key => !isValidKey(key))) {
        throw Error('Unknown key');
      }
      await browser.storage.sync.set(nextValues);
      setValues({
        ...values,
        ...nextValues
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [isValidKey, values]);

  useEffect(() => {
    const restore = async (): Promise<void> => {
      const nextValues = await browser.storage.sync.get(initialValues) as ScrollToImageOptions;
      setValues(nextValues);
    };

    restore().catch((err: unknown) => {
      setError(err instanceof Error ? err : new Error(String(err)));
    }).finally(() => {
      setLoading(false);
    });
  }, [initialValues]);

  return [
    values,
    {
      error,
      loading,
      set
    }
  ];
};

export { useStorage };

export default useStorage;
