# Mixins

> With mixin you can add different behaviors to your component


Below you will see the tree of the main mixins currently available::

<img src="_media/mixin_diagram.png"></img>


## Movement

Mixin responsible for adding movements.

Your component will gain properties like:

```dart
    bool isIdle = true;
    double speed = 100;
    Direction lastDirection = Direction.right;
    Direction lastDirectionHorizontal = Direction.right;
```

And methods to movement your component. (These movements take collisions into account. If returns `true` the movement was did with success)

```dart
    bool moveUp(double speed, {VoidCallback? onCollision})
    bool moveDown(double speed, {VoidCallback? onCollision})
    bool moveLeft(double speed, {VoidCallback? onCollision})
    bool moveRight(double speed, {VoidCallback? onCollision})
    bool moveUpRight(double speedX, double speedY, {VoidCallback? onCollision})
    bool moveUpLeft(double speedX, double speedY, {VoidCallback? onCollision})
    bool moveDownLeft(double speedX, double speedY, {VoidCallback? onCollision})
    bool moveDownRight(double speedX, double speedY,{VoidCallback? onCollision})
    bool moveFromAngle(double speed, double angle, {VoidCallback? onCollision})
    bool moveFromAngleDodgeObstacles(double speed, double angle, {VoidCallback? onCollision,})
```

## DirectionAnimation

> To use this mixin your component must contain `Movement` mixin.

Mixin responsible for adding animations to movements.

You need set a SimpleDirectionAnimation:

```dart
class MyComponent extends GameComponent with Movement, DirectionAnimation{
    MyComponent(){
        animation = SimpleDirectionAnimation();
    }
}
```

You can replace the `SimpleDirectionAnimation` using:

```dart

Future<void> replaceAnimation(
    SimpleDirectionAnimation newAnimation, {
    bool doIdle = true,
})

```

In the `SimpleDirectionAnimation` there are some methods util to control the animation:

```dart

/// Method used to play animation once time
animation.playOnce(
    FutureOr<SpriteAnimation> animation, {
    VoidCallback? onFinish,
    VoidCallback? onStart,
    bool runToTheEnd = false,
    bool flipX = false,
    bool flipY = false,
    Vector2? size,
    Vector2? offset,
  });

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

## MoveToPositionAlongThePath

> To use this mixin your component must contain `Movement` mixin.

Mixin responsible for find path using `a_star_algorithm` and moving the component through the path.

See [PathFinding](path_finding)

## AutomaticRandomMovement

> To use this mixin your component must contain `Movement` mixin.

Mixin responsible for adding random movement like enemy walking through the scene.

To use just need add `runRandomMovement` method in your update:

```dart

class MyComponent extends GameComponent with Movement, AutomaticRandomMovement{
    
    @override
    void update(double dt) {
        this.runRandomMovement(
            dt,
            speed: 20,
            maxDistance: 100,
        );
        super.update(dt);
    }
}

```

## MovementByJoystick

> To use this mixin your component must contain `Movement` and `JoystickListener` mixin.

Mixin responsible for adding movements through joystick events.

```dart
class MyComponent extends GameComponent with Movement, JoystickListener, MovementByJoystick{
    
}

```

That way if you add this component as a Joystick observer it will move when interacting with the joystick:

```dart

    MyComponent myComp = MyComponent();
    gameRef.joystickController?.addObserver(myComp);
    gameRef.camera.moveToTargetAnimated(myComp);

```

You can disable this behavior setting `movementByJoystickEnabled` false.

## Attackable

Mixin responsible for adding damage-taking behavior to the component.

Your component will gain properties like:

```dart
    double maxLife;
    bool isDead;
    double life;
```

Adds these methods in your component:

```dart
    void initialLife(double life)
    void addLife(double life)
    void updateLife(double life)
    void removeLife(double life)

    /// This method is used to check if this component can receive damage from any attacker.
    bool checkCanReceiveDamage(
        AttackFromEnum attacker,
        double damage,
        dynamic from,
    )
    
    /// You can listen if this component receive attack
    @override
    void receiveDamage(double damage, dynamic from)

    /// If your life stay minor than 0 this method is called
    @override
    void die()
```

## Vision

Mixin responsible for adding vision to component. Components like `Player`, `Npc` and `Decoration` use this mixin.
Your component gain `seeComponent` and `seeComponentType` method.

Your can draw the component vision do this:

```dart
    setupVision(
        {
            Color? color,
            bool drawVision = false,
            int countPolygonPoints = 20,
        }
    );
```

When you use any method like `seeComponent` or `seeComponentType` will draw the vision.

## Sensor

Mixin responsible for adding trigger to detect other objects above.

See [Sensor](sensor)

## Lighting

Mixin used to configure lighting in your component.

See [Lighting](lighting)

## ObjectCollision

Mixin responsible for adding collision.

See [ObjectCollision](collision_system)

## Pushable
> To use this mixin your component must contain `Movement` mixin.

Mixin responsible for enable push in the component.

You can do override the method `bool onPush(GameComponent component)` to control when can pushable. Returning true if the component is pushable, false otherwise. (default return true).

## AutomaticRandomMovement

> To use this mixin your component must contain `Movement` mixin.

Adds the basic implementation  of randomic movement. You component gain `runRandomMovement` method. You can use this un your `update` method to do movement in randomic way. It's useful to enemy, npc, decorations.

## Follower

This mixin do your component follow the position of the yout target.
Your component gain the properties: `followerTarget` and `followerOffset`.
You can configure your target like this:

```dart

setupFollower(target: myPLayer, offset: Vector2());

```

If a component that have this mixin is added as a child of other component. He will follow the parent position.


## UseAssetsLoader

Mixin used to load assets:

```dart
class MyComponent extends GameComponent with UseAssetsLoader{
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

Mixin that adds to your Component the use of the SpriteAnimation in easier way.
Your Component gains the `animation` property and `playSpriteAnimationOnce` method

```dart

class MyComponent extends GameComponent with UseSpriteAnimation{
    MyComponent(Vector2 position){
        this.position = position;
    }

    void playJump(){
        playSpriteAnimationOnce(MySpriteSheetLoader.getJumpAnimation());
    }

    @override
    Future onLoad() async {
        animation = await MySpriteSheetLoader.geAnimation();
        return super.onLoad();
    }
}

```

## UseSprite

Mixin that adds to your Component the use of the Sprite in easier way.
Your Component gains the `sprite`.

```dart

class MyComponent extends GameComponent with UseSprite{
    MyComponent(Vector2 position){
        this.position = position;
    }

    @override
    Future onLoad() async {
        sprite = await MySpriteSheetLoader.geSrite();
        return super.onLoad();
    }
}

```

### UseBarLife

Mixin use to adds BarLife in a Attackable component.
You configure the BarLife called `setupBarLife`:

```dart

void setupBarLife({
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