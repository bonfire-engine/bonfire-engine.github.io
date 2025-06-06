# Tiled support
> Tested in Tiled version `1.9.0`

[Video example](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

支持使用 .json 扩展名构建的 Tiled 地图。

- [x] Multi TileLayer
- [x] Multi ObjectLayer
- [x] TileSet
- [x] Tile Animated
- [x] Load Map from URL
- [x] Text
- [x] Image Layer

Collision
   - [x] MultiCollision
   - [x] Retangle Collision
   - [x] Circle Collision
   - [x] Polygon Collision
   - [ ] Point Collision


## Using

将 Tiled 生成的文件添加到项目中，路径为 assets/images/。

```yaml
flutter:
  assets:
    - assets/images/tiled/map.json
    - assets/images/tiled/tile_set.json
    - assets/images/tiled/img_tile_set.png
```

对于使用 Tiled 构建的地图，我们必须使用 BonfireWidget 小部件（示例 这里）：

```dart
  return BonfireWidget(
    joystick: Joystick(
      directional: JoystickDirectional()
    ),
    map: WorldMapByTiled(
      WorldMapReader.fromAsset('tiled/map.json'),
      forceTileSize: DungeonMap.tileSize, // if you want to force the size of the Tile to be larger or smaller than the original
      objectsBuilder: {
          'goblin': (TiledObjectProperties properties) => Goblin(properties.position),
          'torch': (TiledObjectProperties properties) => Torch(properties.position),
          'barrel': (TiledObjectProperties properties) => BarrelDraggable(properties.position,),
      },
    ),
  );
```

## Tiled map example

如果您希望瓷砖在玩家上方绘制，请在您的 tileSet 中添加类型：above。

![](../../_media/print_exemplo_tiled.png)

Result:

![](../../_media/print_result_tiled.png)


## Load map from network

您可以将地图文件存储在服务器上并加载。只需使用 TiledReader.network 加载即可：

```dart
  return BonfireWidget(
    joystick: Joystick(
      directional: JoystickDirectional()
    ),
    map: WorldMapByTiled(
      WorldMapReader.fromNetwork(
         Uri.parse('http://rafaelbarbosatec.github.io/tiled/my_map.json'),
       // cacheProvider: TiledMemoryCacheProvider()
      ),
    ),
  );
```


You can manage the cache of this too. By default, it uses `TiledMemoryCacheProvider`. You can create your own cache system only creating a class and extending by `TiledCacheProvider`.

## Useful

You can set `class` in your tile to `above` to render this tile above all components in your game. 

If you need that all tiles of a layer render above all components you can create a `Custom Property` in your layer and create one named `class` with value `above`.

You can set `class` in your tile to `dynamicAbove` to render this tile dynamic by Y axis.
You can set `class` in your Object to `collision`. This object will be added in the game with transparency and collision.
You can set `class` in your ObjectLayer to `collision`. All objects of this layer will be added in the game with transparency and collision.