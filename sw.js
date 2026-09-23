// ============================================================
// VYRO - Service Worker v4.3
// Powered by O-FR Pro Software
// ============================================================

const CACHE_NAME = 'vyro-cache-v4.3.0';
const RUNTIME_CACHE = 'vyro-runtime-v4.3.0';

// যে ফাইলগুলো অফলাইনে কাজ করবে
const PRECACHE_URLS = [
  './',
  './vyro.html',
  './index.html',
  './manifest.json',
  './vyro-logo.png'
];

// CDN ফাইলগুলো যা ক্যাশে রাখা হবে
const CDN_URLS = [
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://unpkg.com/@zxing/library@0.20.0/umd/index.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

// ============ INSTALL ============
self.addEventListener('install', function(event) {
  console.log('[VYRO SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[VYRO SW] Precaching app shell');
      return cache.addAll(PRECACHE_URLS).catch(function(err) {
        console.log('[VYRO SW] Precache error:', err);
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// ============ ACTIVATE ============
self.addEventListener('activate', function(event) {
  console.log('[VYRO SW] Activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
            console.log('[VYRO SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ============ FETCH ============
self.addEventListener('fetch', function(event) {
  var request = event.request;
  
  // POST/PUT/DELETE request এড়িয়ে যাও
  if (request.method !== 'GET') return;
  
  // Chrome extension এড়িয়ে যাও
  if (request.url.startsWith('chrome-extension://')) return;
  
  var url = new URL(request.url);
  
  // CDN ফাইলগুলো - Cache First
  if (url.hostname === 'cdnjs.cloudflare.com' || 
      url.hostname === 'unpkg.com' || 
      url.hostname === 'cdn.jsdelivr.net' ||
      url.hostname === 'fonts.googleapis.com' ||
      url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(RUNTIME_CACHE).then(function(cache) {
        return cache.match(request).then(function(cachedResponse) {
          if (cachedResponse) return cachedResponse;
          return fetch(request).then(function(networkResponse) {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(function() {
            return cachedResponse || new Response('', {status: 503});
          });
        });
      })
    );
    return;
  }
  
  // লোকাল ফাইল - Network First, fallback to cache
  event.respondWith(
    fetch(request).then(function(response) {
      if (response && response.status === 200) {
        var responseClone = response.clone();
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(request, responseClone);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(request).then(function(cachedResponse) {
        if (cachedResponse) return cachedResponse;
        // Offline fallback
        if (request.mode === 'navigate') {
          return caches.match('./vyro.html').then(function(fallback) {
            return fallback || caches.match('./index.html');
          });
        }
        return new Response('', {status: 503, statusText: 'Offline'});
      });
    })
  );
});

// ============ MESSAGE ============
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(function(names) {
      names.forEach(function(name) { caches.delete(name); });
    });
  }
});

console.log('[VYRO SW] Service Worker loaded');
