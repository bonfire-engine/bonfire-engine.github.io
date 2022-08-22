# Camera

> Camera control.

You can configure some settings in the camera:

```dart
  return BonfireWidget(
    ...
   cameraConfig: CameraConfig(
      moveOnlyMapArea: false,
      sizeMovementWindow: Vector2(50,50),
      smoothCameraEnable: false, // default = false
      smoothCameraSpeed: 1.0,
      zoom:  1.0,
      angle: 45 * pi/180, // rotate view 45 degrees
      target: GameComponent(), // per default the target is the Player.
   ),
  );
```

Useful functions to be used during the game:

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
