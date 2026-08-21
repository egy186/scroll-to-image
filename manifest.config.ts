/* eslint-disable @typescript-eslint/naming-convention */

import { defineManifest } from '@crxjs/vite-plugin';
import pkg from './package.json' with { type: 'json' };

const geckoId = '{d85e84a8-8446-4496-8585-66ef63f6e556}';

const manifest = defineManifest({
  background: {
    scripts: ['src/background.ts'],
    type: 'module'
  },
  browser_specific_settings: {
    gecko: {
      data_collection_permissions: {
        required: ['none']
      },
      id: geckoId,
      strict_min_version: '142.0',
      update_url: 'https://egy186.github.io/scroll-to-image/updates.json'
    }
  },
  commands: {
    'scroll-to-next': {
      description: 'Scroll to the next image',
      suggested_key: {
        default: 'Ctrl+Space'
      }
    },
    'scroll-to-previous': {
      description: 'Scroll to the previous image',
      suggested_key: {
        default: 'Ctrl+Shift+Space'
      }
    }
  },
  homepage_url: pkg.homepage,
  host_permissions: ['<all_urls>'],
  icons: {
    48: 'assets/icon.png',
    96: 'assets/icon@2x.png'
  },
  manifest_version: 3,
  name: 'Scroll to Image',
  options_ui: {
    open_in_tab: true,
    page: 'index.html'
  },
  permissions: [
    'activeTab',
    'scripting',
    'storage',
    'tabs'
  ],
  version: pkg.version
});

export { geckoId };

export default manifest;
