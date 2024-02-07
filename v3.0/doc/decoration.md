# Decoration

> <small>This is an [AnimatedGameObject](doc/util?id=animatedgameobject)</small>

Anything that you may want to add to your scenery. For example, a simple barrel or a NPC that interacts with your player.

You can create decorative or interactive objects using the following builders:

Decoration with a common Sprite:
```dart
GameDecoration.withSprite(
    FutureOr<Sprite> sprite, {
    required Vector2 position, // initial position in world
    required Vector2 size,
  })
```

Decoration with a SpriteAnimation:
```dart
import 'package:flame/animation.dart' as FlameAnimation;

GameDecoration.withAnimation(
    FutureOr<SpriteAnimation> animation, {
    required Vector2 position, // initial position in world
    required Vector2 size,
  })
```

To add custom behaviors to your Decoration, just extend from `GameDecoration` and create your own class:
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

See more examples of custom Decorations: [torch](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/torch.dart) & [chest](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/chest.dart)