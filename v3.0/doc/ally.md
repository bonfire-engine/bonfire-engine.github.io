# Ally

> <small>This is a [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart) and use
[Attackable](doc/mixins?id=attackable) mixin.</small>


This is a NPC that is a player ally. So, can receive damage from enemy and can inflige damage in enemy.

There are three types of enemies: `SimpleAlly`, `RotationAlly` and `PlatformAlly`:

## SimpleAlly

> <small>This is a [Ally](#ally) and use 
[DirectionAnimation](doc/mixins?id=directionanimation) mixin.</small>

Used for 45º and 67.5º perspectives. We can configure motion animations for all directions (up, down, left, right, up_right, up_left, down_left, down_right).

To use it, simply create a class that will represent your enemy and extend SimpleAlly:

```dart

class Human extends SimpleAlly {

    Human(Vector2 position)
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

Now that you have a class that represents your enemy, you can configure their behavior.

There are several useful extensions that you can use inside the `update` method that will help you with this task:


```dart 
  void simpleAttackMelee({
     required double damage,
    required Vector2 size,
    int? id,
    int interval = 1000,
    bool withPush = false,
    double? sizePush,
    Direction? direction,
    Future<SpriteAnimation>? animationRight,
    VoidCallback? execute,
    Vector2? centerOffset,
  })
```
Executes a physical attack to the player, making the configured damage with the configured frequency. You can add animations to represent this attack.


```dart 
  void simpleAttackRange({
    required Future<SpriteAnimation> animationRight,
    required Future<SpriteAnimation> animationDestroy,
    required Vector2 size,
    Vector2? destroySize,
    int? id,
    double speed = 150,
    double damage = 1,
    Direction? direction,
    int interval = 1000,
    bool withCollision = true,
    ShapeHitbox? collision,
    VoidCallback? onDestroy,
    VoidCallback? execute,
    LightingConfig? lightingConfig,
  })
```
Executes a distance attack. It will add a `FlyingAttackObject` to the game and this will be sent in the configured direction, making some damage to whomever it hits or being destroyed when hitting barriers (tiles with collision).


```dart 
  void seeAndMoveToAttackRange({
    Function(Enemy)? positioned,
    Function(Enemy)? observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle,
    double? angle,
    double? minDistanceFromPlayer,
    bool runOnlyVisibleInScreen = true,
  })
```
When the enemy is within the radiusVision, the ally will position itself to perform a distance attack. Once it reaches the attack position, the `positioned` callback will be fired.


And all of the `GameComponent' methods . Take a look [GameComponent functions](doc/util?id=functions)


### Change animations

To update the `SimpleAlly` animation you should use this method:

```dart

  replaceAnimation(SimpleDirectionAnimation());

```

To play the moment animation you should use the `SimpleDirectionAnimation` methods. For example:

```dart

  animation.playOnce(
    FutureOr<SpriteAnimation> animation, {
    VoidCallback? onFinish,
    VoidCallback? onStart,
    bool runToTheEnd = false,
    bool flipX = false,
    bool flipY = false,
    bool useCompFlip = false,
    Vector2? size,
    Vector2? offset,
  );
  animation.pause();
  animation.resume();

```


## RotationAlly

> <small>This is a [Ally](#ally) and use 
[UseSpriteAnimation](doc/mixins?id=usespriteanimation),
[UseAssetsLoader](doc/mixins?id=useassetsloader).</small>


Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class Tank extends RotationAlly {

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

Now that we have our class that represents our enemy, we can configure their behavior.

There are several useful extensions that we can use in `update` that will help us to configure these movements:


```dart 
  void seeAndMoveToAttackRange({
    Function(Enemy)? positioned,
    VoidCallback? notObserved,
    Function(Enemy)? observed,
    double radiusVision = 32,
    double? visionAngle,
    double? angle,
    double? minDistanceFromPlayer,
    bool runOnlyVisibleInScreen = true,
  })
```

```dart 
  void simpleAttackMelee({
    required Future<SpriteAnimation> animationRight,
    required double damage,
    required Vector2 size,
    int? id,
    bool withPush = true,
    double? radAngleDirection,
    VoidCallback? execute,
    int interval = 1000,
    double marginFromCenter = 16,
    Vector2? centerOffset,
  })
```

```dart 
  void simpleAttackRange({
    required Future<SpriteAnimation> animation,
    required Future<SpriteAnimation> animationDestroy,
    required Vector2 size,
    Vector2? destroySize,
    double? radAngleDirection,
    int? id,
    double speed = 150,
    double damage = 1,
    int interval = 1000,
    bool withDecorationCollision = true,
    VoidCallback? onDestroy,
    ShapeHitbox? collision,
    VoidCallback? onExecute,
    LightingConfig? lightingConfig,
    Vector2? centerOffset,
    double marginFromOrigin = 16, 
  })
  
```

And all of the `GameComponent' methods . Take a look [GameComponent functions](doc/util?id=functions)

## Custom

If none of these types of enemies do not meet your needs. You can create your own by extending the `Ally` class.
