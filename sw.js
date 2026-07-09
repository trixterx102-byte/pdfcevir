// pdfcevir — Service Worker
// Basit "app shell" önbellekleme: ana sayfa ve kütüphaneler bir kez indirildikten
// sonra tekrar ziyarette hızlı açılır, internet kesilirse de site yine açılır.
// Dosyaların kendisi ASLA burada işlenmez/saklanmaz — bu sadece statik dosya önbelleğidir.

const CACHE_VERSION = 'pdfcevir-v1';

const APP_SHELL = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/favicon.ico',
  '/site.webmanifest',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .catch(() => {}) // CDN engelliyse kurulum yine de devam etsin
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;

  // Sayfa navigasyonu: önce ağdan dene, olmazsa önbellekten (offline fallback)
  if(req.mode === 'navigate'){
    event.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(CACHE_VERSION).then(cache => cache.put('/index.html', copy));
        return res;
      }).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Statik dosyalar / CDN kütüphaneleri: önbellek öncelikli
  event.respondWith(
    caches.match(req).then(cached => {
      if(cached) return cached;
      return fetch(req).then(res => {
        if(res.ok){
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
