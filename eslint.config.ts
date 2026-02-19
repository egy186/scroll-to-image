import { base, browser } from '@egy186/eslint-config';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import { typescript } from '@egy186/eslint-config/typescript';
import { typescriptReact } from '@egy186/eslint-config/typescript-react';

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
  typescript,
  typescriptReact
]);

export default config;
