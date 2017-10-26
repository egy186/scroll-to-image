/* global browser */

(async () => {
  'use strict';

  // Restore options
  const {
    fitHeight = false,
    list = [],
    scrollToFirst = false
  } = await browser.storage.sync.get([
    'fitHeight',
    'list',
    'scrollToFirst'
  ]);

  const { selector } = list.find(config => new RegExp(config.pattern).test(location.href)) || {};
  const images = Array.from(document.querySelectorAll(selector));

  if (images.length !== 0) {
    // Append style element
    if (fitHeight) {
      const css = document.createElement('style');
      css.textContent = `${selector} { max-height: 100vh; width: auto; }`;
      document.head.appendChild(css);
    }

    let index = -1;
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
        behavior: 'instant',
        block: 'start'
      });
    };

    /*
     * Scroll on `Space` or `Shift+Space`
     * Todo: make keybindings configurable
     */
    addEventListener('keydown', evt => {
      if (evt.keyCode === 32) {
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
  }
})();
