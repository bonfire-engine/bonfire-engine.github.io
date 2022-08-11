# Npc
> <small>This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/v2.4.0/lib/base/game_component.dart) and use 
[Movement](mixins?id=movement) and 
[Vision](mixins?id=vision).</small>

Create an Npc in the game. Instances of this class have predefined behaviors ready to be used and configured as wanted. All the actions and movements are customizable.

There are two types of enemies: `SimpleNpc` and `RotationNpc`:

## SimpleNpc

> <small>This is a [Npc](#npc) and use 
[DirectionAnimation](mixins?id=directionanimation).</small>

Used for 45º and 67.5º perspectives. We can configure motion animations for all directions (up, down, left, right, up_right, up_left, down_left, down_right).

To use it, simply create a class that will represent your enemy and extend SimpleNpc:

```dart

class Wizard extends SimpleNpc {

    Wizard(Vector2 position)
      : super(
          position: position, //required
          size: Vector2(32.0,32.0), //required
          life: 100,
          speed: 100,
          initDirection: Direction.right,
          animation: SimpleDirectionAnimation(
            idleLeft: Future<SpriteAnimation>(), 
            idleRight: Future<SpriteAnimation>(), //required
            runLeft: Future<SpriteAnimation>(), 
            runRight: Future<SpriteAnimation>(), //required
            idleUp: Future<SpriteAnimation>(),
            idleDown: Future<SpriteAnimation>(),
            idleUpLeft: Future<SpriteAnimation>(),
            idleUpRight: Future<SpriteAnimation>(),
            idleDownLeft: Future<SpriteAnimation>(),
            idleDownRight: Future<SpriteAnimation>(),
            runUp: Future<SpriteAnimation>(),
            runDown: Future<SpriteAnimation>(),
            runUpLeft: Future<SpriteAnimation>(),
            runUpRight: Future<SpriteAnimation>(),
            runDownLeft: Future<SpriteAnimation>(),
            runDownRight: Future<SpriteAnimation>(),
          ),
      );

    @override
    void update(double dt) {
      // Do anything
      super.update(dt);
    }

    @override
    void render(Canvas canvas) {
      // Do anything
      super.render(canvas);
    }

}

```

Now that you have a class that represents your npc, you can configure their behavior.

There are several useful extensions that you can use inside the `update` method that will help you with this task:


```dart 
void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // default 6,28319 (360 graus)
  })
```
It will trigger a callback function once the player is within the enemy's radiusVision.


```dart 
void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    double radiusVision = 32,
    double margin = 10,
    double? visionAngle, // default 6,28319 (360 graus)
  })
```
The npc will move in the direction of the player once it gets within the radiusVision. When it gets close to the player, `closePlayer` will be fired.

If you want to add quick animations, like effects of taking damage or making a special attack, you can use the method `addFastAnimation`:

```dart 
this.animation.playOnce(
  Future<SpriteAnimation> animation,
  Vector2Rect position, 
  {
    VoidCallback? onFinish,
    bool runToTheEnd = false,
  }
)
```

Complete SimpleNpc example [here](https://github.com/RafaelBarbosatec/bonfire/blob/v2.4.0/example/lib/shared/npc/wizard/wizard.dart).


## RotationNpc

> <small>This is a [Npc](#npc) and use 
[UseSpriteAnimation](mixins?id=usespriteanimation),
[UseAssetsLoader](mixins?id=useassetsloader).</small>

Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class Wizard extends RotationNpc {

    Tank(Vector2 position)
      : super(
          position: position, //required
          animIdle: Future<SpriteAnimation>(), //required
          animRun: Future<SpriteAnimation>(), //required
          size: Vector2(32.0,32.0), //required
          life: 100,
          speed: 100,
          currentRadAngle: -1.55, 
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

Now that we have our class that represents our npc, we can configure their behavior.

There are several useful extensions that we can use in `update` that will help us to configure these movements:

```dart 
void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
  })
```

```dart 
 void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    double radiusVision = 32,
    double margin = 10,
  })
```

## Custom

If none of these types of Npc do not meet your needs. You can create your own by extending the `Npc` class.