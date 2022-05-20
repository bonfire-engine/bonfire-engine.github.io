# Scene builder

> Used to create cutscenes.

To create a scene just call `gameRef.startScene`:

```dart

final enemy = gameRef.visibleEnemies().first;
gameRef.startScene(
  [
    CameraSceneAction.position(Vector2(800, 800)),
    CameraSceneAction.target(gameRef.player!),
    CameraSceneAction.target(enemy, zoom: 2),
    DelaySceneAction(Duration(seconds: 1)),
    MoveComponentSceneAction(
      component: enemy,
      newPosition: enemy.position.clone()..add(Vector2(-40, -10)),
      speed: 20,
    ),
    CameraSceneAction.target(gameRef.player!, zoom: 1),
  ],
);

```

Result:

<img src="_media/scene_example.gif" width="600"/>

- To stop current scene:

```dart

gameRef.stopScene();

```

- To access status and current `SeceneAction`:

```dart

SceneBuilderStatus status = gameRef.sceneBuilderStatus;
status.isRuning;
status.currentAction;

```