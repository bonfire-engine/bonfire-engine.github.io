# 장면 만들기

> 컷씬을 만드는데 사용됩니다.

장면을 만들려면 `gameRef.startScene()`을 호출하세요.

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

결과:

<img src="../../_media/scene_example.gif" width="600"/>

- 현재 장면을 중지하려면:

```dart

gameRef.stopScene();

```

- 상태 및 현재 `SceneAction`에 액세스하려면:

```dart

SceneBuilderStatus status = gameRef.sceneBuilderStatus;
status.isRuning;
status.currentAction;

```

## 동적인 장면 연출

이미 생성된 기본 작업이 있습니다.

- CameraSceneAction // 카메라를 위치로 이동하거나 대상을 따라가는 데 사용됩니다.
- DelaySceneAction // 지연을 적용하는 데 사용됩니다.
- MoveComponentSceneAction // 'Movement' 믹스인을 사용하는 구성요소를 이동하는 데 사용됩니다.
- AwaitCallbackSceneAction // 무엇이든 하는 데 사용되며 완료되면 다음 작업으로 전달될 `completed` 함수를 호출하기만 하면 됩니다.

클래스를 생성하고 `SceneAction`을 확장하여 자신만의 `SceneAction`을 만들 수 있습니다.
