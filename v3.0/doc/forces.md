# Forces

Bonfire have a simple forces system. You can add in your games linear, acceleration or resistance forces.


## Using

To add global forces just adds them at the `globalForces` param of Bonfire Widget:


```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      //...
      globalForces: [] // Here you can adds forces like accelerations(AccelerationForce2D), resistences
    );
  }
```

Done, all components that use `HandleForces` mixin will be affected by this force. Like this:

```dart
class MyCustomDecoration extends GameDecoration with  HandleForces{


}
```

You can adds a force in a especificy component. Just adds `HandleForces` mixin and call `addForce` function:


```dart
class MyCustomDecoration extends GameDecoration with  HandleForces{

  MyCustomDecoration(){
    addForce((AccelerationForce2D('gravity',Vector2(0,50))))
    // removeForce('gravity') to remove.
  }
}
```

## Available forces 

- `AccelerationForce2D` -> Apply acceleration to velocity
- `ResistanceForce2D` -> Apply resistance to velocity trying to zero
- `LinearForce2D` -> Apply linear force to velocity

You can create your own `force` creating a class and extending from `Force2D`.

> You can edit the mass of component also. Just do `mass = 2`;