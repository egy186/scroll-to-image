import { crx } from '@crxjs/vite-plugin';
import { defineConfig } from 'vite';
import manifest from './manifest.config.js';
import react from '@vitejs/plugin-react';

const config = defineConfig({
  build: {
    rollupOptions: {
      input: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'scroll-to-image': 'src/scroll-to-image.ts'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  },
  plugins: [react(), crx({ manifest })]
});

export default config;
