# 경로 찾기

> 장애물을 피해 길을 찾는 알고리즘

<img src="_media/git_move_along_the_path.gif" width="600"/>

Bonfire는 [a_star_algorithm](https://pub.dev/packages/a_star_algorithm) 패키지를 사용하여 경로를 찾습니다.


사용하려면 Mixin `PathFinding`을 추가하고 `moveToPositionWithPathFinding` 메소드를 호출하기만 하면 됩니다(업데이트 메소드에서 이 메소드를 절대 사용하지 마십시오. 시작하려면 한 번만 수행하십시오).
이 작업을 수행하려면 구성 요소에 믹스인 'Movement'(기본적으로 'Player' 및 'Enemy'가 사용함)가 포함되어 있어야 합니다.

## 구성

`setupMoveToPositionAlongThePath` 메소드를 호출하여 PathFinding을 구성할 수 있습니다. 아래를 참조하세요:

```dart

class Kinght extends SimplePlayer with PathFinding, TapGesture{

    Kinght(Vector2 position)
    : super(
        ...
    );

    @override
    void onTap() {}

    @override
    void onTapDownScreen(GestureEvent event) {
        moveToPositionWithPathFinding(event.worldPosition);
        super.onTapDownScreen(event);
    }
}

```

`setupPathFinding` 메소드를 사용하여 설정을 수행할 수 있습니다.

``` dart

setupPathFinding(
    pathLineColor: Colors.lightBlueAccent.withOpacity(0.5),
    barriersCalculatedColor: Colors.blue.withOpacity(0.5),
    pathLineStrokeWidth: 4,
    showBarriersCalculated: false, // 이것을 디버깅에 사용합니다. 이를 통해 알고리즘에 의해 충돌로 간주되는 타일을 지도에 표시할 수 있습니다.
    tileSizeIsSizeCollision: false,
)
```

