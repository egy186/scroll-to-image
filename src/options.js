/* global browser */

(() => {
  'use strict';

  const saveOptions = e => {
    e.preventDefault();
    const fitHeight = document.querySelector('#fit-height').checked;
    const list = JSON.parse(document.querySelector('#list').value);
    const scrollAnimation = document.querySelector('#scroll-animation').checked;
    const scrollToFirst = document.querySelector('#scroll-to-first').checked;
    browser.storage.sync.set({
      fitHeight,
      list,
      scrollAnimation,
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
      scrollAnimation = false,
      scrollToFirst = false
    } = await browser.storage.sync.get([
      'fitHeight',
      'list',
      'scrollAnimation',
      'scrollToFirst'
    ]);
    document.querySelector('#fit-height').checked = fitHeight;
    document.querySelector('#list').value = JSON.stringify(list, null, '  ');
    document.querySelector('#scroll-animation').checked = scrollAnimation;
    document.querySelector('#scroll-to-first').checked = scrollToFirst;
  };

  document.addEventListener('DOMContentLoaded', () => {
    restoreOptions();
    document.querySelector('#settings').addEventListener('submit', saveOptions);
  });
})();
