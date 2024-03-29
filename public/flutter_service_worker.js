'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "692647628f2ac1f459f2bf579af8f39d",
"assets/assets/avatar.png": "9faad1aa7df4b1b5d698ae29791351c0",
"assets/assets/bg-sunday.png": "089d7127229a456c646ca79322cac44a",
"assets/assets/bglogin.png": "f887d6ac04b4db4d7bd725f6c874205e",
"assets/assets/denied.png": "40673516e9c53a5c09bacdbae1692a30",
"assets/assets/figura1.png": "cd452ca4e4bfefb9092df9a4672d8ce2",
"assets/assets/figura2.png": "b54cf3168aadb6aca88a8edff14134db",
"assets/assets/figura3.png": "26b7ec37991604f0207c2053b3d98f37",
"assets/assets/iconlauncher.png": "3e52c3968c97b29204a72a939d20f2c9",
"assets/assets/loader.gif": "74b84c61dc457547ce5c674e0ef82c19",
"assets/assets/loading-200x150.gif": "9017fffd5f97d268df25ef0ab88c106d",
"assets/assets/logo%2520color.png": "3b2c6246683f817625910cbcb334b8eb",
"assets/assets/logo%2520web%2520sunday.svg": "35b2f46e857841141b28c354a538a112",
"assets/assets/logocolorh.png": "2c153f3667f8a2ef6647dc80c4210eaa",
"assets/assets/logocolorhw.png": "afc3d61d58f08c6a6c12c842469c7c1b",
"assets/assets/logowhite.png": "4eeadbddc2878bc8899f6aadda197aa4",
"assets/assets/no-image.jpg": "a210d1794c8aeaf9762d5abde0ae360b",
"assets/FontManifest.json": "7b3b848aed509ecd684cc2f89aaf4e31",
"assets/fonts/CustomIcons.ttf": "431fb9759f1ec02d7ac9d33fef3a7054",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/loading-200x150.gif": "9017fffd5f97d268df25ef0ab88c106d",
"assets/NOTICES": "435c75caecff7a2dae73d33744f858cf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"favicon.ico": "0e8c1b09da2564c75809e7e84dce7299",
"icons/Icon-192.png": "3dcc2f038066df0bff1238641b1651cc",
"icons/Icon-512.png": "cb50a3ee8243cbc8baedc6d7a3446951",
"icons/Icon-maskable-192.png": "3dcc2f038066df0bff1238641b1651cc",
"icons/Icon-maskable-512.png": "cb50a3ee8243cbc8baedc6d7a3446951",
"index.html": "5a778d56ff9f4757e43a10976c1ae67a",
"/": "5a778d56ff9f4757e43a10976c1ae67a",
"main.dart.js": "a0dd7fd27038d3e47a2fffd200d1f176",
"manifest.json": "10f6252fc5784b8a1b904e3e2418c6c6",
"version.json": "202faf33325dac9fe5654c27ea4a155f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
