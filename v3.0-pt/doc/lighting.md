# Iluminação

> <small>Iluminação é um [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/base/game_component.dart)</small>

Camada responsável por adicionar iluminação ao jogo.

<img width=400 src="../../_media/example_lighting.jpg"></img>

Ao definir a propriedade `lightingColorGame` no `BonfireWidget`, você habilita automaticamente este sistema de iluminação.

Para adicionar luz aos objetos, basta adicionar o mixin `Lighting` ao componente e configurá-lo usando o método `setupLighting()`:

```dart
class MyCustomDecoration extends GameDecoration with Lighting {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        ) {
          setupLighting(
            LightingConfig(
              radius: width * 1.5,
              color: Colors.transparent,
              // blurBorder: 20, // Este é o valor padrão
              // type: LightingType.circle, // Este é o valor padrão
              // useComponentAngle: false, // Este é o valor padrão. Quando verdadeiro, a luz gira junto quando um componente altera seu parâmetro `angle`.
            ),
          );
        }
}
```

Você pode acessar a iluminação do jogo e alterá-la assim:

```dart
  gameRef.lighting.animateToColor(Colors.blue.withOpacity(0.7));
```

## GameColorFilter

Você pode aplicar filtros de cor no seu jogo programaticamente.

### BlendMode e Color

```dart
  gameRef.colorFilter.animateTo(Colors.blue, BlendMode.colorBurn);
```
