import { array, boolean, fallback, nonEmpty, object, parse, parser, partial, pipe, readonly, string } from 'valibot';
import type { InferOutput } from 'valibot';

const patternSchema = object({
  id: fallback(pipe(string(), nonEmpty(), readonly()), () => crypto.randomUUID()),
  pattern: pipe(string(), nonEmpty(), readonly()),
  selector: pipe(string(), nonEmpty(), readonly())
});

const optionsSchema = pipe(
  fallback(object({
    fitHeight: fallback(boolean(), false),
    list: fallback(pipe(array(patternSchema), readonly()), []),
    scrollAnimation: fallback(boolean(), false),
    scrollToFirst: fallback(boolean(), false)
  }), {
    fitHeight: false,
    list: [],
    scrollAnimation: false,
    scrollToFirst: false
  }),
  readonly()
);
const optionsParser = parser(optionsSchema);
type Options = InferOutput<typeof optionsSchema>;

const partialOptionsSchema = partial(object(optionsSchema.entries));

const restoreOptions = async (): Promise<Options> => {
  const keys = Object.keys(optionsSchema.entries);
  const options = await browser.storage.sync.get(keys);
  const restored = optionsParser(options);
  return restored;
};

const saveOptions = async (options: unknown): Promise<Options> => {
  const parsed = parse(partialOptionsSchema, options);
  await browser.storage.sync.set(parsed);
  const saved = await restoreOptions();
  return saved;
};

export type { Options };

export {
  restoreOptions,
  saveOptions,
  optionsParser
};
