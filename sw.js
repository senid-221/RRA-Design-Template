var CACHE_NAME = 'rra-v1';
var ASSETS = [
  '/',
  '/index.html',
  '/about.html',
  '/news.html',
  '/contact.html',
  '/calculator.html',
  '/tin-lookup.html',
  '/404.html',
  '/domestic-tax-services.html',
  '/customs-services.html',
  '/trade-portal.html',
  '/myrra.html',
  '/ebm-services.html',
  '/non-fiscal.html',
  '/publications.html',
  '/css/styles.css',
  '/css/about.css',
  '/css/news.css',
  '/css/calculator.css',
  '/css/publications.css',
  '/css/portal.css',
  '/css/services.css',
  '/js/i18n.js',
  '/images/rra-logo.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(n) { return n !== CACHE_NAME; }).map(function(n) { return caches.delete(n); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request).then(function(fetchResponse) {
        if (fetchResponse && fetchResponse.status === 200 && fetchResponse.type === 'basic') {
          var clone = fetchResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) { cache.put(event.request, clone); });
        }
        return fetchResponse;
      }).catch(function() {
        if (event.request.destination === 'document') {
          return caches.match('/404.html');
        }
      });
    })
  );
});
