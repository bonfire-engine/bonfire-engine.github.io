# Input


## Gestures

> At Bonfire we use mixins to enable this interaction.

Bonfire use [Listener](https://api.flutter.dev/flutter/widgets/Listener-class.html) Widget to recieve gestures.

### TapGesture

To enable TapGesture just add `TapGesture` mixin in your component like this:

```dart

class MyCustomDecoration extends GameDecoration with TapGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );


  // It's called when happen tap down in the component
  // If return 'true' this event is not relay to others components.(default = false)
  @override
  bool onTapDown(int pointer, Vector2 position){
    return super.onTapDown(pointer,position);
  }

  // It's called when happen tap up in the component
  @override
  void onTapUp(int pointer, Vector2 position){}

  // It's called when happen canceled tap in the component
  @override
  void onTapCancel(){}

  // It's called when happen tap in the component
  @override
  void onTap(){}

  // It's called when happen tap down in the screen
  void onTapDownScreen(int pointer, Vector2 position) {}
  // It's called when happen tap up in the screen
  void onTapUpScreen(int pointer, Vector2 position) {}

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
// Called when star drag gesture in the component
// If return 'true' this event is not relay to others components.(default = false)
bool startDrag(int pointer, Vector2 position) {
  return super.startDrag(pointer,position);
}
// Called when component is moved
void moveDrag(int pointer, Vector2 position) {}
// Called when component finish drag
void endDrag(int pointer) {}
// Called when drag is canceled
void cancelDrag(int pointer) {}
```

### Custom

All components extends `PointerDetectorHandler`,so, to recieve gestures events do override `hasGesture` returning `true`:

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

class MyCustomDecoration extends GameDecoration with MouseListener {
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

  /// Listen when the mouse cursor hover in this component
  void onMouseHoverEnter(int pointer, Vector2 position);

  /// Listen when the mouse cursor passes outside this component
  void onMouseHoverExit(int pointer, Vector2 position);

  /// Listen when use scroll of the mouse across the screen
  void onMouseScrollScreen(
      int pointer, Vector2 position, Vector2 scrollDelta) {}

  /// Listen when use scroll of the mouse in your component
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

To listen keyboard events just use the mixin `KeyboardEventListener`.

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