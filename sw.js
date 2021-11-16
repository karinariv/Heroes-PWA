const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v2';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/heroes-card.js',
    '/css/style.css',
    '/js/showsOffline.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
]

/* install service worker */
self.addEventListener('install', event => {
    //console.log('service worker has been installed');
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
});

/* activate event */
self.addEventListener('activate', event => {
    //console.log('service worker has been activated');
    event.waitUntil(
        caches.keys()
            .then(keys => {
                /* console.log(keys); */
                return Promise.all(keys
                    .filter(key => key !== staticCacheName && keys !== dynamicCacheName)
                    .map(key => caches.delete(key))
                    )
            })
    );
})

/* fetch event */
self.addEventListener('fetch', event => {
    //console.log('fetch event', event);
    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(async fetchRes => {
                const cache = await caches.open(dynamicCacheName);
                cache.put(event.request.url, fetchRes.clone());
                return fetchRes;
            })
        })
    );
})