# PathFinding

> 用于绕过障碍物的算法。

<img src="_media/git_move_along_the_path.gif" width="600"/>

Bonfire 使用该软件包： [a_star_algorithm](https://pub.dev/packages/a_star_algorithm) 来寻找路径。


要使用此功能，只需添加混入 PathFinding 并调用方法 moveToPositionWithPathFinding（切勿在更新方法中使用此方法，只需调用一次以启动）。

为了使其正常工作，组件必须包含混入 Movement（默认情况下，Player 和 Enemy 使用这些混入）。

## Configuring 

您可以通过调用方法 setupMoveToPositionAlongThePath 来配置路径寻找功能。请看下面的示例：

```dart

class Knight extends SimplePlayer with PathFinding, TapGesture {

    Knight(Vector2 position)
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

然后，您可以使用方法 setupPathFinding：

``` dart

setupPathFinding(
    pathLineColor: Colors.lightBlueAccent.withOpacity(0.5),
    barriersCalculatedColor: Colors.blue.withOpacity(0.5),
    pathLineStrokeWidth: 4,
    showBarriersCalculated: false, // use this to debug. This enable showing in the map the tiles considered collisions by the algorithm.
    tileSizeIsSizeCollision: false,
)
```

