# Game Interface

> The way you cand raw things like life bars, stamina and settings. In another words, anything that you may add to the interface to the game.

To create your interface you must create a class and extend it from ```GameInterface``` like this [example](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/interface/knight_interface.dart).

To add elements to your interface we use ```InterfaceComponent```:

```dart
    InterfaceComponent(
      sprite: Sprite.load('blue_button1.png'), // Sprite que será desenhada.
      spriteSelected: Sprite.load('blue_button2.png'), // Sprite que será desenhada ao pressionar.
      height: 40.0,
      width: 40.0,
      id: 5,
      position: Vector2(150, 20), // Posição na tela que deseja desenhar.
      onTapComponent: () {
        print('Test button');
      },
    )
```

Adding them to the interface:

```dart
class MyInterface extends GameInterface {
  @override
  void resize(Size size) {
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
    super.resize(size);
  }
}
```

OBS: It is recommended to add it to the ```onLoad```, there you will have access to ```size``` of the game to be able to calculate the position of its component on the screen if necessary.

If you want to create a more complex and customizable interface component, just create your own extender class ```InterfaceComponent``` like this [example](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/interface/bar_life_component.dart).
