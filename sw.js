// Panjika offline cache. Bump VERSION whenever index.html changes so phones pick up the update.
const VERSION = 'panjika-v0.9.1-2';
// The app page is cached once, as ./index.html (requests for ./ are answered from it too).
const FILES = ['./index.html', './manifest.webmanifest', './apple-touch-icon.png', './icon-192.png', './icon-512.png', './ios-install.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, {cache: 'reload'})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    // Navigation preload: page requests start immediately, without waiting for this worker to start up.
    if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin || url.pathname.endsWith('.apk')) return; // bible.com links and the APK go straight to the network
  const root = new URL('./', self.registration.scope).pathname;
  const isApp = url.pathname === root || url.pathname === root + 'index.html';
  if (e.request.mode === 'navigate' && !isApp) {
    // Other pages (like /get/) always come from the network, using the preloaded response when there is one.
    e.respondWith((async () => (await e.preloadResponse) || fetch(e.request))());
    return;
  }
  // Cache first (works offline); refresh the cache in the background when online.
  const key = e.request.mode === 'navigate' ? './index.html' : e.request;
  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(key, {ignoreSearch: true});
    const net = Promise.resolve(e.request.mode === 'navigate' ? e.preloadResponse : undefined)
      .then(p => p || fetch(e.request))
      .then(r => { if (r && r.ok) c.put(key, r.clone()); return r; })
      .catch(() => hit);
    e.waitUntil(net.then(() => {}, () => {}));
    return hit || net;
  }));
});
