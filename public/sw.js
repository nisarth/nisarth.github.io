// Self-unregistering service worker.
// The old site shipped a caching service worker. The new site is a fast static
// build that does not need one. This kill switch makes returning visitors drop
// the old worker, clear its caches, and load fresh content. Keep this file at
// /sw.js until traffic from old registrations has fully aged out.
self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll();
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
