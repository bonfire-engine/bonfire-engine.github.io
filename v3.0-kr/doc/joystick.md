# 조이스틱

> <small>이것은 [조이스틱 컨트롤러](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/joystick/joystick_controller.dart)입니다.</small>

플레이어를 제어하는 구성요소입니다.

## 조이스틱

<img src="../../_media/screeShot_joystick.jpg" width="600"/>

즉시 사용할 수 있는 구현(`조이스틱`)이 사전 포함되어 있지만 사용자 정의 모양을 추가하거나 원하는 만큼 많은 작업을 추가하도록 구성할 수도 있습니다.

또는 `JoystickController`를 직접 구현하고 `JoystickListener`를 통해 이벤트를 내보낼 수도 있습니다.

조이스틱은 다음 매개변수로 구성할 수 있습니다.
```dart
  return BonfireWidget(
    joystick: Joystick(
        keyboardConfig: KeyboardConfig(
          enable: true, // 키보드 이벤트를 활성화하거나 비활성화하는 데 사용됩니다(기본값은 true).
          acceptedKeys: [ // 허용된 특정 키를 전달할 수 있습니다. null인 경우 모든 키를 허용합니다.
            LogicalKeyboardKey.space,
          ],
          keyboardDirectionalType: KeyboardDirectionalType.arrows, // 방향 유형(화살표 또는 wasd)
        ), // 여기에서 키보드 상호 작용 수신을 활성화합니다.
        directional: JoystickDirectional(
          spriteBackgroundDirectional: Sprite.load('joystick_background.png'), // 컨트롤러 배경
          spriteKnobDirectional: Sprite.load('joystick_knob.png'), // 컨트롤러 원 배경
          color: Colors.black, // 'pathSpriteBackgroundDirectional' 또는 'pathSpriteKnobDirectional'을 전달하지 않으면 방향에 대한 색상을 정의할 수 있습니다.
          size: 100, // 컨트롤러 제어 크기
          isFixed: false, // 화면의 첫 번째 터치를 기준으로 동적 위치로 방향을 지정할 수 있습니다.
        ),
        actions: [
          JoystickAction(
            actionId: 1, // (required) 작업 식별값, 누르면 'void JoystickAction(JoystickActionEvent event) {}'로 전송됩니다.
            sprite: Sprite.load('joystick_atack_range.png'), // 액션 이미지
            spritePressed: Sprite.load('joystick_atack_range.png'), // 작업이 실행될 때 표시되는 선택적 이미지
            spriteBackgroundDirection: Sprite.load('joystick_background.png'), // 컨트롤러 배경
            enableDirection: true, // 방향성 작동 활성화
            align: JoystickActionAlign.BOTTOM_RIGHT,
            color: Colors.blue,
            size: 50,
            margin: EdgeInsets.only(bottom: 50, right: 160),
          )
        ],
    ),
    ...
  );
```

[예제](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/main.dart)를 확인하세요.

## 조이스틱 리스너

조이스틱 상호작용을 듣는 데 사용되는 믹스인입니다.

이 믹스인을 사용하는 구성 요소는 관찰자로 추가된 조이스틱 이벤트를 수신할 수 있습니다.

```dart

gameRef.addJoystickObserver(myComponentJoystickListener);

```
