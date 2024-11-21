# Construtor de Cenários

> Usado para criar cenas narrativas/intermediárias.

Para criar uma cena basta chamar `gameRef.startScene()`:

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

Resultado:

<img src="../../_media/scene_example.gif" width="600"/>

- Para parar a cena atual:

```dart
gameRef.stopScene();
```

- Para acessar o status e `SceneAction` atual:

```dart
SceneBuilderStatus status = gameRef.sceneBuilderStatus;
status.isRuning;
status.currentAction;
```

## SceneAction

Algumas ações básicas de cena já existem:

- **CameraSceneAction**: Usado para mover a câmera para uma posição ou seguir um alvo.
- **DelaySceneAction**: Usado para aplicar atraso
- **MoveComponentSceneAction**: Usado para mover qualquer componente que use o mixin `Movement`
- **AwaitCallbackSceneAction**: Usado para fazer qualquer coisa e quando concluído basta chamar a função `completed` que passará para a próxima ação.

Você pode criar sua própria `SceneAction` criando uma classe e estendendo `SceneAction`.
