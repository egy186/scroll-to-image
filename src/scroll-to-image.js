'use strict';

browser.runtime.onMessage.addListener(({ scrollAnimation, scrollToFirst, selector }) => {
  const images = Array.from(document.querySelectorAll(selector));

  let index = -1;
  const behavior = scrollAnimation ? 'smooth' : 'instant';
  const scroll = dest => {
    switch (dest) {
      case 'first':
        index = 0;
        break;
      case 'next':
        index = index === images.length - 1 ? 0 : index + 1;
        break;
      case 'prev':
        index = index === 0 ? images.length - 1 : index - 1;
        break;
      default:
    }
    images[index].scrollIntoView({
      behavior,
      block: 'start'
    });
  };

  /*
   * Scroll on `Space` or `Shift+Space`
   * Todo: make keybindings configurable
   */
  addEventListener('keydown', evt => {
    if (evt.code === 'Space') {
      evt.preventDefault();
      evt.stopPropagation();
      if (evt.shiftKey) {
        scroll('prev');
      } else {
        scroll('next');
      }
    }
  }, false);

  // Scroll to the first image
  if (scrollToFirst) {
    scroll('first');
  }
});
