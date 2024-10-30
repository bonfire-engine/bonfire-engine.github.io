# 入门指南

> 展示你出色的项目。

## Installing

1. 依赖这个库

通过运行以下命令将 Bonfire 添加到你的游戏的 `pubspec.yaml` 文件中：

```console
$ flutter pub add bonfire
```

2. 导入

你应该看到下面这一行内容:

```dart
import 'package:bonfire/bonfire.dart';
```

## 使用方法：

### 创建你的地图
使用 [Tiled](https://www.mapeditor.org/)创建你的地图.并且把导出json格式的地图.

[How to use Tiled in Bonfire](doc/tiled_support?id=tiled-support) 

[Tutorial video about exporting maps as json files](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

> 重要提示：请确保地图文件命名正确，并放置在 `assets/images` 目录中，以避免加载问题。

运行app看看地图:

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
> 注意：你还可以添加一个 [Keyboard Controller](doc/input?id=keyboard).

这样你就可以看到地图的渲染效果，并使用方向摇杆来进行探索。


### 创建玩家

要创建一个玩家角色，你需要使用 `SpriteAnimations`。你可以在 [Flame 文档](https://docs.flame-engine.org/main/flame/rendering/images.html) 中了解如何加载精灵图。

本示例中使用的图片：


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


要创建一个玩家角色，只需创建一个类并添加 extends SimplePlayer。 [See more details about Player in Bonfire](doc/player?id=player)


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

现在你只需要将玩家添加到游戏中。请注意，`Vector2(40,40)` 是玩家的初始位置。

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

你现在可以在地图中看到你的玩家，并通过方向摇杆来移动它。
## 下一步

熟悉 Bonfire 中可以使用的所有组件。 [See here](doc/overview?id=overview)

或者查看我们的示例。 [here](doc/examples?id=bonfire-example).