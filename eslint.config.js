import { base, browser } from '@egy186/eslint-config';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import { react } from '@egy186/eslint-config/react';

const config = [
  { ignores: ['dist'] },
  base,
  {
    ...browser,
    files: ['src/**/*.js', 'src/**/*.jsx'],
    languageOptions: {
      ...browser.languageOptions,
      globals: {
        ...globals.es2023,
        ...globals.browser,
        ...globals.webextensions
      }
    }
  },
  {
    ...react,
    files: ['src/**/*.js', 'src/**/*.jsx'],
    rules: {
      ...react.rules,
      'react/jsx-max-depth': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  }
];

export default config;
