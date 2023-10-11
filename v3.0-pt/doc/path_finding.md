# PathFinding

> Algorithm to find your way around obstacles

<img src="_media/git_move_along_the_path.gif" width="600"/>

Bonfire uses the package [a_star_algorithm](https://pub.dev/packages/a_star_algorithm) to find  the path.


To uses just add the Mixin `PathFinding` and call the method `moveToPositionWithPathFinding` (never use this method in update method. just one time to start). 
To this work, the component must contain the Mixin `Movement` (by defauld `Player` and `Enemy` uses).

## Configuring 

You can configure PathFinding calling the method `setupMoveToPositionAlongThePath`. See below:

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

You can do settings using the method `setupPathFinding`:

``` dart

setupPathFinding(
    pathLineColor: Colors.lightBlueAccent.withOpacity(0.5),
    barriersCalculatedColor: Colors.blue.withOpacity(0.5),
    pathLineStrokeWidth: 4,
    showBarriersCalculated: false, // uses this to debug. This enable show in the map the tiles considered collision by algorithm.
    tileSizeIsSizeCollision: false,
)
```

