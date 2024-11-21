# Scene builder

> Used to create cutscenes.

To create a scene just call `gameRef.startScene()`:

```dart

final enemy = gameRef.enemies().first;
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

<img src="../../_media/scene_example.gif" width="600"/>

- To stop the current scene:

```dart

gameRef.stopScene();

```

- To access the status and the current `SceneAction`:

```dart

SceneBuilderStatus status = gameRef.sceneBuilderStatus;
status.isRuning;
status.currentAction;

```

## SceneAction

Some basic scene actions already exist:

- **CameraSceneAction**: Used to move the camera to position or to follow a target.
- **DelaySceneAction**: Used to apply delay
- **MoveComponentSceneAction**: Used to move any component that use `Movement` mixin
- **AwaitCallbackSceneAction**: Used to do anything and when completed just call the function `completed` that will pass to the next action.

You can create your own `SceneAction` creating a class and extending `SceneAction`.