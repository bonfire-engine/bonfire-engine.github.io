# Camera

> Camera control.

```dart
 gameRef.camera.moveToPosition(Offset(X,Y));

 gameRef.camera.moveToPlayer();

 gameRef.camera.moveToTarget(GameComponent());

 gameRef.camera.moveToPositionAnimated(
    Offset(X,Y),
    zoom: 1,
    finish: (){},
    duration: Duration(seconds: 1),
    curve: Curves.decelerate,
 );

 gameRef.camera.moveToPlayerAnimated(
    zoom: 1,
    finish: (){},
    duration: Duration(seconds: 1),
    curve: Curves.decelerate,
 );

 gameRef.camera.moveToTargetAnimated(
    GameComponent(),
    zoom: 1,
    finish: (){},
    duration: Duration(seconds: 1),
    curve: Curves.decelerate,
 );
```