# 협력자

> <small>이것은 [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart)이며 다음을 사용합니다.
[공격 가능](mixins?id=attackable) 믹스인.</small>


플레이어 동맹 NPC입니다. 그래서 적으로부터 데미지를 받을 수도 있고, 적에게 데미지를 줄 수도 있습니다.

적에는 'SimpleAlly', 'RotationAlly', 'PlatformAlly'의 세 가지 유형이 있습니다.

## 기본 협력자(SimpleAlly)

> <small>이것은 [동맹](#ally)이며 사용
[DirectionAnimation](mixins?id=directionanimation) 믹스인.</small>

45° 및 67.5° 원근에 사용됩니다. 모든 방향(위, 아래, 왼쪽, 오른쪽, 위_오른쪽, 위_왼쪽, 아래_왼쪽, 아래_오른쪽)에 대한 모션 애니메이션을 구성할 수 있습니다.

이를 사용하려면 적을 대표하고 SimpleAlly를 확장하는 클래스를 생성하기만 하면 됩니다.

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
적이 반경 내에 있으면 아군은 원거리 공격을 수행하기 위해 위치를 잡습니다. 공격 위치에 도달하면 `positioned` 콜백이 실행됩니다.


그리고 모든 `GameComponent` 메소드. [GameComponent 함수](#TODO) 살펴보기


### 애니메이션 변경

`SimpleAlly` 애니메이션을 업데이트하려면 다음 방법을 사용해야 합니다:

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


## 회전하는 협력자(RotationAlly)

> <small>이것은 [협력자](#ally)이며 사용
[UseSpriteAnimation](mixins?id=usespriteanimation),
[UseAssetsLoader](mixins?id=useassetsloader).</small>


90° 원근에 사용됩니다. 그리고 실행 및 유휴에 대한 모션 애니메이션을 구성할 수 있습니다.

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

그리고 모든 `GameComponent` 메소드. [GameComponent 함수](#TODO) 살펴보기

## 커스텀

이러한 유형의 적 중 어느 것도 귀하의 요구를 충족시키지 못하는 경우. `Ally` 클래스를 확장하여 자신만의 것을 만들 수 있습니다.
