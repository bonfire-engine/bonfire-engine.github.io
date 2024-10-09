# 敌人

> <small>This is a [Npc](https://github.com/RafaelBarbosatec/bonfire/blob/v3.0.0/lib/npc/npc.dart) and uses the
[Attackable](doc/mixins?id=attackable) mixin.</small>


在游戏中创建一个敌人。该类的实例具有预定义的行为，可以根据需要进行使用和配置。所有的动作和移动方式都可以自定义。

敌人分为三种类型：`SimpleEnemy`、`RotationEnemy` 和 `PlatformEnemy`：

## SimpleEnemy

> <small>This is a [Enemy](#enemy) and uses the
[DirectionAnimation](doc/mixins?id=directionanimation) mixin.</small>

<img width=100 src="_media/simple_enemy.png"></img>

用于 45º 和 67.5º 视角。我们可以为所有方向（上、下、左、右、右上、左上、左下、右下）配置移动动画。

要使用它，只需创建一个表示敌人的类，并继承 `SimpleEnemy`：

```dart

class Goblin extends SimpleEnemy {

    Goblin(Vector2 position)
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

现在你已经创建了一个表示敌人的类，可以开始配置它们的行为了。

在 update 方法中，有几个非常有用的扩展函数可以帮助你完成这个任务：


```dart 
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // default 6,28319 (360 graus)
    double? angle,
  })
```
一旦玩家进入敌人的视野半径 (radiusVision) 内，就会触发一个回调函数。

```dart 
  void seeAndMoveToPlayer({
    required Function(Player) closePlayer,
    VoidCallback? notObserved,
    VoidCallback? observed,
    VoidCallback? notCanMove,
    double radiusVision = 32,
    double margin = 10,
    double? visionAngle, // default 6,28319 (360 graus)
    double? angle,
    bool runOnlyVisibleInScreen = true, 
  })
```
当玩家进入敌人的视野半径 (radiusVision) 内时，敌人会向玩家的方向移动。当靠近玩家时，将触发 closePlayer 回调。

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
对玩家执行一次物理攻击，按照配置的伤害值和频率造成伤害。你可以添加动画来展示此攻击效果。

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
执行一次远程攻击。它会在游戏中添加一个 `FlyingAttackObject` 类型的投射物，并按照配置的方向发射，对命中的目标造成伤害，或者在撞到障碍物（带有碰撞的瓷砖）时被销毁。

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
当玩家进入视野半径 (`radiusVision`) 内时，敌人会移动到合适的位置以执行远程攻击。一旦到达攻击位置，将触发 `positioned` 回调。

以及所有 GameComponent 的方法。请查看 [GameComponent functions](doc/util?id=functions)


### Change animations

要更新 `SimpleEnemy` 的动画，你应该使用以下方法：

```dart

  replaceAnimation(SimpleDirectionAnimation());

```

要播放当前动作的动画，你应该使用 SimpleDirectionAnimation 的方法。例如：

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

> 重要提示：敌人只有在相机视野内时才会移动。如果你想禁用这个限制，可以在碰撞配置中的 collisionOnlyVisibleScreen 设置为 false。详见 [Colission System](doc/collision_system?id=collision-system).

完整的 SimpleEnemy 示例： [here](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/enemy/goblin.dart).


## RotationEnemy旋转敌人

> <small>This is a [Enemy](https://github.com/RafaelBarbosatec/bonfire/blob/v2.4.0/lib/npc/enemy/enemy.dart) and uses the
[UseSpriteAnimation](doc/mixins?id=usespriteanimation),
[UseAssetsLoader](doc/mixins?id=useassetsloader) `mixins`.</small>

<img width=100 src="_media/rotation_enemy.png"></img>

用于 90º 视角。我们可以为“跑动”和“静止”状态配置运动动画。

```dart

class Tank extends RotationEnemy {

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

现在我们已经有了表示敌人的类，可以开始配置它们的行为了。

在 update 方法中，有几个非常有用的扩展函数可以帮助我们配置这些移动行为：

```dart 
  void seePlayer({
    required Function(Player) observed,
    VoidCallback? notObserved,
    double radiusVision = 32,
    double? visionAngle, // default 6,28319 (360 graus)
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

所有 GameComponent 的方法。请查看 [GameComponent functions](doc/util?id=functions)


## 平台敌人

> <small>This is a [SimpleEnemy](#SimpleEnemy) and uses the
[BlockMovementCollision](doc/collision_system?id=collision-system),
Jump
and JumpAnimation `mixins`</small>

用于平台类游戏。我们可以为“跑动”、“静止”和“跳跃”状态配置运动动画。

```dart

class BowserEnemy extends PlatformEnemy {

    BowserEnemy(vector2 position)
      : super(
        position: position, //required
        animation: PlatformAnimations(), //required
        size: Vector.all(32), //required
        life: 100,
        speed: 100,
        countJumps: 1,
      );
}

```

### Jumping

要让玩家跳跃，你可以使用以下方法： [Jumper mixin](#TODO)  :

```dart
  jump({double? jumpSpeed, bool force = false});

```


### 更换动画

要更新 `PlatformEnemy` 的动画，你应该使用以下方法：

```dart

  replacePlatformAnimation(PlatformAnimations());

```

要播放当前动作的动画，你应该使用 `SimpleDirectionAnimation` 的方法。例如：

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

> 重要提示：请记得在该组件中添加重力作用力，以修正其行为。查看以下内容了解更多。[HandleForces](doc/forces?id=forces)


## 自定义

如果这些类型的敌人都无法满足你的需求，你可以通过继承 `Enemy` 类来创建自定义敌人类型。
