# Gestures

> At Bonfire we use mixins to enable this interaction.

There are basically two:

## TapGesture

To enable TapGesture just add `TapGesture` mixin in your component like this:

```dart

class MyCustomDecoration extends GameDecoration with TapGesture {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          width: 32,
          height: 32,
          position: position,
        );


  @override
  void onTapDown(int pointer, Offset position){}

  @override
  void onTapUp(int pointer, Offset position){}

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
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          width: 32,
          height: 32,
          position: position,
        );

}
```

Your component can be automatically dragged on the map with the drag gesture.

If you want to listen to the interactions with the object, you can override these methods:

```dart
void startDrag(int pointer, Offset position) {}
void moveDrag(int pointer, Offset position) {}
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
          width: 32,
          height: 32,
          position: position,
        );

}
```

If you want to listen to the interactions with the object, you can override these methods:

```dart
  /// Listen to the mouse cursor across the screen
  void onHoverScreen(int pointer, Offset position) {}

  /// Listen when the mouse cursor hover in this component
  void onHoverEnter(int pointer, Offset position);

  /// Listen when the mouse cursor passes outside this component
  void onHoverExit(int pointer, Offset position);

  /// Listen when use scroll of the mouse across the screen
  void onScrollScreen(int pointer, Offset position, Offset scrollDelta) {}

  /// Listen when use scroll of the mouse in your component
  void onScroll(int pointer, Offset position, Offset scrollDelta);
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
```