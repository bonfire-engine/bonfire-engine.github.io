# Sensor

> 用于检测任何物体接触但不阻止其通过的混入（mixin）。例如：地面的火焰、尖刺等。角色或敌人可以穿过这些物体并受到伤害或激活其他类型的行为。

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


默认情况下，传感器使用您的组件大小。如果您想使用自定义大小，只需添加您的 ShapeHitbox：

```dart

    @override
    Future<void> onLoad() {
        add(RectangleHitbox(size:Vector2()));
        return super.onLoad();
    }

```