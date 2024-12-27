interface ScrollToImagePattern {
  readonly pattern: string;
  readonly selector: string;
}

interface ScrollToImageOptions {
  readonly fitHeight: boolean;
  readonly list: readonly ScrollToImagePattern[];
  readonly scrollAnimation: boolean;
  readonly scrollToFirst: boolean;
}

const initialOptions = {
  fitHeight: false,
  list: [],
  scrollAnimation: false,
  scrollToFirst: false
} as const satisfies ScrollToImageOptions;

const constant = { initialOptions };

type ScrollToImageMessage = {
  readonly command: 'scroll-to-next' | 'scroll-to-previous';
  readonly kind: 'command';
} | {
  readonly kind: 'init';
  readonly scrollAnimation: boolean;
  readonly scrollToFirst: boolean;
  readonly selector: string;
};

export type { ScrollToImageMessage, ScrollToImageOptions, ScrollToImagePattern };

export { initialOptions };

export default constant;
