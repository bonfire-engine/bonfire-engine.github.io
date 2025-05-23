# Sensor

> Is a useful mixin to detect if any object comes into contact, but without blocking its passage.
Examples: Fire on the ground, spikes, etc. Things that the character or enemy can go through and take damage or activate any other type of behavior.

<img src="../../_media/sensor.gif" width="600"/>

```dart
class Spikes extends GameDecoration with Sensor<Myplayer> {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2.all(32),
          position: position,
        ){
            // call this method to configure interval sensor check contact. default 100 milliseconds.
            setSensorInterval(100);
        }

    @override
    void onContact(Myplayer component) {
        // do anything with the Myplayer that take contact
        super.onContact(component);
    }

    void onContactExit(Myplayer component) {
         // do anything with the Myplayer that exit contact
         super.onContactExit(component);
    }

}
```


By default, the sensor uses your component size. If you want to use a custom size just add your `ShapeHitbox`:

```dart
    @override
    Future<void> onLoad() {
        add(RectangleHitbox(size:Vector2()));
        return super.onLoad();
    }
```
