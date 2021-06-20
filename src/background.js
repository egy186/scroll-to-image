import { initialOptions } from './constant';

browser.tabs.onUpdated.addListener(async (id, changeInfo, tab) => {
  // Restore options
  const {
    fitHeight,
    list,
    scrollAnimation,
    scrollToFirst
  } = await browser.storage.sync.get(initialOptions);
  const { selector } = list.find(config => new RegExp(config.pattern, 'u').test(tab.url)) || {};

  if (selector) {
    if (fitHeight) {
      // Append style element
      const css = `${selector} { max-height: 100vh; width: auto; }`;
      browser.tabs.insertCSS({ code: css });
    }
    await browser.tabs.executeScript({
      file: 'scroll-to-image.js',
      runAt: 'document_idle'
    });
    browser.tabs.sendMessage(tab.id, {
      scrollAnimation,
      scrollToFirst,
      selector
    });
  }
});

