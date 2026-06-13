// Self-unregistering service worker.
// The old site shipped a caching service worker. The new site is a fast static
// build that does not need one. This kill switch makes returning visitors drop
// the old worker, clear its caches, and load fresh content. Keep this file at
// /sw.js until traffic from old registrations has fully aged out.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      // Drop every cache the old worker created.
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      // Take control of any open tab so we can refresh it now, not next visit.
      await self.clients.claim();
      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      // Force a single reload to fresh network content, then unregister.
      await Promise.all(
        clients.map((client) => client.navigate(client.url).catch(() => {}))
      );
      await self.registration.unregister();
    })()
  );
});

// No fetch handler on purpose: this worker never intercepts requests, so even
// before it unregisters, every request goes straight to the network.
