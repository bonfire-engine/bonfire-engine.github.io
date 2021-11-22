# Objects

> All objects in Bonfire are [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/base/game_component.dart), he is the basis of everything.

This section is intended to list some Objects already implemented and that can be reused to meet a similar need.

Are they:

## SpriteObject

> <small> This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/base/game_component.dart) </small>

Object tha render a `Sprite`.

## AnimatedObject

> <small> This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/base/game_component.dart) </small>

Object tha render a `SpriteAnimation`.

## AnimatedObjectOnce

> <small> This is a [AnimatedObject](#AnimatedObject) </small>

To run an animation once before it destroys itself

```dart
AnimatedObjectOnce(
   {
      Vector2Rect position,
      Future<SpriteAnimation>? animation,
      VoidCallback? onFinish,
      VoidCallback? onStartAnimation,
      double? rotateRadAngle,
      LightingConfig? lightingConfig,
   }
)
```

## FollowerObject

> <small> This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/base/game_component.dart) </small>

Like the previous one, this can play an animation once before it destroys itself and can also can can keep playing in a loop. But the most important feature is that this component follows another element on the map, like a player, enemy or decoration.


```dart
AnimatedFollowerObject(
   {
      required Future<SpriteAnimation> animation,
      required GameComponent target,
      Vector2Rect? positionFromTarget,
      bool loopAnimation = false,
   }
)
```

## AnimatedFollowerObject

> <small> This is a [FollowerObject](#FollowerObject) </small>

The same `FollowerObject` with animation.

## FlyingAttackObject

> <small> This is a [FollowerObject](#AnimatedObject) and use [ObjectCollision](collision_system), [Lighting](lighting) </small>

 Component that is in a certain direction set at a certain speed also configurable and only to hit an enemy or player inflicting damage, or it can be destroyed when hitting a component that has a collision (Tiles, Decorations).

```dart

FlyingAttackObject(
   {
      required Vector2 position,
      required Future<SpriteAnimation> flyAnimation,
      required this.direction,
      required this.width,
      required this.height,
      dynamic id,
      Future<SpriteAnimation>? destroyAnimation,
      double speed = 150,
      double damage = 1,
      AttackFromEnum attackFrom = AttackFromEnum.ENEMY,
      bool withDecorationCollision = true,
      VoidCallback? onDestroyedObject,
      LightingConfig? lightingConfig,
      CollisionConfig? collision,
  }
)

```

## FlyingAttackAngleObject

> <small> This is a [FollowerObject](#AnimatedObject) and use [ObjectCollision](collision_system), [Lighting](lighting) </small>

The same `FlyingAttackObject` with movement by angle.
