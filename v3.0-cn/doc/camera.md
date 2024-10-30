# 相机

> 相机控制.

你可以在相机中配置一些设置：
```dart
  return BonfireWidget(
    ...
   cameraConfig: CameraConfig(
      moveOnlyMapArea: false, // The camera moves only the map area, without showing areas outside map.
      movementWindow: Vector2(50,50), // Area that the player can move in the center screen, without moving the camera.
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

游戏过程中可以使用的一些实用函数：

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
