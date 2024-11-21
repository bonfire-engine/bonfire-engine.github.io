# Projeção de Raios (Ray Casting)

Projeção de Raios (Ray Casting) e Rastreamento de Raios (Ray Tracing) são métodos para enviar raios de um ponto no seu jogo e ver com o que esses raios colidem e como eles refletem depois de atingir algo.

O Bonfire suporta [o Ray casting e o Ray tracing](https://docs.flame-engine.org/latest/flame/collision_detection.html#ray-casting-and-ray-tracing) do Flame.

Para lançar raycast ou raytrace você pode usar estes métodos no seu componente:

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
```
