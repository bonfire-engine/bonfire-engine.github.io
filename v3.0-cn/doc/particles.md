# Particles

Flame 提供的基本但强大且可扩展的粒子系统。

查看 [Flame Particles](https://docs.flame-engine.org/latest/flame/rendering/particles.html#particles)

要在 Bonfire 中使用它，您可以在组件中使用以下方法：

```dart

void addParticle(
    Particle particle, {
    Vector2? position,
    Vector2? size,
    Vector2? scale,
    double? angle,
    Anchor? anchor,
    int? priority,
    ComponentKey? key,
  })

```

或

```dart

gameRef.add(
  // Wrapping a Particle with ParticleSystemComponent
  // which maps Component lifecycle hooks to Particle ones
  // and embeds a trigger for removing the component.
  ParticleSystemComponent(
    particle: CircleParticle(),
  ),
);

```