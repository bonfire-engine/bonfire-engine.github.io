# Objects

> All objects in Bonfire are `GameComponent`, he is the basis of everything.

This section is intended to list some Objects already implemented and that can be reused to meet a similar need.

Are they:

## SpriteObject

// TODO

## AnimatedObject

// TODO

## AnimatedObjectOnce

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

The same `FollowerObject` with animation.

## FlyingAttackObject

Componente que anda em determinada direção configurada em uma determinada velocidade também configurável e somente para ao atingir um inimigo ou player infligindo dano, ou pode se destruir ao atigir algum componente que tenha colisão (Tiles,Decorations).

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

The same `FlyingAttackObject` with angle.
