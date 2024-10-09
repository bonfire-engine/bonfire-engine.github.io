# 混入

> 通过混入（mixin），您可以为您的组件添加不同的行为。


下面您将看到当前可用的主要混入（mixins）树：

<img src="_media/mixin_diagram.png"></img>


## 移动

负责添加移动的混入（mixin）。

您的组件将获得以下属性：

```dart
    double speed = 100;
    Direction lastDirection = Direction.right;
    Direction lastDirectionHorizontal = Direction.right;
    Direction lastDirectionVertical = Direction.down;
```

以及用于移动组件的方法。（这些移动会考虑碰撞。如果返回 true，则表示移动成功。）

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

您可以监听移动状态的变化：

```dart
@override
void onMove(
    double speed,
    Vector2 displacement,
    Direction direction,
    double angle,
  ) {}

```

## 方向动画（DirectionAnimation）

> To use this mixin your component must contain `Movement` mixin.

要使用此混入，您的组件必须包含 Movement 混入。

你需要设置一个SimpleDirectionAnimation:

```dart
class MyComponent extends GameComponent with Movement, DirectionAnimation{
    MyComponent(){
        animation = SimpleDirectionAnimation();
    }
}
```

您可以使用以下方法替换 SimpleDirectionAnimation：

```dart

Future<void> replaceAnimation(
    SimpleDirectionAnimation newAnimation, {
    bool doIdle = true,
})

```

在 SimpleDirectionAnimation 中，有一些实用的方法用于控制动画：

```dart

/// Method used to play animation one time using `other` map
animation.playOnceOther()

/// Method used to play animation one time
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

/// Method used to play specific animation registred in `others`
animation.playOther(String key, {bool flipX = false, bool flipY = false});

/// Method used to register new animation in others
animation.addOtherAnimation(
    String key,
    FutureOr<SpriteAnimation> animation,
);

animation.pause();

animation.resume();

```

## 沿路径移动到指定位置（MoveToPositionAlongThePath）

> 要使用此混入，您的组件必须包含 Movement 混入。

负责使用 a_star_algorithm 寻找路径并通过该路径移动组件的混入（mixin）。

See [PathFinding](doc/path_finding)

## 使用生命值条（UseLifeBar）

用于为可攻击组件添加生命值条的混入（mixin）。

使用此混入，您可以通过 setupBarLife 方法配置生命值条的视图：

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


## 随机移动（RandomMovement）

> 要使用此混入，您的组件必须包含 Movement 混入。

负责添加随机移动的混入（mixin），例如敌人在场景中行走。

只需在您的更新中添加 runRandomMovement 方法即可使用：

```dart

class MyComponent extends GameComponent with Movement, RandomMovement{
    
    @override
    void update(double dt) {
        this.runRandomMovement(dt);
        super.update(dt);
    }
}

```

所有参数：

```dart

void runRandomMovement(
    double dt, {
    double? speed,
    int maxDistance = 50,
    int minDistance = 25,

    /// milliseconds
    int timeKeepStopped = 2000,
    bool updateAngle = false,
    bool checkPositionWithRaycast = false,
    RandomMovementDirections directions = RandomMovementDirections.all,
    Function(Vector2 target)? onStartMove,
    Function()? onArrivedTarget,
  })

```

## 通过摇杆移动（MovementByJoystick）

> 要使用此混入，您的组件必须包含 Movement 和 JoystickListener 混入。

负责通过摇杆事件添加移动的混入（mixin）。

```dart
class MyComponent extends GameComponent with Movement, JoystickListener, MovementByJoystick{
    
}

```

这样，如果您将该组件作为摇杆观察者添加，它将在与摇杆交互时移动：

```dart

    MyComponent myComp = MyComponent();
    gameRef.joystickController?.addObserver(myComp);
    gameRef.camera.moveToTargetAnimated(myComp);

```

您可以通过将 movementByJoystickEnabled 设置为 false 来禁用此行为。

## 可攻击（Attackable）

> 如何使用它：Player、Ally、Enemy

负责为组件添加受伤行为的混入（mixin）。

您的组件将获得以下属性：

```dart
    double maxLife;
    bool isDead;
    double life;
```

在您的组件中添加以下方法：

```dart
    void initialLife(double life)
    void addLife(double life)
    void updateLife(double life,{bool verifyDieOrRevive = true})
    void removeLife(double life)
    
    // Called when the component receives damage
     void onReceiveDamage(
        AttackOriginEnum attacker,
        double damage,
        dynamic identify,
    )

    // Called when life is removed
    void onRemoveLife(double life) {}

    // Called when life is restored
    void onRestoreLife(double life) {}

    /// If your life stay minor than 0 this method is called
    @override
    void onDie()

    /// If you dead and revive
    @override
    void onRevive()
```

## 视野（Vision）

负责为组件添加视野的混入（mixin）。像 Player、Npc 和 Decoration 这样的组件使用此混入。

您的组件将获得 seeComponent 和 seeComponentType 方法。

您可以通过以下方式绘制组件的视野：

```dart
    setupVision(
        {
            Color? color,
            bool drawVision = false,
            int countPolygonPoints = 20,
        }
    );
```

当您使用 seeComponent 或 seeComponentType 等方法时，引擎将确定视野。

## 传感器（Sensor）

负责添加触发器以检测上方其他对象的混入（mixin）。

See [Sensor](doc/sensor)

## Lighting

用于在组件中配置照明的混入（mixin）。

See [Lighting](doc/lighting)

## BlockMovementCollision

负责在发生碰撞时停止移动的混入（mixin）。

See [ObjectCollision](doc/collision_system)

## Pushable
> 要使用此混入，您的组件必须包含 Movement 混入。

负责在组件中启用推送的混入（mixin）。

您可以重写方法 bool onPush(GameComponent component) 来控制何时可以推送。如果组件可推送，返回 true；否则返回 false。（默认返回 true）。

## Follower

该混入使您的组件跟随目标的位置。您的组件将获得属性：followerTarget 和 followerOffset。您可以通过以下方式配置您的目标：

```dart

setupFollower(target: myPlayer, offset: Vector2());

```

如果带有此混入的组件作为其他组件的子组件添加，它将跟随父组件的位置。

## UseAssetsLoader

用于加载资源的混入（mixin）：

```dart
class MyComponent extends GameComponent with UseAssetsLoader {
    SpriteAnimation animation;
    MyComponent(Vector2 position,Future<SpriteAnimation> animIdle){
        this.position = position;
        loader?.add(AssetToLoad(animIdle, (value) {
            animation = value;
        }));
    }
}
```

## UseSpriteAnimation

将 SpriteAnimation 更加简单地添加到您的组件的混入（mixin）。您的组件将获得 animation 属性和 playSpriteAnimationOnce 方法。

```dart

class MyComponent extends GameComponent with UseSpriteAnimation {
    MyComponent(Vector2 position){
        this.position = position;
    }

    void playJump(){
        playSpriteAnimationOnce(MySpriteSheetLoader.getJumpAnimation());
    }

    @override
    Future onLoad() async {
        setAnimation(await MySpriteSheetLoader.geAnimation());
        return super.onLoad();
    }
}

```

您可以知道当前的动画索引或是否是最后一帧：

```dart
  bool get isAnimationLastFrame
  int get animationCurrentIndex
  int get isPaused
```

## UseSprite

将精灵更简单地添加到您的组件的混入（mixin）。您的组件将获得 sprite 属性。

```dart

class MyComponent extends GameComponent with UseSprite {
    MyComponent(Vector2 position){
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

用于在可攻击组件中添加生命值条的混入（mixin）。使用此混入，您可以通过 setupLifeBar 方法配置生命值条的视图：

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
  })

```

### TileRecognizer

用于识别下面瓷砖类型的混入（mixin）。

在用于构建地图的 Tiled 程序中，您可以设置一个 class 或自定义属性。通过这个混入，您可以访问组件上方的 Tile 信息。

```dart

/// Method that checks what type map tile is currently
 String? tileTypeBelow();
 /// Method that checks what types map tile is currently
 List<String> tileTypeListBelow()
 /// Method that checks what properties map tile is currently
 Map<String, dynamic>? tilePropertiesBelow()
 /// Method that checks what properties list map tile is currently
 List<Map<String, dynamic>>? tilePropertiesListBelow()
 /// Method that checks what map tiles is below
 Iterable<Tile> tileListBelow()

```

### ElasticCollision

负责提供弹性碰撞行为的混入（mixin）（实验性）。您可以通过 setupElasticCollision 方法进行配置。

```dart

void setupElasticCollision({
    bool enabled = true,
    double restitution = 2.0,
  })

```