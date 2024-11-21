# Player

> <small>This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/base/game_component.dart) and uses `mixins` like 
[Movement](mixins?id=movement), 
[Attackable](mixins?id=attackable), 
[Vision](mixins?id=vision), 
[MovementByJoystick](mixins?id=movementbyjoystick) and 
[JoystickListener](joystick?id=joysticklistener)</small>

Represents the character controlled by the user in the game. Instances of this class have actions and movements ready to be used and configured. 

We can create three types of enemies `SimplePlayer`, `RotationPlayer` and `PlatformPlayer`:

## SimplePlayer 
> <small>This is a [Player](#Player) and uses [DirectionAnimation](doc/mixins?id=directionanimation)</small>


Used for 45º and 67.5º perspectives. We can configure Motion animations for all directions (top, bottom, left, right, top_right, top_left, bottom_left, bottom_right).

To use it, simply create a class that will represent your enemy and extend SimplePlayer:

```dart

class Knight extends SimplePlayer {

    Knight(Vector2 position)
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
            runDowntRight: Future<SpriteAnimation>(),
          ), //required
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

    @override
    void joystickChangeDirectional(JoystickDirectionalEvent event) {
      // do anything with event of the joystick
      super.joystickChangeDirectional(event);
    }

    @override
    void joystickAction(JoystickActionEvent event) {
      // do anything with event of the joystick
      super.joystickAction(event);
    }

}

```

All movement of the player is already done automatically, listening to the user's interaction with the joystick.

Player instances can receive actions configured on the Joystick by overriding the following method:

```dart

  @override
  void joystickAction(JoystickActionEvent event) {
    // do anything with event of the joystick
    super.joystickAction(event);
  }

```


Actions can be fired when a joystick action is received. Just like `Enemy`, here we have some pre-included actions:

```dart

// Executes a physical attack to the player, making the configured damage with the configured frequency. You can add animations to represent this attack.
  void simpleAttackMelee(
    {
      Future<SpriteAnimation>? animationRight,
      required double damage,
      required Vector2 size,
      dynamic id,
      Direction? direction,
      bool withPush = true,
      double? sizePush,
      Vector2? centerOffset,
      double? marginFromCenter,
      bool diagonalEnabled = true,
    }
  )
  
  // Executes a ranged attack. Will add a `FlyingAttackObject` proyectile to the game, which will be sent in the configured direction, and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
  void simpleAttackRange(
    {
      required Future<SpriteAnimation> animationRight,
      required Vector2 size,
      Future<SpriteAnimation>? animationDestroy,
      Vector2? destroySize,
      dynamic id,
      double speed = 150,
      double damage = 1,
      Direction? direction,
      bool withCollision = true,
      bool diagonalEnabled = true,
      VoidCallback? onDestroy,
      ShapeHitbox? collision,
      LightingConfig? lightingConfig,
    }
  )
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
      {
        required Function(List<Enemy>) observed,
        VoidCallback? notObserved,
        double radiusVision = 32,
        double? angle, // direction
        double? visionAngle, // default 6.28319 (360 degrees)
      }
    )

```

And all of the `GameComponent` methods . Take a look [GameComponent functions](doc/util?id=functions)

### Change animations

To update the `SimplePlayer` animation you should use this method:

```dart

  replaceAnimation(SimpleDirectionAnimation());

```

To play the moment animation you should use the `SimpleDirectionAnimation` methods. For example:

```dart

  animation.playOnce(
    FutureOr<SpriteAnimation> animation, 
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

## RotationPlayer

> <small>This is a [Player](#Player) and uses
[UseSpriteAnimation](doc/mixins?id=usespriteanimation),
[UseAssetsLoader](doc/mixins?id=useassetsloader)</small>

Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class PlayerTank extends RotationPlayer {

    PlayerTank(vector2 position)
      : super(
        position: position, //required
        animIdle: Future<SpriteAnimation>(), //required
        animRun: Future<SpriteAnimation>(), //required
        size: Vector.all(32), //required
        life: 100,
        speed: 100,
        currentRadAngle: -1.55,
      );
}

```

Actions can be fired when a joystick action is received. Just like `Enemy`, here we have some pre-included actions:

```dart

// Executes a physical attack to the player, making the configured damage with the configured frequency. You can add animations to represent this attack.
  void simpleAttackMelee(
     {
      required Future<SpriteAnimation> attackEffectTopAnim,
      required double damage,
      required Vector2 size,
      int? id,
      bool withPush = false,
      double? radAngleDirection,
      double marginFromCenter = 16,
      Vector2? centerOffset,
     }
  )
  
  // Executes a ranged attack. Will add a `FlyingAttackObject` proyectile to the game, which is sent in the configured direction and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
  void simpleAttackRange(
     {
      required Future<SpriteAnimation> animation,
      required Vector2 size,
      Future<SpriteAnimation>? animationDestroy,
      Vector2? destroySize,
      dynamic id,
      double speed = 150,
      double damage = 1,
      double? radAngleDirection,
      bool withDecorationCollision = true,
      VoidCallback? onDestroy,
      ShapeHitbox? collision,
      LightingConfig? lightingConfig,
      Vector2? centerOffset,
      double marginFromOrigin = 16,
    }
  )
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
       {
          required Function(List<Enemy>) observed,
          VoidCallback? notObserved,
          double radiusVision = 32,
       }
    )

```

### Change animations

To update the `RotationPlayer` just update the variables `animIdle` and `animRun`.

## PlatformPlayer

> <small>This is a [SimplePlayer](#SimplePlayer) and uses
[BlockMovementCollision](doc/collision_system?id=collision-system),
Jump,
JumpAnimation</small>

Used for platform games. Here, we can configure Motion animations for run, idle and jump.

```dart

class MarioPlayer extends PlatformPlayer {

    MarioPlayer(Vector2 position)
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

To make the player jump you can use the [Jumper mixin](#TODO) method :

```dart
  jump({double? jumpSpeed, bool force = false});

```


### Change animations

To update the `PlatformPlayer` animation you should use this method:

```dart

  replacePlatformAnimation(PlatformAnimations());

```

To play the moment animation you should use the `SimpleDirectionAnimation` methods. For example:

```dart

  animation.playOnce(
    FutureOr<SpriteAnimation> animation, 
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

> OBS: Remember to add a gravity force in this component to correct the behavior. Take a look [HandleForces](doc/forces?id=forces)

## Custom

If none of these types of player do not meet your needs. You can create your own by extending the `Player` class.
