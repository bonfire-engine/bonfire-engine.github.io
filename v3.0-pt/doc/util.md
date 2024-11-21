# Utilitários

Existem algumas funções e Componentes que podem ser úteis no processo de desenvolvimento do seu jogo.

## Funções

Há várias funções disponíveis em `BonfireUtil` que podem ser úteis:

```dart
 Direction getDirectionFromAngle(double angle);
 double getAngleFromDirection(Direction direction);
 double angleBetweenPoints(Vector2 p1, Vector2 p2);
 Offset rotatePoint(Offset point, double angle, Offset center);
 Vector2 movePointByAngle(
    Vector2 point,
    double speed,
    double angle,
  );
Vector2 vector2ByAngle(double angle, {double intencity = 1})
```

Extensões de `GameComponent`:

```dart
/// Usado para gerar números que criam suas animações ou qualquer outra coisa
  ValueGeneratorComponent generateValues(
    Duration duration, {
    double begin = 0.0,
    double end = 1.0,
    Curve curve = Curves.linear,
    bool autoStart = true,
    bool infinite = false,
    Curve? reverseCurve,
    VoidCallback? onFinish,
    ValueChanged<double>? onChange,
  })

  /// Usado para adicionar partículas em seu componente.
  void addParticle(
    Particle particle, {
    Vector2? position,
    Vector2? size,
    Vector2? scale,
    double? angle,
    Anchor? anchor,
    int? priority,
  })

  /// Adiciona no jogo um texto com animação representando o dano recebido
  void showDamage(
    double damage, {
    TextStyle? config,
    double initVelocityVertical = -5,
    double initVelocityHorizontal = 1,
    double gravity = 0.5,
    double maxDownSize = 20,
    DirectionTextDamage direction = DirectionTextDamage.RANDOM,
    bool onlyUp = false,
  })

  /// Obtém a direção em que outro componente está em relação a você
  Direction getComponentDirectionFromMe(GameComponent comp)

  // Obtém o ângulo entre este componente e o alvo
  double getAngleFromTarget(GameComponent target) {}
```

Outras funções:

```dart
// Ajuda a calcular o zoom pelo número máximo de tiles visíveis
double getZoomFromMaxVisibleTile(
  BuildContext context,
  double tileSize,
  int maxTile,
)

// Pode ser útil para renderizar um sprite rotacionando com base no ângulo
void renderSpriteByRadAngle(
  Canvas canvas,
  double radAngle,
  Rect rect,
  Sprite sprite, {
  Paint? overridePaint,
})

// Útil para gerar animações
ValueGeneratorComponent generateValues(
    Duration duration, {
    double begin = 0.0,
    double end = 1.0,
    Curve curve = Curves.linear,
    bool autoStart = true,
    VoidCallback? onFinish,
    ValueChanged<double>? onChange,
  })
```

## Componentes

### ComponentSpawner

Às vezes, precisamos spawnar algo, como inimigos ou itens no mapa, dinamicamente. Para isso, você pode usar o `ComponentSpawner`:

```dart
    ComponentSpawner({
        required Vector2 position,
        required this.area,
        required this.interval,
        required this.builder,
        this.spawCondition,
        this.onlyVisible = true,
    })
```

### GameObject

Objeto que renderiza um `Sprite`.

```dart
 GameObject({
    required Vector2 position,
    required Vector2 size,
    required FutureOr<Sprite>? sprite,
    Vector2? positionFromTarget,
    LightingConfig? lightingConfig,
    this.objectPriority,
    double angle = 0,
    Anchor anchor = Anchor.topLeft,
  })
```

### AnimatedGameObject

Objeto que renderiza uma `SpriteAnimation`.

```dart
   AnimatedGameObject({
    required super.position,
    required super.size,
    FutureOr<SpriteAnimation>? animation,
    this.onFinish,
    this.onStart,
    this.removeOnFinish = true,
    super.angle = 0,
    super.lightingConfig,
    super.anchor = Anchor.topLeft,
    bool loop = true,
    super.objectPriority,
  })
```

### FollowerGameObject

Semelhante ao anterior, pode reproduzir uma animação antes de se destruir ou pode continuar em loop. Mas a característica mais importante é que este componente segue outro elemento no mapa, como um jogador, inimigo ou decoração.

```dart
FollowerGameObject({
    required GameComponent target,
    required super.size,
    required super.sprite,
    Vector2? offset,
    super.objectPriority,
    super.lightingConfig,
  })
```

### AnimatedFollowerObject

O mesmo que `FollowerObject`, mas com animação.

```dart
AnimatedFollowerGameObject({
    required super.animation,
    required super.size,
    required GameComponent target,
    super.lightingConfig,
    super.loop = true,
    super.onFinish,
    super.onStart,
    super.angle,
    super.removeOnFinish = true,
    Vector2? offset,
    super.objectPriority,
  })
```

### FlyingAttackGameObject

Um componente que se move em uma direção específica com uma velocidade configurável, podendo acertar um inimigo ou jogador causando dano, ou ser destruído ao atingir um componente com colisão (Tiles, Decorações).

Este movimento pode ser baseado no `angle` ou na `direction`.

```dart
FlyingAttackGameObject({
    required super.position,
    required super.size,
    required super.animation,
    super.angle = 0,
    this.direction,
    this.id,
    this.animationDestroy,
    this.destroySize,
    double speed = 150,
    this.damage = 1,
    this.attackFrom = AttackFromEnum.ENEMY,
    this.withDecorationCollision = true,
    this.onDestroy,
    this.enabledDiagonal = true,
    super.lightingConfig,
    this.collision,
  })
```

## FollowerWidget

Você pode exibir um widget que segue um componente no jogo. Isso é útil para criar diálogos, inventários, interações, etc.

Para exibir um widget deste tipo, basta chamar `FollowerWidget.show`. Veja abaixo:

```dart
   FollowerWidget.show(
      identify: 'PLAYER_INVENTORY', // identificador usado para remoção
      context: context,
      target: player, // Você pode adicionar aqui qualquer GameComponent
      child: MyWidget(), // Adicione aqui seu widget
      align: Offset.zero, // Alinhamento em relação ao alvo
   );
```

Para remover:

```dart
   FollowerWidget.remove('PLAYER_INVENTORY');
```
