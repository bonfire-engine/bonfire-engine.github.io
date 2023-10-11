# 입력


## 제스처

> Bonfire에서는 이러한 상호작용을 활성화하기 위해 믹스인을 사용합니다.

Bonfire는 [Listener](https://api.flutter.dev/flutter/widgets/Listener-class.html) 위젯을 사용하여 제스처를 수신합니다.

### 탭 제스처

TapGesture를 활성화하려면 다음과 같이 구성 요소에 `TapGesture` 믹스인을 추가하면 됩니다.

```dart

class MyCustomDecoration extends GameDecoration with TapGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );


  // 컴포넌트에서 탭다운이 발생할 때 호출됩니다.
  // 'true'를 반환하면 이 이벤트는 다른 구성요소로 전달되지 않습니다.(기본값 = false)
  @override
  bool onTapDown(GestureEvent event){
    return super.onTapDown(event);
  }

  // 컴포넌트에서 탭업이 발생할 때 호출됩니다.
  @override
  void onTapUp(GestureEvent event){}

  // 컴포넌트에서 탭 취소가 발생하면 호출됩니다.
  @override
  void onTapCancel(){}

  // 컴포넌트를 탭할 때 호출됩니다.
  @override
  void onTap(){}

  // 화면에서 아래로 탭할 때 호출됩니다.
  void onTapDownScreen(GestureEvent event) {}
  // 화면을 탭할 때 호출됩니다.
  void onTapUpScreen(GestureEvent event) {}

}
```

### 드래그 제스처

DragGesture를 활성화하려면 다음과 같이 구성 요소에 `DragGesture` 믹스인을 추가하면 됩니다.

```dart

class MyCustomDecoration extends GameDecoration with DragGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );

}
```

드래그 동작을 사용하면 구성요소를 지도에서 자동으로 드래그할 수 있습니다.

객체와의 상호 작용을 듣고 싶다면 다음 메서드를 재정의할 수 있습니다.

```dart
// 컴포넌트에서 별 드래그 동작이 수행될 때 호출됩니다.
// 'true'를 반환하면 이 이벤트는 다른 구성요소로 전달되지 않습니다.(기본값 = false)
bool startDrag(GestureEvent event) {
  return super.startDrag(event);
}
//컴포넌트가 이동될 때 호출됩니다.
void moveDrag(GestureEvent event) {}
// 구성요소 드래그가 완료되면 호출됩니다.
void endDrag(GestureEvent event) {}
// 드래그가 취소될 때 호출됩니다.
void cancelDrag(GestureEvent event) {}
```

### 커스텀

모든 구성 요소는 `PointerDetectorHandler`를 확장하므로 제스처 이벤트를 수신하려면 `true`를 반환하는 `hash Gesture`를 재정의하세요.

```dart
  @override
  bool hasGesture() => true;
```

이렇게 하면 이 메서드를 재정의하여 화면에서 제스처 이벤트를 들을 수 있습니다.

```dart
  void handlerPointerDown(PointerDownEvent event) {}
  void handlerPointerMove(PointerMoveEvent event) {}
  void handlerPointerUp(PointerUpEvent event) {}
  void handlerPointerCancel(PointerCancelEvent event) {}
  void handlerPointerHover(PointerHoverEvent event) {}
  void handlerPointerSignal(PointerSignalEvent event) {}
```

## 마우스

DragGesture를 활성화하려면 다음과 같이 구성 요소에 `MouseListener` 믹스인을 추가하면 됩니다.

```dart

class MyCustomDecoration extends GameDecoration with MouseEventListener {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );

}
```

객체와의 상호 작용을 듣고 싶다면 다음 메서드를 재정의할 수 있습니다.

```dart
  /// 화면 전체에 걸쳐 마우스 커서를 listen 합니다.
  void onMouseHoverScreen(int pointer, Vector2 position) {}

  /// 화면에서 버튼을 클릭한 상태에서 마우스 움직임을 listen 합니다.
  void onMouseMoveScreen(int pointer, Vector2 position, MouseButton button) {}

  /// 이 구성요소에 마우스 커서를 댈 때 listen 합니다.
  void onMouseHoverEnter(int pointer, Vector2 position);

  /// 마우스 커서가 이 컴포넌트 외부를 지나갈 때 listen 합니다.
  void onMouseHoverExit(int pointer, Vector2 position);

  /// 화면에서 마우스 스크롤을 사용할 때 listen 합니다.
  void onMouseScrollScreen(
      int pointer, Vector2 position, Vector2 scrollDelta) {}

  /// 컴포넌트에서 마우스 스크롤을 사용할 때 listen 합니다.
  void onMouseScroll(int pointer, Vector2 position, Vector2 scrollDelta);

  /// 구성요소에서 마우스를 클릭할 때 listen 합니다.
  void onMouseTapDown(int pointer, Vector2 position, MouseButton button) {}
  /// 구성요소에서 마우스를 클릭할 때 listen 합니다.
  void onMouseTapUp(int pointer, Vector2 position, MouseButton button) {}

    // 구성요소에서 마우스를 클릭할 때 listen 합니다.
  void onMouseTap(MouseButton button);

  void onMouseCancel() {}
```

## 키보드

키보드 이벤트를 들으려면 `KeyboardEventListener` 믹스인을 사용하세요.

```dart

class HumanPlayer extends SimplePlayer with KeyboardEventListener{
  //...
  @override
  bool onKeyboard(
    RawKeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    return super.onKeyboard(event,keysPressed);
  }

}


```
