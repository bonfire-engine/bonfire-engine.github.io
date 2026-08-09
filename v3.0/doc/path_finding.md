# PathFinding

> Algorithm to find your way around obstacles

<img src="../../_media/git_move_along_the_path.gif" width="600"/>

Bonfire uses the package [a_star_algorithm](https://pub.dev/packages/a_star_algorithm) to find the path.

To use it, add the mixin `PathFinding` (by default `Player` uses it) and call the method `moveToPositionWithPathFinding`. Never call this method inside the `update` method — call it once to start the movement.

The component must contain the `Movement` mixin (by default `Player` and `Enemy` use it).

When you use the `JoystickMoveToPosition` joystick this functionality is activated in the Player. See [here](joystick?id=joystickmovetoposition).

## Configuring

You can configure path finding calling the method `setupPathFinding`:

```dart
class Knight extends SimplePlayer {
  Knight(Vector2 position)
      : super(
          position: position,
          size: Vector2.all(32),
        ) {
    setupPathFinding(
      linePathEnabled: true,
      pathLineColor: Colors.lightBlueAccent.withOpacity(0.5),
      barriersCalculatedColor: Colors.blue.withOpacity(0.5),
      pathLineStrokeWidth: 4,
      showBarriersCalculated: false, // use this to debug. Shows tiles considered collision by the algorithm.
      useOnlyVisibleBarriers: true,
      useAreaBetweenPlayerAndTarget: false,
      gridSizeIsCollisionSize: false,
      withDiagonal: true,
      factorInflateFindArea: 2,
    );
  }
}
```

## Main methods

```dart
Future<List<Vector2>> moveToPositionWithPathFinding(
    Vector2 position, {
    List<GameComponent>? ignoreCollisions,
    VoidCallback? onFinish,
})

void moveAlongThePath(
    List<Vector2> path, {
    VoidCallback? onFinish,
})

List<Vector2> getPathToPosition(
    Vector2 position, {
    List<GameComponent>? ignoreCollisions,
})

void stopMoveAlongThePath()

bool get isMovingAlongThePath
```
