# Player

> <small>This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/base/game_component.dart) and uses `mixins` like 
[Movement](mixins?id=movement), 
[Attackable](mixins?id=attackable), 
[Vision](mixins?id=vision), 
[MovementByJoystick](mixins?id=movementbyjoystick) and 
[JoystickListener](joystick?id=joysticklistener)</small>

表示游戏中由用户控制的角色。此类的实例具有可随时使用和配置的动作和移动。

我们可以创建三种类型的玩家：SimplePlayer、RotationPlayer 和 PlatformPlayer：

## SimplePlayer 
> <small>This is a [Player](#Player) and uses [DirectionAnimation](doc/mixins?id=directionanimation)</small>


用于 45º 和 67.5º 视角。我们可以为所有方向（上、下、左、右、上右、上左、下左、下右）配置运动动画。

要使用它，只需创建一个表示您的玩家的类并扩展 SimplePlayer：

```dart

class Knight extends SimplePlayer {

    Knight(Vector2 position)
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
            runDowntRight: Future<SpriteAnimation>(),
          ), //required
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

    @override
    void joystickChangeDirectional(JoystickDirectionalEvent event) {
      // do anything with event of the joystick
      super.joystickChangeDirectional(event);
    }

    @override
    void joystickAction(JoystickActionEvent event) {
      // do anything with event of the joystick
      super.joystickAction(event);
    }

}

```

玩家的所有移动已经自动完成，监听用户与摇杆的交互。

玩家实例可以通过重写以下方法来接收在摇杆上配置的动作：

```dart

  @override
  void joystickAction(JoystickActionEvent event) {
    // do anything with event of the joystick
    super.joystickAction(event);
  }

```


当接收到摇杆动作时，可以触发相应的动作。与 Enemy 类似，这里也有一些预先包含的动作：

```dart

// Executes a physical attack to the player, making the configured damage with the configured frequency. You can add animations to represent this attack.
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
  
  // Executes a ranged attack. Will add a `FlyingAttackObject` proyectile to the game, which will be sent in the configured direction, and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
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
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
      {
        required Function(List<Enemy>) observed,
        VoidCallback? notObserved,
        double radiusVision = 32,
        double? angle, // direction
        double? visionAngle, // default 6.28319 (360 degrees)
      }
    )

```

以及所有 GameComponent 的方法。请看一下： [GameComponent functions](doc/util?id=functions)

### Change animations

要更新 SimplePlayer 动画，您应该使用以下方法：

```dart

  replaceAnimation(SimpleDirectionAnimation());

```

要播放瞬间动画，您应该使用 SimpleDirectionAnimation 的方法。例如：

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

> <small>This is a [Player](#Player) and uses
[UseSpriteAnimation](doc/mixins?id=usespriteanimation),
[UseAssetsLoader](doc/mixins?id=useassetsloader)</small>

用于 90º 视角。我们可以为奔跑和静止状态配置运动动画。

```dart

class PlayerTank extends RotationPlayer {

    PlayerTank(vector2 position)
      : super(
        position: position, //required
        animIdle: Future<SpriteAnimation>(), //required
        animRun: Future<SpriteAnimation>(), //required
        size: Vector.all(32), //required
        life: 100,
        speed: 100,
        currentRadAngle: -1.55,
      );
}

```

当接收到摇杆动作时，可以触发相应的动作。与 Enemy 类似，这里也有一些预先包含的动作：

```dart

// Executes a physical attack to the player, making the configured damage with the configured frequency. You can add animations to represent this attack.
// 对玩家执行物理攻击，造成配置的伤害和频率。您可以添加动画来表示该攻击。
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
  
  // Executes a ranged attack. Will add a `FlyingAttackObject` proyectile to the game, which is sent in the configured direction and will make some damage to whomever it hits, or be destroyed as it hits barriers (collision defined tiles).
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
    
    // Will observe enemies when within the radius (radiusVision)
    void seeEnemy(
       {
          required Function(List<Enemy>) observed,
          VoidCallback? notObserved,
          double radiusVision = 32,
       }
    )

```

### Change animations

要更新 RotationPlayer，只需更新变量 animIdle 和 animRun。

## PlatformPlayer

> <small>This is a [SimplePlayer](#SimplePlayer) and uses
[BlockMovementCollision](doc/collision_system?id=collision-system),
Jump,
JumpAnimation</small>

用于平台游戏。在这里，我们可以为奔跑、静止和跳跃配置运动动画。

```dart

class MarioPlayer extends PlatformPlayer {

    MarioPlayer(Vector2 position)
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

要使玩家跳跃，您可以使用以下方法： [Jumper mixin](#TODO)  :

```dart
  jump({double? jumpSpeed, bool force = false});

```


### Change animations

要更新 PlatformPlayer 动画，您应该使用以下方法：

```dart

  replacePlatformAnimation(PlatformAnimations());

```

要播放瞬间动画，您应该使用 SimpleDirectionAnimation 的方法。例如：

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

> 注意：请记得在此组件中添加重力以纠正行为。请查看以下内容：查看 [HandleForces](doc/forces?id=forces)

## Custom

如果这些类型的玩家都不满足您的需求，您可以通过扩展 Player 类来创建自己的玩家类型。
