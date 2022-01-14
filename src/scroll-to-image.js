/* eslint-disable import/unambiguous */

const Scroller = class {
  constructor (elements = [], behavior = 'instant') {
    this.init(elements, behavior);
  }

  init (elements, behavior) {
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

const scroller = new Scroller();

browser.runtime.onMessage.addListener(({ command, kind, scrollAnimation, scrollToFirst, selector }) => {
  switch (kind) {
    case 'init': {
      const images = Array.from(document.querySelectorAll(selector));
      const behavior = scrollAnimation ? 'smooth' : 'instant';
      scroller.init(images, behavior);

      // Scroll to the first image
      if (scrollToFirst && window.scrollY === 0 && window.scrollX === 0) {
        scroller.scrollToIndex(0);
      }
      break;
    }
    case 'command':
      switch (command) {
        case 'scroll-to-next':
          scroller.scrollToNext();
          break;
        case 'scroll-to-previous':
          scroller.scrollToPrevious();
          break;
        default:
      }
      break;
    default:
  }
});
