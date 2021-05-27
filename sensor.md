# Sensor

> Mixin useful to detect if any object came into contact but without blocking its passage.
Example: Fire on the ground, spikes, etc. Things that the character or enemy can go through and take damage or activate any other type of behavior.

<img src="_media/sensor.gif" width="600"/>

```dart

class Spikes extends GameDecoration with Sensor {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          width: 32,
          height: 32,
          position: position,
        ){

            // call this method to configure sensor area.
            setupSensorArea(
                Vector2Rect(
                    Vector2.zero(),
                    Vector2(width, height),
                ),
            );
        }

    @override
    void onContact(GameComponent component) {
        // do anything with the Component that take contact
    }

}
```