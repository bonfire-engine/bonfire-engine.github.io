# Mapa

> Representa um mapa (ou mundo) onde o jogo ocorre.

É uma matriz de pequenos blocos que juntos montam o mapa como visto abaixo:

![](../../_media/map.png)

✅ [Suporta o Tiled](https://www.mapeditor.org/)
✅ [Suporta o SpriteFusion](https://www.spritefusion.com/)


## Usando o Tiled

Atualmente, recomendamos criar o mapa usando o [Tiled](https://www.mapeditor.org/). Para isso usamos `WorldMapByTiled` em `BonfireWidget`, passando o mapa json no parâmetro `map`:

```dart
WorldMapByTiled(WorldMapReader.fromAsset('tile/map.json'))
```

O primeiro parâmetro (`tile/map.json`) é o caminho do arquivo `.json` exportado pelo Tiled.

> IMPORTANTE: O Bonfire suporta apenas arquivos .json.

> IMPORTANTE: Certifique-se de que o arquivo do mapa esteja nomeado corretamente e colocado no diretório `assets/images` para evitar problemas de carregamento.

Você também pode carregar um mapa de uma URL. Basta passar a URL no caminho. Exemplo:

```dart
WorldMapByTiled(
     WorldMapReader.fromNetwork( 
        Uri.parse('https://raw.githubusercontent.com/RafaelBarbosatec/rafaelbarbosatec.github.io/master/tiled/my_map.json')
    ),
)
```

## Adicionando Objetos

Você pode adicionar objetos como [Decorações](doc/decoration?id=decoration) e [Inimigos](doc/enemy?id=enemy) ao mapa usando o método `registerObject`:

```dart
    return BonfireWidget(
        map: WorldMapByTiled(
            WorldMapReader.fromAsset('tiled/map.json'),
            objectsBuilder: {
                'orc': (TiledObjectProperties properties) => Orc(properties.position),
            },
        ),
        // ...
    );
```

Basta criar uma camada de objetos no seu mapa e posicioná-la como no exemplo da imagem acima.

Para mais detalhes sobre o uso do Tiled [clique aqui](doc/tiled_support?id=tiled-support).


## Usando o SpriteFusion

Basta criar um mapa no [spritefusion](https://www.spritefusion.com/), exporte como JSON e coloque-o na sua pasta `assets/image`.

Para carregar use `WorldMapBySpritefusion` no `BonfireWidget` no parâmetro `map`:

```dart
WorldMapBySpritefusion(WorldMapReader.fromAsset('spritefusion/map.json'))
```
[Exemplo](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/pages/map/spritefusion/spritefusion_page.dart)

## Criando mapas por matriz

Você pode criar mapas usando a matriz de double assim:

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

Este recurso abre a possibilidade de criar mapas radom. Basta usar qualquer algoritmo para criar sua matriz como o [fast_noise](https://pub.dev/packages/fast_noise). 

Há um exemplo usando este pacote no [repositório do Bonfire](https://github.com/RafaelBarbosatec/bonfire/tree/master/example).

Para ficar mais fácil, implementamos uma classe que ajuda a adicionar sprites nesses mapas. O `TerrainBuilder`.

### Uso Básico

É muito simples utilizar este recurso:

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
        builder: (ItemMatrixProperties prop) {

            // prop.value; // Este é o valor da matriz
            // prop.position; Esta é a posição x e y;
            // Você pode acessar os valores dos vizinhos
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
                // color: Colors.blue, // Você também pode usar apenas cores
            );
        },
      ),
    );
```

No `builder` você pode criar cada `tile` do mapa, retornando o `TileModel` com suas propriedades.

### Usando o TerrainBuilder

Para usar esse recurso, você precisará do SpriteSheet dos cantos dos ladrilhos com esse padrão:

Este SpriteSheet é um tile de areia para grama:

![](../../_media/earth_to_grass.png)

Este SpriteSheet é um tile de areia para água:

![](../../_media/earth_to_water.png)

---

Agora é só registrar os sprites dos tiles e os cantos dos sprites dos tiles assim:

Primeiro crie o TerrainBuilder:

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

Depois disso você passa o método 'build' do `terrainBuilder` para `builder`:

```dart

return BonfireWidget(
      map: MatrixMapGenerator.generate(
        axisInverted: true, // Isto é `true` para criar o mapa igual ao visto na matriz. Como o eixo normal é `matrix[x][y]`, quando `axisInverted` é `true` é a vez de `matrix[y][x]`
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

E então, este é o resultado:

![](../../_media/random_map_example.png)


### MapTerrain

`MapTerrain` é cada tipo de terreno que seu mapa pode ter.

Existem dois tipos:
- MapTerrain: O terreno básico que não tem cantos.
- MapTerrainCorners: O terreno que lida com os cantos.

##### MapTerrain

```dart
MapTerrain(
    value: TILE_WATER, /// número na matriz que deve ser este terreno
    type: 'water',
    collisions: [],
    properties: Map<String, dynamic>(),
    spritesProportion: [0.6,0.4], // Define as probabilidades de cada sprite aparecer. Se não definido, as probabilidades são iguais.
    sprites: [  /// Aqui usamos um array porque podemos passar muitos sprites neste tipo.
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

## Customização

Você pode criar seu próprio mapa criando uma classe estendendo o `WorldMap` e preenchendo os tiles `List<TileModel>`.

Dessa forma, você reutilizará o algoritmo QuadTree usado para desenhar o mapa.

Ou você pode usar a base criando seu próprio mapa estendendo o `GameMap`.
