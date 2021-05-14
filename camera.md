# Camera

> Camera control.

```dart
 ameRef.gameCamera.moveToPosition(Offset(X,Y));

 gameRef.gameCamera.moveToPlayer();

 gameRef.gameCamera.moveToTarget(GameComponent());

 gameRef.gameCamera.moveToPositionAnimated(
    Offset(X,Y),
    zoom: 1,
    finish: (){},
    duration: Duration(seconds: 1),
    curve: Curves.decelerate,
 );

 gameRef.gameCamera.moveToPlayerAnimated(
    zoom: 1,
    finish: (){},
    duration: Duration(seconds: 1),
    curve: Curves.decelerate,
 );

 gameRef.gameCamera.moveToTargetAnimated(
    GameComponent(),
    zoom: 1,
    finish: (){},
    duration: Duration(seconds: 1),
    curve: Curves.decelerate,
 );
```