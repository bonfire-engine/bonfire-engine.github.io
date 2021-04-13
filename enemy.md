# Enemy

> Represents enemies characters in the game. Instances of this class has actions and movements ready to be used and configured whenever you want. At the same time, you can customize all actions and movements in the way that fits your needs.

We can create two types of enemies `SimpleEnemy` and `RotationEnemy`:

## SimpleEnemy

<img width=100 src="_media/simple_enemy.png"></img>

Used for 45º and 67.5º perspectives. And we can configure Motion animations for all directions (up, down, left, right, up_right, up_left, down_left, down_right).

To use it, simply create a class that will represent your enemy and extend SimpleEnemy:

```dart

class Goblin extends SimpleEnemy {

    Goblin(Vector2 position)
      : super(
          position: position, //required
          height: 32.0, //required
          width: 32.0, //required
          life: 100,
          speed: 100,
          initDirection: Direction.right,
          animation: SimpleDirectionAnimation(
            idleLeft: Future<SpriteAnimation>(), //required
            idleRight: Future<SpriteAnimation>(), //required
            runLeft: Future<SpriteAnimation>(), //required
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
    void receiveDamage(double damage, int from) {
      /// Called when the enemy receive damage
      super.receiveDamage(damage, from);
    }

    @override
    void die() {
      /// Called when the enemy die
      super.die();
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
  })
```
Will observe the player when within the radius (radiusVision)


```dart 
void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    double radiusVision = 32,
    double margin = 10,
  })
```
Will move in the direction of the player once it gets close within the radiusVision radius . Once it gets to the player, `closePlayer` shall be fired 


```dart 
void simpleAttackMelee({
    required double damage,
    required height = 32,
    required width = 32,
    int? id,
    int interval = 1000,
    bool withPush = false,
    double? sizePush,
    Direction? direction,
    Future<SpriteAnimation>? attackEffectRightAnim,
    Future<SpriteAnimation>? attackEffectBottomAnim,
    Future<SpriteAnimation>? attackEffectLeftAnim,
    Future<SpriteAnimation>? attackEffectTopAnim,
    VoidCallback? execute,
  })
```
Executes a physical attack to the player, making the configured damage with the configured frequency. You can add animations to represent this attack.


```dart 
void simpleAttackRange({
    required Future<SpriteAnimation> animationRight,
    required Future<SpriteAnimation> animationLeft,
    required Future<SpriteAnimation> animationTop,
    required Future<SpriteAnimation> animationBottom,
    required Future<SpriteAnimation> animationDestroy,
    required double width,
    required double height,
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
  })
```
Executes a distance attack. Will add a `FlyingAttackObject` to the game and will be send in the configures direction and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).


```dart 
void seeAndMoveToAttackRange({
    required Function(Player) positioned,
    double radiusVision = 32,
    double? minDistanceCellsFromPlayer,
  })
```
Will seek for the player in the defined radius. When the player is found, will position itself to perform a distance attack. Once it reaches the attack position, will fire the `positioned` callback.


Other fuctions util:

```dart 
  // Displays the damage value in the game with an animation.
  void showDamage(
    double damage,
    {
      TextConfig? config,
      double initVelocityTop = -5,
      double gravity = 0.5,
      double maxDownSize = 20,
      DirectionTextDamage direction = DirectionTextDamage.RANDOM,
      bool onlyUp = false,
    }
  )
  
  // Gives the direction of the player in relation to this enemy
  Direction directionThatPlayerIs()
  
  // Restore life point to the enemy
  void addLife(double life)

  // Draws the default life bar, Should be used in the `render` method.
  void drawDefaultLifeBar(
    Canvas canvas,
    {
      bool drawInBottom = false,
      double padding = 5,
      double strokeWidth = 2,
    }
  )
```


If you want to add quick animations, as an effect of taking damage or making a special attack. You can use the method `addFastAnimation`:

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

OBS: Enemies only move if visible on the camera. if you want to disable this add false in `collisionOnlyVisibleScreen` in your collision config. See [Colission System](collision_system).

Complete SimpleEnemy example [here](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/enemy/goblin.dart).


## RotationEnemy

<img width=100 src="_media/rotation_enemy.png"></img>

Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class Tank extends RotationEnemy {

    Tank(Vector2 position)
      : super(
          position: position, //required
          animIdle: Future<SpriteAnimation>(), //required
          animRun: Future<SpriteAnimation>(), //required
          height: 32.0, 
          width: 32.0, 
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
    void receiveDamage(double damage, int from) {
      super.receiveDamage(damage, from);
    }

    @override
    void die() {
      super.die();
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
  })
```

```dart 
 void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    double radiusVision = 32,
    double margin = 10,
  })
```

```dart 
void seeAndMoveToAttackRange({
    required Function(Player) positioned,
    double radiusVision = 32,
    double? minDistanceCellsFromPlayer,
  })
```

```dart 
void simpleAttackMelee({
    required Future<SpriteAnimation> attackEffectTopAnim,
    required double damage,
    required double height,
    required double width,
    int? id,
    bool withPush = false,
    double? radAngleDirection,
    VoidCallback? execute,
    int interval = 1000,
  })
```

```dart 
void simpleAttackRange({
    required Future<SpriteAnimation> animationTop,
    required Future<SpriteAnimation> animationDestroy,
    required double width,
    required double height,
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
  })

  String tileTypeBelow()

  List<String> tileTypesBelow()
  
```


## Custom

If none of these types of enemies do not meet your needs. You can create your own by extending the `Enemy` class.

With Enemy you will have access to the following methods:

* void moveUp(double speed)
* void moveDown(double speed)
* void moveLeft(double speed)
* void moveRight(double speed)
* void moveUpRight(double speedX, double speedY)
* void moveUpLeft(double speedX, double speedY)
* void moveDownLeft(double speedX, double speedY)
* void moveDownRight(double speedX, double speedY)
* void moveFromAngleDodgeObstacles(double speed, double angle,{Function notMove})
* void moveFromAngle(double speed, double angle)
* void receiveDamage(double damage, int from)
* void addLife(double life)
* void die()
