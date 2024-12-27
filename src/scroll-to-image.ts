import type { ScrollToImageMessage } from './constant.js';

class Scroller {
  #elements: readonly Element[] = [];

  #index = -1;

  #scrollIntoViewOptions: ScrollIntoViewOptions = {
    behavior: 'instant',
    block: 'start'
  };

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public constructor (elements: readonly Element[] = [], behavior: ScrollIntoViewOptions['behavior'] = 'instant') {
    this.init(elements, behavior);
  }

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  public init (elements: readonly Element[], behavior: ScrollIntoViewOptions['behavior']): void {
    this.#elements = elements;
    this.#index = -1;
    this.#scrollIntoViewOptions = {
      behavior,
      block: 'start'
    };
  }

  public scrollToIndex (index: number): void {
    if (index >= this.#elements.length) {
      this.#index = 0;
    } else if (index < 0) {
      this.#index = this.#elements.length - 1;
    } else {
      this.#index = index;
    }
    this.#elements[this.#index]?.scrollIntoView(this.#scrollIntoViewOptions);
  }

  public scrollToNext (): void {
    this.scrollToIndex(this.#index + 1);
  }

  public scrollToPrevious (): void {
    this.scrollToIndex(this.#index - 1);
  }
}

const scroller = new Scroller();

browser.runtime.onMessage.addListener((message: ScrollToImageMessage) => {
  switch (message.kind) {
    case 'init': {
      const images = Array.from(document.querySelectorAll(message.selector));
      const behavior = message.scrollAnimation ? 'smooth' : 'instant';
      scroller.init(images, behavior);

      // Scroll to the first image
      if (message.scrollToFirst && window.scrollY === 0 && window.scrollX === 0) {
        scroller.scrollToIndex(0);
      }
      break;
    }
    case 'command':
      switch (message.command) {
        case 'scroll-to-next':
          scroller.scrollToNext();
          break;
        case 'scroll-to-previous':
          scroller.scrollToPrevious();
          break;
        default:
          message.command satisfies never;
      }
      break;
    default:
      message satisfies never;
  }
});
