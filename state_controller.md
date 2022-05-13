# StateController

> State manager util to separate `view` and `logic` with dependency injection.

- Create your StateController:

```dart

class KnightController extends StateController<Knight> {

@override
  void onReady(Knight component) {
    // TODO: implement onReady
    super.onReady(component);
  }

  @override
  void onRemove(Knight component) {
    // TODO: implement onRemove
    super.onRemove(component);
  }
  
  @override
  void update(double dt, Knight component) {
   // if (component.checkInterval('seeEnemy', 250, dt) == true) {
    //   component.seeEnemy(
    //     radiusVision: component!.width * 4,
    //     notObserved: _handleNotObserveEnemy,
    //     observed: (enemies) => _handleObserveEnemy(enemies.first),
    //   );
    // }
  }
}
```

- Put the dependencies and controllers:

```dart

BonfireInjector().put((i) => KnightController());
 // or
 // BonfireInjector().putFactory(
  //   (i) => KnightController(),
  // );

```

- Adds mixin in your component:

```dart

class Knight extends SimplePlayer
    with Lighting, ObjectCollision, UseStateController<KnightController> {
}

```

- To listen controller with Widget. (Useful in Overlays)

```dart

     StateControllerConsumer<BarLifeController>(
        builder: (BuildContext context, BarLifeController controller) {
          return MyWidget(controller);
        },
      );

```

- To access any dependency or controller registered:

```dart
final barLifeController = BonfireInjector().get<BarLifeController>()
```


Game example [here](https://github.com/RafaelBarbosatec/mountain_fight)