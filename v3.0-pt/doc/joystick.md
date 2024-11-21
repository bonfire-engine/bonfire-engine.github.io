# Controle

> <small>O Controle é um [PlayerController](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/input/player_controller.dart)</small>

O componente de controle do jogador.

## Controle

<img src="../../_media/screeShot_joystick.jpg" width="600"/>

Há uma implementação pré-incluída (`Joystick`) pronta para uso, mas também configurável para adicionar uma aparência personalizada ou até mesmo adicionar quantas ações você precisar.

Ou você pode implementar um `PlayerController` e emitir um evento por meio de um `joystickChangeDirectional`, `joystickAction`.

O joystick é configurável pelos seguintes parâmetros:
```dart
  return BonfireWidget(
    playerControllers:[
      Joystick(
        directional: JoystickDirectional(
          spriteBackgroundDirectional: Sprite.load('joystick_background.png'), // fundo do controle direcional
          spriteKnobDirectional: Sprite.load('joystick_knob.png'), // fundo do círculo do indicador de direção
          color: Colors.black, // Se você não passar um 'pathSpriteBackgroundDirectional' ou um 'pathSpriteKnobDirectional' você pode definir uma cor para o direcional
          size: 100, // tamanho do controle direcional
          alignment = Alignment.bottomLeft,
        ),
        actions: [
          JoystickAction(
            actionId: 1, // (required) Identificador da ação, será enviado para 'void joystickAction(JoystickActionEvent event) {}' quando pressionado
            sprite: Sprite.load('joystick_attack_range.png'), // A imagem da ação
            spritePressed: Sprite.load('joystick_attack_range.png'), // Imagem opcional a ser mostrada quando a ação for executada
            spriteBackgroundDirection: Sprite.load('joystick_background.png'), // fundo do controle direcional
            enableDirection: true, // habilitar direcional na ação
            alignment = Alignment.bottomRight,
            color: Colors.blue,
            size: 50,
            margin: EdgeInsets.only(bottom: 50, right: 160),
          )
        ],
        // observer: MyOtherPlayer() , Se você configurar `oberver`, o joystick controlará este observador e não o componente passado no parâmetro `player`.
      ),
    ]
    ...
  );
```

Veja um [exemplo](https://github.com/RafaelBarbosatec/bonfire/tree/master/example/lib/pages/player_controllers).

## JoystickListener

Mixin costumava ouvir as interações do joystick.

Um componente que usa esse mixin pode escutar os eventos do Joystick adicionando como observador:

```dart
gameRef.addJoystickObserver(myComponentJoystickListener);
```
