import type { CommandMessage, InitMessage } from './message.js';
import { restoreOptions } from './storage.js';

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
browser.tabs.onUpdated.addListener((_id, changeInfo, tab) => {
  // eslint-disable-next-line no-void
  void (async (): Promise<void> => {
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
          await browser.scripting.insertCSS({
            css,
            target: { tabId: tab.id }
          });
        }
        await browser.scripting.executeScript({
          files: ['scroll-to-image.js'],
          target: { tabId: tab.id }
        });

        await browser.tabs.sendMessage(tab.id, {
          kind: 'init',
          scrollAnimation,
          scrollToFirst,
          selector
        } satisfies InitMessage);
      }
    }
  })();
});

browser.commands.onCommand.addListener(command => {
  // eslint-disable-next-line no-void
  void browser.tabs.query({
    active: true,
    currentWindow: true
  })
    // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
    .then(tabs => {
      for (const tab of tabs) {
        if (typeof tab.id !== 'number') {
          continue;
        }
        switch (command) {
          case 'scroll-to-next':
          case 'scroll-to-previous':
            // eslint-disable-next-line no-void
            void browser.tabs.sendMessage(tab.id, {
              command,
              kind: 'command'
            } satisfies CommandMessage);
            break;
          default:
        }
      }
    });
});
