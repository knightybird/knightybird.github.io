const CACHE_NAME = 'my-app-cache-v1';


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

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.map(key => {
                        if (key !== 'CACHE_NAME') {
                            return caches.delete(key);
                        }
                    })
                )
            })
    );
});
