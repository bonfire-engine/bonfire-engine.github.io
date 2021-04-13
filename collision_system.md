# Collision System

> System responsible for determining and configuring the collision between objects

To anable collision in your component just add the `ObjectCollision` mixin to the component and configure its light using `setupCollision()` method:

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
                        CollisionArea(
                            height: 32,
                            width: 32,
                            align: Offset(0,0),
                        ),
                    ],
                ),
            );
        }

}
```