# Useful

> 

## ValueGeneratorComponent

Useful for generating animations.

```dart
   gameRef.getValueGenerator(
      Duration(seconds: 1),
      begin: 0.0,
      end: 1.0,
      onChange: (value) {

      },
      onFinish: () {

      },
      curve: Curves.decelerate,
   ).start();
```

## FollowerWidget

You can show a widget to follow a component in the game. This is useful to create dialogs, inventory, interactions, etc.

To show is easy, just call `FollowerWidget.show`. See bellow:

```dart
   FollowerWidget.show(
      identify: 'PLAYER_INVENTORY', // identify used to remove
      context: context,
      target: player, // You can add here any GameComponent
      child: MyWidget(), // Add here your widget
      align: Offset.zero, // Align from targe
   );
```

To hide:

```dart
   FollowerWidget.remove('PLAYER_INVENTORY');
```
