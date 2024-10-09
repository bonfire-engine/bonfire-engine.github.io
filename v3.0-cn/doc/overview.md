# 概述

Bonfire 基本上是一个小部件（Widget），您可以根据想要构建的游戏类型传递参数并进行配置。

## BonfireWidget

```dart
  @override
  Widget build(BuildContext context) {
    return BonfireWidget(
      map: WorldMapByTiled('tile/map.json'), // required
      joystick: Joystick(), 
      player: Knight(), // If player is omitted, the joystick directional will control the map view, being very useful in the process of building maps
      interface: KnightInterface(),
      background: GameComponent(), // You can create your own background (to use parallax for example) extending from `GameComponent`
      backgroundColor: Colors.black,
      debugMode: false, // If true, draw the components grid
      showCollisionArea: false, // If true, draw collision area of the elements
      collisionAreaColor: Colors.blue, // If you want to customize the collision area color.
      lightingColorGame: Colors.black.withOpacity(0.4), // If you want to add general lighting for the game
      colorFilter: GameColorFilter(), // You can add a color filter in your game to give it a special touch.
      components: [], // Here you can add any GameComponent that you need.
      overlayBuilderMap: { // Here you can add Flutter Widgets to build you game interface.
        'barLife':(game)=> MyBarLifeWidget(),
      },
      initialActiveOverlays:['barLife'], // Here you define which interfaces, passed in `overlayBuilderMap`, will be shown when starting the game.
      cameraConfig: CameraConfig(), // Here you can configure the game camera. You can set zoom, speed, etc.
      globalForces: [] // Here you can add forces like accelerations(AccelerationForce2D), resistences(ResistenceForce2D) or linear(LinearForce2D) that will be effect all GameComponents that are using the `HandleForces` mixin
      onReady: (game){} // Call that notify when game is ready.
      focusNode: FocusNode(),
      autofocus:true,
      mouseCursor: MouseCursor.uncontrolled, // Set the mouse cursor.
      progress: ProgressWidget() // Progress that show while loading map.
    );
  }
```

### Dynamically adding game elements

如果需要在游戏中动态添加组件，可以在任何组件内使用：

```dart
  gameRef.add(MyComponent())
```

或者，您可以通过以下方式将组件作为子组件添加到其他组件中：

```dart
  add(MyComponent())
```

---

### Components layer

Bonfire 由多个组件组成，这些组件根据以下层级图进行渲染：

<img src="_media/layers.png" width="600"/>

每个层级将根据组件中定义的优先级进行渲染。优先级越低，渲染的顺序越靠前。

## Background

> render_priority = 10

您可以添加一个表示背景的组件。这对于创建视差效果和交互式背景非常有用。

## Map

> render_priority = 20

表示游戏发生的地图（或世界）。

点击查看更多信息 [here](doc/map?id=map).

## Decoration

> render_priority = Dynamic ( 30 + Axis Y)

您可以添加到场景中的任何物体。例如，路上的一个桶，甚至是一个可以与玩家互动的 NPC。

点击查看更多信息 [here](doc/decoration?id=decoration).

## Enemy

> render_priority = Dynamic ( 30 + Axis Y)

表示游戏中的敌对角色。此类的实例具有可随时使用和配置的动作和移动。同时，您可以根据自己的需求自定义所有动作和移动方式。

点击查看更多信息 [here](doc/enemy?id=enemy).

## Player

> render_priority = Dynamic (30 + Axis Y)

表示游戏中由用户控制的角色。此类的实例具有可随时使用和配置的动作和移动。

点击查看更多信息 [here](doc/player?id=player).

## Objects

> render_priority = Dynamic (30 +  Axis Y)

在此层中，包括游戏中添加的所有 GameComponent，例如自定义的 GameComponent 或已可用的实用对象，如 AnimatedGameObject。

点击查看更多信息 [here](doc/util?id=gameobject).

## Lighting

> render_priority = (highestPriority + 10)

负责为游戏添加照明的层。

点击查看更多信息 [here](doc/lighting?id=lighting).

## Game interface

> render_priority = (highestPriority + 30)

用于绘制生命值条、耐力和设置等内容的层。换句话说，您可以在游戏界面中添加的任何内容。

建议使用 Flutter 小部件来构建它，您可以在 BonfireWidget 中使用 overlayBuilderMap 和 initialActiveOverlays 进行配置。

## Joystick

> render_priority = highestPriority + 40

控制玩家的组件。

点击查看更多信息  [here](doc/joystick?id=joystick).