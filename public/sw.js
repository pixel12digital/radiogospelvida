const CACHE_NAME = 'radio-gospel-vida-v1';
const urlsToCache = [
  '/',
  '/images/logo.webp',
  'https://painel.radioweb.app.br/public/gospel-vida/embed?theme=light'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
}); 