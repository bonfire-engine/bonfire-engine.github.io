# Parallax

在 Bonfire 中，您可以在游戏中添加两种类型的视差效果：基于预定义速度或基于相机移动的速度。

对于预定义速度，您可以使用 loadParallaxComponent。示例：

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

对于相机速度，您可以使用 loadCameraParallaxComponent。示例：

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