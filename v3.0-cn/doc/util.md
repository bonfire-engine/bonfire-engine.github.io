# Util

在游戏开发过程中，有一些函数和组件可以帮助您。

## Functions

在 BonfireUtil 中，有许多有用的函数：

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

GameComponents 扩展：

```dart
/// Used to generate numbers to create your animations or anythings
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

  /// Used to add particles in your component.
  void addParticle(
    Particle particle, {
    Vector2? position,
    Vector2? size,
    Vector2? scale,
    double? angle,
    Anchor? anchor,
    int? priority,
  })

  /// Add in the game a text with animation representing damage received
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

  /// Get the direction that another component is in relation to you
  Direction getComponentDirectionFromMe(GameComponent comp)

  // Get angle between this comp to target
  double getAngleFromTarget(GameComponent target) {

```

Others:

```dart
// Help you to calculate zoom by max tiles can be visible
double getZoomFromMaxVisibleTile(
  BuildContext context,
  double tileSize,
  int maxTile,
)

// Could be helpful to render some sprite rotating using angle.
void renderSpriteByRadAngle(
  Canvas canvas,
  double radAngle,
  Rect rect,
  Sprite sprite, {
  Paint? overridePaint,
})

// Useful for generating animations.
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


## Components


### ComponentSpawner

有时我们需要在地图上动态生成一些东西，例如敌人或物品。为此，您可以使用 ComponentSpawner：

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

“渲染 Sprite 的对象。”


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

“渲染 SpriteAnimation 的对象。”

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

“与之前的类似，这个对象可以在销毁之前播放一次动画，也可以循环播放。最重要的功能是，这个组件可以跟随地图上的其他元素，比如玩家、敌人或装饰物。”

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

“具有动画的相同 FollowerObject。”

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

“一个以特定速度朝某个方向移动的组件，可以配置为只攻击敌人或玩家并造成伤害，或者在与有碰撞的组件（如砖块或装饰物）接触时被销毁。

该组件的移动方向由 angle 或 direction 控制。”

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

你可以显示一个小部件来跟随游戏中的组件。这对于创建对话框、库存、交互等非常有用。

要显示小部件，只需调用 FollowerWidget.show。请参见以下内容：

```dart
   FollowerWidget.show(
      identify: 'PLAYER_INVENTORY', // identify used to remove
      context: context,
      target: player, // You can add here any GameComponent
      child: MyWidget(), // Add here your widget
      align: Offset.zero, // Align from targe
   );
```

隐藏FollowerWidget:

```dart
   FollowerWidget.remove('PLAYER_INVENTORY');
```


