# Forces

Bonfire has a simple forces system that you can add to your games: linear, acceleration or resistance forces.

| AccelerationForce2D | LinearForce2D    | ResistanceForce2D    |
| :---:   | :---: | :---: |
| ![](../../_media/force_acceleration.gif) | ![](../../_media/force_linear.gif)   | ![](../../_media/force_resistance.gif)   |


## Using The Force

To add global forces just add them at the `globalForces` param of BonfireWidget:


```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      // ...
      globalForces: [] // Here you can add forces like accelerations(AccelerationForce2D), resistances
    );
  }
```

All components that use the `HandleForces` mixin will be affected by this force. Like this:

```dart
class MyCustomDecoration extends GameDecoration with HandleForces {


}
```

You can add a force to a specific component. Just add a `HandleForces` mixin and call `addForce` function:


```dart
class MyCustomDecoration extends GameDecoration with HandleForces {

  MyCustomDecoration() {
    addForce((AccelerationForce2D('gravity', Vector2(0,50))));
    // removeForce('gravity'); to remove.
  }
}
```

## Available forces 

- `AccelerationForce2D` -> Apply acceleration to velocity
- `ResistanceForce2D` -> Apply resistance to velocity trying to zero
- `LinearForce2D` -> Apply linear force to velocity

You can create your own `force` creating a class and extending from `Force2D`.

> You can also edit the mass of components. Just do `mass = 2`
