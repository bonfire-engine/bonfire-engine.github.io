# Gestures

> At Bonfire we use mixins to enable this interaction.

Bonfire use [Listener](https://api.flutter.dev/flutter/widgets/Listener-class.html) Widget to recieve gestures.

## TapGesture

To enable TapGesture just add `TapGesture` mixin in your component like this:

```dart

class MyCustomDecoration extends GameDecoration with TapGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );


  // If return 'true' this event is not relay to others components.(default = false)
  @override
  bool onTapDown(int pointer, Vector2 position){
    return super.onTapDown(pointer,position);
  }

  @override
  void onTapUp(int pointer, Vector2 position){}

  @override
  void onTapCancel(){}

  @override
  void onTap(){}

}
```

## DragGesture

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
// If return 'true' this event is not relay to others components.(default = false)
bool startDrag(int pointer, Vector2 position) {
  return super.startDrag(pointer,position);
}
void moveDrag(int pointer, Vector2 position) {}
void endDrag(int pointer) {}
void cancelDrag(int pointer) {}
```

## MouseGesture

To enable DragGesture just add `MouseGesture` mixin in your component like this:

```dart

class MyCustomDecoration extends GameDecoration with MouseGesture {
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
  void onHoverScreen(int pointer, Vector2 position) {}

  /// Listen when the mouse cursor hover in this component
  void onHoverEnter(int pointer, Vector2 position);

  /// Listen when the mouse cursor passes outside this component
  void onHoverExit(int pointer, Vector2 position);

  /// Listen when use scroll of the mouse across the screen
  void onScrollScreen(int pointer, Vector2 position, Vector2 scrollDelta) {}

  /// Listen when use scroll of the mouse in your component
  void onScroll(int pointer, Vector2 position, Vector2 scrollDelta);

  void onMouseTapDownLeft(int pointer, Vector2 position) {}
  void onMouseTapDownRight(int pointer, Vector2 position) {}
  void onMouseTapDownMiddle(int pointer, Vector2 position) {}
  void onMouseTapUpLeft(int pointer, Vector2 position) {}
  void onMouseTapUpRight(int pointer, Vector2 position) {}
  void onMouseTapUpMiddle(int pointer, Vector2 position) {}

  void onMouseTapLeft();
  void onMouseTapRight();
  void onMouseTapMiddle();
  void onMouseCancel();
```

## Custom

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