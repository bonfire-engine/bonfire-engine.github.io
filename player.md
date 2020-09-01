# Player

> Represents the character controlled by the user in the game. Instances of this class has actions and movements ready to be used and configured.


We can create two types of enemies `SimplePlayer` and `RotationPlayer`:

## SimplePlayer

Used for 45º and 67.5º perspectives. And we can configure Motion animations for all directions (top, bottom, left, right, top_right, top_left, bottom_left, bottom_right).

To use it, simply create a class that will represent your enemy and extend SimplePlayer:

```dart

class Kinght extends SimplePlayer {

    Kinght(Position initPosition)
      : super(
          initPosition:initPosition, //required
          height:32, //required
          width:32, //required
          life: 100,
          speed: 100,
          collision: Collision(),
          initDirection: Direction.right,
          animIdleRight: FlameAnimation(), //required
          animIdleLeft: FlameAnimation(), //required
          animIdleTopLeft: FlameAnimation(),
          animIdleBottomLeft: FlameAnimation(),
          animIdleTopRight: FlameAnimation(),
          animIdleBottomRight: FlameAnimation(),
          animRunRight: FlameAnimation(), //required
          animRunLeft: FlameAnimation(), //required
          animRunTopLeft: FlameAnimation(),
          animRunBottomLeft: FlameAnimation(),
          animRunTopRight: FlameAnimation(),
          animRunBottomRight: FlameAnimation(),
          animIdleTop: FlameAnimation(),
          animIdleBottom: FlameAnimation(),
          animRunTop: FlameAnimation(),
          animRunBottom: FlameAnimation(),
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
       FlameAnimation.Animation animationRight,
       FlameAnimation.Animation animationBottom,
       FlameAnimation.Animation animationLeft,
       FlameAnimation.Animation animationTop,
       @required double damage,
       int id,
       Direction direction,
       double heightArea = 32,
       double widthArea = 32,
       bool withPush = true,
     }
  )
  
  // Executes a distance attack. Will add a `FlyingAttackObject` to the game and will be send in the configures direction and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
  void simpleAttackRange(
     {
       @required FlameAnimation.Animation animationRight,
       @required FlameAnimation.Animation animationLeft,
       @required FlameAnimation.Animation animationTop,
       @required FlameAnimation.Animation animationBottom,
       @required FlameAnimation.Animation animationDestroy,
       @required double width,
       @required double height,
       double speed = 150,
       double damage = 1,
       int id,
       Direction direction,
       bool withCollision = true,
       VoidCallback destroy,
       Collision collision,
       LightingConfig lightingConfig,
     }
  )

  // Shows the damage value as an animation on the game.
   void showDamage(
      double damage,
      {
         TextConfig config = const TextConfig(
           fontSize: 10,
           color: Colors.white,
         )
      }
    )
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
       {
          Function(List<Enemy>) observed,
          Function() notObserved,
          int radiusVision = 32,
       }
    )
    
    // Add to `render` method if you want to draw the collision area.
    void drawPositionCollision(Canvas canvas)
    
    // Executes an animation once.
    void addFastAnimation(FlameAnimation.Animation animation)
    
    // Applies damage
    void receiveDamage(double damage)
    
    // Restore life point
    void addLife(double life)

```

## RotationPlayer

Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class PlayerTank extends RotationEnemy {

    PlayerTank(Position initPosition)
      : super(
          initPosition:initPosition, //required
          height:32, 
          width:32, 
          life: 100,
          speed: 100,
          collision: Collision(),
          currentRadAngle: -1.55,
          animIdle: FlameAnimation(), //required
          animRun: FlameAnimation(), //required
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
       FlameAnimation.Animation animationTop,
       @required double damage,
       int id,
       double radAngleDirection,
       double heightArea = 32,
       double widthArea = 32,
       bool withPush = true,
     }
  )
  
  // Executes a distance attack. Will add a `FlyingAttackObject` to the game and will be send in the configures direction and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
  void simpleAttackRange(
     {
       @required FlameAnimation.Animation animationTop,
       FlameAnimation.Animation animationDestroy,
       @required double width,
       @required double height,
       double speed = 150,
       double damage = 1,
       int id,
       double radAngleDirection,
       bool withCollision = true,
       VoidCallback destroy,
       Collision collision,
       LightingConfig lightingConfig,
     }
  )

  // Shows the damage value as an animation on the game.
   void showDamage(
      double damage,
      {
         TextConfig config = const TextConfig(
           fontSize: 10,
           color: Colors.white,
         )
      }
    )
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
       {
          Function(List<Enemy>) observed,
          Function() notObserved,
          int radiusVision = 32,
       }
    )
    
    // Add to `render` method if you want to draw the collision area.
    void drawPositionCollision(Canvas canvas)
    
    // Executes an animation once.
    void addFastAnimation(FlameAnimation.Animation animation)
    
    // Applies damage
    void receiveDamage(double damage)
    
    // Restore life point
    void addLife(double life)

```

## Custom

If none of these types of enemies do not meet your needs. You can create your own by extending the `Player` class.

With Enemy you will have access to the following methods:

* void moveTop(double speed)
* void moveBottom(double speed)
* void moveLeft(double speed)
* void moveRight(double speed)
* void moveFromAngle(double speed, double angle)
* void receiveDamage(double damage, int from)
* void addLife(double life)
* void die()