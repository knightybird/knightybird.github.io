const CACHE_NAME = 'my-app-cache-v1';


// Install event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('CACHE_NAME')
            .then(cache => {
                console.log('Opened cache:', CACHE_NAME);
                return cache.addAll([
                    '/',
                    'index.html',
                    // Add other files you want to cache here
                ]);
            })
    );
});

// Fetch event
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
