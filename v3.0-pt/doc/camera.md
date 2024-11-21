# Câmera

> Controle de câmera

Você pode configurar algumas coisas na câmera:

```dart
  return BonfireWidget(
   // ...
   cameraConfig: CameraConfig(
      moveOnlyMapArea: false, // A câmera move apenas a área do mapa, sem mostrar áreas fora do mapa.
      movementWindow: Vector2(50,50), // Área que o jogador pode mover no centro da tela, sem mover a câmera.
      speed: 1.0, // Velocidade da câmera
      zoom:  1.0,
      angle: 45 * pi/180, // Gira a vista em 45 graus
      startFollowPlayer: true,
      speed: double.infinity,
      target: GameComponent(), // Por padrão o alvo é o Jogador.
      initPosition: Vector2(),
      initialMapZoomFit = InitialMapZoomFitEnum.none, // none,fitWidth,fitHeight,fit
      resolution: Vector2()
   ),
  );
```

Funções úteis para serem utilizadas durante o jogo:

```dart
   gameRef.camera.moveToPositionAnimated({
      required Vector2 position,
      EffectController? effectController,
      double? zoom,
      double? angle,
      Function()? onComplete,
   })

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
