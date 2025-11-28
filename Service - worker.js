const CACHE_NAME = 'book7-dev-mode';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Always load fresh files from network
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});