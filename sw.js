const VERSION = 'v1';

const CACHE_NAME = `ray-${VERSION}`;

const APP_STATIC_RESOURCES = [
	'/',
	'/index.html',
	'/style.css',
	'/script.js',
	'/manifest.json',
	'/sw.js',
	'/assets/favicon.ico',
	'/assets/Vazirmatn-Bold.woff2',
	'/assets/Vazirmatn-Regular.woff2',
	'/assets/icon-180.png',
	'/assets/icon-192.png',
	'/assets/icon-512.png',
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE_NAME);
			cache.addAll(APP_STATIC_RESOURCES);
		})()
	);
});
