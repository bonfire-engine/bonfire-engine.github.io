# Util

There are some functions and Components that can be helpful in your game development process.

## Functions

There are many functions that can be helpful in `BonfireUtil`:

```dart

 Direction getDirectionFromAngle(double angle);
 double getAngleFromDirection(Direction direction);
 double angleBetweenPoints(Vector2 p1, Vector2 p2);
 Offset rotatePoint(Offset point, double angle, Offset center);
 Vector2 movePointByAngle(
    Vector2 point,
    double speed,
    double angle,
  );
Vector2 vector2ByAngle(double angle, {double intencity = 1})

```


## Components


### ComponentSpawner

Sometimes we need spaw something like enemy or items in your map dynamically. To do it you can use the `ComponentSpawner`:

```dart

    ComponentSpawner({
        required Vector2 position,
        required this.area,
        required this.interval,
        required this.builder,
        this.spawCondition,
        this.onlyVisible = true,
    })


```


### GameObject

Object that renders a `Sprite`.


```dart
 GameObject({
    required Vector2 position,
    required Vector2 size,
    required FutureOr<Sprite>? sprite,
    Vector2? positionFromTarget,
    LightingConfig? lightingConfig,
    this.objectPriority,
    double angle = 0,
    Anchor anchor = Anchor.topLeft,
  })
```

### AnimatedGameObject

Object that renders a `SpriteAnimation`.

```dart
   AnimatedGameObject({
    required super.position,
    required super.size,
    FutureOr<SpriteAnimation>? animation,
    this.onFinish,
    this.onStart,
    this.removeOnFinish = true,
    super.angle = 0,
    super.lightingConfig,
    super.anchor = Anchor.topLeft,
    bool loop = true,
    super.objectPriority,
  })

```

### FollowerGameObject


Like the previous one, this can play an animation once before it destroys itself and can also can can keep playing in a loop. But the most important feature is that this component follows another element on the map, like a player, enemy or decoration.


```dart
FollowerGameObject({
    required GameComponent target,
    required super.size,
    required super.sprite,
    Vector2? offset,
    super.objectPriority,
    super.lightingConfig,
  })
```

### AnimatedFollowerObject

The same `FollowerObject` with animation.

```dart
AnimatedFollowerGameObject({
    required super.animation,
    required super.size,
    required GameComponent target,
    super.lightingConfig,
    super.loop = true,
    super.onFinish,
    super.onStart,
    super.angle,
    super.removeOnFinish = true,
    Vector2? offset,
    super.objectPriority,
  })
```



### FlyingAttackGameObject


A component that is in a certain direction set at a certain speed also configurable and only to hit an enemy or player inflicting damage, or it can be destroyed when hitting a component that has a collision (Tiles, Decorations).

This move from `angle` or `direction`.

```dart

FlyingAttackGameObject({
    required super.position,
    required super.size,
    required super.animation,
    super.angle = 0,
    this.direction,
    this.id,
    this.animationDestroy,
    this.destroySize,
    double speed = 150,
    this.damage = 1,
    this.attackFrom = AttackFromEnum.ENEMY,
    this.withDecorationCollision = true,
    this.onDestroy,
    this.enabledDiagonal = true,
    super.lightingConfig,
    this.collision,
  })

```

