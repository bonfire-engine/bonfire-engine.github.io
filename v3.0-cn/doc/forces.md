# Forces

Bonfire 拥有一个简单的力系统，你可以在游戏中添加线性力、加速度或阻力。

| AccelerationForce2D | LinearForce2D    | ResistanceForce2D    |
| :---:   | :---: | :---: |
| ![](../../_media/force_acceleration.gif) | ![](../../_media/force_linear.gif)   | ![](../../_media/force_resistance.gif)   |


## 使用力系统

要添加全局力，只需将它们添加到 `BonfireWidget` 的 `globalForces` 参数中：


```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      // ...
      globalForces: [] // Here you can add forces like accelerations(AccelerationForce2D), resistences
    );
  }
```

所有使用 HandleForces 混入的组件都会受到该力的影响。例如：
```dart
class MyCustomDecoration extends GameDecoration with HandleForces {


}
```

你可以在某个特定组件中添加一个力。只需添加 HandleForces 混入，并调用 addForce 函数：

```dart
class MyCustomDecoration extends GameDecoration with HandleForces {

  MyCustomDecoration(){
    addForce((AccelerationForce2D('gravity',Vector2(0,50))))
    // removeForce('gravity') to remove.
  }
}
```

## Available forces 

- `AccelerationForce2D` -> 将加速度应用到速度上。
- `ResistanceForce2D` -> 对速度应用阻力，使其逐渐减为零。
- `LinearForce2D` -> 将线性力应用到速度上。

你可以创建一个类并继承自 `Force2D`，从而创建你自己的 `force`。
> > 你也可以编辑组件的质量。只需使用 `mass = 2;` 即可。