# Camera

> Camera control.

You can configure some settings in the camera:

```dart
  return BonfireWidget(
    ...
   cameraConfig: CameraConfig(
      moveOnlyMapArea: false, // The camera try move only the map area, without show areas outside map.
      movementWindow: Vector2(50,50), // Area what player can move in the center screen without move camera.
      speed: 1.0, // Camera speed
      zoom:  1.0,
      angle: 45 * pi/180, // rotate view 45 degrees
      startFollowPlayer: true,
      speed: double.infinity,
      target: GameComponent(), // per default the target is the Player.
      initPosition: Vector2(),
      initialMapZoomFit = InitialMapZoomFitEnum.none, // none,fitWidth,fitHeight,fit
      resolution: Vector2()
   ),
  );
```

Useful functions to be used during the game:

```dart
   gameRef.camera.moveToPositionAnimated(
   {
      required Vector2 position,
      EffectController? effectController,
      double? zoom,
      double? angle,
      Function()? onComplete,
   }
   )

   gameRef.camera.moveToTargetAnimated({
      required PositionComponent target,
      EffectController? effectController,
      double? zoom,
      double? angle,
      Function()? onComplete,
      bool followTarget = true,
   })

   gameRef.camera.moveToPlayer();

   gameRef.camera.moveToPlayerAnimated({
      EffectController? effectController,
      Function()? onComplete,
      double? zoom,
      double? angle,
   })

   gameRef.camera.animateZoom({
      required Vector2 zoom,
      EffectController? effectController,
      Function()? onComplete,
   })

   gameRef.camera.animateAngle({
      required double angle,
      EffectController? effectController,
      Function()? onComplete,
   })

   gameRef.camera.follow(
      PositionProvider target, {
      double maxSpeed = double.infinity,
      bool horizontalOnly = false,
      bool verticalOnly = false,
      bool snap = false,
   })

   gameRef.camera.shake({double intensity = 10.0, Duration? duration})
```
