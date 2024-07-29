# Overview

Bonfire is basically a Widget where you are passing the parameters and configuring it, according to what kind of game you want to build.


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

If it is necessary to add components dynamically in the game. Inside any component you can use:

```dart
  gameRef.add(MyComponent())
```

or you can add components inside other components like a child just using this:

```dart
  add(MyComponent())
```

---

### Components layer

Bonfire is composed of several components that are rendered according to this layer diagram:

<img src="_media/layers.png" width="600"/>

Each layer will be rendered according to the priority defined in the component. The lower the priority, the earlier it will be rendered.

## Background

> render_priority = 10

Your can add a component that represents a background. It's useful to create parallax and interactive backgrounds.

## Map

> render_priority = 20

Represents a map (or world) where the game occurs.

For more details click [here](doc/map?id=map).

## Decoration

> render_priority = Dynamic ( 30 + Axis Y)

Anything that you may add to the scenery. For example a Barrel in the way or even an NPC, which can interact with your player.

For more details click [here](doc/decoration?id=decoration).

## Enemy

> render_priority = Dynamic ( 30 + Axis Y)

Represents enemy characters in the game. Instances of this class have actions and movements ready to be used and configured whenever you want. At the same time, you can customize all actions and movements in the way that fits your needs.

For more details click [here](doc/enemy?id=enemy).

## Player

> render_priority = Dynamic (30 + Axis Y)

Represents the character controlled by the user in the game. Instances of this class have actions and movements ready to be used and configured.

For more details click [here](doc/player?id=player).

## Objects

> render_priority = Dynamic (30 +  Axis Y)

In this layer includes all 'GameComponent' added in the game like a custom `GameComponent` or util objects already available to use like `AnimatedGameObject`.

For more details click [here](doc/util?id=gameobject).

## Lighting

> render_priority = (highestPriority + 10)

Layer responsible for adding lighting to the game.

For more details click [here](doc/lighting?id=lighting).

## Game interface

> render_priority = (highestPriority + 30)

The way you can draw things like life bars, stamina and settings. In another words, anything that you may add to the interface to the game.

Is recomended use Flutter widgets to build it, you configure it using `overlayBuilderMap` and `initialActiveOverlays` in your `BonfireWidget`

## Joystick

> render_priority = highestPriority + 40

The player-controlling component.

For more details click [here](doc/joystick?id=joystick).