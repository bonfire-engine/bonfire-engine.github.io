# Particles

The basic, yet robust and extendable particle system offered by Flame.

Take a look the [Flame Particles](https://docs.flame-engine.org/latest/flame/rendering/particles.html#particles)

To use it in Bonfire you can use this methods in your component:


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

or

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