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