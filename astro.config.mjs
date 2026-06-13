// @ts-check
import { defineConfig } from 'astro/config';

// Output .html files (about.html, services.html, ...) so the new pages keep
// the exact same URLs the old site used. This protects existing rankings.
export default defineConfig({
  site: 'https://nisarth.github.io',
  build: {
    format: 'file',
  },
  compressHTML: true,
  trailingSlash: 'never',
});
