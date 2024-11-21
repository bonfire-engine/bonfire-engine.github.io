# PathFinding

> Algorithm to find your way around obstacles

<img src="_media/git_move_along_the_path.gif" width="600"/>

Bonfire uses the package [a_star_algorithm](https://pub.dev/packages/a_star_algorithm) to find the path.


To use this, just add the Mixin `PathFinding` and call the method `moveToPositionWithPathFinding` (never use this method in update method. just one time to start). 

For this to work, the component must contain the Mixin `Movement` (by default `Player` and `Enemy` use these mixins).

## Configuring 

You can configure PathFinding by calling the method `setupMoveToPositionAlongThePath`. See below:

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

You can then use the method `setupPathFinding`:

``` dart

setupPathFinding(
    pathLineColor: Colors.lightBlueAccent.withOpacity(0.5),
    barriersCalculatedColor: Colors.blue.withOpacity(0.5),
    pathLineStrokeWidth: 4,
    showBarriersCalculated: false, // use this to debug. This enable showing in the map the tiles considered collisions by the algorithm.
    tileSizeIsSizeCollision: false,
)
```

