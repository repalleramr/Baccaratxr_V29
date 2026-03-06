
const CACHE='bacc-v30-cache';
const ASSETS=['./','./index.html','./styles.css','./app.js','./manifest.json','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-icon.png','./icons/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== 'bacc-v30-cache').map(k => caches.delete(k)));
    if (self.clients && self.clients.claim) await self.clients.claim();
  })());
});
