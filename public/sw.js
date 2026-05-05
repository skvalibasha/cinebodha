const CACHE_NAME = 'cinebodha-v4';
const API_CACHE = 'cinebodha-api-v4';

const STATIC_ASSETS = [
  '/',
  '/logo.jpg',
  '/favicon.svg',
  '/manifest.json',
  '/offline.html',
];

const CACHEABLE_API = [
  '/api/videos',
  '/api/topics',
  '/api/stats',
  '/api/shorts',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME && k !== API_CACHE)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // API routes — network-first with offline fallback from cache
  if (url.pathname.startsWith('/api/')) {
    const isCacheable = CACHEABLE_API.some((p) => url.pathname.startsWith(p));
    if (!isCacheable) return; // chat, contact etc — skip

    event.respondWith(
      fetch(event.request)
        .then((res) => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(API_CACHE).then((c) => c.put(event.request, clone));
          }
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Images — cache-first
  if (url.pathname.match(/\.(jpg|jpeg|png|svg|webp|ico|woff2|woff|ttf|gif)$/)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((res) => {
          if (!res || res.status !== 200) return res;
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          return res;
        }).catch(() => new Response('', { status: 404 }));
      })
    );
    return;
  }

  // HTML/JS/CSS — network-first, fallback to cache, then offline page
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        if (res && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return caches.match('/offline.html') || caches.match('/');
        }
        return new Response('', { status: 503 });
      })
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
