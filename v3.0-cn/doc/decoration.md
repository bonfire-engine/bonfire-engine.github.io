# 装饰物（Decoration）

> <small>This is an [AnimatedGameObject](doc/util?id=animatedgameobject)</small>

任何你可能希望添加到场景中的物体。例如，一个简单的木桶或者一个可以与玩家互动的 NPC。

你可以使用以下构建器来创建装饰性或互动性对象：

使用普通精灵进行:
```dart
GameDecoration.withSprite(
    FutureOr<Sprite> sprite, {
    required Vector2 position, // initial position in world
    required Vector2 size,
  })
```

使用 SpriteAnimation :
```dart
import 'package:flame/animation.dart' as FlameAnimation;

GameDecoration.withAnimation(
    FutureOr<SpriteAnimation> animation, {
    required Vector2 position, // initial position in world
    required Vector2 size,
  })
```

要为你的装饰物添加自定义行为，只需继承 GameDecoration 并创建自己的类:
```dart
class MyCustomDecoration extends GameDecoration {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          SpriteAnimation.load(
            "itens/chest_spritesheet.png",
            SpriteAnimationData.sequenced(
              amount: 8,
              stepTime: 0.1,
              textureSize: Vector2(16, 16),
            ),
          ),
          size: Vector2(32,32),
          position: position,
        );

    @override
    void update(double dt) {
        // do anything
        super.update(dt);
    }

    @override
    void render(Canvas canvas) {
        // do anything
        super.render(canvas);
    }
}
```

查看更多自定义装饰物的示例: [torch](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/torch.dart) & [chest](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/chest.dart)