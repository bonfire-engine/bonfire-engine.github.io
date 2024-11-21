# 输入（Input）


## 手势（Gestures）

> At Bonfire we use mixins to enable these interactions.

Bonfire 使用 [Listener](https://api.flutter.dev/flutter/widgets/Listener-class.html) 小部件来接收手势。

### TapGesture（点击手势）

要启用点击手势，只需在你的组件中添加 TapGesture 混入，如下所示：
```dart

class MyCustomDecoration extends GameDecoration with TapGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );


  // 当用户按下组件时调用
  // 如果返回 'true'，则事件不会传递给其他组件。（默认值为 false）
  @override
  bool onTapDown(GestureEvent event){
    return super.onTapDown(event);
  }

  // 当用户停止按下组件时调用
  @override
  void onTapUp(GestureEvent event){}

  // 当用户取消点击组件时调用
  @override
  void onTapCancel(){}

  // 当用户点击组件时调用
  @override
  void onTap(){}

  // 当用户在屏幕上按下时调用
  void onTapDownScreen(GestureEvent event) {}
  // 当用户停止在屏幕上按下时调用
  void onTapUpScreen(GestureEvent event) {}

}
```

### DragGesture（拖动手势）

要启用拖动手势，只需在你的组件中添加 DragGesture 混入，如下所示：
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

你的组件可以通过拖动手势在地图上自动移动。

如果你希望监听与对象的交互，可以重写以下方法：

```dart
// Called when the drag gesture is started in the component
// If return 'true', this event is not relayed to others components.(default = false)
bool startDrag(GestureEvent event) {
  return super.startDrag(event);
}
// Called when component is moved
void moveDrag(GestureEvent event) {}
// Called when component finishes the drag
void endDrag(GestureEvent event) {}
// Called when drag is canceled
void cancelDrag(GestureEvent event) {}
```

### PinchGesture（捏合手势）


要在屏幕上监听捏合手势，只需在你的组件中添加 PinchGesture 混入，如下所示：

```dart

class MyCustomDecoration extends GameComponent with PinchGesture {

  void onPinchUpdate(PinchEvent event) {}
  void onPinchStart(PinchEvent event) {}
  void onPinchEnd() {}
  
}

```

### MoveCameraUsingGesture（使用手势移动相机）


此混入用于通过手势（触摸或鼠标）移动相机：
```dart

class MyPlayer extends SimplePlayer with MoveCameraUsingGesture {

}

```

设置方法：

```dart

void setupMoveCameraUsingGesture({
    bool onlyMouse = false,
    MouseButton mouseButton = MouseButton.left,
  })

```

### 自定义手势（Custom）


所有组件都继承自 PointerDetectorHandler，因此要接收手势事件时只需重写 hasGesture 方法并返回 true：

```dart
  @override
  bool hasGesture() => true;
```

这样，你就可以在屏幕上监听手势事件，通过重写以下方法：
```dart
  void handlerPointerDown(PointerDownEvent event) {}
  void handlerPointerMove(PointerMoveEvent event) {}
  void handlerPointerUp(PointerUpEvent event) {}
  void handlerPointerCancel(PointerCancelEvent event) {}
  void handlerPointerHover(PointerHoverEvent event) {}
  void handlerPointerSignal(PointerSignalEvent event) {}
```

## 鼠标（Mouse）

要启用拖动手势，只需在组件中添加 MouseListener 混入，如下所示：

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

如果您想监听与对象的交互，可以重写以下方法：

```dart
  /// Listen to the mouse cursor across the screen
  void onMouseHoverScreen(int pointer, Vector2 position) {}

  /// Listen to the mouse move with some button clicked across the screen
  void onMouseMoveScreen(int pointer, Vector2 position, MouseButton button) {}

  /// Listen when the mouse cursor hovers in this component
  void onMouseHoverEnter(int pointer, Vector2 position);

  /// Listen when the mouse cursor passes outside this component
  void onMouseHoverExit(int pointer, Vector2 position);

  /// Listen when the scroll wheel of the mouse is used across the screen
  void onMouseScrollScreen(
      int pointer, Vector2 position, Vector2 scrollDelta) {}

  /// Listen when the scroll whell of the mouse is used in your component
  void onMouseScroll(int pointer, Vector2 position, Vector2 scrollDelta);

  /// Listen when mouse is clicked down in your component
  void onMouseTapDown(int pointer, Vector2 position, MouseButton button) {}

  /// Listen when mouse is clicked up in your component
  void onMouseTapUp(int pointer, Vector2 position, MouseButton button) {}

  // Listen when mouse clicked in your component
  void onMouseTap(MouseButton button);

  void onMouseCancel() {}
```

## 键盘

如果您需要让玩家通过键盘移动，可以将 Keyboard 作为 playerControllers 参数传递。

```dart
      BonfireWidget(
        playerControllers:[
          Keyboard(
            config: KeyboardConfig(
              enable: true, // Use to enable or disable keyboard events (default is true)
              acceptedKeys: [ // You can pass specific Keys accepted. If null accept all keys
                LogicalKeyboardKey.space,
              ],
              directionalKeys: [
                KeyboardDirectionalType.arrows()
              ], // Type of the directional (arrows or wasd)
            ), // Here you enable receive keyboard interaction
          )
        ]
        ....
      )

```

要在您的组件中监听键盘事件，只需使用混入 KeyboardEventListener。

```dart

class Computer extends GameDecoration with KeyboardEventListener{
  // ...
  @override
  bool onKeyboard(
    RawKeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    return super.onKeyboard(event,keysPressed);
  }

}


```