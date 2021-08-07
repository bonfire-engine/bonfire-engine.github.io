# Game Interface

> <small>This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/1.0.0-rc/lib/base/game_component.dart)</small>

The way you can draw components like a life bar or settings buttons. In other words, anything that you may add to the game interface.

## How to use

First, you need to create an interface component. In order to create interface components, use ```InterfaceComponent```:

```dart
    InterfaceComponent(
      // Sprite to be rendered.
      sprite: Sprite.load('blue_button1.png'), 
      // Sprite to be rendered while its being pressed
      spriteSelected: Sprite.load('blue_button2.png'), 
      height: 40.0,
      width: 40.0,
      id: 5,
      // Position on screen where it will be rendered
      position: Vector2(150, 20), 
      onTapComponent: () {
        print('Test button');
      },
    )
```

Then, add your component to the game interface:

```dart
class MyInterface extends GameInterface {
  @override
  Future<void> onLoad() {
    add(InterfaceComponent(
      sprite: Sprite.load('blue_button1.png'),
      spriteSelected: Sprite.load('blue_button2.png'),
      height: 40,
      width: 40,
      id: 5,
      position: Vector2(150, 20),
      onTapComponent: () {
        print('Test button');
      },
    ));
    super.onLoad();
  }
}
```

Finally, add your Interface to the game by passing it to the ```interface``` property in ```BonfiredTiledWidget```:

```dart
@override
  Widget build(BuildContext context) {
    return BonfireTiledWidget(
     ...
      interface: MyInterface(),
     ...
    );
  }
```

Note: It is recommended to add it to the ```onLoad``` method because there you will have access to the ```size``` property of the game, which is helpful to calculate the position that the component will be rendered on the screen, if needed.

If you want to create a more complex and customizable interface component, check this [example](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/interface/bar_life_component.dart).


## Using Widgets

You can use Flutter widgets to create your game interface through `overlayBuilderMap` in `BonfireTiledWidget`:

```dart
@override
  Widget build(BuildContext context) {
    return BonfireTiledWidget(
      ...
      overlayBuilderMap: {
        'buttons': (BonfireGame game, BuildContext context) {
          return MyWidget();
        }
      }
      initialActiveOverlays: [
        'buttons'
      ],
    );
  }
```

To show or hide overlays programmatically, use the following:

```dart
  /// Show overlay
  gameRef.overlays.add('overlayName');

  /// Hide overlay
  gameRef.overlays.remove('overlayName');
```


