'use strict';

const Scroller = class {
  constructor (elements = [], behavior = 'instant') {
    this.elements = elements;
    this.index = -1;
    this.scrollIntoViewOptions = {
      behavior,
      block: 'start'
    };
  }

  scrollToIndex (index) {
    if (index >= this.elements.length) {
      this.index = 0;
    } else if (index < 0) {
      this.index = this.elements.length - 1;
    } else {
      this.index = index;
    }
    this.elements[this.index].scrollIntoView(this.scrollIntoViewOptions);
  }

  scrollToNext () {
    this.scrollToIndex(this.index + 1);
  }

  scrollToPrevious () {
    this.scrollToIndex(this.index - 1);
  }
};

browser.runtime.onMessage.addListener(({ scrollAnimation, scrollToFirst, selector }) => {
  const images = Array.from(document.querySelectorAll(selector));
  const behavior = scrollAnimation ? 'smooth' : 'instant';
  const scroller = new Scroller(images, behavior);

  /*
   * Scroll on `Space` or `Shift+Space`
   * Todo: make keybindings configurable
   */
  const handleKeyDown = event => {
    if (event.code === 'Space') {
      event.preventDefault();
      event.stopPropagation();
      if (event.shiftKey) {
        scroller.scrollToPrevious();
      } else {
        scroller.scrollToNext();
      }
    }
  };
  addEventListener('keydown', handleKeyDown, false);

  // Scroll to the first image
  if (scrollToFirst) {
    scroller.scrollToIndex(0);
  }
});
