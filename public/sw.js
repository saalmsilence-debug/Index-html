const CACHE_NAME = 'bookpesa-shell-v1';
const SHELL_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(SHELL_URLS)).catch(()=>{})
  );
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => {
      if(k !== CACHE_NAME) return caches.delete(k);
    })))
  );
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if(event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      const networkFetch = fetch(event.request).then(response => {
        try {
          if(response && response.status === 200 && event.request.url.startsWith(self.location.origin)){
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
          }
        } catch(e){}
        return response;
      }).catch(()=>null);
      return cached || networkFetch || new Response('', { status: 504, statusText: 'offline' });
    })
  );
});
