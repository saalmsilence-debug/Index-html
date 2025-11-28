const CACHE_NAME = 'book7-cache-v2'; // Incrementing cache version for update
const ASSETS = [
  '/Index-html/',
  '/Index-html/index.html',
  '/Index-html/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
    return response || fetch(event.request);
    })
  );
});
