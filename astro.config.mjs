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

  // GitHub Pages cannot set HTTP response headers, so the policy ships as a
  // <meta http-equiv> tag. Astro hashes its own inline scripts and styles and
  // fills in script-src and style-src automatically; everything below is the
  // extra origins this site genuinely needs.
  //
  // Note: frame-ancestors and X-Frame-Options are ignored in a meta tag, so
  // clickjacking protection is not achievable on this host.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        // data: covers the inline SVG icons; GA serves its pixel from
        // google-analytics.com once a visitor accepts.
        "img-src 'self' data: https://www.google-analytics.com",
        "font-src 'self'",
        // GA beacons. region1 is the EU endpoint gtag falls back to.
        "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
        // The click-to-load Google Maps embed on the contact and city pages.
        "frame-src https://www.google.com",
        // The contact form posts to formsubmit.co.
        "form-action 'self' https://formsubmit.co",
        "base-uri 'self'",
        "object-src 'none'",
      ],
      scriptDirective: {
        // Loaded only after the visitor accepts analytics.
        resources: ["'self'", 'https://www.googletagmanager.com'],
      },
    },
  },
});
