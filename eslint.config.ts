import { base, browser } from '@egy186/eslint-config';
import type { Linter } from 'eslint';
import globals from 'globals';
import { react } from '@egy186/eslint-config/react';
import { typescript } from '@egy186/eslint-config/typescript';

const config = [
  { ignores: ['dist'] },
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
] as const satisfies Linter.Config[];

export default config;
