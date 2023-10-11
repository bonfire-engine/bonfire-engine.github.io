# 시작하기 전에

Bonfire는 기본적으로 매개변수를 전달하고 게임에 맞게 구성하는 위젯입니다.


## BonfireWidget

```dart
  @override
  Widget build(BuildContext context) {
    return BonfireWidget(
      map: WorldMapByTiled('tile/map.json'), // required
      joystick: Joystick(), 
      player: Knight(), // 플레이어가 생략되면 조이스틱 방향이 지도 보기를 제어하므로 지도를 만드는 과정에서 매우 유용합니다.
      interface: KnightInterface(),
      background: GameComponent(), // `GameComponent`에서 확장하여 자신만의 배경을 만들 수 있습니다(예: 시간차 사용).
      backgroundColor: Colors.black,
      debugMode: false, // true인 경우 components 그리드를 그립니다.
      showCollisionArea: false, // true인 경우 요소의 충돌 영역을 그립니다.
      collisionAreaColor: Colors.blue, // 충돌 영역 색상을 사용자 정의하고 싶다면 여기를 수정하세요.
      lightingColorGame: Colors.black.withOpacity(0.4), // 게임에 일반 조명을 추가하려는 경우 여기를 수정하세요.
      colorFilter: GameColorFilter(), // 게임에 컬러 필터를 추가하여 특별한 느낌을 줄 수 있습니다.
      components: [], // 여기에서 필요한 GameComponent를 추가할 수 있습니다.
      overlayBuilderMap: { // 여기에서 위젯을 추가하여 게임 인터페이스를 구축할 수 있습니다.
        'barLife':(game)=> MyBarLifeWidget(),
      },
      initialActiveOverlays:['barLife'], // 여기에서는 게임을 시작할 때 `overlayBuilderMap`에 전달된 인터페이스가 표시될 수 있도록 정의합니다.
      cameraConfig: CameraConfig(), // 여기서 게임 카메라를 구성할 수 있습니다. 줌, 속도 등을 설정할 수 있습니다.
      globalForces: [] // 여기서 'HandleForces' 믹스인을 사용하는 모든 GameComponents에 영향을 미치는 가속도(Acceleration Force 2D), 저항(ResistenceForce2D) 또는 선형(LinearForce2D)과 같은 힘을 추가할 수 있습니다.
      onReady: (game){} // 게임이 준비되면 호출합니다.
      focusNode: FocusNode(),
      autofocus:true,
      mouseCursor:
      progress: ProgressWidget() // 지도를 로드하는 동안 표시되는 진행 상황입니다.
    );
  }
```

### 게임 요소를 동적으로 추가하기

게임에서 component 를 동적으로 추가해야 하는 경우. 모든 component 내에서 다음을 사용할 수 있습니다.

```dart
  gameRef.add(MyComponent())
```

또는 다음을 사용하여 하위 component 와 같은 다른 component 내에 component 를 추가할 수 있습니다.

```dart
  add(MyComponent())
```

---

### Components 레이어

Bonfire 는 아래 레이어 다이어그램에 따라 렌더링되는 여러 component 로 구성됩니다.

<img src="_media/layers.png" width="600"/>

우리는 지도를 시작으로 아래에서 위로 공부하면서 이 각 레이어를 이해하게 됩니다.

## 배경

> render_priority = 10

배경을 나타내는 component 를 추가할 수 있습니다. 시간차 및 상호작용하는 배경을 만드는 데 유용합니다.

## 지도

> render_priority = 20

게임이 진행되는 지도(또는 세계)를 나타냅니다.

자세한 내용을 보려면 [여기](Map)를 클릭하세요.

## 장식

> render_priority = Dynamic ( 30 + Axis Y)

풍경에 추가할 수 있는 모든 것. 예를 들어 플레이어와 상호 작용하는 데 사용할 수 있는 배럴이나 NPC도 있습니다.

자세한 내용을 보려면 [여기](Decoration)를 클릭하세요.

## 적

> render_priority = Dynamic ( 30 + Axis Y)

게임 내 적 캐릭터를 나타냅니다. 이 클래스의 인스턴스에는 원할 때마다 사용하고 구성할 수 있는 작업과 움직임이 있습니다. 동시에, 귀하의 필요에 맞는 방식으로 모든 동작과 움직임을 맞춤화할 수 있습니다.

자세한 내용을 보려면 [여기](Enemy)을 클릭하세요.

## 플레이어

> render_priority = Dynamic (30 + Axis Y)

게임에서 사용자가 조종하는 캐릭터를 나타냅니다. 이 클래스의 인스턴스에는 사용 및 구성할 준비가 된 동작과 움직임이 있습니다.

자세한 내용을 보려면 [여기](Player)를 클릭하세요.

## 개체

> render_priority = Dynamic (30 +  Axis Y)

이 레이어에는 사용자 정의 `GameComponent`와 같이 게임에 추가된 모든 'GameComponent' 또는 `AnimatedGameObject`와 같이 이미 사용할 수 있는 유틸리티 개체가 포함됩니다.

자세한 내용을 보려면 [여기](Objects)를 클릭하세요.

## 빛 효과

> render_priority = (highestPriority + 10)

게임에 조명을 추가하는 역할을 담당하는 레이어입니다.

자세한 내용은 [여기](lighting)를 클릭하세요.

## 게임 인터페이스

> render_priority = (highestPriority + 30)

라이프 바, 체력, 설정 등을 그릴 수 있는 방법입니다. 즉, 게임 인터페이스에 추가할 수 있는 모든 것입니다.

자세한 내용을 보려면 [여기](game_interface)를 클릭하세요.

## 조이스틱

> render_priority = highestPriority + 40

플레이어를 제어하는 구성요소입니다.

자세한 내용을 보려면 [여기](joystick)을 클릭하세요.
