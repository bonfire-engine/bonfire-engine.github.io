# 센서

> 믹스인은 물체가 접촉했지만 통로를 막지 않고 감지하는 데 유용합니다.
예: 지상의 불, 스파이크 등 캐릭터나 적이 통과하여 피해를 입거나 다른 유형의 행동을 활성화할 수 있는 것입니다.

<img src="../../_media/sensor.gif" width="600"/>

```dart

class Spikes extends GameDecoration with Sensor<Myplayer> {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2.all(32),
          position: position,
        ){
            // 센서 확인 접점 간격을 구성하려면 이 메서드를 호출합니다. 기본값은 100밀리초입니다.
            setSensorInterval(100);
        }

    @override
    void onContact(Myplayer component) {
        // 접촉된 Myplayer로 필요한 로직을 작성합니다.
        super.onContact(component);
    }

    void onContactExit(Myplayer component) {
         // 접촉된 Myplayer로 필요한 로직을 작성합니다.
         super.onContactExit(component);
    }

    @override
    Future<void> onLoad() {
        add(RectangleHitbox(size:size));
        return super.onLoad();
    }

}
```
