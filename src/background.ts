import type { CommandMessage, InitMessage } from './message.js';
import { restoreOptions } from './storage.js';

// eslint-disable-next-line @typescript-eslint/no-misused-promises, @typescript-eslint/prefer-readonly-parameter-types
browser.tabs.onUpdated.addListener(async (_id, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && typeof tab.id === 'number') {
    const {
      fitHeight,
      list,
      scrollAnimation,
      scrollToFirst
    } = await restoreOptions();
    const { selector } = list.find(config => new RegExp(config.pattern, 'u').test(tab.url ?? '')) ?? {};

    if (typeof selector === 'string') {
      if (fitHeight) {
        // Append style element
        const css = `${selector} { max-height: 100vh; width: auto; }`;
        await browser.tabs.insertCSS(tab.id, { code: css });
      }
      await browser.tabs.executeScript(tab.id, {
        file: 'scroll-to-image.js',
        runAt: 'document_idle'
      });

      await browser.tabs.sendMessage(tab.id, {
        kind: 'init',
        scrollAnimation,
        scrollToFirst,
        selector
      } satisfies InitMessage);
    }
  }
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
browser.commands.onCommand.addListener(async command => {
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  });

  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  tabs.forEach(tab => {
    switch (command) {
      case 'scroll-to-next':
      case 'scroll-to-previous':
        if (typeof tab.id === 'number') {
          // eslint-disable-next-line no-void
          void browser.tabs.sendMessage(tab.id, {
            command,
            kind: 'command'
          } satisfies CommandMessage);
        }
        break;
      default:
    }
  });
});
