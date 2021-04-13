# Lighting

> Layer responsible for adding lighting to the game.

<img width=400 src="_media/example_lighting.jpg"></img>

By setting the `lightingColorGame` property on BofireWidget you automatically enable this lighting system. and to add light to the objects, just add the `Lighting` mixin to the component and configure its light using `setupLighting()` method:

```dart

class MyCustomDecoration extends GameDecoration with Lighting {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          width: 32,
          height: 32,
          position: position,
        ){
          setupLighting(
            LightingConfig(
              radius: width * 1.5,
              blurBorder: width * 1.5,
              color: Colors.transparent,
            ),
          );
        }

}
```

## GameColorFilter