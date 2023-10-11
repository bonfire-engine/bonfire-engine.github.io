# Forces

모닥불은 간단한 힘 시스템을 가지고 있습니다. 게임에 선형, 가속 또는 저항력을 추가할 수 있습니다.

| AccelerationForce2D | LinearForce2D    | ResistanceForce2D    |
| :---:   | :---: | :---: |
| ![](../../_media/force_acceleration.gif) | ![](../../_media/force_linear.gif)   | ![](../../_media/force_resistance.gif)   |


## 사용법

전역 힘을 추가하려면 Bonfire 위젯의 'globalForces' 매개변수에 추가하세요.


```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      //...
      globalForces: [] // 여기서 가속(Acceleration Force 2D), 저항과 같은 힘을 추가할 수 있습니다.
    );
  }
```

네! 'HandleForces' 믹스인을 사용하는 모든 구성요소는 이 힘의 영향을 받습니다. 이와 같이:

```dart
class MyCustomDecoration extends GameDecoration with  HandleForces{


}
```

특정 구성요소에 힘을 추가할 수 있습니다. 그냥 `HandleForces` 믹스인을 추가하고 `addForce` 함수를 호출하세요.


```dart
class MyCustomDecoration extends GameDecoration with  HandleForces{

  MyCustomDecoration(){
    addForce((AccelerationForce2D('gravity',Vector2(0,50))))
    // 제거하려면 RemoveForce('gravity')를 사용합니다.
  }
}
```

## 사용 가능한 힘 

- `AccelerationForce2D` -> 속도에 가속도 적용
- `ResistanceForce2D` -> 0을 시도하는 속도에 저항을 적용합니다.
- `LinearForce2D` -> 속도에 선형 힘 적용

클래스를 생성하고 `Force2D`에서 확장하여 자신만의 `force`를 만들 수 있습니다.

> component 의 질량도 편집할 수 있습니다. 그냥 `mass = 2`를 하세요;
