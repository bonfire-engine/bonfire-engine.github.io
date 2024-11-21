# Sistema de Colisão

> Sistema responsável por determinar e configurar a colisão entre objetos.

## Como usar

Na versão 3.0 do Bonfire, todos os sistemas de colisão estão usando o [CollisionDetection](https://docs.flame-engine.org/latest/flame/collision_detection.html) do [Flame](https://docs.flame-engine.org/latest/).

Para adicionar colisões em seu componente, basta adicionar um `ShapeHitbox` (`PolygonHitbox`, `RectangleHitbox` ou `CircleHitbox`) como no exemplo:

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

Depois disso, o Flame detectará todas as colisões entre hitboxes no jogo. Você pode ouvir isso sobrescrevendo estes métodos:

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

Então, agora você pode saber quando as colisões acontecem, mas isso não vai parar o movimento do componente. Para parar o movimento do bloco, adicione o mixin `BlockMovementCollision` assim:

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

Ótimo! Agora, quando você move o player e colide com uma parede ou outro componente com `ShapeHitbox`, o movimento é interrompido.

## Sabendo quem colidiu

Você pode saber qual `GameComponent` colidiu substituindo (overriding) o `onBlockMovement` ou o `onBlockedMovement`:

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
    // Você pode fazer algo quando a colisão ocorrer. Se você retornar false o movimento de bloqueio não acontecerá.
    return super.onBlockMovement(intersectionPoints, other);
  }

  @override
  void onBlockedMovement(
    GameComponent other,
    CollisionData collisionData,
  ) {
     super.onBlockedMovement(other, collisionData);
     // Você pode fazer algo quando o movimento é bloqueado por uma colisão.
     // data.direction
     // data.normal
     // data.intersectionPoints 
  }
}
```

Você pode configurar algumas coisas:

```dart
 setupBlockMovementCollision(enabled:true, bodyType: BodyType.dynamic);
```

Para adicionar uma **colisão elástica**, dê uma olhada no mixin [ElasticCollision](doc/mixins?id=ElasticCollision)

## Teste e depuração

Para verificar se as colisões estão na posição correta, você pode habilitar o `showCollisionArea` no `BonfireWidget`:

```dart
    BonfireWidget(
        // ...
        showCollisionArea:true,
        // ...
    ),
```

![](../../_media/show_collision.png)
