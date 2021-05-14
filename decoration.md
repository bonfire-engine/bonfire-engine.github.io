# Decoration

> <small>This is a [AnimatedObject](objects#AnimatedObject)</small>

Anything that you may add to the scenery. For example a Barrel in the way or a NPC in which you can use to interact with your player.

We can create our decorative or interactable objects using the following builders:

To decoration with Sprite:
```dart
GameDecoration.withSprite(
    Future<Sprite> sprite, {
    required Vector2 position, // initial position in world
    required double height,
    required double width,
  })
```

To decoration with Animation:

```dart
import 'package:flame/animation.dart' as FlameAnimation;

GameDecoration.withAnimation(
    Future<SpriteAnimation> animation, {
    required Vector2 position, // initial position in world
    required double height,
    required double width,
  })
```

If you want to add custom behaviors to your Decoration. You can create your own class as follows:

```dart
class MyCustomDecoration extends GameDecoration {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          SpriteAnimation.load(
            "itens/chest_spritesheet.png",
            SpriteAnimationData.sequenced(
              amount: 8,
              stepTime: 0.1,
              textureSize: Vector2(16, 16),
            ),
          ),
          width: 32,
          height: 32,
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

examples of custom Decorations: [torch](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/example/lib/decoration/torch.dart), [chest](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/example/lib/decoration/chest.dart)