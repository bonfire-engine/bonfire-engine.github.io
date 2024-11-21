# Começando

> Visualize seu projeto incrível.

## Instalando

1. Adicione como dependência

Adicione o Bonfire ao `pubspec.yaml` do seu jogo executando o seguinte comando:

```console
$ flutter pub add bonfire
```

2. Importe o Bonfire

Agora, no seu código Dart, você pode usar:

```dart
import 'package:bonfire/bonfire.dart';
```

## Usando

### Criando seu mapa
Você precisa criar seu mapa usando o [Tiled](https://www.mapeditor.org/). Depois disso, você pode exportar seu mapa como um arquivo json.

[Como usar Tiled no Bonfire](doc/tiled_support?id=tiled-support) 

[Vídeo tutorial sobre como exportar mapas como arquivos json](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

> IMPORTANTE: Certifique-se de que o arquivo do mapa esteja nomeado corretamente e colocado no diretório `assets/images` para evitar problemas de carregamento.

Agora você pode executar o jogo e ver seu mapa:

```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      playerControllers: [
        Joystick(
          directional: JoystickDirectional(),
        )
      ],
      map: WorldMapByTiled(
        WorldMapReader.fromAsset('tile/map.json')
      ),
    );
  }
```
> Nota: Você também pode adicionar um [Controlador do Teclado](doc/input?id=keyboard).

Dessa forma, você pode ver como seu mapa está sendo renderizado e usar o joystick direcional para explorar.

### Criando seu jogador

Para criar um jogador você precisará de Animações de Sprite. Você pode ver como carregar Sprites na [Documentação do Flame](https://docs.flame-engine.org/main/flame/rendering/images.html).

Imagens usadas neste exemplo:

[![Idle](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_idle.png)](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_idle.png)

[![Run](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_run.png)](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_run.png)


```dart
class PlayerSpriteSheet {
 
  static Future<SpriteAnimation> get idleRight => SpriteAnimation.load(
        "player/knight_idle.png",
        SpriteAnimationData.sequenced(
          amount: 6,
          stepTime: 0.1,
          textureSize: Vector2(16, 16),
        ),
      );

  static Future<SpriteAnimation> get runRight => SpriteAnimation.load(
        "player/knight_run.png",
        SpriteAnimationData.sequenced(
          amount: 6,
          stepTime: 0.1,
          textureSize: Vector2(16, 16),
        ),
      );

  static SimpleDirectionAnimation get simpleDirectionAnimation =>
      SimpleDirectionAnimation(
        idleRight: idleRight,
        runRight: runRight,
      );
}
```


Para criar um jogador, basta criar uma classe e adicionar o `extends SimplePlayer`. [Veja mais detalhes sobre o `Player` no Bonfire](doc/player?id=player)


```dart
class Knight extends SimplePlayer {
    Knight(Vector2 position)
      : super(
          position: position, 
          size: Vector2.all(32),
          animation: PlayerSpriteSheet.simpleDirectionAnimation,
      );
}
```

Agora você só precisa adicionar seu jogador no jogo. Tenha em mente que o `Vector2(40, 40)` é a posição inicial do jogador.

```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      playerControllers: [
        Joystick(
          directional: JoystickDirectional(),
        )
      ], 
      map: WorldMapByTiled(
        WorldMapReader.fromAsset('tile/map.json')
      ),
      player: Knight(Vector2(40, 40))
    );
  }
```

Você pode ver seu jogador no mapa e movê-lo com o joystick direcional.

## Próximos passos

Familiarize-se com todos os componentes que você pode usar no Bonfire. [Veja aqui](doc/overview?id=overview).

Ou confira nossos exemplos [aqui](doc/examples?id=bonfire-example).