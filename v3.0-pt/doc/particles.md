# Partículas

O sistema de partículas básico, porém robusto e extensível oferecido pela Flame.

Dê uma olhada na documentação das [partículas do Flame](https://docs.flame-engine.org/latest/flame/rendering/particles.html#particles)

Para usá-lo no Bonfire, você pode usar um destes métodos no seu componente:

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

ou

```dart
gameRef.add(
  // Envolvendo uma partícula com ParticleSystemComponent
  // que mapeia os hooks do ciclo de vida do componente para os da partícula
  // e incorpora um gatilho para remover o componente.
  ParticleSystemComponent(
    particle: CircleParticle(),
  ),
);
```