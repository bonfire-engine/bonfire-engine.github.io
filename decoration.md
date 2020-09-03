# Decoration

> Anything that you may add to the scenery. For example a Barrel in the way or even a NPC in which you can use to interact with your player.

We can create our decorative or interactable objects using the following builders::

To decoration with Sprite:
```dart
GameDecoration.sprite(
    Sprite sprite, {
    @required this.initPosition, // initial position in world
    @required this.height,
    @required this.width,
    this.frontFromPlayer = false, // 'true' if you want it to be drawn over the player
    Collision collision, // if you want collision fill in with the settings.
  })

  or

  GameDecoration.spriteMultiCollision(
    Sprite sprite, {
    @required this.initPosition,
    @required this.height,
    @required this.width,
    this.frontFromPlayer = false,
    List<Collision> collisions,
  }) {
    if (frontFromPlayer) additionalPriority = 1;
    _sprite = sprite;
    this.position = generateRectWithBleedingPixel(
      initPosition,
      width,
      height,
    );
    this.collisions = collisions;
  }
```

To decoration with Animation:

```dart
import 'package:flame/animation.dart' as FlameAnimation;

GameDecoration.animation(
    FlameAnimation.Animation animation, {
    @required this.initPosition,
    @required this.height,
    @required this.width,
    this.frontFromPlayer = false,
    Collision collision,
  })

  or

  GameDecoration.animationMultiCollision(
    FlameAnimation.Animation animation, {
    @required this.initPosition,
    @required this.height,
    @required this.width,
    this.frontFromPlayer = false,
    List<Collision> collisions,
  })
```

If you want to add custom behaviors to your Decoration. You can create your own class as follows:

```dart
class MyCustomDecoration extends GameDecoration {
  MyCustomDecoration(Position position)
      : super.animation(
          FlameAnimation.Animation.sequenced(
            "animation.png",
            6,
            textureWidth: 16,
            textureHeight: 16,
          ),
          width: 32,
          height: 32,
          initPosition: position,
        );

        // do anything

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

examples of custom Decorations: [torch](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/decoration/torch.dart), [chest](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/decoration/chest.dart)