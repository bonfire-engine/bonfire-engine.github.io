# Collision System

> System responsible for determining and configuring the collision between objects


## Using

To anable collision in your component just add the `ObjectCollision` mixin to the component and configure it using `setupCollision()` method:

```dart

class MyCustomDecoration extends GameDecoration with ObjectCollision {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          width: 32,
          height: 32,
          position: position,
        ){
            setupCollision(
                CollisionConfig(
                    collisionOnlyVisibleScreen: true,
                    enable: true,
                    collisions: [ //required
                        CollisionArea.rectangle(
                            size: Size(32,32),
                            align: Vector2(0,0),
                        ),
                    ],
                ),
            );
        }

}
```


## Types of shapes available

```dart
    // Rectangle
    CollisionArea.rectangle(
        size: Size(32,32),
        align: Vector2(0,0),
    ),  

    // Circle
    CollisionArea.circle(
        radius: 16,
        align: Vector2(0,0),
    ), 

    // Polygon
    CollisionArea.polygon(
        points: [
            Vector2(25, 0),
            Vector2(31, 18),
            Vector2(50, 18),
            Vector2(34, 31),
            Vector2(40, 50),
            Vector2(25, 38),
            Vector2(10, 50),
            Vector2(14, 31),
            Vector2(0, 18),
            Vector2(18, 18),
        ],
        align: Vector2(0,0),
    ), 
```
