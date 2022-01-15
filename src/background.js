import { initialOptions } from './constant';

browser.tabs.onUpdated.addListener(async (id, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
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
        browser.tabs.insertCSS(tab.id, { code: css });
      }
      await browser.tabs.executeScript(tab.id, {
        file: 'scroll-to-image.js',
        runAt: 'document_idle'
      });

      browser.tabs.sendMessage(tab.id, {
        kind: 'init',
        scrollAnimation,
        scrollToFirst,
        selector
      });
    }
  }
});

browser.commands.onCommand.addListener(async command => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  tabs.forEach(tab => {
    switch (command) {
      case 'scroll-to-next':
      case 'scroll-to-previous':
        browser.tabs.sendMessage(tab.id, {
          command,
          kind: 'command'
        });
        break;
      default:
    }
  });
});
