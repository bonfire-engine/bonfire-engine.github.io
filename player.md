# Player
> <small>This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/base/game_component.dart) and use [Movement](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/util/mixins/movement.dart), [Attackable](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/util/mixins/attackable.dart), [MoveToPositionAlongThePath](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/util/mixins/move_to_position_along_the_path.dart) and [JoystickListener](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/joystick/joystick_controller.dart)</small>

Represents the character controlled by the user in the game. Instances of this class has actions and movements ready to be used and configured. 
We can create two types of enemies `SimplePlayer` and `RotationPlayer`:

## SimplePlayer 
> <small>This is a [Player](#Player)</small>

Used for 45º and 67.5º perspectives. And we can configure Motion animations for all directions (top, bottom, left, right, top_right, top_left, bottom_left, bottom_right).

To use it, simply create a class that will represent your enemy and extend SimplePlayer:

```dart

class Kinght extends SimplePlayer {

    Kinght(Vector2 position)
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

    @override
    void receiveDamage(double damage, int from) {
      super.receiveDamage(damage, from);
    }

    @override
    void die() {
      super.die();
    }
}

```

All movement of the player is already done automatically listening to the user's interaction with the joystick.

Player instances can receive action configured on the Joystick (read more about it below) by overriding the following method:

```dart

  @override
  void joystickAction(JoystickActionEvent event) {}

```


Actions can be fired when a joystick action is received. Just like `Enemy`, here we have some pre-included actions:

```dart

// Executes a physical attack to the player, making the configured damage with the configured frequency. You can add animations to represent this attack.
  void simpleAttackMelee(
     {
      required double damage,
      Future<SpriteAnimation>? animationRight,
      Future<SpriteAnimation>? animationDown,
      Future<SpriteAnimation>? animationLeft,
      Future<SpriteAnimation>? animationUp,
      dynamic id,
      Direction? direction,
      required Vector2 size,
      bool withPush = true,
     }
  )
  
  // Executes a distance attack. Will add a `FlyingAttackObject` to the game and will be send in the configures direction and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
  void simpleAttackRange(
    {
      required Future<SpriteAnimation> animationRight,
      required Future<SpriteAnimation> animationLeft,
      required Future<SpriteAnimation> animationUp,
      required Future<SpriteAnimation> animationDown,
      required Future<SpriteAnimation> animationDestroy,
      required Vector2 size,
      int? id,
      double speed = 150,
      double damage = 1,
      Direction? direction,
      int interval = 1000,
      bool withCollision = true,
      CollisionConfig? collision,
      VoidCallback? destroy,
      VoidCallback? execute,
      LightingConfig? lightingConfig,
    }
  )

  // Shows the damage value as an animation on the game.
  void showDamage(
    double damage, {
    TextConfig? config,
    double initVelocityTop = -5,
    double gravity = 0.5,
    double maxDownSize = 20,
    DirectionTextDamage direction = DirectionTextDamage.RANDOM,
    bool onlyUp = false,
  })
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
      {
        required Function(List<Enemy>) observed,
        VoidCallback? notObserved,
        double radiusVision = 32,
      }
    )
    
    // Executes an animation once.
    this.animation.playOnce(
      Future<SpriteAnimation> animation,
      Vector2Rect position, 
      {
        VoidCallback? onFinish,
        bool runToTheEnd = false,
      }
    )
    
    // Applies damage
    void receiveDamage(double damage)
    
    // Restore life point
    void addLife(double life)

```

## RotationPlayer

> <small>This is a [Player](#Player)</small>

Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class PlayerTank extends RotationEnemy {

    PlayerTank(vector2 position)
      : super(
        position: position, //required
        animIdle: Future<SpriteAnimation>(), //required
        animRun: Future<SpriteAnimation>(), //required
        required Vector2 size,
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

    @override
    void receiveDamage(double damage, int from) {
      super.receiveDamage(damage, from);
    }

    @override
    void die() {
      super.die();
    }
}

```

All movement of the player is already done automatically listening to the user's interaction with the joystick.

Player instances can receive action configured on the Joystick (read more about it below) by overriding the following method:

```dart

    @override
    void joystickAction(JoystickActionEvent event) {}

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
      VoidCallback? execute,
      int interval = 1000,
     }
  )
  
  // Executes a distance attack. Will add a `FlyingAttackObject` to the game and will be send in the configures direction and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
  void simpleAttackRange(
     {
      required Future<SpriteAnimation> animationTop,
      required Future<SpriteAnimation> animationDestroy,
      required Vector2 size,
      int? id,
      double speed = 150,
      double damage = 1,
      double? radAngleDirection,
      int interval = 1000,
      bool withCollision = true,
      bool collisionOnlyVisibleObjects = true,
      VoidCallback? destroy,
      CollisionConfig? collision,
      VoidCallback? execute,
      LightingConfig? lightingConfig,
    }
  )

  // Shows the damage value as an animation on the game.
   void showDamage(
      double damage, {
      TextConfig? config,
      double initVelocityTop = -5,
      double gravity = 0.5,
      double maxDownSize = 20,
      DirectionTextDamage direction = DirectionTextDamage.RANDOM,
      bool onlyUp = false,
    })
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
       {
          required Function(List<Enemy>) observed,
          VoidCallback? notObserved,
          double radiusVision = 32,
       }
    )
    
    // Executes an animation once.
    this.animation.playOnce(
      Future<SpriteAnimation> animation,
      Vector2Rect position, 
      {
        VoidCallback? onFinish,
        bool runToTheEnd = false,
      }
    )
    
    // Applies damage
    void receiveDamage(double damage)
    
    // Restore life point
    void addLife(double life)

    String tileTypeBelow()

    List<String> tileTypesBelow()

```

## Custom

If none of these types of enemies do not meet your needs. You can create your own by extending the `Player` class.

With Enemy you will have access to the following methods:

* void moveUp(double speed)
* void moveDown(double speed)
* void moveLeft(double speed)
* void moveRight(double speed)
* void moveUpLeft(double speed)
* void moveUpRight(double speed)
* void moveDownRight(double speed)
* void moveDownLeft(double speed)
* void moveFromAngle(double speed, double angle)
* void receiveDamage(double damage, int from)
* void addLife(double life)
* void die()