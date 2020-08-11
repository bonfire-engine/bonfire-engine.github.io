# Enemy

> Represents enemies characters in the game. Instances of this class has actions and movements ready to be used and configured whenever you want. At the same time, you can customize all actions and movements in the way that fits your needs.

We can create two types of enemies `SimpleEnemy` and `RotationEnemy`:

## SimpleEnemy

<img width=100 src="_media/simple_enemy.png"></img>

Used for 45º and 67.5º perspectives. And we can configure Motion animations for all directions (top, bottom, left, right, top_right, top_left, bottom_left, bottom_right).

To use it, simply create a class that will represent your enemy and extend SimpleEnemy:

```dart

class Goblin extends SimpleEnemy {

    Goblin(Position initPosition)
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
}

```

Now that we have our class that represents our enemy, we can configure their behavior.

There are several useful extensions that we can use in `update` that will help us to configure these movements:


```dart 
void seePlayer({
    Function(Player) observed,
    Function() notObserved,
    double radiusVision = 32,
    int interval = 500,
  })
```

```dart 
void seeAndMoveToPlayer({
    Function(Player) closePlayer,
    double radiusVision = 32,
    double margin = 10,
  })
```

```dart 
void simpleAttackMelee({
    @required double damage,
    double heightArea = 32,
    double widthArea = 32,
    int id,
    int interval = 1000,
    bool withPush = false,
    double sizePush,
    Direction direction,
    FlameAnimation.Animation attackEffectRightAnim,
    FlameAnimation.Animation attackEffectBottomAnim,
    FlameAnimation.Animation attackEffectLeftAnim,
    FlameAnimation.Animation attackEffectTopAnim,
    VoidCallback execute,
  })
```

```dart 
void simpleAttackRange({
    @required FlameAnimation.Animation animationRight,
    @required FlameAnimation.Animation animationLeft,
    @required FlameAnimation.Animation animationTop,
    @required FlameAnimation.Animation animationBottom,
    @required FlameAnimation.Animation animationDestroy,
    @required double width,
    @required double height,
    int id,
    double speed = 150,
    double damage = 1,
    Direction direction,
    int interval = 1000,
    bool withCollision = true,
    bool collisionOnlyVisibleObjects = true,
    Collision collision,
    VoidCallback destroy,
    VoidCallback execute,
    LightingConfig lightingConfig,
  })
```

```dart 
void seeAndMoveToAttackRange({
    Function(Player) positioned,
    double radiusVision = 32,
    double minDistanceCellsFromPlayer,
  })
```

```dart 
void seeAndMoveToAttackRange({
    Function(Player) positioned,
    double radiusVision = 32,
    double minDistanceCellsFromPlayer,
  })
```

If you want to add quick animations, as an effect of taking damage or making a special attack. You can use the method `addFastAnimation`:

```dart 
void addFastAnimation(FlameAnimation.Animation animation,{VoidCallback onFinish})
```

Complete SimpleEnemy example [here](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/enemy/goblin.dart).


## RotationEnemy

<img width=100 src="_media/rotation_enemy.png"></img>

Used for 90º perspectives. And we can configure Motion animations for run and idle.

```dart

class Tank extends RotationEnemy {

    Tank(Position initPosition)
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
}

```

Now that we have our class that represents our enemy, we can configure their behavior.

There are several useful extensions that we can use in `update` that will help us to configure these movements:

```dart 
void seePlayer({
    Function(Player) observed,
    Function() notObserved,
    double radiusVision = 32,
    int interval = 500,
  })
```

```dart 
 void seeAndMoveToPlayer({
    Function(Player) closePlayer,
    double radiusVision = 32,
    double margin = 10,
  })
```

```dart 
void seeAndMoveToAttackRange(
      {Function(Player) positioned,
      double radiusVision = 32,
      double minDistanceCellsFromPlayer})
```

```dart 
void simpleAttackMelee({
    @required FlameAnimation.Animation attackEffectTopAnim,
    @required double damage,
    int id,
    double heightArea = 32,
    double widthArea = 32,
    bool withPush = false,
    double radAngleDirection,
    VoidCallback execute,
    int interval = 1000,
  })
```

```dart 
void simpleAttackRange({
    @required FlameAnimation.Animation animationTop,
    @required FlameAnimation.Animation animationDestroy,
    @required double width,
    @required double height,
    int id,
    double speed = 150,
    double damage = 1,
    double radAngleDirection,
    int interval = 1000,
    bool withCollision = true,
    bool collisionOnlyVisibleObjects = true,
    VoidCallback destroy,
    Collision collision,
    VoidCallback execute,
    LightingConfig lightingConfig,
  })
```


## Custom

If none of these types of enemies do not meet your needs. You can create your own by extending the Enemy class.

With Enemy you will have access to the following methods:

* void moveTop(double speed)
* void moveBottom(double speed)
* void moveLeft(double speed)
* void moveRight(double speed)
* void moveFromAngleDodgeObstacles(double speed, double angle,{Function notMove})
* void moveFromAngle(double speed, double angle)
* void receiveDamage(double damage, int from)
* void addLife(double life)
* void die()
