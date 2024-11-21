# 碰撞系统

> 专门用于检测和处理对象间碰撞的系统.


## 如何使用

在 Bonfire 3.0 版本中，所有碰撞系统都使用了 [Flame CollisionDetection](https://docs.flame-engine.org/latest/flame/collision_detection.html).

要在你的组件中添加碰撞，只需添加一个 ShapeHitbox（如 PolygonHitbox、RectangleHitbox 或 CircleHitbox），如下所示：

```dart

class MyComponent extends SimplePlayer {
  // ...
  @override
  Future<void> onLoad() {
    add(RectangleHitbox(size:size));
    return super.onLoad();
  }
}

```

之后，Flame 引擎会检测游戏中所有碰撞盒之间的碰撞。你可以通过重写以下方法来监听这些碰撞事件：

```dart

class MyCollidable extends SimplePlayer {
  // ...
  @override
  void onCollision(Set<Vector2> points, PositionComponent other) {
    if (other is ScreenHitbox) {
      // ...
    } else if (other is YourOtherComponent) {
      // ...
    }
  }

  @override
  void onCollisionEnd(PositionComponent other) {
    if (other is ScreenHitbox) {
      // ...
    } else if (other is YourOtherComponent) {
      // ...
    }
  }
}

```

现在你可以知道何时发生碰撞，但这并不会阻止组件的移动。要阻止移动，可以像下面这样添加 BlockMovementCollision 混入：

```dart

class MyComponent extends SimplePlayer with BlockMovementCollision{
  // ...
  @override
  Future<void> onLoad() {
    add(RectangleHitbox(size:size));
    return super.onLoad();
  }
}

```

很好！现在，当你移动玩家并与墙壁或其他带有 ShapeHitbox 的组件发生碰撞时，移动将会被阻止。

## 知道是谁发生了碰撞。

你可以通过重写 `onBlockMovement` 或 `onBlockedMovement` 来知道是哪一个 `GameComponent` 发生了碰撞：

```dart

class MyComponent extends SimplePlayer with  BlockMovementCollision{
  // ...
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

你可以使用以下方式配置一些内容：

```dart

 setupBlockMovementCollision(enabled:true, bodyType: BodyType.dynamic);

```

要添加 弹性碰撞，请查看该混入（mixin） [ElasticCollision](doc/mixins?id=ElasticCollision)


## 测试与调试。

要验证碰撞区域是否处于正确位置，可以在 BonfireWidget 中启用 showCollisionArea：
```dart
    BonfireWidget(
        ...
        showCollisionArea:true,
        ...
    ),
```

![](../../_media/show_collision.png)
