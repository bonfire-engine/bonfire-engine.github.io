# Aliado

> <small>Um aliado é um [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart) e usa o mixin
[Attackable](doc/mixins?id=attackable).</small>

Este é um NPC que é um aliado do jogador. Portanto, ele pode receber dano de inimigos e pode infingir dano aos inimigos.

<!-- TODO: add a section for PlatformAlly -->
Existem três tipos de aliados: `SimpleAlly`, `RotationAlly` e `PlatformAlly`:

## SimpleAlly

> <small>Este é um [Aliado](#aliado) e usa o mixin
[DirectionAnimation](doc/mixins?id=directionanimation).</small>

É usado para perspectivas de 45º e 67.5º. Podem ser configuradas animações de movimento para todas as direções (up, down, left, right, up_right, up_left, down_left, down_right).

Para criar este tipo de aliado, crie uma classe para representar o aliado e extenda ela com `SimpleAlly`:

```dart
class Human extends SimpleAlly {

    Human(Vector2 position)
      : super(
          position: position, // required
          size: Vector2(32.0,32.0), // required
          life: 100,
          speed: 100,
          initDirection: Direction.right,
          animation: SimpleDirectionAnimation(
            idleLeft: Future<SpriteAnimation>(), 
            idleRight: Future<SpriteAnimation>(), // required
            runLeft: Future<SpriteAnimation>(), 
            runRight: Future<SpriteAnimation>(), // required
            idleUp: Future<SpriteAnimation>(),
            idleDown: Future<SpriteAnimation>(),
            idleUpLeft: Future<SpriteAnimation>(),
            idleUpRight: Future<SpriteAnimation>(),
            idleDownLeft: Future<SpriteAnimation>(),
            idleDownRight: Future<SpriteAnimation>(),
            runUp: Future<SpriteAnimation>(),
            runDown: Future<SpriteAnimation>(),
            runUpLeft: Future<SpriteAnimation>(),
            runUpRight: Future<SpriteAnimation>(),
            runDownLeft: Future<SpriteAnimation>(),
            runDownRight: Future<SpriteAnimation>(),
          ),
      );

    @override
    void update(double dt) {
      // do anything
      super.update(dt);
    }

    @override
    void render(Canvas canvas) {
      // do anything
      super.render(canvas);
    }
}

```

Agora com uma classe que representa um aliado, podemos configurar seu comportamento.

Existem várias extensões úteis que podem ser usadas dentro do método `update` que vão ajudar com esta tarefa:

```dart 
  void simpleAttackMelee({
    required double damage,
    required Vector2 size,
    int? id,
    int interval = 1000,
    bool withPush = false,
    double? sizePush,
    Direction? direction,
    Future<SpriteAnimation>? animationRight,
    VoidCallback? execute,
    Vector2? centerOffset,
  })
```
Executa um ataque físico ao inimigo, causando o dano configurado com a frequência configurada. Você pode adicionar animações para representar esse ataque.


```dart 
  void simpleAttackRange({
    required Future<SpriteAnimation> animationRight,
    required Future<SpriteAnimation> animationDestroy,
    required Vector2 size,
    Vector2? destroySize,
    int? id,
    double speed = 150,
    double damage = 1,
    Direction? direction,
    int interval = 1000,
    bool withCollision = true,
    ShapeHitbox? collision,
    VoidCallback? onDestroy,
    VoidCallback? execute,
    LightingConfig? lightingConfig,
  })
```
Executa um ataque à distância. Ele adicionará um prprojétil `FlyingAttackObject` ao jogo e este será enviado na direção configurada, causando algum dano a quem quer que acerte ou sendo destruído ao atingir barreiras (tiles com colisão).


```dart 
  void seeAndMoveToAttackRange({
    Function(Enemy)? positioned,
    Function(Enemy)? observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle,
    double? angle,
    double? minDistanceFromPlayer,
    bool runOnlyVisibleInScreen = true,
  })
```
Quando o inimigo estiver dentro do `radiusVision`, o aliado se posicionará para executar um ataque à distância. Quando atingir a posição de ataque, o callback `positioned` será disparado.


E todos os métodos do `GameComponent`. Dê uma olhada nas [funções do GameComponent](doc/util?id=functions)


### Mudar as animações

Para mudar a animação do `SimpleAlly` você deve usar o seguinte método:

```dart
  replaceAnimation(SimpleDirectionAnimation());
```

Para executar uma animação momentânea, você deve usar os métodos do `SimpleDirectionAnimation`. Por exemplo:

```dart
  animation.playOnce(
    FutureOr<SpriteAnimation> animation, {
      VoidCallback? onFinish,
      VoidCallback? onStart,
      bool runToTheEnd = false,
      bool flipX = false,
      bool flipY = false,
      bool useCompFlip = false,
      Vector2? size,
      Vector2? offset,
    },
  );
  animation.pause();
  animation.resume();
```

## RotationAlly

> <small>Este é um [Aliado](#aliado) e usa os mixins 
[UseSpriteAnimation](doc/mixins?id=usespriteanimation) e
[UseAssetsLoader](doc/mixins?id=useassetsloader).</small>

Usado em perspectivas de 90º. Podemos confirar animações de movimento para correr e inatividade (idle).

```dart
class Tank extends RotationAlly {

    Tank(Vector2 position)
      : super(
          position: position, // required
          animIdle: Future<SpriteAnimation>(), // required
          animRun: Future<SpriteAnimation>(), // required
          size: Vector2(32.0,32.0), // required
          life: 100,
          speed: 100,
          currentRadAngle: -1.55, 
      );

    @override
    void update(double dt) {
      // do anything
      super.update(dt);
    }

    @override
    void render(Canvas canvas) {
      // do anything
      super.render(canvas);
    }
}
```

Agora com uma classe que representa um aliado, podemos configurar seu comportamento.

Existem várias extensões úteis que podem ser usadas dentro do método `update` que vão ajudar com esta tarefa:

```dart 
  void seeAndMoveToAttackRange({
    Function(Enemy)? positioned,
    VoidCallback? notObserved,
    Function(Enemy)? observed,
    double radiusVision = 32,
    double? visionAngle,
    double? angle,
    double? minDistanceFromPlayer,
    bool runOnlyVisibleInScreen = true,
  })
```

```dart 
  void simpleAttackMelee({
    required Future<SpriteAnimation> animationRight,
    required double damage,
    required Vector2 size,
    int? id,
    bool withPush = true,
    double? radAngleDirection,
    VoidCallback? execute,
    int interval = 1000,
    double marginFromCenter = 16,
    Vector2? centerOffset,
  })
```

```dart 
  void simpleAttackRange({
    required Future<SpriteAnimation> animation,
    required Future<SpriteAnimation> animationDestroy,
    required Vector2 size,
    Vector2? destroySize,
    double? radAngleDirection,
    int? id,
    double speed = 150,
    double damage = 1,
    int interval = 1000,
    bool withDecorationCollision = true,
    VoidCallback? onDestroy,
    ShapeHitbox? collision,
    VoidCallback? onExecute,
    LightingConfig? lightingConfig,
    Vector2? centerOffset,
    double marginFromOrigin = 16, 
  })
```

E todos os métodos do `GameComponent`. Dê uma olhada nas [funções do GameComponent](doc/util?id=functions)

## Custom

Se nenhum desses tipos de aliados atender às suas necessidades, você pode criar o seu próprio estendendo a classe `Ally`.