# Input


## Gestures

> At Bonfire we use mixins to enable these interactions.

Bonfire uses [Listener](https://api.flutter.dev/flutter/widgets/Listener-class.html) Widget to recieve gestures.

### TapGesture

To enable TapGesture just add the `TapGesture` mixin in your component like this:

```dart

class MyCustomDecoration extends GameDecoration with TapGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );


  // It's called when the user taps down the component
  // If return 'true', this event is not relayed to others components.(default = false)
  @override
  bool onTapDown(GestureEvent event){
    return super.onTapDown(event);
  }

  // It's called when the user stops tapping the component
  @override
  void onTapUp(GestureEvent event){}

  // It's called when the user cancels tap in the component
  @override
  void onTapCancel(){}

  // It's called when the user taps the component
  @override
  void onTap(){}

  // It's called when the user tap down in the screen
  void onTapDownScreen(GestureEvent event) {}
  // It's called when the user stops tapping the screen
  void onTapUpScreen(GestureEvent event) {}

}
```

### DragGesture

To enable DragGesture just add `DragGesture` mixin in your component like this:

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

Your component can be automatically dragged on the map with the drag gesture.

If you want to listen to the interactions with the object, you can override these methods:

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

### PinchGesture

To listen pinch gesture in the screen just add `PinchGesture` mixin in your component like this:

```dart

class MyCustomDecoration extends GameComponent with PinchGesture {

  void onPinchUpdate(PinchEvent event) {}
  void onPinchStart(PinchEvent event) {}
  void onPinchEnd() {}
  
}

```


### Custom

All components extends `PointerDetectorHandler`, so to recieve gestures events do override `hasGesture` returning `true`:

```dart
  @override
  bool hasGesture() => true;
```

this way you can listen gestures events on the screen doing override this methods:

```dart
  void handlerPointerDown(PointerDownEvent event) {}
  void handlerPointerMove(PointerMoveEvent event) {}
  void handlerPointerUp(PointerUpEvent event) {}
  void handlerPointerCancel(PointerCancelEvent event) {}
  void handlerPointerHover(PointerHoverEvent event) {}
  void handlerPointerSignal(PointerSignalEvent event) {}
```

## Mouse

To enable DragGesture just add `MouseListener` mixin in your component like this:

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

If you want to listen to the interactions with the object, you can override these methods:

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

## Keyboard

If you need that the Player move by keyboard you can pass the `Keyboard` in `playerControllers` param.

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

To listen keyboard events in your component just use the mixin `KeyboardEventListener`.

```dart

class Computer extends GameDecoration with KeyboardEventListener{
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