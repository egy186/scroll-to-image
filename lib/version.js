import { readFile, writeFile } from 'node:fs/promises';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

// Update manifest
const manifestFile = new URL('../src/manifest.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestFile, 'utf8'));
manifest.version = version;
await writeFile(manifestFile, `${JSON.stringify(manifest, null, '  ')}\n`, 'utf8');

// Update update manifest
const updateManifestFile = new URL('../docs/updates.json', import.meta.url);
const updateManifest = JSON.parse(await readFile(updateManifestFile, 'utf8'));
updateManifest.addons[manifest.browser_specific_settings.gecko.id].updates.push({
  update_link: `https://github.com/egy186/scroll-to-image/releases/download/v${version}/scroll_to_image-${version}.xpi`,
  version
});
await writeFile(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
