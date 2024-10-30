# 摇杆

> <small>This is a [PlayerController](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/input/player_controller.dart)</small>

控制玩家的组件。

## 摇杆

<img src="../../_media/screeShot_joystick.jpg" width="600"/>

有一个预先包含的实现（Joystick），可以直接使用，但也可以进行配置，以添加自定义外观或根据需要添加多个操作。

或者，您可以自己实现 PlayerController，通过 joystickChangeDirectional 和 joystickAction 发出事件。

摇杆可以通过以下参数进行配置：
```dart
  return BonfireWidget(
    playerControllers:[
      Joystick(
        directional: JoystickDirectional(
          spriteBackgroundDirectional: Sprite.load('joystick_background.png'), //// 方向控制背景
          spriteKnobDirectional: Sprite.load('joystick_knob.png'), //方向指示器圆形背景
          color: Colors.black, // 如果不传递 'pathSpriteBackgroundDirectional' 或 'pathSpriteKnobDirectional'，可以定义方向的颜色。
          size: 100, //  方向控制大小
          alignment = Alignment.bottomLeft,
        ),
        actions: [
          JoystickAction(
            actionId: 1, //（必需）动作标识符，按下时将发送到 'void joystickAction(JoystickActionEvent event) {}'
            sprite: Sprite.load('joystick_attack_range.png'), // 动作图像
            spritePressed: Sprite.load('joystick_attack_range.png'), // 可选图像，当动作触发时显示
            spriteBackgroundDirection: Sprite.load('joystick_background.png'), //方向控制背景
            enableDirection: true, // 在动作中启用方向
            alignment = Alignment.bottomRight,
            color: Colors.blue,
            size: 50,
            margin: EdgeInsets.only(bottom: 50, right: 160),
          )
        ],
        // observer: MyOtherPlayer() , 如果配置了 [observer]，摇杆将控制此观察者，而不是传递给 'player' 参数的组件。
      ),
    ]
    ...
  );
```

Check an [example](https://github.com/RafaelBarbosatec/bonfire/tree/master/example/lib/pages/player_controllers).

## 摇杆监听器（JoystickListener）

用于监听摇杆交互的混入（Mixin）。

使用此混入的组件可以通过添加观察者来监听摇杆事件：

```dart

gameRef.addJoystickObserver(myComponentJoystickListener);

```