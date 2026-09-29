const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/style.css',
  'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/css/lightgallery-bundle.min.css',
  'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/lightgallery.umd.min.js',
  'https://cdn.jsdelivr.net/npm/lightgallery@2.7.1/plugins/zoom/lg-zoom.umd.min.js'
];

// Install: Cache app shell
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});