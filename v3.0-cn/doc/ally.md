# Ally

> <small>This is a [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart) and uses
[Attackable](doc/mixins?id=attackable) mixin.</small>


这是一个玩家的盟友 NPC。它能够受到敌人的伤害，并且能够对敌人造成伤害。

敌人分为三种类型：`SimpleAlly`、`RotationAlly` 和 `PlatformAlly`。

## SimpleAlly

> <small>This is a [Ally](#ally) and uses the
[DirectionAnimation](doc/mixins?id=directionanimation) mixin.</small>

用于 45º 和 67.5º 视角。我们可以为所有方向配置移动动画（上、下、左、右、右上、左上、左下、右下）。

要使用它，只需创建一个类来表示你的敌人，并继承自 SimpleAlly：

```dart

class Human extends SimpleAlly {

    Human(Vector2 position)
      : super(
          position: position, //required
          size: Vector2(32.0,32.0), //required
          life: 100,
          speed: 100,
          initDirection: Direction.right,
          animation: SimpleDirectionAnimation(
            idleLeft: Future<SpriteAnimation>(), 
            idleRight: Future<SpriteAnimation>(), //required
            runLeft: Future<SpriteAnimation>(), 
            runRight: Future<SpriteAnimation>(), //required
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

现在你已经创建了一个表示盟友的类，可以开始配置它们的行为了。

在 update 方法中，有几个实用的扩展函数可以帮助你更方便地实现盟友的行为逻辑：


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
对敌人执行一次物理攻击，按照配置的伤害值和频率造成伤害。你可以添加动画来展示此攻击效果。

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
执行一次远程攻击。它会在游戏中添加一个 FlyingAttackObject 类型的投射物，并按照配置的方向发射，对击中的目标造成伤害，或者在碰到障碍物（带有碰撞的瓷砖）时被销毁。

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
当敌人在视野半径 (radiusVision) 内时，盟友会移动到合适位置进行远程攻击。一旦到达攻击位置，将触发 positioned 回调。

以及所有 GameComponent 的方法。请查看[GameComponent functions](doc/util?id=functions)


### 更换动画

要更新 SimpleAlly 的动画，你应该使用以下方法：
```dart

  replaceAnimation(SimpleDirectionAnimation());

```

要播放当前动作的动画，你应该使用 SimpleDirectionAnimation 的方法。例如：​⬤
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
  );
  animation.pause();
  animation.resume();

```


## RotationAlly

> <small>This is a [Ally](#ally) and use 
[UseSpriteAnimation](doc/mixins?id=usespriteanimation),
[UseAssetsLoader](doc/mixins?id=useassetsloader).</small>


用于 90º 视角。我们可以为“跑动”和“静止”状态配置运动动画。
```dart

class Tank extends RotationAlly {

    Tank(Vector2 position)
      : super(
          position: position, //required
          animIdle: Future<SpriteAnimation>(), //required
          animRun: Future<SpriteAnimation>(), //required
          size: Vector2(32.0,32.0), //required
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

现在我们已经有了表示盟友的类，可以开始配置它们的行为了。

在 update 方法中，有几个非常有用的扩展可以帮助我们配置这些移动行为：


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
GameComponent的所有方法，请查看[GameComponent functions](doc/util?id=functions)

## 自定义

如果这些类型的敌人都无法满足你的需求，你可以通过继承 Ally 类来创建自己的敌人类型。