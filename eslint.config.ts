import { base, browser } from '@egy186/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { react } from '@egy186/eslint-config/react';
import { typescript } from '@egy186/eslint-config/typescript';

const config = defineConfig([
  globalIgnores(['dist']),
  base,
  {
    ...browser,
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      ...browser.languageOptions,
      globals: {
        ...browser.languageOptions.globals,
        ...globals.webextensions
      }
    }
  },
  {
    ...react,
    rules: {
      ...react.rules,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'react/jsx-max-depth': 'off'
    }
  },
  typescript
]);

export default config;
