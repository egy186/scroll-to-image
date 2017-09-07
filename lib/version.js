'use strict';

/* eslint-env node */

const fs = require('fs');
const path = require('path');
const { version } = require('../package.json');

// Update manifest
const manifestFile = path.join(__dirname, '../src/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestFile, 'utf8'));
manifest.version = version;
fs.writeFileSync(manifestFile, `${JSON.stringify(manifest, null, '  ')}\n`, 'utf8');

// Update update manifest
const updateManifestFile = path.join(__dirname, '../docs/updates.json');
const updateManifest = JSON.parse(fs.readFileSync(updateManifestFile, 'utf8'));
updateManifest.addons['{d85e84a8-8446-4496-8585-66ef63f6e556}'].updates.push({
  update_link: `https://github.com/egy186/scroll-to-image/releases/download/v${version}/code_viewer-${version}-an.fx.xpi`,
  version
});
fs.writeFileSync(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
