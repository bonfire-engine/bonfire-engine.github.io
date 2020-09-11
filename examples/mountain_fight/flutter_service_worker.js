'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "57287c4e955d6b7894b1c52c0cd8af31",
"/": "57287c4e955d6b7894b1c52c0cd8af31",
"main.dart.js": "cc1332d06555c1c87ced76be69c6c96a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "c889aac3fdcce9e7271024c37f6c6dc2",
"assets/AssetManifest.json": "3c9928bec00b8377057696e121da7ac8",
"assets/NOTICES": "9d6f877dd85c17827dcbe63436a140ab",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "a68d2a28c526b3b070aefca4bac93d25",
"assets/assets/images/smoke_explosin.png": "555a8a42b72e662af232dc2092103c2a",
"assets/assets/images/joystick_background.png": "2eef7b32e484d81f07eeb405b39c83a4",
"assets/assets/images/heroes/hero10.png": "bf949848b0a13de3a8bffe24611db304",
"assets/assets/images/heroes/hero11.png": "635b645fc62b7cca76ba99bca4a78279",
"assets/assets/images/heroes/hero13.png": "2986340fbe9210b5edc3c28b4109cc07",
"assets/assets/images/heroes/hero9.png": "5a38ce62ec643aa2982972a3320edc0a",
"assets/assets/images/heroes/hero8.png": "362d63a6c59c26d42a5b3109bb67e7d3",
"assets/assets/images/heroes/hero12.png": "713e1261e45f5f1b15717b3f00c31fb7",
"assets/assets/images/heroes/hero5.png": "4fbdf2789aae98473b0248d9f9af3298",
"assets/assets/images/heroes/hero4.png": "f5af3146dc8505248eab0fa95914afe9",
"assets/assets/images/heroes/hero3.png": "c0ca63db931c61b67e0efde9f1597e6d",
"assets/assets/images/heroes/hero2.png": "d743fe1720c1562cfefe972d688d85ff",
"assets/assets/images/heroes/hero1.png": "08730d084495a7ccc2c7c283c3822d25",
"assets/assets/images/joystick_atack.png": "a525ebd6bd0a9014c513884b7811f019",
"assets/assets/images/tile/tilesetAlistair.png": "9c5398c3e08ba859e5072bb3adb6515c",
"assets/assets/images/tile/tilesetAlistair.json": "cf70cee31e64e9b1be4d58ba4bae30d3",
"assets/assets/images/tile/map.json": "d7ed08a928c076b59b19acd97d9473e9",
"assets/assets/images/tile/spritesheet.png": "de7eda3f898211a7c2b49309a9799886",
"assets/assets/images/joystick_atack_selected.png": "5196050c562862a670e7757392710c4d",
"assets/assets/images/emote.png": "b2b88a8c9b5508e34c89c44efc2fc51d",
"assets/assets/images/bottom_small_blue1.png": "ed444af2a99c19bace4e0638624c77f1",
"assets/assets/images/crypt.png": "8e55febc1e2563a9d7ba4b48625ba88d",
"assets/assets/images/bottom_small_blue2.png": "2f5d73ecd8b98312b860959abe1f3f37",
"assets/assets/images/emotes/emotes10.png": "634cd14f7f1c3acd26d45c3440e028df",
"assets/assets/images/emotes/emotes5.png": "cb0fa154fa298051241e5e4aaf572884",
"assets/assets/images/emotes/emotes4.png": "54cbb4d1e740c8718bfa67edc73e7aca",
"assets/assets/images/emotes/emotes6.png": "00bc02a01c38f330b46e51ab09cd55f2",
"assets/assets/images/emotes/emotes7.png": "0a5a071e8ea4e11bffa2ab0e089dd568",
"assets/assets/images/emotes/emotes3.png": "0c91155772ecdf84e4e0a21b7108f50c",
"assets/assets/images/emotes/emotes2.png": "b1af2a29117840902b21f9797d6d02d8",
"assets/assets/images/emotes/emotes1.png": "ceb46f2ad4396fc3f39f0547d3bf07c5",
"assets/assets/images/emotes/emotes9.png": "aa334e25878d0fc92bfc2e3dcdfa497b",
"assets/assets/images/emotes/emotes8.png": "941870ad989dd4f38b0588ba76ced5de",
"assets/assets/images/bottom_large_green1.png": "f979a1f4197620377042b1cf9a79fb69",
"assets/assets/images/axe_spin_atack.png": "4fff9ff7d0ffbe21eacc5ef949f37831",
"assets/assets/images/joystick_knob.png": "c088b1ce385c20537c22dc2d4d39245a",
"assets/assets/images/bottom_large_green2.png": "e401764387b11d2ccd4698fcaa000c95"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      // Provide a 'reload' param to ensure the latest version is downloaded.
      return cache.addAll(CORE.map((value) => new Request(value, {'cache': 'reload'})));
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
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#')) {
    key = '/';
  }
  // If the URL is not the RESOURCE list, skip the cache.
  if (!RESOURCES[key]) {
    return event.respondWith(fetch(event.request));
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache. Ensure the resources are not cached
        // by the browser for longer than the service worker expects.
        var modifiedRequest = new Request(event.request, {'cache': 'reload'});
        return response || fetch(modifiedRequest).then((response) => {
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
    return self.skipWaiting();
  }

  if (event.message === 'downloadOffline') {
    downloadOffline();
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
  for (var resourceKey in Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
