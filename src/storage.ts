import { array, boolean, fallback, nonEmpty, object, partial, pipe, readonly, safeParse, string, summarize } from 'valibot';
import type { InferOutput } from 'valibot';

const defaultOptions = {
  fitHeight: false,
  list: [],
  scrollAnimation: false,
  scrollToFirst: false
} as const;

const patternSchema = object({
  id: fallback(pipe(string(), nonEmpty(), readonly()), () => crypto.randomUUID()),
  pattern: pipe(string(), nonEmpty(), readonly()),
  selector: pipe(string(), nonEmpty(), readonly())
});

const optionsSchema = pipe(
  fallback(object({
    fitHeight: fallback(boolean(), defaultOptions.fitHeight),
    list: fallback(pipe(array(patternSchema), readonly()), defaultOptions.list),
    scrollAnimation: fallback(boolean(), defaultOptions.scrollAnimation),
    scrollToFirst: fallback(boolean(), defaultOptions.scrollToFirst)
  }), defaultOptions),
  readonly()
);
type Options = InferOutput<typeof optionsSchema>;

const partialOptionsSchema = partial(object(optionsSchema.entries));

const restoreOptions = async (): Promise<Options> => {
  const keys = Object.keys(optionsSchema.entries);
  const options = await browser.storage.sync.get(keys);
  const { issues, output, success } = safeParse(optionsSchema, options);

  if (success) {
    return output;
  }

  throw new Error(summarize(issues));
};

const saveOptions = async (options: Partial<Options>): Promise<Options> => {
  const { issues, output, success } = safeParse(partialOptionsSchema, options);

  if (success) {
    await browser.storage.sync.set(output);
  } else {
    throw new Error(summarize(issues));
  }

  const saved = await restoreOptions();

  return saved;
};

const defaultOptionsExport: Options = defaultOptions;

export type { Options };

export {
  defaultOptionsExport as defaultOptions,
  restoreOptions,
  saveOptions
};
