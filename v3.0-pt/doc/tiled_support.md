# Suporte ao Tiled
> Testado na versão `1.9.0` do Tiled

[Exemplo em Vídeo](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

Suporte para mapas criados com o Tiled usando a extensão .json.

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


## Usando

Adicione os arquivos gerados pelo Tiled ao projeto seguindo a base: `assets/images/`

```yaml
flutter:
  assets:
    - assets/images/tiled/map.json
    - assets/images/tiled/tile_set.json
    - assets/images/tiled/img_tile_set.png
```

Para mapas construídos com Tiled devemos usar o Widget `BonfireWidget` (exemplo [aqui](doc/getting-started?id=creating-your-map)):

```dart
  return BonfireWidget(
    joystick: Joystick(
      directional: JoystickDirectional()
    ),
    map: WorldMapByTiled(
      WorldMapReader.fromAsset('tiled/map.json'),
      forceTileSize: DungeonMap.tileSize, // se você quiser forçar o tamanho do Tile a ser maior ou menor que o original
      objectsBuilder: {
          'goblin': (TiledObjectProperties properties) => Goblin(properties.position),
          'torch': (TiledObjectProperties properties) => Torch(properties.position),
          'barrel': (TiledObjectProperties properties) => BarrelDraggable(properties.position,),
      },
    ),
  );
```

## Exemplo de mapa do Tiled

Se você quiser que o Tile seja desenhado acima do jogador, adicione o tipo: `above` no seu tileSet.

![](../../_media/print_exemplo_tiled.png)

Resultado:

![](../../_media/print_result_tiled.png)


## Carregar mapa da rede

Você pode armazenar seus arquivos de mapa em um servidor e carregá-los. Basta carregar usando `TiledReader.network`:

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

Você também pode gerenciar o cache desta renderização. Por padrão, é usado o `TiledMemoryCacheProvider`. Você pode criar seu próprio sistema de cache criando uma classe e estendendo ela com `TiledCacheProvider`.

## Dicas úteis

- Você pode definir `class` no seu bloco como `above` para renderizar este bloco acima de todos os componentes do seu jogo.
- Se você precisar que todos os blocos de uma camada sejam renderizados acima de todos os componentes, você pode criar uma `Custom Property` na sua camada e criar uma chamada `class` com o valor `above`.
- Você pode definir `class` em seu tile como `dynamicAbove` para renderizar este tile dinâmico pelo eixo Y.
- Você pode definir `class` em seu Object como `collision`. Este objeto será adicionado ao jogo com transparência e colisão.
- Você pode definir `class` em seu ObjectLayer como `collision`. Todos os objetos desta camada serão adicionados ao jogo com transparência e colisão.
