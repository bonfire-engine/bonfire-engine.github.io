# Parallax

In Bonfire, you can add two types of parallax in your game: with velocity pre-defined or with velocity based on camera movement.

To pre-defined velocity you can use 'loadParallaxComponent'. Example:

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

To camera velocity you can use 'loadCameraParallaxComponent'. Example:

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