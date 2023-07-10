'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"version.json": "ff966ab969ba381b900e61629bfb9789",
"index.html": "33c0ce17a471a6f12ccbaaac22891e04",
"/": "33c0ce17a471a6f12ccbaaac22891e04",
"main.dart.js": "25ef30b0fce938cd75139b3f0677066a",
"flutter.js": "6fef97aeca90b426343ba6c5c9dc5d4a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "0867c3e13649ac4d06fe34b7b3ddce08",
"assets/AssetManifest.json": "c6afc4b1706d1d0038de2e4781b581d2",
"assets/NOTICES": "f1e2559a4a4e74d5826c6ee5223b3731",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"assets/AssetManifest.smcbin": "226b03fc2895c7588e4bd9b29a765c1b",
"assets/fonts/MaterialIcons-Regular.otf": "62ec8220af1fb03e1c20cfa38781e17e",
"assets/assets/images/bullet.png": "f35b61944969e005d6077b91e2020b9e",
"assets/assets/images/smoke_explosin.png": "555a8a42b72e662af232dc2092103c2a",
"assets/assets/images/tiled/image_bg.jpeg": "baac8674ee1595c79ac2ad933bf296d5",
"assets/assets/images/tiled/mapa2.json": "b35a7c6d631e13122117af51f7fc746f",
"assets/assets/images/tiled/map_tiled1.8.tmj": "577ee2d471a74620511e4a6231c3641d",
"assets/assets/images/tiled/tileset/tileset1.8.tsj": "a2a9a6c43017c3174998d36eddf9908b",
"assets/assets/images/tiled/tileset/0x72_DungeonTilesetII_v1.json": "5037c4977d6e032fb4f9802c4f21e8ad",
"assets/assets/images/tiled/tileset/0x72_DungeonTilesetII_v1.3.png": "99ee27544da829bed54efd1f22e5a588",
"assets/assets/images/tiled/bigMap.json": "17dd8bc9210702de42f27e1b62bab5bc",
"assets/assets/images/tiled/top_down/tilesheet.json": "939d92a07290780c60731c78c263f308",
"assets/assets/images/tiled/top_down/tilesheet.png": "bbd9628ccc0e7734c82ca71591f15c7e",
"assets/assets/images/tiled/top_down/map.json": "8b3ec851385f70e557ce0c22ff01ddf6",
"assets/assets/images/tiled/mapa1.json": "37717be99acb43e9c531f4787f67254e",
"assets/assets/images/joystick_background.png": "8c9aa78348b48e03f06bb97f74b819c9",
"assets/assets/images/soldier.png": "ce7013efe144160b1210e355a926aaf6",
"assets/assets/images/platform/fox/player-run.png": "2d261128f9e70056707e48cd25f66cf1",
"assets/assets/images/platform/fox/player-idle.png": "922c4dfb18292e378215399d3f840f34",
"assets/assets/images/platform/fox/player-jump.png": "9fed489d410b3e3a2863891a218bd07f",
"assets/assets/images/platform/item-feedback.png": "399bd58d97151076d86ed315898335ce",
"assets/assets/images/platform/enemy-deadth.png": "ac815579fcdbf6113666bb0f97564420",
"assets/assets/images/platform/tileset.png": "db1342e18dd58977563f7d3691700f30",
"assets/assets/images/platform/frog/frog-idle.png": "6b98d75e717849f03bc308a3f78effb0",
"assets/assets/images/platform/frog/frog-jump.png": "b4a165f45820043374aa8fbb886c6252",
"assets/assets/images/platform/platform_map.tmj": "6c1c897f02ee1e30f819f4716932ca32",
"assets/assets/images/platform/gem.png": "b0ef6efe21f94eebf58abbc0240447f0",
"assets/assets/images/platform/props.tsj": "1e026bdc8826caa8fab6667eaa92bab2",
"assets/assets/images/platform/tileset.tsj": "32c242bb189025b0667e7ed810ed56c3",
"assets/assets/images/platform/middle.png": "2d7dac09c16985539aa88e6c7783aaa9",
"assets/assets/images/platform/back.png": "d7678242fcc92af2b001aed53dc42863",
"assets/assets/images/platform/props.png": "a18949e323b1767f90798403bfa9fa27",
"assets/assets/images/tile_random/tile_types.png": "3f54b0b25f73b3270ddcd943480fdd3a",
"assets/assets/images/tile_random/earth_to_grass.png": "7504d7c5abb15cc963686ffce67b2be1",
"assets/assets/images/tile_random/earth_to_water.png": "457993098c6762efe45dd296b3255dc6",
"assets/assets/images/tile_random/tree.png": "373b98c4cf13e3eba31aeb556e10d8d9",
"assets/assets/images/joystick_atack.png": "0f5325cb2ddcba703e4c9d7d2dd266df",
"assets/assets/images/lpc/feet/1.png": "2ed974e03ae8ac6df7b8a90988e6c1ef",
"assets/assets/images/lpc/body/orc1.png": "c69e7396b657d44f57afd9f3f54b1151",
"assets/assets/images/lpc/body/light.png": "3d41d5018dc1a56537d3376a6451641c",
"assets/assets/images/lpc/body/brown.png": "348cde94f6fbf7cca65441ae19bccfbd",
"assets/assets/images/lpc/body/skeleton.png": "de95019a45f5939391e4a49ff88f8046",
"assets/assets/images/lpc/torco/chest.png": "31cb64fb657680a0c20226eae7fc3539",
"assets/assets/images/lpc/torco/arms.png": "7834f862fa0aae30488fb285dbccce70",
"assets/assets/images/lpc/head/1.png": "85d7057dada8a67b14e0b4ebd691d897",
"assets/assets/images/lpc/gloves/2.png": "41a8a35710ac3befbab29f5b0cb07ad5",
"assets/assets/images/lpc/leg/1.png": "50190606e97dc98ff93156dcf95c3a4c",
"assets/assets/images/lpc/hair/longknot.png": "fafd02037d781328ae6ceb81cebc4f7e",
"assets/assets/images/lpc/hair/single.png": "b9e9111f8bd9288a9b903c271a5251e9",
"assets/assets/images/lpc/hair/curly.png": "2457c495445802029febfdde40884920",
"assets/assets/images/lpc/hair/xlong.png": "8e7f9106bf942f17b215aa58e62f4198",
"assets/assets/images/health_ui.png": "219e39516312f2f6bc264357497b99cb",
"assets/assets/images/multi_scenario/tile/map_biome2.json": "e572bf83c9af750a165e35c7a4bcc7e1",
"assets/assets/images/multi_scenario/tile/biome1_tileset.json": "c54408559f6061f3b190564b80e0acbe",
"assets/assets/images/multi_scenario/tile/biome2_tileset.json": "a9d814a5e4f7acfd8e0f4dcf396c4007",
"assets/assets/images/multi_scenario/tile/biome2.png": "491e506fbfa06177ad91771b74f86d01",
"assets/assets/images/multi_scenario/tile/biome1.png": "ec2cc3e413fecc22cedad090324fb1b9",
"assets/assets/images/multi_scenario/tile/map_biome1.json": "4e132cf7e87806a0e62a0e8278e67b30",
"assets/assets/images/multi_scenario/hero/hero_multi_biome.png": "08730d084495a7ccc2c7c283c3822d25",
"assets/assets/images/tile/floor_2.png": "10968e74b671f14aab19e13a76da334d",
"assets/assets/images/tile/floor_3.png": "3fa52d5af2a38dede0142f5c3dcaab55",
"assets/assets/images/tile/floor_1.png": "00c3bd0c3d76a954f3f0a648cb13c3b3",
"assets/assets/images/tile/wall_top.png": "845ed35ef1482e21857c8bd70061c810",
"assets/assets/images/tile/wall_left_and_top.png": "5e7c81163a737dad7ed4a626d76a0b73",
"assets/assets/images/tile/floor_4.png": "2685b25c2471a762ff6f900b496c9e29",
"assets/assets/images/tile/floor_5.png": "6d63b1d77dcc35d4f7beb91125851e29",
"assets/assets/images/tile/floor_7.png": "7ba4503a62a1b242f05b5244e7b0dae4",
"assets/assets/images/tile/floor_6.png": "d464c18724611d109498d4c4e57316c4",
"assets/assets/images/tile/wall_left_and_bottom.png": "6583c02205abb0c84aef143379eb9bed",
"assets/assets/images/tile/wall_bottom.png": "31d2b04aca916c16bd31574d7134a853",
"assets/assets/images/tile/floor_10.png": "baf86a2272c83bd904bc25b4af03aa29",
"assets/assets/images/tile/wall_turn_left_top.png": "c9d8c9116dd5570fb87b6e1328cb0ee3",
"assets/assets/images/tile/wall_right.png": "aca869be30facbfd420754e870a78f58",
"assets/assets/images/tile/wall_right_and_bottom.png": "533d830adf7d86b810481118ed7aa2f9",
"assets/assets/images/tile/wall.png": "7a6ce85ad0ebd6694dd57e9fdca7535b",
"assets/assets/images/tile/wall_bottom_left.png": "7e83621a422ddd0e7b4425abe8ac3ec8",
"assets/assets/images/tile/wall_top_inner_right.png": "b26bd1cad50d0201d41ab18200976cfc",
"assets/assets/images/tile/wall_top_inner_left.png": "484e3c33e8559ff61f560e5f32791c5a",
"assets/assets/images/tile/wall_left.png": "b4ee6ba9d296a18fa532119ef8cb6157",
"assets/assets/images/tile/floor_8.png": "28692ad0c494efc5bc0f9669579006fe",
"assets/assets/images/tile/floor_9.png": "2b4e26d91d8f632bf4eaa5400cb7d748",
"assets/assets/images/tile/wall_bottom_right.png": "dd6772364441f0f2ea76c532fb4031dc",
"assets/assets/images/enemy/goblin_run_right.png": "565c2f9a0bb01a9c56975664f8cd375c",
"assets/assets/images/enemy/atack_effect_top.png": "df3eeb246450bf06de6dfc325d0bdbd0",
"assets/assets/images/enemy/atack_effect_left.png": "9c99ad913fcc75ce253f8db53faa846f",
"assets/assets/images/enemy/goblin_run_left.png": "05863189b562610b17a062114c7849a9",
"assets/assets/images/enemy/atack_effect_bottom.png": "aaeb1a8e791a0f15ba911e1d2540ab32",
"assets/assets/images/enemy/atack_effect_right.png": "15831f9ccee22a845e854ccb3d18f6e5",
"assets/assets/images/enemy/goblin_idle.png": "8c97e935786b994c3cff4008212381b9",
"assets/assets/images/enemy/goblin_idle_left.png": "a7563675f85ed259b2d0aae50ded196b",
"assets/assets/images/robot.png": "b696d8a120962de4bde2ff8b7319786c",
"assets/assets/images/zombie.png": "41ebd5de73051a779ea2aa8be90b95af",
"assets/assets/images/itens/potion_life.png": "825b71a3532854e849d512683dba06b0",
"assets/assets/images/itens/flag_red.png": "6aca7b9e01f86f1b1a45e262e65821b8",
"assets/assets/images/itens/torch_spritesheet.png": "858f57abd642f0303de50d719532f198",
"assets/assets/images/itens/spikes.png": "8ee92dd121da5fc50964a6a68e3e262c",
"assets/assets/images/itens/chest_spritesheet.png": "bcc8785d27d816e23eca114dd4e708ed",
"assets/assets/images/itens/prisoner.png": "45dcdd9a419bcd1f39cfd78024865578",
"assets/assets/images/itens/column.png": "2ccdc666f36fef12bb99345d4c6c9d66",
"assets/assets/images/itens/table.png": "5e22fb237c60943f46ba18d5e176c10c",
"assets/assets/images/itens/barrel.png": "dc4d5a9e456b6f1c6ec6fdcc66af7727",
"assets/assets/images/itens/bookshelf.png": "ce2fc17cb8251da9966a3e91bb0b2272",
"assets/assets/images/itens/flag_green.png": "1a5a7df4b10a84b0a722b3b6600198dd",
"assets/assets/images/blue_button2.png": "b2ac54312d3b566d324f461aa50b8f5b",
"assets/assets/images/blue_button1.png": "c5ac9ffc08055cdbb731e6bfb0d2593a",
"assets/assets/images/joystick_atack_range.png": "8994f23fc67442c8361432f0cc9a2fa1",
"assets/assets/images/npc/critter_run_right.png": "fe08ed1dcc559998705239d5925a6ab1",
"assets/assets/images/npc/wizard_idle.png": "b05bbd5361ae3eac51138a70c8278efc",
"assets/assets/images/npc/critter_run_left.png": "145c02015fea8ed28f964ec0ca686d84",
"assets/assets/images/npc/critter_idle.png": "609755d64e5a0dbcd7b6507ab816e55a",
"assets/assets/images/joystick_knob.png": "bb0811554c35e7d74df6d80fb5ff5cd5",
"assets/assets/images/direction_attack.png": "04fa54924d587beff5005965f2caa4b8",
"assets/assets/images/furniture.png": "63948b94a5eaca29b9e523ba1d3bbaf2",
"assets/assets/images/player/knight_idle_left.png": "e4ddca181210b0cf9555331aaf2af512",
"assets/assets/images/player/pirate.png": "3129a70b4ba971c0b0f99c386fb4b2ab",
"assets/assets/images/player/fireball_top.png": "e9a76f3ea950d6bc22f8f4cd3a22d7e3",
"assets/assets/images/player/knight_run_left.png": "ce9f3ad71135b459f6b66c892b5b9e30",
"assets/assets/images/player/explosion_fire.png": "81a3691935a18a30572870b759ad1683",
"assets/assets/images/player/atack_effect_top.png": "7b01845d595c3803a07567ee87710658",
"assets/assets/images/player/atack_effect_left.png": "5b5475da758d76f79c34429f70f7f6af",
"assets/assets/images/player/atack_effect_bottom.png": "e2406062be291971a034123fdd1757f9",
"assets/assets/images/player/fireball_right.png": "aaa2c18fe241c16e95be131619693b80",
"assets/assets/images/player/fireball_left.png": "cb3370c9039ec112af7bee6edf3e342d",
"assets/assets/images/player/atack_effect_right.png": "39b3d8583205c90284cd60f0e018f29d",
"assets/assets/images/player/knight_run.png": "9cac5c91f943ba81915573bd93060d4d",
"assets/assets/images/player/crypt.png": "8e55febc1e2563a9d7ba4b48625ba88d",
"assets/assets/images/player/knight_idle.png": "191737282656dd3c8851a2dd3dfc1c0c",
"assets/assets/images/player/emote_exclamacao.png": "8b1897ae92f3a077e0aadaef2626d65a",
"assets/assets/images/player/fireball_bottom.png": "05522f950d8d60e15615ee9705ff2ef0",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
