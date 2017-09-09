/* global browser */

(() => {
  'use strict';

  const saveOptions = e => {
    e.preventDefault();
    const fitHeight = document.querySelector('#fit-height').checked;
    const list = JSON.parse(document.querySelector('#list').value);
    const scrollToFirst = document.querySelector('#scroll-to-first').checked;
    browser.storage.sync.set({
      fitHeight,
      list,
      scrollToFirst
    });
  };

  const restoreOptions = async () => {
    const listExample = [
      {
        pattern: 'regular expression',
        selector: 'css selector'
      }
    ];
    const {
      fitHeight = false,
      list = listExample,
      scrollToFirst = false
    } = await browser.storage.sync.get([
      'fitHeight',
      'list',
      'scrollToFirst'
    ]);
    document.querySelector('#fit-height').checked = fitHeight;
    document.querySelector('#list').value = JSON.stringify(list, null, '  ');
    document.querySelector('#scroll-to-first').checked = scrollToFirst;
  };

  document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    document.querySelector('#settings').addEventListener('submit', saveOptions);
  });
})();
