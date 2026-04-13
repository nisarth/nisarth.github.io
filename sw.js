/* Service Worker — nisarth.github.io */
var CACHE_NAME = 'np-site-v1';
var ASSETS = [
  './',
  './index.html',
  './about.html',
  './services.html',
  './work.html',
  './process.html',
  './blog.html',
  './contact.html',
  './404.html',
  './assets/css/main.css',
  './assets/css/animations.css',
  './assets/css/components.css',
  './assets/js/main.js',
  './assets/js/animations.js',
  './assets/js/cursor.js',
  './assets/images/favicon.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.filter(function (k) { return k !== CACHE_NAME; })
            .map(function (k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (e) {
  // Network first, fallback to cache
  e.respondWith(
    fetch(e.request).then(function (response) {
      // Cache successful GET responses
      if (e.request.method === 'GET' && response.status === 200) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(e.request, clone);
        });
      }
      return response;
    }).catch(function () {
      return caches.match(e.request).then(function (cached) {
        return cached || caches.match('./404.html');
      });
    })
  );
});
