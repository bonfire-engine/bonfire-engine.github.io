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