type ScrollToImageMessage = {
  readonly command: 'scroll-to-next' | 'scroll-to-previous';
  readonly kind: 'command';
} | {
  readonly kind: 'init';
  readonly scrollAnimation: boolean;
  readonly scrollToFirst: boolean;
  readonly selector: string;
};

// eslint-disable-next-line import/prefer-default-export
export type { ScrollToImageMessage };
