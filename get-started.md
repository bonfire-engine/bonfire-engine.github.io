# Get Started

> An awesome project.

## Installing

1. Depend on it

Add this to your package's pubspec.yaml file:

```yaml
dependencies:
  bonfire: ^LATEST_VERSION
```

2. Remove `flutter_test` and add `test: any` in your pubspec.yaml file.

```yaml
dev_dependencies:
  test: any
```

3. Install it

You can install packages from the command line:

```
$ flutter pub get
```

4. Import it

Now in your Dart code, you can use:

```dart
import 'package:bonfire/bonfire.dart';
```

## Using

To use Bonfire, use the following widget to map builded with [Tiled](https://www.mapeditor.org/):

(RECOMMENDED)

```dart
@override
  Widget build(BuildContext context) {
    return BonfireTiledWidget(
      gameController: GameController(), // with the controller you can listen to all components of the game, control them and or add new ones.
      joystick: MyJoystick(), // required
      map: TiledWorldMap('tile/map.json', forceTileSize: tileSize), // required
      player: Knight(), // If player is omitted, the joystick directional will control the map view, being very useful in the process of building maps
      components: <GameComponent>[],
      interface: KnightInterface(),
      background: GameComponent(), // to color you can use `BackgroundColorGame(Colors.blue)` or create your own background (to use parallax for example) extending from `GameComponent`
      constructionMode: false, // If true, activates hot reload to ease the map constructions and draws the grid
      showCollisionArea: false, // If true, show collision area of the elements
      constructionModeColor: Colors.blue, // If you wan customize the grid color.
      collisionAreaColor: Colors.blue, // If you wan customize the collision area color.
      lightingColorGame: Colors.black.withOpacity(0.4), // if you want to add general lighting for the game
      cameraConfig: CameraConfig(
        sizeMovementWindow: Size(50,50),
        moveOnlyMapArea: false,
        zoom: 1.0, // here you can set the default zoom for the camera. You can still zoom directly on the camera
        target: GameComponent(),
      ),
      showFPS: false,
      progress: Widget(), //progress that show while loading map.
      colorFilter: GameColorFilter(),
      overlayBuilderMap: {
        'buttons':  (BonfireGame game, BuildContext context) {
          return MyWidget();
        }
      }
      initialActiveOverlays: [
        'buttons'
      ],
    );
  }
```

or to manual map: 

```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      gameController: GameController(), // with the controller you can listen to all components of the game, control them and or add new ones.
      joystick: MyJoystick(), // required
      map: MapWorld(<Tile>[]), // required
      player: Knight(), // If player is omitted, the joystick directional will control the map view, being very useful in the process of building maps
      interface: KnightInterface(),
      decorations: <GameDecoration>[],
      enemies: <Enemy>[],
      background: GameComponent(), // to color you can use `BackgroundColorGame(Colors.blue)` or create your own background (to use parallax for example) extending from `GameComponent`
      constructionMode: false, // If true, activates hot reload to ease the map constructions and draws the grid
      showCollisionArea: false, // If true, show collision area of the elements
      constructionModeColor: Colors.blue, // If you wan customize the grid color.
      collisionAreaColor: Colors.blue, // If you wan customize the collision area color.
      lightingColorGame: Colors.black.withOpacity(0.4), // if you want to add general lighting for the game
      cameraConfig: CameraConfig(
        sizeMovementWindow: Size(50,50),
        moveOnlyMapArea: false,
        zoom: 1.0, // here you can set the default zoom for the camera. You can still zoom directly on the camera
        target: GameComponent(),
      ),
      showFPS: false,
      colorFilter: GameColorFilter(),
    );
  }
```

Complete example you can see [here](https://github.com/RafaelBarbosatec/bonfire/tree/1.0.0-rc/example).