# Ray casting

Ray casting and ray tracing are methods for sending out rays from a point in your game and seeing what these rays collide with and how they reflect after hitting something.

Bonfire supports [Ray casting and Ray tracing](https://docs.flame-engine.org/latest/flame/collision_detection.html#ray-casting-and-ray-tracing)

To throw raycast or raytrace you can use this methods in your component:

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