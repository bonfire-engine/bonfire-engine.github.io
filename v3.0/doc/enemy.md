# Enemy

> <small>This is a [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart) and use
[Attackable](doc/mixins?id=attackable) mixin.</small>


Create an enemy in the game. Instances of this class have predefined behaviors ready to be used and configured as wanted. All the actions and movements are customizable.

There are three types of enemies: `SimpleEnemy`, `RotationEnemy` and `PlatformEnemy`:

## SimpleEnemy

> <small>This is a [Enemy](#enemy) and use 
[DirectionAnimation](doc/mixins?id=directionanimation) mixin.</small>

<img width=100 src="_media/simple_enemy.png"></img>

Used for 45º and 67.5º perspectives. We can configure motion animations for all directions (up, down, left, right, up_right, up_left, down_left, down_right).

To use it, simply create a class that will represent your enemy and extend SimpleEnemy:

```dart

class Goblin extends SimpleEnemy {

    Goblin(Vector2 position)
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
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // default 6,28319 (360 graus)
    double? angle,
  })
```
It will trigger a callback function once the player is within the enemy's radiusVision.


```dart 
  void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    VoidCallback? notObserved,
    VoidCallback? observed,
    VoidCallback? notCanMove,
    double radiusVision = 32,
    double margin = 10,
    double? visionAngle, // default 6,28319 (360 graus)
    double? angle,
    bool runOnlyVisibleInScreen = true, 
  })
```
The enemy will move in the direction of the player once it gets within the radiusVision. When it gets close to the player, `closePlayer` will be fired.


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
    Function(Player)? positioned,
    Function(Player)? observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle,
    double? angle,
    double? minDistanceFromPlayer,
    bool runOnlyVisibleInScreen = true,
  })
```
When the player is within the radiusVision, the enemy will position itself to perform a distance attack. Once it reaches the attack position, the `positioned` callback will be fired.


And all of the `GameComponent' methods . Take a look [GameComponent functions](doc/util?id=functions)


### Change animations

To update the `SimpleEnemy` animation you should use this method:

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

Note: Enemies only move if they are visible in the camera. if you want to disable this, add false in `collisionOnlyVisibleScreen` in your collision config. See [Colission System](doc/collision_system?id=collision-system).

Complete SimpleEnemy example [here](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/enemy/goblin.dart).


## RotationEnemy

> <small>This is a [Enemy](https://github.com/RafaelBarbosatec/bonfire/blob/v2.4.0/lib/npc/enemy/enemy.dart) and use 
[UseSpriteAnimation](doc/mixins?id=usespriteanimation),
[UseAssetsLoader](doc/mixins?id=useassetsloader).</small>

<img width=100 src="_media/rotation_enemy.png"></img>

Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class Tank extends RotationEnemy {

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
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // default 6,28319 (360 graus)
    double? angle,
  })
```

```dart 
 void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double margin = 10,
    bool runOnlyVisibleInScreen = true,
  })
```

```dart 
  void seeAndMoveToAttackRange({
    required Function(Player) positioned,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? minDistanceCellsFromPlayer,
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


## PlatformEnemy

> <small>This is a [SimpleEnemy](#SimpleEnemy) and use
[BlockMovementCollision](doc/collision_system?id=collision-system),
Jump
and JumpAnimation</small>

Used for platform games. And we can configure Motion animations for run, idle and jump.

```dart

class BowserEnemy extends PlatformEnemy {

    BowserEnemy(vector2 position)
      : super(
        position: position, //required
        animation: PlatformAnimations(), //required
        size: Vector.all(32), //required
        life: 100,
        speed: 100,
        countJumps: 1,
      );
}

```

### Jumping

To do the player jump you ccan use the [Jumper mixin](#TODO) method :

```dart
  jump({double? jumpSpeed, bool force = false});

```


### Change animations

To update the `PlatformEnemy` animation you should use this method:

```dart

  replacePlatformAnimation(PlatformAnimations());

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

> OBS: You need remember adds a gravity force in this component to be the correct behavior. Take a look [HandleForces](doc/forces?id=forces)


## Custom

If none of these types of enemies do not meet your needs. You can create your own by extending the `Enemy` class.
