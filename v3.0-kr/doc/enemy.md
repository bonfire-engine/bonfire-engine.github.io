# 적

> <small>이것은 [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart)이며 다음을 사용합니다.
[공격 가능](mixins?id=attackable) 믹스인.</small>


게임에서 적을 생성합니다. 이 클래스의 인스턴스에는 원하는 대로 사용하고 구성할 수 있는 미리 정의된 동작이 있습니다. 모든 동작과 움직임을 사용자 정의할 수 있습니다.

적에는 'SimpleEnemy', 'RotationEnemy', 'PlatformEnemy'의 세 가지 유형이 있습니다.

## 단순한 적(SimpleEnemy)

> <small>이것은 [Enemy](#enemy)이며 사용
[DirectionAnimation](mixins?id=directionanimation) 믹스인.</small>

<img width=100 src="_media/simple_enemy.png"></img>

45° 및 67.5° 원근에 사용됩니다. 모든 방향(위, 아래, 왼쪽, 오른쪽, 위_오른쪽, 위_왼쪽, 아래_왼쪽, 아래_오른쪽)에 대한 모션 애니메이션을 구성할 수 있습니다.

이를 사용하려면 적을 나타내는 클래스를 만들고 SimpleEnemy를 확장하면 됩니다.

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
      // 필요한 로직을 작성하세요.
      super.update(dt);
    }

    @override
    void render(Canvas canvas) {
      // 필요한 로직을 작성하세요.
      super.render(canvas);
    }
}

```

이제 적을 나타내는 클래스가 있으므로 적의 동작을 구성할 수 있습니다.

이 작업에 도움이 되는 `update` 메소드 내에서 사용할 수 있는 몇 가지 유용한 확장이 있습니다.


```dart 
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // 기본값 6.28319(360도)
    double? angle,
  })
```
플레이어가 적의 radiusVision 내에 있으면 콜백 함수가 트리거됩니다.


```dart 
  void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    VoidCallback? notObserved,
    VoidCallback? observed,
    VoidCallback? notCanMove,
    double radiusVision = 32,
    double margin = 10,
    double? visionAngle, // 기본값 6.28319(360도)
    double? angle,
    bool runOnlyVisibleInScreen = true, 
  })
```
적이 RadiusVision 내에 들어오면 플레이어 방향으로 이동합니다. 플레이어에 가까워지면 'closePlayer'가 실행됩니다.


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
플레이어에게 물리적 공격을 가해 설정된 빈도로 설정된 피해를 입힙니다. 이 공격을 나타내는 애니메이션을 추가할 수 있습니다.


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
원거리 공격을 실행합니다. 'FlyingAttackObject'를 게임에 추가하고 구성된 방향으로 전송되어 충돌하는 사람에게 약간의 피해를 주거나 장벽(충돌 타일)에 부딪힐 때 파괴됩니다.


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
플레이어가 반경 내에 있으면 적이 원거리 공격을 수행할 위치를 잡습니다. 공격 위치에 도달하면 `positioned` 콜백이 실행됩니다.


그리고 모든 `GameComponent` 메소드. [GameComponent 함수](#TODO) 살펴보기


### 애니메이션 변경

`SimpleEnemy` 애니메이션을 업데이트하려면 다음 방법을 사용해야 합니다:

```dart

  replaceAnimation(SimpleDirectionAnimation());

```

순간 애니메이션을 재생하려면 'SimpleDirectionAnimation' 메서드를 사용해야 합니다. 예를 들어:

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

참고: 적들은 카메라에 보일 때만 움직입니다. 이를 비활성화하려면 충돌 구성의 `collisionOnlyVisibleScreen`에 false를 추가하세요. [콜리전 시스템](collision_system)을 참조하세요.

SimpleEnemy 예제는 [여기](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/enemy/goblin.dart)에서 완료하세요.


## 회전 적(RotationEnemy)

> <small>이것은 [적](https://github.com/RafaelBarbosatec/bonfire/blob/v2.4.0/lib/npc/enemy/enemy.dart)이며 다음을 사용합니다.
[UseSpriteAnimation](mixins?id=usespriteanimation),
[UseAssetsLoader](mixins?id=useassetsloader).</small>

<img width=100 src="_media/rotation_enemy.png"></img>

90° 원근에 사용됩니다. 그리고 실행 및 유휴에 대한 모션 애니메이션을 구성할 수 있습니다.

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
      // 필요한 로직을 작성하세요.
      super.update(dt);
    }

    @override
    void render(Canvas canvas) {
       // 필요한 로직을 작성하세요.
      super.render(canvas);
    }
}

```

이제 적을 나타내는 클래스가 있으므로 그들의 동작을 구성할 수 있습니다.

이러한 움직임을 구성하는 데 도움이 되는 '업데이트'에서 사용할 수 있는 몇 가지 유용한 확장 기능이 있습니다.

```dart 
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // 기본값 6.28319(360도)
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

그리고 모든 `GameComponent` 메소드. [GameComponent 함수](#TODO) 살펴보기


## 플랫폼 적(PlatformEnemy)

> <small>이것은 [SimpleEnemy](#SimpleEnemy)이며 다음을 사용합니다.
[블록이동충돌](#TODO),
[점프](#TODO)
및 [점프 애니메이션](#TODO)</small>

플랫폼 게임에 사용됩니다. 그리고 달리기, 정적인 상태, 점프에 대한 모션 애니메이션을 구성할 수 있습니다.

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

### 점프

플레이어 점프를 수행하려면 [Jumper mixin](#TODO) 메서드를 사용할 수 있습니다.

```dart
  jump({double? jumpSpeed, bool force = false});

```


### 애니메이션 변경

`PlatformEnemy` 애니메이션을 업데이트하려면 다음 방법을 사용해야 합니다:

```dart

  replacePlatformAnimation(PlatformAnimations());

```

순간 애니메이션을 재생하려면 'SimpleDirectionAnimation' 메서드를 사용해야 합니다. 예를 들어:

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

> OBS: 올바른 동작을 위해서는 이 구성 요소에 중력을 추가한다는 것을 기억해야 합니다. [HandleForces](#TODO) 살펴보기


## 커스텀

이러한 유형의 적 중 어느 것도 귀하의 요구를 충족시키지 못하는 경우. `Enemy` 클래스를 확장하여 자신만의 것을 만들 수 있습니다.
