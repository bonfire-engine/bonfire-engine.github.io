# PathFinding

> Algorithm to find your way around obstacles

<img src="_media/git_move_along_the_path.gif" width="600"/>

Bonfire uses the package [a_star_algorithm](https://pub.dev/packages/a_star_algorithm) to find  the path.


To uses just add the Mixin `MoveToPositionAlongThePath`(by defauld `Player` uses) and call the method `moveToPositionAlongThePath`. 
To this work, the component must contain the Mixin `Movement` (by defauld `Player` and `Enemy` uses).

When you use the JoystickMoveToPosition joystick this functionality is activated in the Player. See [here](joystick?id=joystickmovetoposition).

## Configuring 

You can configure PathFinding calling the method `setupMoveToPositionAlongThePath`. See below:

```dart

class Kinght extends SimplePlayer {

    Kinght(Vector2 position)
    : super(
        ...
    ), //required
    ){

        setupMoveToPositionAlongThePath(
            pathLineColor: Colors.lightBlueAccent.withOpacity(0.5),
            barriersCalculatedColor: Colors.blue.withOpacity(0.5),
            pathLineStrokeWidth: 4,
            showBarriersCalculated: false, // uses this to debug. This enable show in the map the tiles considered collision by algorithm.
            tileSizeIsSizeCollision: false,
        )
        
    }
}

```


