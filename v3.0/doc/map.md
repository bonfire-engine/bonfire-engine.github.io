# Map

> Represents a map (or world) where the game occurs.

It is a matrix of small tiles that together assembles the map as seen below:

![](../../_media/map.png)

✅ [Tiled support](https://www.mapeditor.org/)
✅ [SpriteFusion support](https://www.spritefusion.com/)


## Using Tiled

We currently recommend creating the map using [Tiled](https://www.mapeditor.org/). For that we use `WorldMapByTiled` in `BonfireWidget`, passing the json map in the `map` parameter:

```dart
WorldMapByTiled(WorldMapReader.fromAsset('tile/map.json'))
```

The first parameter (`tile/map.json`) is the path of the `.json` file exported by Tiled.

> IMPORTANT: Bonfire only supports .json files.

> IMPORTANT: Make sure your map file is correctly named, and placed in `assets/images` directory to avoid any loading issues.

You can also load a map from a URL. Just pass the URL in the path. Example:

```dart
WorldMapByTiled(
     WorldMapReader.fromNetwork( 
        Uri.parse('https://raw.githubusercontent.com/RafaelBarbosatec/rafaelbarbosatec.github.io/master/tiled/my_map.json')
    ),
)
```

## Adding objects

You can add objects like [Decorations](doc/decoration?id=decoration) and [Enemies](doc/enemy?id=enemy) to the map using the `registerObject` method:

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

Just create a layer of objects on your map and position it as in the example in the image above.

For more details about using Tiled [here](doc/tiled_support?id=tiled-support).


## Using SpriteFusion

Just create a map in  [spritefusion](https://www.spritefusion.com/), export 'JSON' and place it in your assets/image folder. 

To load use `WorldMapBySpritefusion` in `BonfireWidget` in the `map` parameter:

```dart
WorldMapBySpritefusion(WorldMapReader.fromAsset('spritefusion/map.json'))
```
[Example](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/pages/map/spritefusion/spritefusion_page.dart)

## Creating map by matrix

You can create maps using a matrix of the double like this:

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

This feature opens the possibility of creating random maps. Just use any algorithm to create you matrix like [fast_noise](https://pub.dev/packages/fast_noise). 

There is an example using this package in [Bonfire repositoy](https://github.com/RafaelBarbosatec/bonfire/tree/master/example).

To make it easier we implemented a class that helps to add sprites in these maps. The `TerrainBuilder`.

### Basic use

It's ver'y easy to use this resource:

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
            // prop.position; // This is the position x and y;
            // You can access the neighbor's values:
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

In the `builder` you can create each `tile` of the map, returning the `TileModel` with your properties.

### Using TerrainBuilder

To use this feature you will need the SpriteSheet of the tiles corners with this pattern:

This SpriteSheet is tile sand to grass:

![](../../_media/earth_to_grass.png)

This SpriteSheet is tile sand to water:

![](../../_media/earth_to_water.png)

---

Now just register the tiles sprites and tiles sprites corners like this:

First create the TerrainBuilder:

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

After that you pass the 'build' method of the `terrainBuilder` to `builder`:

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

And then, this is the result:

![](../../_media/random_map_example.png)


### MapTerrain

`MapTerrain` is each type of terrain that your map could have.

There are two types:
- MapTerrain: The basic terrain that has no corners.
- MapTerrainCorners: The terrain that handles the corners.

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

## Custom

You can create your own map by creating a class extending the `WorldMap` and filling `List<TileModel> tiles`. 

This way you will reuse the QuadTree algorithm used to draw the map.

Or you can use the base to create your own map extending of `GameMap`.
