# Lighting

> Layer responsible for adding lighting to the game.

<img width=400 src="_media/example_lighting.jpg"></img>

By setting the `lightingColorGame` property on BofireWidget you automatically enable this lighting system. and to add light to the objects, just add the `Lighting` mixin to the component and configure its light by overwriting the `lightingConfig` variable:

```dart
 lightingConfig = LightingConfig(
       gameComponent: this,
       color: Colors.yellow.withOpacity(0.1),
       radius: 40,
       blurBorder: 20,
       withPulse: true,
       pulseVariation: 0.1,
       pulseCurve: Curves.decelerate,
       pulseSpeed: 1,
     );
```