browser.tabs.onUpdated.addListener(async (id, changeInfo, tab) => {
  'use strict';

  // Restore options
  const {
    fitHeight = false,
    list = []
  } = await browser.storage.sync.get(['fitHeight', 'list']);
  const { selector } = list.find(config => new RegExp(config.pattern).test(tab.url)) || {};

  if (selector) {
    if (fitHeight) {
      // Append style element
      const css = `${selector} { max-height: 100vh; width: auto; }`;
      browser.tabs.insertCSS({ code: css });
    }
    browser.tabs.executeScript({
      file: 'scroll-to-image.js',
      runAt: 'document_idle'
    });
  }
});

