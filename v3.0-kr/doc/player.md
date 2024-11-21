# 플레이어

> <small>이것은 [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/base/game_comComponent.dart)이며 다음을 사용합니다. 
[Movement](mixins?id=movement), 
[Attackable](mixins?id=attackable), 
[Vision](mixins?id=vision), 
[MovementByJoystick](mixins?id=movementbyjoystick) and 
[JoystickListener](joystick?id=joysticklistener)</small>

게임에서 사용자가 조종하는 캐릭터를 나타냅니다. 이 클래스의 인스턴스에는 사용 및 구성할 준비가 된 동작과 움직임이 있습니다.
'SimplePlayer', 'RotationPlayer', 'PlatformPlayer' 세 가지 유형의 적을 생성할 수 있습니다.

## 기본 플레이어(SimplePlayer) 
> <small>이는 [Player](#Player)이며 [DirectionAnimation](mixins?id=directionanimation)을 사용합니다.</small>


45° 및 67.5° 원근에 사용됩니다. 그리고 모든 방향(위, 아래, 왼쪽, 오른쪽, 위쪽 오른쪽, 위쪽 왼쪽, 아래쪽 왼쪽, 아래쪽 오른쪽)에 대한 모션 애니메이션을 구성할 수 있습니다.

이를 사용하려면 적을 나타내는 클래스를 만들고 SimplePlayer를 확장하면 됩니다.

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
      // 필요한 로직을 작성하세요.
      super.update(dt);
    }

    @override
    void render(Canvas canvas) {
      // 필요한 로직을 작성하세요.
      super.render(canvas);
    }

    @override
    void joystickChangeDirectional(JoystickDirectionalEvent event) {
      // 조이스틱 이벤트로 필요한 로직을 작성하세요.
      super.joystickChangeDirectional(event);
    }

    @override
    void joystickAction(JoystickActionEvent event) {
      // 조이스틱 이벤트로 필요한 로직을 작성하세요.
      super.joystickAction(event);
    }

}

```

플레이어의 모든 움직임은 이미 조이스틱과 사용자의 상호 작용을 듣고 자동으로 수행됩니다.

플레이어 인스턴스는 다음 메서드를 재정의하여 조이스틱에 구성된 작업을 수신할 수 있습니다.

```dart

  @override
  void joystickAction(JoystickActionEvent event) {
    // 조이스틱 이벤트로 필요한 로직을 작성하세요.
    super.joystickAction(event);
  }

```


조이스틱 동작이 수신되면 동작이 실행될 수 있습니다. 'Enemy'와 마찬가지로 여기에는 몇 가지 사전 포함된 작업이 있습니다.

```dart

// 플레이어에게 물리적 공격을 실행하여 설정된 빈도로 설정된 피해를 입힙니다. 이 공격을 나타내는 애니메이션을 추가할 수 있습니다.
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
  
  // 원거리 공격을 실행합니다. 'FlyingAttackObject'를 게임에 추가하고 구성 방향으로 전송되며 충돌하는 사람에게 약간의 피해를 주거나 장벽(충돌 정의 타일)에 부딪힐 때 파괴됩니다.
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
    
    // 반경 내에서 적을 관찰합니다(radiusVision).
    void seeEnemy(
      {
        required Function(List<Enemy>) observed,
        VoidCallback? notObserved,
        double radiusVision = 32,
        double? angle, // 방향
        double? visionAngle, // 기본값 6.28319(360도)
      }
    )

```

그리고 모든 `GameComponent` 메소드. [GameComponent 함수](#TODO) 살펴보기

### 애니메이션 변경

`SimplePlayer` 애니메이션을 업데이트하려면 다음 방법을 사용해야 합니다:

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

## 회전 플레이어(RotationPlayer)

> <small>이것은 [Player](#Player)이며 다음을 사용합니다.
[스프라이트 애니메이션 사용](mixins?id=usespriteanimation),
[자산 로더 사용](mixins?id=useassetsloader)</small>

90° 원근에 사용됩니다. 그리고 실행 및 유휴에 대한 모션 애니메이션을 구성할 수 있습니다.

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

조이스틱 동작이 수신되면 동작이 실행될 수 있습니다. 'Enemy'와 마찬가지로 여기에는 몇 가지 사전 포함된 작업이 있습니다.

```dart

// 플레이어에게 물리적 공격을 실행하여 설정된 빈도로 설정된 피해를 입힙니다. 이 공격을 나타내는 애니메이션을 추가할 수 있습니다.
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
  
  // 원거리 공격을 실행합니다. 'FlyingAttackObject'를 게임에 추가하고 구성 방향으로 전송되며 충돌하는 사람에게 약간의 피해를 주거나 장벽(충돌 정의 타일)에 부딪힐 때 파괴됩니다.
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
    
    // 반경 내에서 적을 관찰합니다(radiusVision).
    void seeEnemy(
       {
          required Function(List<Enemy>) observed,
          VoidCallback? notObserved,
          double radiusVision = 32,
       }
    )

```

### 애니메이션 변경

`RotationPlayer`를 업데이트하려면 `animIdle` 및 `animRun` 변수를 업데이트하면 됩니다.

## 플랫폼 플레이어(PlatformPlayer)

> <small>이것은 [SimplePlayer](#SimplePlayer)이며 다음을 사용합니다.
[블록 이동 충돌](#TODO),
[점프](#TODO)
및 [점프 애니메이션](#TODO)</small>

Used for platform games. And we can configure Motion animations for run, idle and jump.

```dart

class MarioPlayer extends PlatformPlayer {

    MarioPlayer(vector2 position)
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

`PlatformPlayer` 애니메이션을 업데이트하려면 다음 방법을 사용해야 합니다:

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

이러한 유형의 플레이어 중 어느 것도 귀하의 요구 사항을 충족하지 못하는 경우. `Player` 클래스를 확장하여 자신만의 것을 만들 수 있습니다.
