# Collision System

> System responsible for determining and configuring the collision between objects


## How to use

In the 3.0 version all collision system using [Flame CollisionDetection](https://docs.flame-engine.org/latest/flame/collision_detection.html).

To add collision in your component just adds a `ShapeHitbox` (PolygonHitbox,RectangleHitbox or CircleHitbox) like this:

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

After that the Flame will detect all collision between hitboxes in the game. You can listen this doing override of this methods:


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

So, now you can know when happen collision, but it not do components stop your movement when it happen. To do it just adds the `BlockMovementCollision` mixin like this:

```dart

class MyComponent extends SimplePlayer with  BlockMovementCollision{
  //...
  @override
  Future<void> onLoad() {
    add(RectangleHitbox(size:size));
    return super.onLoad();
  }
}

```

Great! Now when you move the player and colliding with wall or other component with `ShapeHitbox` the movement is stoped.

## Knowing who crashed

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
    // You can do something when occurs the collision. Se you return false the blocking movement will not happen.
    return super.onBlockMovement(intersectionPoints,other);
  }

  @override
  void onBlockedMovement(
    GameComponent other,
    Direction? direction,
    Vector2 lastDisplacement,
  ) {
     super.onBlockedMovement(other,direction,lastDisplacement);
     // You can do something when movement is bloked by collision.
  }
}
```

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
