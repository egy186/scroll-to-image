/* eslint-disable node/no-sync */

'use strict';

const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');
const manifest = require('../src/manifest.json');

// Update update manifest
const updateManifestFile = path.join(__dirname, '../docs/updates.json');
const updateManifest = JSON.parse(fs.readFileSync(updateManifestFile, 'utf8'));
updateManifest.addons[manifest.applications.gecko.id].updates.push({
  update_link: `https://github.com/egy186/scroll-to-image/releases/download/v${version}/scroll_to_image-${version}-an+fx.xpi`,
  version
});
fs.writeFileSync(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
