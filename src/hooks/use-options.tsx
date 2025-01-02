import type { JSX, ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useTransition } from 'react';
import { optionsParser, restoreOptions, saveOptions } from '../storage.js';
import type { Options } from '../storage.js';

interface OptionsActions {
  readonly error: Error | null;
  readonly loading: boolean;
  readonly set: (partialOptions: Partial<Options>) => void;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const Context = createContext<readonly [Options, OptionsActions]>([
  optionsParser({}),
  {
    error: null,
    loading: true,
    set: (): void => undefined
  }
]);

const useOptions = (): readonly [Options, OptionsActions] => useContext(Context);

interface OptionsProviderProps {
  readonly children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-readonly-parameter-types
const OptionsProvider = ({ children }: OptionsProviderProps): JSX.Element => {
  const [options, setOptions] = useState(optionsParser({}));
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
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
};

export { OptionsProvider, useOptions };

export default OptionsProvider;
