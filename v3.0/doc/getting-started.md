# Getting Started

> Visualize your awesome project.

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
You need to create your map using [Tiled](https://www.mapeditor.org/). After that, you can export your map as a json file.

[How to use Tiled in Bonfire](doc/tiled_support?id=tiled-support) 

[Tutorial video about exporting maps as json files](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

> IMPORTANT: Make sure your map file is correctly named, and placed in assets/images directory to avoid any loading issues.

Now you can run the app, and see your map:

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
> Note: You can also add a [Keyboard Controller](doc/input?id=keyboard).

This way you can see how your map is rendering, and use the directional joystick to explore.


### Creating your player

To create a player you will need SpriteAnimations. You can see how to load Sprites in [Flame doc](https://docs.flame-engine.org/main/flame/rendering/images.html).

Images used in this example:


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


To create a player, just create a class and add the `extends SimplePlayer`. [See more details about Player in Bonfire](doc/player?id=player)


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

Now you just need to add your player to the game. Keep in mind that the `Vector2(40, 40)` is the initial position of the player.


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

You can see your player on the map and move it with the directional Joystick.

## Next steps

Familiarize yourself with all the components that you can use in Bonfire [See here](doc/overview?id=overview)

Or check out our examples [here](doc/examples?id=bonfire-example).