# Lighting

> <small>This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/base/game_component.dart)</small>

Layer responsible for adding lighting to the game.

<img width=400 src="_media/example_lighting.jpg"></img>

By setting the `lightingColorGame` property on BofireWidget you automatically enable this lighting system. and to add light to the objects, just add the `Lighting` mixin to the component and configure it using `setupLighting()` method:

```dart
class MyCustomDecoration extends GameDecoration with Lighting {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        ){
          setupLighting(
            LightingConfig(
              radius: width * 1.5,
              color: Colors.transparent,
              // blurBorder: 20, // this is a default value
              // type: LightingType.circle, // this is a default value
              // useComponentAngle: false, // this is a default value. When true light rotate together component when change `angle` param.
            ),
          );
        }

}
```

## GameColorFilter

You can apply color filter in your game programmatically.

### BlendMode and Color

```dart
  gameRef.colorFilter.animateTo(Colors.blue, BlendMode.colorBurn);
```

