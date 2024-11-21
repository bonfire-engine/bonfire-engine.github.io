# Jogador

> <small>O Jogador é um [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/base/game_component.dart) e utiliza `mixins` como [Movement](mixins?id=movement), [Attackable](mixins?id=attackable), [Vision](mixins?id=vision), [MovementByJoystick](mixins?id=movementbyjoystick) e [JoystickListener](joystick?id=joysticklistener)</small>

Representa o personagem controlado pelo jogador no jogo. Instâncias desta classe possuem ações e movimentos prontos para serem usados e configurados.

Podemos criar três tipos de jogadores: `SimplePlayer`, `RotationPlayer` e `PlatformPlayer`.

## SimplePlayer
> <small>É um [Jogador](#jogador) e utiliza o mixin [DirectionAnimation](doc/mixins?id=directionanimation)</small>

Usado para perspectivas de 45º e 67.5º. Podemos configurar animações de movimento para todas as direções (top, bottom, left, right, top_right, top_left, bottom_left, bottom_right).

Para utilizá-lo, basta criar uma classe que representará o seu jogador e estender `SimplePlayer`:

```dart
class Knight extends SimplePlayer {

    Knight(Vector2 position)
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
            runDowntRight: Future<SpriteAnimation>(),
          ), // required
      );

    @override
    void update(double dt) {
      // faça algo
      super.update(dt);
    }

    @override
    void render(Canvas canvas) {
      // faça algo
      super.render(canvas);
    }

    @override
    void joystickChangeDirectional(JoystickDirectionalEvent event) {
      // faça algo com o evento do joystick
      super.joystickChangeDirectional(event);
    }

    @override
    void joystickAction(JoystickActionEvent event) {
      // faça algo com o evento do joystick
      super.joystickAction(event);
    }

}
```

Todo o movimento do jogador já é gerenciado automaticamente, respondendo à interação do usuário com o joystick.

As instâncias de `Player` podem receber ações configuradas no joystick sobrescrevendo o seguinte método:

```dart
  @override
  void joystickAction(JoystickActionEvent event) {
    // faça algo com o evento do joystick
    super.joystickAction(event);
  }
```

As ações podem ser disparadas quando uma ação do joystick é recebida. Assim como em `Enemy`, aqui temos algumas ações pré-incluídas:

```dart
// Executa um ataque físico no jogador, causando o dano configurado com a frequência configurada. Você pode adicionar animações para representar este ataque.
  void simpleAttackMelee(
    {
      Future<SpriteAnimation>? animationRight,
      required double damage,
      required Vector2 size,
      dynamic id,
      Direction? direction,
      bool withPush = true,
      double? sizePush,
      Vector2? centerOffset,
      double? marginFromCenter,
      bool diagonalEnabled = true,
    }
  )
  
  // Executa um ataque à distância. Adiciona um projétil `FlyingAttackObject` no jogo, que será enviado na direção configurada, causando dano a quem atingir, ou sendo destruído ao colidir com barreiras (tiles com colisão definida).
  void simpleAttackRange(
    {
      required Future<SpriteAnimation> animationRight,
      required Vector2 size,
      Future<SpriteAnimation>? animationDestroy,
      Vector2? destroySize,
      dynamic id,
      double speed = 150,
      double damage = 1,
      Direction? direction,
      bool withCollision = true,
      bool diagonalEnabled = true,
      VoidCallback? onDestroy,
      ShapeHitbox? collision,
      LightingConfig? lightingConfig,
    }
  )
    
    // Observa inimigos dentro de um raio (`radiusVision`)
    void seeEnemy(
      {
        required Function(List<Enemy>) observed,
        VoidCallback? notObserved,
        double radiusVision = 32,
        double? angle, // direção
        double? visionAngle, // padrão 6.28319 (360 graus)
      }
    )
```

E todos os métodos de `GameComponent`. Veja mais em [Funções do GameComponent](doc/util?id=functions).

### Alterar animações

Para atualizar a animação de `SimplePlayer`, você deve usar este método:

```dart
  replaceAnimation(SimpleDirectionAnimation());
```

Para reproduzir uma animação momentânea, você deve usar os métodos de `SimpleDirectionAnimation`. Por exemplo:

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
## RotationPlayer

> <small>Este é um [Player](#Player) e utiliza 
[UseSpriteAnimation](doc/mixins?id=usespriteanimation), 
[UseAssetsLoader](doc/mixins?id=useassetsloader)</small>

Usado para perspectivas de 90º. Podemos configurar animações para movimento (`run`) e estado parado (`idle`).

```dart
class PlayerTank extends RotationPlayer {

    PlayerTank(Vector2 position)
      : super(
        position: position, // required
        animIdle: Future<SpriteAnimation>(), // required
        animRun: Future<SpriteAnimation>(), // required
        size: Vector2.all(32), // required
        life: 100,
        speed: 100,
        currentRadAngle: -1.55,
      );
}
```

As ações podem ser disparadas quando uma ação do joystick é recebida. Assim como em `Enemy`, aqui temos algumas ações pré-incluídas:

```dart
// Executa um ataque físico no jogador, causando o dano configurado com a frequência configurada. Você pode adicionar animações para representar este ataque.
  void simpleAttackMelee(
     {
      required Future<SpriteAnimation> attackEffectTopAnim,
      required double damage,
      required Vector2 size,
      int? id,
      bool withPush = false,
      double? radAngleDirection,
      double marginFromCenter = 16,
      Vector2? centerOffset,
     }
  )
  
  // Executa um ataque à distância. Adiciona um projétil `FlyingAttackObject` no jogo, que é enviado na direção configurada e causa dano ao atingir algo, sendo destruído ao colidir com barreiras (tiles com colisão definida).
  void simpleAttackRange(
     {
      required Future<SpriteAnimation> animation,
      required Vector2 size,
      Future<SpriteAnimation>? animationDestroy,
      Vector2? destroySize,
      dynamic id,
      double speed = 150,
      double damage = 1,
      double? radAngleDirection,
      bool withDecorationCollision = true,
      VoidCallback? onDestroy,
      ShapeHitbox? collision,
      LightingConfig? lightingConfig,
      Vector2? centerOffset,
      double marginFromOrigin = 16,
    }
  )
    
    // Observa inimigos dentro de um raio (`radiusVision`).
    void seeEnemy(
       {
          required Function(List<Enemy>) observed,
          VoidCallback? notObserved,
          double radiusVision = 32,
       }
    )
```

### Alterar animações

Para atualizar o `RotationPlayer`, basta atualizar as variáveis `animIdle` e `animRun`.

## PlatformPlayer

> <small>Este é um [SimplePlayer](#SimplePlayer) e utiliza 
[BlockMovementCollision](doc/collision_system?id=collision-system), 
`Jump` e `JumpAnimation`</small>

Usado para jogos de plataforma. Aqui, podemos configurar animações para movimento (`run`), estado parado (`idle`) e pulo (`jump`).

```dart
class MarioPlayer extends PlatformPlayer {

    MarioPlayer(Vector2 position)
      : super(
        position: position, // required
        animation: PlatformAnimations(), // required
        size: Vector2.all(32), // required
        life: 100,
        speed: 100,
        countJumps: 1,
      );
}
```

### Pulando

Para fazer o jogador pular, você pode usar o método do [mixin Jumper](#TODO):

```dart
  jump({double? jumpSpeed, bool force = false});
```

### Alterar animações

Para atualizar a animação do `PlatformPlayer`, você deve usar este método:

```dart
  replacePlatformAnimation(PlatformAnimations());
```

Para reproduzir uma animação momentânea, use os métodos de `SimpleDirectionAnimation`. Por exemplo:

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

> **OBS:** Lembre-se de adicionar uma força gravitacional neste componente para corrigir o comportamento. Veja mais em [HandleForces](doc/forces?id=forces).

## Customização

Se nenhum desses tipos de jogadores atender às suas necessidades, você pode criar o seu próprio estendendo a classe `Player`.
