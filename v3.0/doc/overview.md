# Overview

Bonfire is basically a Widget where you passing the parameters and configuring according you want that you game be.


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
      debugMode: false, // If true draw the components grid
      showCollisionArea: false, // If true draw collision area of the elements
      collisionAreaColor: Colors.blue, // If you wan customize the collision area color.
      lightingColorGame: Colors.black.withOpacity(0.4), // if you want to add general lighting for the game
      colorFilter: GameColorFilter(), // You can adds color filter in your game to give the special touch.
      components: [], // Here you can adds any GameComponent that you need.
      overlayBuilderMap: { // Here you can adds widgets to build you game interface.
        'barLife':(game)=> MyBarLifeWidget(),
      },
      initialActiveOverlays:['barLife'], // Here you define what interfaces passed in `overlayBuilderMap` could be show when start the game.
      cameraConfig: CameraConfig(), // Here you can configure the game camera. Can set zoom, speed, etc.
      globalForces: [] // Here you can adds forces like accelerations(AccelerationForce2D), resistences(ResistenceForce2D) or linear(LinearForce2D) that will be afeect the all GameComponents that using the `HandleForces` mixin
      onReady: (game){} // Call that notify when game is ready.
      focusNode: FocusNode(),
      autofocus:true,
      mouseCursor:
      progress: ProgressWidget()//progress that show while loading map.
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

Bonfire is composed of several components that are rendered according to the layer diagram below.

<img src="_media/layers.png" width="600"/>

We will understand each layer of this studying from the bottom up starting with the map.

## Background

> render_priority = 10

Your can add a component that represents a background. It's useful to create parallax and interactive backgrounds

## Map

> render_priority = 20

Represents a map (or world) where the game occurs.

For more details click [here](doc/map?id=map).

## Decoration

> render_priority = Dynamic ( 30 + Axis Y)

Anything that you may add to the scenery. For example a Barrel in the way or even a NPC in which you can use to interact with your player.

For more details click [here](doc/decoration?id=decoration).

## Enemy

> render_priority = Dynamic ( 30 + Axis Y)

Represents enemies characters in the game. Instances of this class has actions and movements ready to be used and configured whenever you want. At the same time, you can customize all actions and movements in the way that fits your needs.

For more details click [here](doc/enemy?id=enemy).

## Player

> render_priority = Dynamic (30 + Axis Y)

Represents the character controlled by the user in the game. Instances of this class has actions and movements ready to be used and configured.

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