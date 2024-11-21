# Parallax

No Bonfire, você pode adicionar dois tipos de paralaxe ao seu jogo: com velocidade predefinida ou com velocidade baseada no movimento da câmera.

Para predefinir a velocidade, você pode usar `loadParallaxComponent`. Exemplo:

```dart
 class ParallaxBackground extends GameBackground {
  @override
  void onMount() {
    _addParallax();
    super.onMount();
  }

  void _addParallax() async {
    final p = await loadParallaxComponent(
      [
        ParallaxImageData('platform/back.png'),
        ParallaxImageData('platform/middle.png'),
      ],
      baseVelocity: Vector2(10, 0),
      velocityMultiplierDelta: Vector2(1.8, 1.0),
    );
    add(p);
  }
}
```

Para velocidade da câmera você pode usar `loadCameraParallaxComponent`. Exemplo:

```dart
 class BonfireParallaxBackground extends GameBackground {
  @override
  void onMount() {
    _addParallax();
    super.onMount();
  }

  void _addParallax() async {
    final p = await loadCameraParallaxComponent(
      [
        ParallaxImageData('platform/back.png'),
        ParallaxImageData('platform/middle.png'),
      ],
      baseVelocity: Vector2(10, 0),
      velocityMultiplierDelta: Vector2(1.8, 1.0),
    );
    add(p);
  }
}
```