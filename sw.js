// Panjika offline cache. Bump VERSION whenever index.html changes so phones pick up the update.
const VERSION = 'panjika-v2.1-5';
const FILES = ['./', './index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './ios-install.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || url.pathname.endsWith('.apk')) return; // bible.com links go straight to the network
  // Only the app page itself is served from the cache; other pages (like /get/) always come from the network.
  const root = new URL('./', self.registration.scope).pathname;
  if (e.request.mode === 'navigate' && url.pathname !== root && url.pathname !== root + 'index.html') return;
  // Cache first (works offline); refresh the cache in the background when online.
  e.respondWith(caches.open(VERSION).then(async c => {
    const key = e.request.mode === 'navigate' ? './index.html' : e.request;
    const hit = await c.match(key, {ignoreSearch: true});
    const net = fetch(e.request).then(r => { if (r.ok) c.put(key, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
