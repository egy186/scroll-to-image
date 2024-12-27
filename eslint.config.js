import { base, browser } from '@egy186/eslint-config';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import { react } from '@egy186/eslint-config/react';
// eslint-disable-next-line import/no-unresolved
import { typescriptConfig } from '@egy186/eslint-config/typescript';

const config = [
  { ignores: ['dist'] },
  base,
  {
    ...browser,
    files: ['src/**/*.ts', 'src/**/*.tsx'],
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
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      ...react.rules,
      'react/jsx-max-depth': 'off',
      'react/react-in-jsx-scope': 'off'
    }
  },
  typescriptConfig({ projectService: { allowDefaultProject: ['*.{ts,js}', 'lib/*.ts'] } })
];

export default config;
