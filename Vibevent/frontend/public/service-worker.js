const CACHE_NAME = 'vibevent-cache-v1';

// === Static assets to cache on install ===
const urlsToCache = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

// === Install phase: pre-cache static assets ===
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // activate immediately
});

// === Activate phase: clean up old caches ===
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key); // remove stale cache
        })
      )
    )
  );
  self.clients.claim(); // take control of all pages
});

// === Fetch phase: serve from cache, fallback to network ===
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request)) // cache-first strategy
  );
});