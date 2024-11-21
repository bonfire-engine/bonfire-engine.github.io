# Mixins

> Com os mixins, você pode adicionar diferentes comportamentos aos seus componentes.

Abaixo está a lista dos principais mixins disponíveis atualmente:

<img src="_media/mixin_diagram.png"></img>

## Movement

Mixin responsável por adicionar movimentação.

Seu componente ganhará as seguintes propriedades:

```dart
    double speed = 100;
    Direction lastDirection = Direction.right;
    Direction lastDirectionHorizontal = Direction.right;
    Direction lastDirectionVertical = Direction.down;
```

E métodos para movimentar o componente. (Esses movimentos levam em consideração colisões. Se retornar `true`, o movimento foi realizado com sucesso).

```dart
    void moveUp({double? speed})
    void moveDown({double? speed})
    void moveLeft({double? speed})
    void moveRight({double? speed})
    void moveUpRight({double? speed})
    void moveUpLeft({double? speed})
    void moveDownLeft({double? speed})
    void moveDownRight({double? speed})
    void moveFromAngle({double? speed})
    void stopMove({bool forceIdle = false, bool isX = true, bool isY = true})
    void moveFromAngle(double angle, {double? speed})
    void moveFromDirection(Direction direction, {bool enabledDiagonal = true})
    bool moveToPosition(Vector2 position, {double? speed,bool useCenter = true})
```

Você pode escutar alterações no movimento:

```dart
@override
void onMove(
    double speed,
    Vector2 displacement,
    Direction direction,
    double angle,
  ) {}
```


## DirectionAnimation

> Para usar este mixin, seu componente deve conter o mixin `Movement`.

Mixin responsável por adicionar animações aos movimentos.

Você deve configurar um `SimpleDirectionAnimation`:

```dart
class MyComponent extends GameComponent with Movement, DirectionAnimation {
    MyComponent() {
        animation = SimpleDirectionAnimation();
    }
}
```

Você pode substituir o `SimpleDirectionAnimation` usando:

```dart
Future<void> replaceAnimation(
    SimpleDirectionAnimation newAnimation, {
    bool doIdle = true,
})
```

No `SimpleDirectionAnimation`, há métodos úteis para controlar as animações:

```dart
/// Reproduz uma animação única usando o mapa `other`
animation.playOnceOther()

/// Reproduz uma animação única
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
});

/// Reproduz uma animação específica registrada em `others`
animation.playOther(String key, {bool flipX = false, bool flipY = false});

/// Registra uma nova animação em `others`
animation.addOtherAnimation(
    String key,
    FutureOr<SpriteAnimation> animation,
);

animation.pause();
animation.resume();
```


## MoveToPositionAlongThePath

> Para usar este mixin, seu componente deve conter o mixin `Movement`.

Mixin responsável por encontrar um caminho usando o algoritmo `a_star_algorithm` e mover o componente ao longo do caminho.

Consulte [PathFinding](doc/path_finding).

## UseLifeBar

Mixin utilizado para adicionar uma barra de vida ao componente.

Com este mixin, você pode configurar a exibição da barra de vida usando o método `setupBarLife`:

```dart
void setupBarLife({
    Vector2? size,
    Color? backgroundColor,
    Color? borderColor,
    double borderWidth = 2,
    List<Color>? colors,
    BorderRadius? borderRadius,
    BarLifeDrawPorition barLifeDrawPosition = BarLifeDrawPorition.top,
    Vector2? offset,
    Vector2? textOffset,
    TextStyle? textStyle,
    bool showLifeText = true,
    BarLifeTextBuilder? barLifetextBuilder,
})
```


## RandomMovement

> Para usar este mixin, seu componente deve conter o mixin `Movement`.

Mixin responsável por adicionar movimentação aleatória, como inimigos andando pela cena.

Para usar, basta adicionar o método `runRandomMovement` no seu update:

```dart
class MyComponent extends GameComponent with Movement, RandomMovement {
    
    @override
    void update(double dt) {
        this.runRandomMovement(dt);
        super.update(dt);
    }
}
```

Todos os parâmetros:

```dart
void runRandomMovement(
    double dt, {
    double? speed,
    int maxDistance = 50,
    int minDistance = 25,
    int timeKeepStopped = 2000, // em milissegundos
    bool updateAngle = false,
    bool checkPositionWithRaycast = false,
    RandomMovementDirections directions = RandomMovementDirections.all,
    Function(Vector2 target)? onStartMove,
    Function()? onArrivedTarget,
})
```


## MovementByJoystick

> Para usar este mixin, seu componente deve conter os mixins `Movement` e `JoystickListener`.

Mixin responsável por adicionar movimentação baseada em eventos do joystick.

```dart
class MyComponent extends GameComponent with Movement, JoystickListener, MovementByJoystick {
    
}
```

Se você adicionar este componente como observador do Joystick, ele se moverá ao interagir com o joystick:

```dart
MyComponent myComp = MyComponent();
gameRef.joystickController?.addObserver(myComp);
gameRef.camera.moveToTargetAnimated(myComp);
```

Você pode desativar este comportamento definindo `movementByJoystickEnabled` como `false`.


## MovementByJoystick

> Para usar este mixin, seu componente deve conter os mixins `Movement` e `JoystickListener`.

Mixin responsável por adicionar movimentos através de eventos do joystick.

```dart
class MyComponent extends GameComponent with Movement, JoystickListener, MovementByJoystick {
    
}
```

Dessa forma, se você adicionar este componente como um observador do joystick, ele se moverá ao interagir com o joystick:

```dart
MyComponent myComp = MyComponent();
gameRef.joystickController?.addObserver(myComp);
gameRef.camera.moveToTargetAnimated(myComp);
```

Você pode desativar esse comportamento definindo `movementByJoystickEnabled` como `false`.


## Attackable

> Como usar: `Player`, `Ally`, `Enemy`

Mixin responsável por adicionar o comportamento de receber dano ao componente.

Seu componente ganhará as propriedades:

```dart
double maxLife;
bool isDead;
double life;
```

Adiciona os seguintes métodos ao seu componente:

```dart
void initialLife(double life);
void addLife(double life);
void updateLife(double life, {bool verifyDieOrRevive = true});
void removeLife(double life);

// Chamado quando o componente recebe dano
void onReceiveDamage(
    AttackOriginEnum attacker,
    double damage,
    dynamic identify,
);

// Chamado quando a vida é reduzida
void onRemoveLife(double life) {}

// Chamado quando a vida é restaurada
void onRestoreLife(double life) {}

// Se a vida ficar menor que 0, este método é chamado
@override
void onDie();

// Se você morrer e reviver
@override
void onRevive();
```


## Vision

Mixin responsável por adicionar visão ao componente. Componentes como `Player`, `Npc` e `Decoration` utilizam este mixin.

Seu componente ganha os métodos `seeComponent` e `seeComponentType`.

Você pode desenhar a visão do componente assim:

```dart
setupVision(
    {
        Color? color,
        bool drawVision = false,
        int countPolygonPoints = 20,
    }
);
```

Quando você usa qualquer método como `seeComponent` ou `seeComponentType`, a engine determinará a visão.


## Sensor

Mixin responsável por adicionar um gatilho para detectar outros objetos acima.

Veja [Sensor](doc/sensor)


## Lighting

Mixin utilizado para configurar iluminação no seu componente.

Veja [Lighting](doc/lighting)


## BlockMovementCollision

Mixin responsável por parar o movimento quando ocorre uma colisão.

Veja [ObjectCollision](doc/collision_system)


## Pushable

> Para usar este mixin, seu componente deve conter o mixin `Movement`.

Mixin responsável por habilitar a opção de empurrar o componente.

Você pode sobrescrever o método `bool onPush(GameComponent component)` para controlar quando pode ser empurrado. Retorne `true` se o componente pode ser empurrado e `false` caso contrário (o retorno padrão é `true`).


## Follower

Este mixin faz com que seu componente siga a posição do seu alvo.

Seu componente ganha as propriedades: `followerTarget` e `followerOffset`.

Você pode configurar seu alvo assim:

```dart
setupFollower(target: myPlayer, offset: Vector2());
```

Se um componente que possui este mixin for adicionado como filho de outro componente, ele seguirá a posição do pai.


## UseAssetsLoader

Mixin usado para carregar assets:

```dart
class MyComponent extends GameComponent with UseAssetsLoader {
    SpriteAnimation animation;
    MyComponent(Vector2 position, Future<SpriteAnimation> animIdle) {
        this.position = position;
        loader?.add(AssetToLoad(animIdle, (value) {
            animation = value;
        }));
    }
}
```


## UseSpriteAnimation

Mixin que adiciona ao seu componente o uso de `SpriteAnimation` de maneira mais fácil.

Seu componente ganha a propriedade `animation` e o método `playSpriteAnimationOnce`.

```dart
class MyComponent extends GameComponent with UseSpriteAnimation {
    MyComponent(Vector2 position) {
        this.position = position;
    }

    void playJump() {
        playSpriteAnimationOnce(MySpriteSheetLoader.getJumpAnimation());
    }

    @override
    Future onLoad() async {
        setAnimation(await MySpriteSheetLoader.geAnimation());
        return super.onLoad();
    }
}
```

Você pode saber o índice atual da animação ou se está no último frame:

```dart
bool get isAnimationLastFrame;
int get animationCurrentIndex;
int get isPaused;
```


## UseSprite

Mixin que adiciona ao seu componente o uso de `Sprite` de maneira mais fácil.

Seu componente ganha a propriedade `sprite`.

```dart
class MyComponent extends GameComponent with UseSprite {
    MyComponent(Vector2 position) {
        this.position = position;
    }

    @override
    Future onLoad() async {
        sprite = await MySpriteSheetLoader.geSprite();
        return super.onLoad();
    }
}
```


### UseLifeBar

Mixin utilizado para adicionar uma barra de vida em um componente `Attackable`.

Com este mixin, você pode configurar a visualização da barra de vida usando o método `setupLifeBar`:

```dart
void setupLifeBar({
    Vector2? size,
    Color? backgroundColor,
    Color? borderColor,
    double borderWidth = 2,
    double margin = 4,
    List<Color>? colors,
    BorderRadius? borderRadius,
    BarLifePorition barLifePosition = BarLifePorition.top,
    Vector2? offset,
    Vector2? textOffset,
    TextStyle? textStyle,
    bool showLifeText = true,
    BarLifeTextBuilder? barLifetextBuilder,
});
```

### TileRecognizer

Mixin usado para reconhecer o tipo de tiles abaixo do componente.

No programa Tiled, usado para construir o mapa, é possível definir uma `class` ou propriedades personalizadas. Com este mixin, você pode acessar informações do `Tile` que o componente está sobre:

```dart
/// Método que verifica o tipo de tile no mapa atualmente
String? tileTypeBelow();

/// Método que verifica os tipos de tiles no mapa atualmente
List<String> tileTypeListBelow();

/// Método que verifica as propriedades do tile no mapa atualmente
Map<String, dynamic>? tilePropertiesBelow();

/// Método que verifica a lista de propriedades do tile no mapa atualmente
List<Map<String, dynamic>>? tilePropertiesListBelow();

/// Método que verifica os tiles abaixo do componente
Iterable<Tile> tileListBelow();
```

### ElasticCollision

Mixin responsável por dar o comportamento de colisão elástica. (experimental). Você pode configurá-lo usando o método `setupElasticCollision`.

```dart
void setupElasticCollision({
    bool enabled = true,
    double restitution = 2.0,
})
```
