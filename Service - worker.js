const CACHE_NAME = 'book7-cache-v3'; // 🔥 version bumped

self.addEventListener('install', event => {
  self.skipWaiting(); // force new SW to take control immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Caching critical assets for offline use
      return cache.addAll([
        './',
        './index.html',
        './manifest.json'
      ]);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      // Delete any caches that are not the current CACHE_NAME (v3)
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('ServiceWorker: Deleting old cache:', cache);
            return caches.delete(cache); // ✅ delete old cached versions
          }
        })
      );
    }).then(() => self.clients.claim()) // Take control of unhandled pages
  );
});

self.addEventListener('fetch', event => {
  // Network-first strategy: try to fetch from the network, but fall back to cache for assets
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});