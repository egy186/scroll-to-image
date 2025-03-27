import { readFile, writeFile } from 'node:fs/promises';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8')) as { readonly version: string };

// Update manifest
const manifestFile = new URL('../src/manifest.json', import.meta.url);
const oldManifest = JSON.parse(await readFile(manifestFile, 'utf8')) as {
  readonly browser_specific_settings: {
    readonly gecko: { readonly id: string };
  };
  readonly version: string;
};
const manifest = {
  ...oldManifest,
  version
};
await writeFile(manifestFile, `${JSON.stringify(manifest, null, '  ')}\n`, 'utf8');

// Update update manifest
const updateManifestFile = new URL('../docs/updates.json', import.meta.url);
const updateManifest = JSON.parse(await readFile(updateManifestFile, 'utf8')) as {
  readonly addons: {
    readonly [id: typeof manifest.browser_specific_settings.gecko.id]: {
      readonly updates: Array<{
        readonly update_link: string;
        readonly version: string;
      }>;
    };
  };
};
updateManifest.addons[manifest.browser_specific_settings.gecko.id]?.updates.push({
  update_link: `https://github.com/egy186/scroll-to-image/releases/download/v${version}/scroll_to_image-${version}.xpi`,
  version
});
await writeFile(updateManifestFile, `${JSON.stringify(updateManifest, null, '  ')}\n`, 'utf8');
