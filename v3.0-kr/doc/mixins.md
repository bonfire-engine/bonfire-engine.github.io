# 믹스인

> 믹스인을 사용하면 component 에 다양한 동작을 추가할 수 있습니다.


아래에서는 현재 사용 가능한 주요 믹스인 트리를 볼 수 있습니다::

<img src="_media/mixin_diagram.png"></img>


## Movement

움직임 추가를 담당하는 믹스인입니다.

component 는 다음과 같은 속성을 얻습니다.

```dart
    double speed = 100;
    Direction lastDirection = Direction.right;
    Direction lastDirectionHorizontal = Direction.right;
    Direction lastDirectionVertical = Direction.down;
```

그리고 component 를 이동하는 방법. (이러한 움직임은 충돌을 고려합니다. 'true'를 반환하면 움직임이 성공한 것입니다.)

```dart
    void moveUp({double? speed})
    void moveDown({double? speed})
    void moveLeft({double? speed})
    void moveRight({double? speed})
    void moveUpRight({double? speed})
    void moveUpLeft({double? speed})
    void moveDownLeft({double? speed})
    void moveDownRight({double? speed})
    void moveFromAngle({double? speed})
    void stopMove({bool forceIdle = false, bool isX = true, bool isY = true})
    void moveFromAngle(double angle, {double? speed})
    void moveFromDirection(Direction direction, {bool enabledDiagonal = true})
    bool moveToPosition(Vector2 position, {double? speed,bool useCenter = true})
```

움직임이 변하는 것을 listen 할 수 있습니다:

```dart
@override
void onMove(
    double speed,
    Vector2 displacement,
    Direction direction,
    double angle,
  ) {}

```

## DirectionAnimation

> 이 믹스인을 사용하려면 구성 요소에 `Movement` 믹스인이 포함되어 있어야 합니다.

움직임에 애니메이션을 추가하는 역할을 담당하는 믹스인입니다.

SimpleDirectionAnimation을 설정해야 합니다.

```dart
class MyComponent extends GameComponent with Movement, DirectionAnimation{
    MyComponent(){
        animation = SimpleDirectionAnimation();
    }
}
```

다음을 사용하여 `SimpleDirectionAnimation`을 바꿀 수 있습니다.

```dart

Future<void> replaceAnimation(
    SimpleDirectionAnimation newAnimation, {
    bool doIdle = true,
})

```

`SimpleDirectionAnimation`에는 애니메이션을 제어하는 데 사용할 수 있는 몇 가지 메소드가 있습니다.

```dart

/// Method used to play animation once time
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

/// `others`에 등록된 특정 애니메이션을 재생하는 데 사용되는 메서드
animation.playOther(String key, {bool flipX = false, bool flipY = false});

/// 다른 애니메이션에 새로운 애니메이션을 등록하는 데 사용되는 메소드
animation.addOtherAnimation(
    String key,
    FutureOr<SpriteAnimation> animation,
);

animation.pause();

animation.resume();

```

## MoveToPositionAlongThePath

> 이 믹스인을 사용하려면 구성 요소에 `Movement` 믹스인이 포함되어 있어야 합니다.

`a_star_algorithm`을 사용하여 경로를 찾고 경로를 통해 component 를 이동하는 역할을 담당하는 믹스인입니다.

[경로 찾기](path_finding)를 참조하세요.

## AutomaticRandomMovement

> 이 믹스인을 사용하려면 component 에 `Movement` 믹스인이 포함되어 있어야 합니다.

장면을 통과하는 적과 같은 무작위 움직임을 추가하는 역할을 담당하는 믹스인입니다.

사용하려면 업데이트에 `runRandomMovement` 메소드를 추가하면 됩니다.

```dart

class MyComponent extends GameComponent with Movement, AutomaticRandomMovement{
    
    @override
    void update(double dt) {
        this.runRandomMovement(dt);
        super.update(dt);
    }
}

```

모든 매개변수:

```dart

void runRandomMovement(
    double dt, {
    bool runOnlyVisibleInCamera = true,
    double? speed,
    int maxDistance = 50,
    int minDistance = 25,

    /// milliseconds
    int timeKeepStopped = 2000,
    bool updateAngle = false,
    bool checkPositionWithRaycast = false,
    RandomMovementDirectionEnum direction = RandomMovementDirectionEnum.all,
    Function(Vector2 target)? onStartMove,
    Function()? onArrivedTarget,
  })

```

## MovementByJoystick

> 이 믹스인을 사용하려면 component 에 'Movement' 및 'JoystickListener' 믹스인이 포함되어 있어야 합니다.

조이스틱 이벤트를 통해 움직임을 추가하는 역할을 담당하는 믹스인입니다.

```dart
class MyComponent extends GameComponent with Movement, JoystickListener, MovementByJoystick{
    
}

```

이렇게 하면 이 component 를 조이스틱 관찰자로 추가하면 조이스틱과 상호 작용할 때 이동하게 됩니다.

```dart

    MyComponent myComp = MyComponent();
    gameRef.joystickController?.addObserver(myComp);
    gameRef.camera.moveToTargetAnimated(myComp);

```

'movementByJoystickEnabled'를 false로 설정하여 이 동작을 비활성화할 수 있습니다.

## Attackable

> 사용방법: `Player`, `Ally`, `Enemy`

component 에 손상을 입는 동작을 추가하는 역할을 담당하는 믹스인입니다.

component 는 다음과 같은 속성을 얻습니다.

```dart
    double maxLife;
    bool isDead;
    double life;
```

component 에 다음 메서드를 추가합니다.

```dart
    void initialLife(double life)
    void addLife(double life)
    void updateLife(double life,{bool verifyDieOrRevive = true})
    void removeLife(double life)

    /// 이 방법은 이 component 가 공격자로부터 피해를 받을 수 있는지 확인하는 데 사용됩니다.
    @override
    bool checkCanReceiveDamage(
        AttackFromEnum attacker,
        double damage,
        dynamic from,
    )
    
    /// 이 component 가 공격을 받는지 들을 수 있습니다.
    @override
    void receiveDamage(double damage, dynamic from)

    /// 수명이 0보다 작은 경우 이 메서드가 호출됩니다.
    @override
    void die()
```

## Vision

component 에 비전을 추가하는 역할을 담당하는 믹스인입니다. `Player`, `Npc`, `Decoration`과 같은 component 는 이 믹스인을 사용합니다.
component 는 `seeComponent` 및 `seeComponentType` 메서드를 얻습니다.

다음과 같이 구성 요소 비전을 그릴 수 있습니다.

```dart
    setupVision(
        {
            Color? color,
            bool drawVision = false,
            int countPolygonPoints = 20,
        }
    );
```

`seeComponent` 또는 `seeComponentType`과 같은 메소드를 사용하면 비전이 그려집니다.

## Sensor

위의 다른 객체를 감지하기 위해 트리거를 추가하는 역할을 담당하는 믹스인입니다.

[센서](센서)를 참조하세요.

## Lighting

component 의 조명을 구성하는 데 사용되는 믹스인입니다.

[조명](조명) 참조

## BlockMovementCollision

충돌이 발생하면 움직임을 멈추는 역할을 담당하는 믹스인입니다.

[객체 충돌](collision_system)을 참조하세요.

## Pushable
> 이 믹스인을 사용하려면 component 에 `Movement` 믹스인이 포함되어 있어야 합니다.

component 의 푸시 활성화를 담당하는 Mixin입니다.

`bool onPush(GameComponent 컴포넌트)` 메소드를 재정의하여 언제 푸시할 수 있는지 제어할 수 있습니다. component 가 푸시 가능하면 true를 반환하고, 그렇지 않으면 false를 반환합니다. (기본값은 true를 반환합니다).

## Follower

이 믹스인은 component 가 대상의 위치를 따르도록 합니다.
component 는 'followerTarget' 및 'followerOffset' 속성을 얻습니다.
다음과 같이 대상을 구성할 수 있습니다.

```dart

setupFollower(target: myPLayer, offset: Vector2());

```

이 믹스인이 포함된 component 가 다른 component 의 하위로 추가된 경우입니다. 그는 부모의 입장을 따를 것입니다.


## UseAssetsLoader

자산을 로드하는 데 사용되는 믹스인:

```dart
class MyComponent extends GameComponent with UseAssetsLoader{
    SpriteAnimation animation;
    MyComponent(Vector2 position,Future<SpriteAnimation> animIdle){
        this.position = position;
        loader?.add(AssetToLoad(animIdle, (value) {
            animation = value;
        }));
    }
}
```

## UseSpriteAnimation

SpriteAnimation의 사용을 더 쉬운 방법으로 component 에 추가하는 믹스인입니다.
귀하의 component 는 'animation' 속성과 'playSpriteAnimationOnce' 메서드를 얻습니다.

```dart

class MyComponent extends GameComponent with UseSpriteAnimation{
    MyComponent(Vector2 position){
        this.position = position;
    }

    void playJump(){
        playSpriteAnimationOnce(MySpriteSheetLoader.getJumpAnimation());
    }

    @override
    Future onLoad() async {
        setAnimation(await MySpriteSheetLoader.geAnimation());
        return super.onLoad();
    }
}

```

현재 인덱스 애니메이션이 마지막 프레임인지 알 수 있습니다.

```dart
  bool get isAnimationLastFrame
  int get animationCurrentIndex
  int get isPaused
```

## UseSprite

Sprite 사용을 더 쉽게 component 에 추가하는 믹스인입니다.
귀하의 component 는 `sprite`를 얻습니다.

```dart

class MyComponent extends GameComponent with UseSprite{
    MyComponent(Vector2 position){
        this.position = position;
    }

    @override
    Future onLoad() async {
        sprite = await MySpriteSheetLoader.geSrite();
        return super.onLoad();
    }
}

```

### UseBarLife

공격 가능한 component 에 BarLife를 추가하는 데 사용되는 믹스인입니다.
'setupBarLife'라는 BarLife를 구성합니다.

```dart

void setupBarLife({
    Vector2? size,
    Color? backgroundColor,
    Color? borderColor,
    double borderWidth = 2,
    double margin = 4,
    List<Color>? colors,
    BorderRadius? borderRadius,
    BarLifePorition barLifePosition = BarLifePorition.top,
    Vector2? offset,
    Vector2? textOffset,
    TextStyle? textStyle,
    bool showLifeText = true,
    BarLifeTextBuilder? barLifetextBuilder,
  })

```

### TileRecognizer

타일을 인식하는데 사용되는 Mixin은 아래와 같습니다.

지도를 작성하는 데 사용되는 Tiled 프로그램에서 `클래스`를 설정하거나 사용자 정의 속성을 설정할 수 있습니다. 이 믹스인을 사용하면 component 위에 있는 '타일' 정보에 액세스할 수 있습니다.

```dart

/// 현재 맵 타일이 어떤 타입인지 확인하는 메소드
 String? tileTypeBelow();
 /// 현재 지도 타일이 어떤 유형인지 확인하는 메서드
 List<String> tileTypeListBelow()
 /// 맵 타일이 현재 어떤 속성을 가지고 있는지 확인하는 메서드
 Map<String, dynamic>? tilePropertiesBelow()
 /// 현재 목록 맵 타일의 속성이 무엇인지 확인하는 메서드
 List<Map<String, dynamic>>? tilePropertiesListBelow()
 /// 아래에 어떤 지도 타일이 있는지 확인하는 메서드
 Iterable<Tile> tileListBelow()

```
