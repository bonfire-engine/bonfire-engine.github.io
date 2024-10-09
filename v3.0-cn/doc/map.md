# 地图

> 表示游戏发生的地图（或世界）。

它是一个由小瓷砖组成的矩阵，这些瓷砖共同组成了下面所示的地图：

![](../../_media/map.png)

✅ [Tiled support](https://www.mapeditor.org/)
✅ [SpriteFusion support](https://www.spritefusion.com/)


## Using Tiled

我们目前建议使用以下方法创建地图： [Tiled](https://www.mapeditor.org/). 为此，我们在 BonfireWidget 中使用 WorldMapByTiled，并将 JSON 地图传递给 map 参数：

```dart
WorldMapByTiled(WorldMapReader.fromAsset('tile/map.json'))
```

第一个参数 (tile/map.json) 是由 Tiled 导出的 .json 文件的路径。
> 重要提示：Bonfire 仅支持 .json 文件。

> 重要提示：确保您的地图文件命名正确，并放置在 assets/images 目录中，以避免任何加载问题。

您还可以从 URL 加载地图。只需将 URL 传递给路径即可。示例：

```dart
WorldMapByTiled(
     WorldMapReader.fromNetwork( 
        Uri.parse('https://raw.githubusercontent.com/RafaelBarbosatec/rafaelbarbosatec.github.io/master/tiled/my_map.json')
    ),
)
```

## 添加对象

您可以添加对象，例如： [Decorations](doc/decoration?id=decoration) and [Enemies](doc/enemy?id=enemy) 。使用 registerObject 方法将对象添加到地图：

```dart
    return BonfireWidget(
        map: WorldMapByTiled(
            WorldMapReader.fromAsset('tiled/map.json'),
            objectsBuilder: {
                'orc': (TiledObjectProperties properties) => Orc(properties.position),
            },
        ),
        ...
    );
```

只需在您的地图上创建一个对象层，并按上图中的示例进行定位。

有关使用 Tiled 的更多详细信息，请参考： [here](doc/tiled_support?id=tiled-support).


## 使用 SpriteFusion

只需在以下位置创建地图：  [spritefusion](https://www.spritefusion.com/), 导出为 ‘JSON’，并将其放置在您的 assets/images 文件夹中。

要加载地图，请在 BonfireWidget 中使用 WorldMapBySpritefusion 并在 map 参数中指定：

```dart
WorldMapBySpritefusion(WorldMapReader.fromAsset('spritefusion/map.json'))
```
[Example](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/pages/map/spritefusion/spritefusion_page.dart)

## 通过矩阵创建地图

您可以通过二维矩阵以如下方式创建地图：

```dart

[
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

```

此功能使您可以创建随机地图。只需使用任何算法来创建您的矩阵，例如： [fast_noise](https://pub.dev/packages/fast_noise). 

这里有一个使用该软件包的示例： [Bonfire repositoy](https://github.com/RafaelBarbosatec/bonfire/tree/master/example).

为了更好地实现这一点，我们实现了一个类来帮助在这些地图中添加精灵，称为 TerrainBuilder。

### 基础使用

使用此资源非常简单：

```dart

return BonfireWidget(
      map: MatrixMapGenerator.generate(
        axisInverted: true,
        layers: [
          MatrixLayer(
            matrix: [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
          )
        ],
        builder: (ItemMatrixProperties prop){

            // prop.value; // This is matrix value;
            // prop.position; // This is a position x and y;
            // You can access the neighbors values:
            // prop.valueTop;
            // prop.valueTopLeft; 
            // prop.valueTopRight;
            // prop.valueBottom;
            // prop.valueBottomLeft;
            // prop.valueBottomRight; 
            // prop.valueLeft; 
            // prop.valueRight; 

            TileModelSprite? sprite = TileModelSprite(
                path:'tile_grass.png',
            );
            if(prop.value == 0){
              sprite = TileModelSprite(
                path:'tile_water.png',
              );
            }
            if(prop.value == 1){
              sprite = TileModelSprite(
                path:'tile_sand.png',
              );
            }
            return TileModel(
                x: prop.position.x,
                y: prop.position.y,
                sprite: sprite,
                // color: Colors.blue, // You could use only color also
            );
        },
      ),
    );
```

在 builder 中，您可以创建地图的每个 tile，返回带有您属性的 TileModel。

### 使用 TerrainBuilder

要使用此功能，您需要具有以下模式的瓷砖角落的精灵表（SpriteSheet）：

这个精灵表是沙土到草地的转换：

![](../../_media/earth_to_grass.png)

这个精灵表是沙土到水的转换：

![](../../_media/earth_to_water.png)

---

现在只需像下面这样注册瓷砖精灵和瓷砖角落精灵：

首先创建 TerrainBuilder：

```dart

final double TILE_WATER = 0;
final double TILE_SAND = 1;
final double TILE_GRASS = 2;

final terrainBuilder = TerrainBuilder(
    tileSize: 32,
    terrainList: [
        MapTerrain(
            value: TILE_WATER,
            sprites: [
                TileModelSprite(
                    path: 'tile_water.png',
                    size: Vector2.all(16),
                ),
            ],
        ),
        MapTerrain(
            value: TILE_SAND,
            sprites: [
                TileModelSprite(
                    path: 'tile_sand.png',
                    size: Vector2.all(16),
                ),
            ],
        ),
        MapTerrain(
            value: TILE_GRASS,
            sprites: [
                TileModelSprite(
                    path: 'tile_grass.png',
                    size: Vector2.all(16),
                ),
            ],
        ),
        MapTerrainCorners(
            value: TILE_SAND,
            to: TILE_WATER,
            spriteSheet: TerrainSpriteSheet.create(
            path: 'sand_to_water.png',
            tileSize: Vector2.all(16),
            ),
        ),
        MapTerrainCorners(
            value: TILE_SAND,
            to: TILE_GRASS,
            spriteSheet: TerrainSpriteSheet.create(
            path: 'sand_to_grass.png',
            tileSize: Vector2.all(16),
            ),
        ),
    ],
);

```

之后，将 terrainBuilder 的 build 方法传递给 builder：

```dart

return BonfireWidget(
      map: MatrixMapGenerator.generate(
        axisInverted: true, // This is `true` to create the map same as seen in the matrix. Because the normal axis is `matrix[x][y]`, When `axisInverted` is `true` it's turn `matrix[y][x]`
        layers: [
          MatrixLayer(
            matrix: [
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 2, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
          )
        ],
        builder: terrainBuilder.build,
      ),
    );
```

然后，结果就是：

![](../../_media/random_map_example.png)


### 地图地形（MapTerrain）

MapTerrain 是地图可能具有的每种地形类型。

有两种类型：

	•	MapTerrain：没有角落时的基本地形。
	•	MapTerrainCorners：处理角落的地形。

##### MapTerrain

```dart

MapTerrain(
    value: TILE_WATER, /// number in matrix that must be this terrain
    type: 'water',
    collisions: [],
    properties: Map<String, dynamic>(),
    spritesProportion: [0.6,0.4], // Sets the odds of each sprite appearing. If not set, the odds are equal.
    sprites: [  /// Here we use an array because we can pass many sprites on this type.
        TileModelSprite(
            path: 'tile_water.png',
            size: Vector2.all(16),
        ),
        TileModelSprite(
            path: 'tile_water_2.png',
            size: Vector2.all(16),
        ),
    ],

),

```

##### MapTerrainCorners

```dart
MapTerrainCorners(
    value: TILE_SAND, // number origin
    to: TILE_WATER, // number destination
    type: 'water',
    collisions: [],
    properties: Map<String, dynamic>(),
    spriteSheet: TerrainSpriteSheet.create(
        path: 'sand_to_water.png',
        tileSize: Vector2.all(16), // tileSize in the image
    ),
)

```

## 自定义

您可以通过创建一个扩展 WorldMap 的类并填充 List<TileModel> tiles 来创建自己的地图。

这样，您将重用用于绘制地图的四叉树算法。

或者，您也可以使用基础类，通过扩展 GameMap 来创建自己的地图。