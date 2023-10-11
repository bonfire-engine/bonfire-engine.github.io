# 유틸리티

게임 개발 프로세스에 도움이 될 수 있는 몇 가지 기능과 component 가 있습니다.

## Functions

`BonfireUtil`에는 도움이 될 수 있는 많은 기능이 있습니다:

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

때로는 지도에 적이나 아이템과 같은 것을 동적으로 생성해야 하는 경우가 있습니다. 이를 수행하려면 `ComponentSpawner`를 사용할 수 있습니다:

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

'Sprite'를 렌더링하는 개체입니다.


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

`SpriteAnimation`을 렌더링하는 개체입니다.

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


이전 것과 마찬가지로 애니메이션이 스스로 파괴되기 전에 한 번 재생할 수 있으며 루프에서 계속 재생할 수도 있습니다. 그러나 가장 중요한 특징은 이 component 가 플레이어, 적 또는 장식과 같은 지도의 다른 요소를 따른다는 것입니다.


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

애니메이션과 동일한 'FollowerObject'입니다.

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


특정 방향으로 설정된 특정 속도로 구성되는 component 도 구성 가능하며 피해를 주는 적이나 플레이어에게만 타격을 가하거나 충돌이 있는 component(타일, 장식)에 타격을 가하면 파괴될 수 있습니다.

이는 '각도' 또는 '방향'에서 이동합니다.

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

