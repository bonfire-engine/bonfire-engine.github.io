# Sensor

> Mixin useful to detect if any object came into contact without blocking its passage.

Example: fire on the ground, spikes, etc. Things that the character or enemy can go through and take damage or activate any other type of behavior.

<img src="../../_media/sensor.gif" width="600"/>

```dart
class Spikes extends GameDecoration with Sensor<Player> {
  Spikes(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>.value(...),
          size: Vector2.all(32),
          position: position,
        );

  @override
  void onContact(Player component) {
    component.life.remove(10);
  }
}
```

## How it works

`Sensor` automatically creates a collision shape matching the component size if one doesn't exist. It then detects other components that overlap this area.

You can control the detection using the `sensorEnabled` flag and `sensorInterval`:

```dart
sensorEnabled = false; // disable detection
sensorEnabled = true;  // enable detection
sensorInterval = 100;  // interval in milliseconds between contact checks
```

## Main callbacks

```dart
// Called while contact is detected
void onContact(T component)

// Called when contact ends
void onContactExit(T component)
```

## Type safety

`Sensor<T extends GameComponent>` lets you specify which type of component you want to detect. For example, detect only `Player`:

```dart
class PlayerDetector extends GameDecoration with Sensor<Player> {
  PlayerDetector(Vector2 position) : super.withSprite(
    sprite: ...,
    position: position,
    size: Vector2.all(32),
  );

  @override
  void onContact(Player player) {
    player.life.remove(5);
  }
}
```
