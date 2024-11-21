# Inimigo

> <small>Um inimigo é um [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart) que usa o mixin
[Attackable](doc/mixins?id=attackable).</small>

Crie um inimigo no jogo. Instâncias dessa classe têm comportamentos predefinidos prontos para serem usados ​​e configurados como desejado. Todas as ações e movimentos são personalizáveis.

Existem três tipos de inimigos: `SimpleEnemy`, `RotationEnemy` e `PlatformEnemy`:

## SimpleEnemy

> <small>Este é um [Inimigo](#inimigo) que usa o mixin
[DirectionAnimation](doc/mixins?id=directionanimation).</small>

<img width=100 src="_media/simple_enemy.png"></img>

Usado para perspectivas de 45º e 67.5º. Podem ser configuradas animações de movimento para todas as direções (up, down, left, right, up_right, up_left, down_left, down_right).

Para criar este tipo de inimigo, crie uma classe para representar o inimigo e extenda ela com `SimpleEnemy`:

```dart
class Goblin extends SimpleEnemy {

    Goblin(Vector2 position)
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

Agora com uma classe que representa um inimigo, podemos configurar seu comportamento.

Existem várias extensões úteis que podem ser usadas dentro do método `update` que vão ajudar com esta tarefa:

```dart 
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // default 6,28319 (360 degrees)
    double? angle,
  })
```
Ele acionará uma função de retorno de chamada quando o jogador estiver dentro do raio de visão (`radiusVision`) do inimigo.


```dart 
  void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    VoidCallback? notObserved,
    VoidCallback? observed,
    VoidCallback? notCanMove,
    double radiusVision = 32,
    double margin = 10,
    double? visionAngle, // default 6,28319 (360 degrees)
    double? angle,
    bool runOnlyVisibleInScreen = true, 
  })
```
O inimigo se moverá na direção do jogador assim que estiver dentro do `radiusVision`. Quando ele se aproximar do jogador, `closePlayer` será disparado.


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
Executa um ataque físico no jogador, causando o dano configurado com a frequência configurada. Você pode adicionar animações para representar esse ataque.


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
Executa um ataque à distância. Ele adicionará um projétil do tipo `FlyingAttackObject` ao jogo e este será enviado na direção configurada, causando algum dano a quem quer que acerte ou sendo destruído ao atingir barreiras (tiles com colisão).


```dart 
  void seeAndMoveToAttackRange({
    Function(Player)? positioned,
    Function(Player)? observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle,
    double? angle,
    double? minDistanceFromPlayer,
    bool runOnlyVisibleInScreen = true,
  })
```
Quando o jogador estiver dentro do `radiusVision`, o inimigo se posicionará para executar um ataque à distância. Quando ele atingir a posição de ataque, o callback `positioned` será disparado.

E todos os métodos do `GameComponent`. Dê uma olhada nas [funções do GameComponent](doc/util?id=functions)

### Mudar as animações

Para mudar a animação do `SimpleEnemy` você deve usar o seguinte método:

```dart
  replaceAnimation(SimpleDirectionAnimation());
```

Para executar uma animação momentânea, você deve usar os métodos do `SimpleDirectionAnimation`. Por exemplo:

```dart
  animation.playOnce(
    FutureOr<SpriteAnimation> animation, 
    VoidCallback? onFinish,
    VoidCallback? onStart,
    bool runToTheEnd = false,
    bool flipX = false,
    bool flipY = false,
    bool useCompFlip = false,
    Vector2? size,
    Vector2? offset,
  );
  animation.pause();
  animation.resume();
```

> IMPORTANTE: Os inimigos só se movem se estiverem visíveis na câmera. Se você quiser desabilitar isso, adicione `false` em `collisionOnlyVisibleScreen` na sua configuração de colisão. Veja sobre o [Sistema de Colisão](doc/collision_system?id=collision-system).

Exemplo completo de um `SimpleEnemy` [aqui](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/enemy/goblin.dart).


## RotationEnemy

> <small>Este é um [Inimigo](#inimigo) que usa os mixins
[UseSpriteAnimation](doc/mixins?id=usespriteanimation) e [UseAssetsLoader](doc/mixins?id=useassetsloader).</small>

<img width=100 src="_media/rotation_enemy.png"></img>

Usado em perspectivas de 90º. Podemos confirar animações de movimento para correr e ficar ocioso (idle).

```dart
class Tank extends RotationEnemy {

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
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // default 6,28319 (360 degrees)
    double? angle,
  })
```

```dart 
 void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double margin = 10,
    bool runOnlyVisibleInScreen = true,
  })
```

```dart 
  void seeAndMoveToAttackRange({
    required Function(Player) positioned,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? minDistanceCellsFromPlayer,
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


## PlatformEnemy

> <small>Este é um [Inimigo](#inimigo) que usa os mixins
[BlockMovementCollision](doc/collision_system?id=collision-system), Jump e JumpAnimation</small>

Usado para jogos de plataforma. Podemos configurar animações de movimento como correr, ficar ocioso (idle) e pular.

```dart
class BowserEnemy extends PlatformEnemy {

    BowserEnemy(vector2 position)
      : super(
        position: position, // required
        animation: PlatformAnimations(), // required
        size: Vector.all(32), // required
        life: 100,
        speed: 100,
        countJumps: 1,
      );
}
```

### Pulando

<!-- TODO: Add documentation for the Jumper mixin -->
Para fazer o player pular você deve usar o método do [mixin Jumper]():

```dart
  jump({double? jumpSpeed, bool force = false});
```


### Mudar animações

Para mudar a animação do `PlatformEnemy` você deve usar o seguinte método:

```dart
  replacePlatformAnimation(PlatformAnimations());
```

Para executar uma animação momentânea, você deve usar os métodos do `SimpleDirectionAnimation`. Por exemplo:

```dart
  animation.playOnce(
    FutureOr<SpriteAnimation> animation,
    VoidCallback? onFinish,
    VoidCallback? onStart,
    bool runToTheEnd = false,
    bool flipX = false,
    bool flipY = false,
    bool useCompFlip = false,
    Vector2? size,
    Vector2? offset,
  );
  animation.pause();
  animation.resume();
```

> IMPORTANTE: Lembre-se de adicionar uma força de gravidade neste componente, para corrigir o comportamento. Dê uma olhada em [Forças](doc/forces?id=forces)

## Customização

Se nenhum desses tipos de inimigos não atender às suas necessidades. Você pode criar o seu próprio estendendo a classe `Enemy`.
