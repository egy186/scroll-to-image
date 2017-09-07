/* global browser */

(() => {
  'use strict';

  const saveOptions = e => {
    e.preventDefault();
    const fitHeight = document.querySelector('#fit-height').checked;
    const list = JSON.parse(document.querySelector('#list').value);
    browser.storage.sync.set({
      fitHeight,
      list
    });
  };

  const restoreOptions = async () => {
    const listExample = [
      {
        pattern: 'regular expression',
        selector: 'css selector'
      }
    ];
    const { fitHeight = false, list = listExample } = await browser.storage.sync.get(['fitHeight', 'list']);
    document.querySelector('#fit-height').checked = fitHeight;
    document.querySelector('#list').value = JSON.stringify(list, null, '  ');
  };

  document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    document.querySelector('#settings').addEventListener('submit', saveOptions);
  });
})();
