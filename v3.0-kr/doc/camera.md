# 카메라

> 카메라 컨트롤러

카메라에서 일부 설정을 구성할 수 있습니다.

```dart
  return BonfireWidget(
    ...
   cameraConfig: CameraConfig(
      moveOnlyMapArea: false, // 카메라는 지도 외부 영역을 표시하지 않고 지도 영역만 이동하려고 합니다.
      movementWindow: Vector2(50,50), // 카메라를 움직이지 않고도 중앙 화면에서 플레이어가 움직일 수 있는 영역입니다.
      speed: 1.0, // 카메라 속도
      zoom:  1.0,
      angle: 45 * pi/180, // 뷰를 45도 회전
      startFollowPlayer: true,
      speed: double.infinity,
      target: GameComponent(), // 기본적으로 대상은 플레이어입니다.
      initPosition: Vector2(),
      initialMapZoomFit = InitialMapZoomFitEnum.none, // none,fitWidth,fitHeight,fit
   ),
  );
```

게임 중에 사용할 수 있는 유용한 기능:

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
