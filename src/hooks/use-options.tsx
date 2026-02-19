import type { JSX, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from 'react';
import { defaultOptions, restoreOptions, saveOptions } from '../storage.js';
import type { Options } from '../storage.js';

interface OptionsActions {
  readonly error: Error | null;
  readonly loading: boolean;
  readonly set: (partialOptions: Partial<Options>) => void;
}

const OptionsContext = createContext<readonly [Options, OptionsActions]>([
  defaultOptions,
  {
    error: null,
    loading: true,
    set: (): void => undefined
  }
]);

const useOptions = (): readonly [Options, OptionsActions] => useContext(OptionsContext);

interface OptionsProviderProps {
  readonly children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
const OptionsProvider = ({ children }: OptionsProviderProps): JSX.Element => {
  const [options, setOptions] = useState(defaultOptions);
  const [error, setError] = useState<Error | null>(null);
  const [loading, startTransition] = useTransition();

  const set = useCallback((nextOptions: Partial<Options>) => {
    startTransition(async () => {
      try {
        setError(null);
        const saved = await saveOptions(nextOptions);
        setOptions(saved);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }, []);

  useEffect(() => {
    startTransition(async () => {
      try {
        const nextOptions = await restoreOptions();
        setOptions(nextOptions);
      } catch (err: unknown) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    });
  }, []);

  const context = useMemo(() => [
    options,
    {
      error,
      loading,
      set
    }
  ], [
    error,
    loading,
    options,
    set
  ]) satisfies readonly [Options, OptionsActions];

  return (
    <OptionsContext value={context}>
      {children}
    </OptionsContext>
  );
};

export { OptionsProvider, useOptions };

export default OptionsProvider;
