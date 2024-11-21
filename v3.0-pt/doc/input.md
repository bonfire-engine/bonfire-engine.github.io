# Interação

## Gestos

> Na Bonfire usamos mixins para permitir essas interações.

O Bonfire usa um Widget [Listener](https://api.flutter.dev/flutter/widgets/Listener-class.html) para receber gestos.

### TapGesture

Para habilitar o TapGesture, basta adicionar o mixin `TapGesture` no seu componente assim:

```dart
class MyCustomDecoration extends GameDecoration with TapGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );

  // É chamado quando o usuário toca no componente
  // Se retornar 'true', este evento não será retransmitido para outros componentes. (padrão = false)
  @override
  bool onTapDown(GestureEvent event) {
    return super.onTapDown(event);
  }

  // É chamado quando o usuário para de tocar no componente
  @override
  void onTapUp(GestureEvent event) {}

  // É chamado quando o usuário cancela o toque no componente
  @override
  void onTapCancel() {}

  // É chamado quando o usuário toca no componente
  @override
  void onTap() {}

  // É chamado quando o usuário toca na tela
  void onTapDownScreen(GestureEvent event) {}
  // É chamado quando o usuário para de tocar na tela
  void onTapUpScreen(GestureEvent event) {}
}
```

### DragGesture

Para habilitar o gesto de arrastar, basta adicionar o mixin `DragGesture` no seu componente, assim:

```dart
class MyCustomDecoration extends GameDecoration with DragGesture {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );
}
```

Seu componente pode ser arrastado automaticamente no mapa com o gesto de arrastar.

Se você quiser ouvir as interações com o objeto, você pode substituir estes métodos:

```dart
// Chamado quando o gesto de arrastar é iniciado no componente
// Se retornar 'true', este evento não será retransmitido para outros componentes. (padrão = false)
bool startDrag(GestureEvent event) {
  return super.startDrag(event);
}
// Chamado quando o componente é movido
void moveDrag(GestureEvent event) {}
// Chamado quando o componente termina de ser arrastado
void endDrag(GestureEvent event) {}
// Chamado quando o arrasto é cancelado
void cancelDrag(GestureEvent event) {}
```

### PinchGesture

Para ouvir o gesto de pinça na tela, basta adicionar o mixin `PinchGesture` no seu componente, assim:

```dart
class MyCustomDecoration extends GameComponent with PinchGesture {

  void onPinchUpdate(PinchEvent event) {}
  void onPinchStart(PinchEvent event) {}
  void onPinchEnd() {}
  
}
```

### MoveCameraUsingGesture

Mixin usado para mover a câmera com gestos (toque ou mouse).

```dart
class MyPlayer extends SimplePlayer with MoveCameraUsingGesture {

}
```

Configurações:

```dart
void setupMoveCameraUsingGesture({
    bool onlyMouse = false,
    MouseButton mouseButton = MouseButton.left,
  })
```

### Customização

Todos os componentes estendem `PointerDetectorHandler`, portanto, para receber eventos de gestos, substitua `hasGesture` retornando `true`:

```dart
  @override
  bool hasGesture() => true;
```

Dessa forma você pode ouvir eventos de gestos na tela fazendo a substituição desses métodos:

```dart
  void handlerPointerDown(PointerDownEvent event) {}
  void handlerPointerMove(PointerMoveEvent event) {}
  void handlerPointerUp(PointerUpEvent event) {}
  void handlerPointerCancel(PointerCancelEvent event) {}
  void handlerPointerHover(PointerHoverEvent event) {}
  void handlerPointerSignal(PointerSignalEvent event) {}
```

## Mouse

Para habilitar gestos do mouse, basta adicionar o mixin `MouseListener` no seu componente, assim:

```dart
class MyCustomDecoration extends GameDecoration with MouseEventListener {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        );
}
```

Se você quiser ouvir as interações com o objeto, você pode substituir estes métodos:

```dart
  /// Ouvir o cursor do mouse na tela
  void onMouseHoverScreen(int pointer, Vector2 position) {}

  /// Ouvir o movimento do mouse com algum botão clicado na tela
  void onMouseMoveScreen(int pointer, Vector2 position, MouseButton button) {}

  /// Ouvir quando o cursor do mouse paira neste componente
  void onMouseHoverEnter(int pointer, Vector2 position);

  /// Ouvir quando o cursor do mouse passar fora deste componente
  void onMouseHoverExit(int pointer, Vector2 position);

  /// Ouvir quando a roda de rolagem do mouse é usada na tela
  void onMouseScrollScreen(int pointer, Vector2 position, Vector2 scrollDelta) {}

  /// Ouvir quando a roda de rolagem do mouse é usada em seu componente
  void onMouseScroll(int pointer, Vector2 position, Vector2 scrollDelta);

  /// Ouvir quando o mouse for clicado (down) no seu componente
  void onMouseTapDown(int pointer, Vector2 position, MouseButton button) {}

  /// Ouvir quando o mouse for clicado (up) em seu componente
  void onMouseTapUp(int pointer, Vector2 position, MouseButton button) {}

  /// Ouvir quando o mouse for clicado no seu componente
  void onMouseTap(MouseButton button);

  void onMouseCancel() {}
```

## Teclado

Se você precisar que o jogador se mova pelo teclado, você pode passar o `Keyboard` no parâmetro `playerControllers`.

```dart
      BonfireWidget(
        playerControllers: [
          // Aqui você habilita receber interação do teclado
          Keyboard(
            config: KeyboardConfig(
              enable: true, // Use para habilitar ou desabilitar eventos de teclado (o padrão é verdadeiro)
              acceptedKeys: [ // Você pode passar Chaves específicas aceitas. Se nulo aceitar todas as chaves
                LogicalKeyboardKey.space,
              ],
              directionalKeys: [
                KeyboardDirectionalType.arrows()
              ], // Tipo de direcional (setas ou wasd)
            ),
          )
        ]
        // ...
      )
```

Para ouvir eventos de teclado no seu componente, basta usar o mixin `KeyboardEventListener`.

```dart
class Computer extends GameDecoration with KeyboardEventListener{
  // ...
  @override
  bool onKeyboard(
    RawKeyEvent event,
    Set<LogicalKeyboardKey> keysPressed,
  ) {
    return super.onKeyboard(event,keysPressed);
  }
}
```
