# Collision System

> System responsible for determining and configuring the collision between objects.


## How to use

In the 3.0 version of Bonfire, all collision system are using [Flame CollisionDetection](https://docs.flame-engine.org/latest/flame/collision_detection.html).

To add collisions in your component just add a `ShapeHitbox` (PolygonHitbox,RectangleHitbox or CircleHitbox) like this:

```dart

class MyComponent extends SimplePlayer {
  //...
  @override
  Future<void> onLoad() {
    add(RectangleHitbox(size:size));
    return super.onLoad();
  }
}

```

After that, the Flame Engine will detect all collision between hitboxes in the game. You can listen to this by overriding these methods:


```dart

class MyCollidable extends SimplePlayer {
  //...
  @override
  void onCollision(Set<Vector2> points, PositionComponent other) {
    if (other is ScreenHitbox) {
      //...
    } else if (other is YourOtherComponent) {
      //...
    }
  }

  @override
  void onCollisionEnd(PositionComponent other) {
    if (other is ScreenHitbox) {
      //...
    } else if (other is YourOtherComponent) {
      //...
    }
  }
}

```

So, now you can know when collisions happen, but it will not stop component movement. To do block movement, add the `BlockMovementCollision` mixin like this:

```dart

class MyComponent extends SimplePlayer with BlockMovementCollision{
  //...
  @override
  Future<void> onLoad() {
    add(RectangleHitbox(size:size));
    return super.onLoad();
  }
}

```

Great! Now when you move the player and collide with a wall or another component with `ShapeHitbox` the movement is stopped.

## Knowing who collided

You can know what `GameComponent` collided by overriding `onBlockMovement` or `onBlockedMovement`:


```dart

class MyComponent extends SimplePlayer with  BlockMovementCollision{
  //...
  @override
  Future<void> onLoad() {
    add(RectangleHitbox(size:size));
    return super.onLoad();
  }

  @override
  bool onBlockMovement(
    Set<Vector2> intersectionPoints,
    GameComponent other,
  ) {
    // You can do something when the collision occurs. If you return false the blocking movement will not happen.
    return super.onBlockMovement(intersectionPoints,other);
  }

  @override
  void onBlockedMovement(
    GameComponent other,
    CollisionData collisionData,
  ) {
     super.onBlockedMovement(other,collisionData);
     // You can do something when movement is blocked by collision.
     // data.direction
     // data.normal
     // data.intersectionPoints 
  }
}
```

You can configure some things, using:

```dart

 setupBlockMovementCollision(enabled:true, bodyType: BodyType.dynamic);

```

To add `Elastic collision` take a look the mixin [ElasticCollision](doc/mixins?id=ElasticCollision)


## Testing and debugging

To verify if collisions are in the right position, you can enable `showCollisionArea` in `BonfireWidget`:

```dart
    BonfireWidget(
        ...
        showCollisionArea:true,
        ...
    ),
```

![](../../_media/show_collision.png)
