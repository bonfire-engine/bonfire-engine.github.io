# Get Started

> An awesome project.

## Installing

1. Depend on it

Add Bonfire to your game's `pubspec.yaml` file by running the following command:

```console
$ flutter pub add bonfire
```

2. Import it

Now in your Dart code, you can use:

```dart
import 'package:bonfire/bonfire.dart';
```

## Using

### Creating your map
You need create your map using [Tiled](https://www.mapeditor.org/). After that you can export your map to json file. [You might see more detail about using Tiled in Bonfire](doc/tiled_support?id=tiled-support) [Take a look the tutorial video about export map to json files](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

Now you can run to see your map:


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

This way you can see your map be rendering and can use directional joystick to explorer.


### Creating your player

To create a player you will need SpriteAnimations. You can see how load Sprites in [Flame doc](https://docs.flame-engine.org/main/flame/rendering/images.html).

Imagens used in this example:


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


To create a player just need create a class and extends by `SimplePlayer`. [See more detail about Player in Bonfire](doc/player?id=player)


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

Now you just need add your player in the game:


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
      player: Knight(Vector2(40,40))
    );
  }
```

And then you can see your player in the map and move that with directional of the Joystick.

## Next step

Know all components that you can use in Bonfire [See here](doc/overview?id=overview)

You might see all examples [here](doc/examples?id=bonfire-example).