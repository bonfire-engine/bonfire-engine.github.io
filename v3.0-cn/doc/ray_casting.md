# Ray casting

射线投射（Ray Casting）和射线追踪（Ray Tracing）是从游戏中的一个点发出射线的方法，用于查看这些射线与哪些物体发生碰撞，以及它们在碰撞后如何反射。

Bonfire 支持 [Ray casting and Ray tracing](https://docs.flame-engine.org/latest/flame/collision_detection.html#ray-casting-and-ray-tracing)

要进行射线投射或射线追踪，您可以在组件中使用以下方法：

```dart

  RaycastResult<ShapeHitbox>? raycast(
    Vector2 direction, {
    Vector2? origin,
    double? maxDistance,
    List<ShapeHitbox>? ignoreHitboxes,
  })

  List<RaycastResult<ShapeHitbox>> raycastAll(
    int numberOfRays, {
    Vector2? origin,
    double? maxDistance,
    double startAngle = 0,
    double sweepAngle = tau,
    List<Ray2>? rays,
    List<ShapeHitbox>? ignoreHitboxes,
  })

  Iterable<RaycastResult<ShapeHitbox>> raytrace(
    Ray2 ray, {
    int maxDepth = 10,
    List<ShapeHitbox>? ignoreHitboxes,
  })

``````