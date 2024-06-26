/* eslint-disable n/no-sync */

'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { version } = require('../package.json');
const manifest = require('../src/manifest.json');

// Update update manifest
const updateManifestFile = path.join(__dirname, '../docs/updates.json');
const updateManifest = JSON.parse(fs.readFileSync(updateManifestFile, 'utf8'));
updateManifest.addons[manifest.browser_specific_settings.gecko.id].updates.push({
  update_link: `https://github.com/egy186/scroll-to-image/releases/download/v${version}/scroll_to_image-${version}.xpi`,
  version
});
fs.writeFileSync(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
