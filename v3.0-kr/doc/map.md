# 지도

> 게임이 진행되는 지도(또는 세계)를 나타냅니다.

이는 아래와 같이 지도를 함께 조립하는 작은 타일의 매트릭스입니다.

![](../../_media/map.png)

## 사용법

현재는 [Tiled](https://www.mapeditor.org/)를 사용하여 지도를 생성하는 것이 좋습니다. 이를 위해 `map` 매개변수의 `BonfireWidget`에 있는 `WorldMapByTiled`를 사용합니다.

```dart
WorldMapByTiled('tile/map.json', forceTileSize: Size(32,32))
```

첫 번째 매개변수(`tile/map.json`)는 Tiled에서 내보낸 `.json` 파일의 경로입니다.

> 중요: Bonfire는 .json 파일만 지원합니다.

두 번째 매개변수(`Size(32,32)`)는 선택사항이며 지도에 있는 각 타일의 크기(사각형)를 결정합니다. 설정하지 않으면 TileSet에서 정의한 기본 크기를 사용합니다.

URL에서 지도를 로드할 수 있습니다. 경로에 URL을 전달하면 됩니다. 예시:

```dart
WorldMapByTiled(
    'https://raw.githubusercontent.com/RafaelBarbosatec/rafaelbarbosatec.github.io/master/tiled/my_map.json',
    forceTileSize: Size(32,32),
)
```

## 개체 추가

`registerObject` 메소드를 사용하여 [장식](장식) 및 [적](enemy)과 같은 객체를 지도에 추가할 수 있습니다.

```dart
    return BonfireWidget(
        map: WorldMapByTiled(
            'tiled/map.json',
            forceTileSize: Size(32,32),
            objectsBuilder: {
                'orc': (TiledObjectProperties properties) => Orc(properties.position),
            },
        ),
        ...
    );
```

지도에 객체 레이어를 생성하고 위 이미지의 예처럼 위치를 지정하세요.

Tiled 지원에 대한 자세한 내용을 보려면 [여기](tiled_support)를 클릭하세요.

## 행렬로 지도 만들기

다음과 같이 이중 배열을 사용하여 맵을 만들 수 있습니다.

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

이 기능은 라돔 맵을 생성할 수 있는 가능성을 열어줍니다. 임의의 알고리즘을 사용하여 [fast_noise](https://pub.dev/packages/fast_noise)와 같은 매트릭스를 생성하세요. [Bonfire 저장소](https://github.com/RafaelBarbosatec/bonfire/tree/master/example)에 이 패키지를 사용하는 예가 있습니다.

그리고 더 나은 상태를 유지하기 위해 이 지도에 스프라이트를 추가하는 데 도움이 되는 클래스를 구현합니다. 'Terrain Builder'.

### 기본 사용법

이 리소스를 사용하는 방법은 매우 쉽습니다.

```dart

return BonfireWidget(
      map: MatrixMapGenerator.generate(
        axisInverted: true,
        matrix: [
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
        ],
        builder: (ItemMatrixProperties prop){

            // prop.value; // 이것은 행렬 값입니다.
            // prop.position; // 이것은 x와 y의 위치입니다.
            // 이웃 값에 액세스할 수 있습니다.
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
                // color: Colors.blue, // 색상만 사용할 수도 있습니다.
            );
        },
      ),
    );
```

'builder'에서는 속성과 함께 'TileModel'을 반환하는 지도의 각 '타일'을 생성할 수 있습니다.

### TerrainBuilder 사용

이 기능을 사용하려면 다음 패턴을 사용하는 타일 모서리의 SpriteSheet가 필요합니다.

이 SpriteSheet는 타일 모래와 잔디입니다.

![](../../_media/earth_to_grass.png)

이 SpriteSheet는 타일 모래와 물입니다.

![](../../_media/earth_to_water.png)

---

이제 다음과 같이 타일 스프라이트와 타일 스프라이트 코너를 등록하면 됩니다.

먼저 지형 빌더를 만듭니다.

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

그런 다음 `terrainBuilder`의 'build' 메소드를 `builder`에 전달합니다.

```dart

return BonfireWidget(
      map: MatrixMapGenerator.generate(
        axisInverted: true, // 행렬에 표시된 것과 동일한 지도를 생성하는 것은 'true'입니다. 법선 축은 `matrix[x][y]`이므로 `axisInverted`가 `true`이면 `matrix[y][x]`가 됩니다.
        matrix: [
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
        ],
        builder: terrainBuilder.build,
      ),
    );
```

그리고 결과는 다음과 같습니다.

![](../../_media/random_map_example.png)


### 지도 지형

'MapTerrain'은 지도에 표시할 수 있는 각 유형의 지형입니다.
기본 유형은 다음과 같습니다.

- MapTerrain: 모서리가 없을 때의 기본 지형입니다.
- MapTerrainCorners: 코너를 처리하는 지형입니다.

##### MapTerrain

```dart

MapTerrain(
    value: TILE_WATER, /// 지형이어야 하는 행렬의 숫자
    type: 'water',
    collisions: [],
    properties: Map<String, dynamic>(),
    spritesProportion: [0.6,0.4],
    sprites: [  /// 이 유형에는 많은 스프라이트를 전달할 수 있으므로 배열이 필요합니다. `spritesProportion`을 구성하여 각각의 발생 비율을 구성합니다.
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
    value: TILE_SAND, // 출발지점
    to: TILE_WATER, // 목적지점
    type: 'water',
    collisions: [],
    properties: Map<String, dynamic>(),
    spriteSheet: TerrainSpriteSheet.create(
        path: 'sand_to_water.png',
        tileSize: Vector2.all(16), // 이미지의 타일 크기
    ),
)

```

## 커스텀

`WordMap`을 확장하는 클래스를 생성하고 `List<TileModel> 타일`을 채울 수 있는 자신만의 지도를 만들 수 있습니다. 이렇게 하면 지도를 그리는 데 사용되는 QuadTree 알고리즘을 재사용할 수 있습니다.
또는 `GameMap`을 확장하여 자신만의 지도를 만드는 베이스를 사용할 수도 있습니다.
