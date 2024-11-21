# Decoração

> <small>Uma decoração é um [AnimatedGameObject](doc/util?id=animatedgameobject)</small>

Qualquer coisa que você queira adicionar ao seu cenário. Alguns exemplos são um barril simples ou um NPC que interage com seu jogador.

Você pode criar objetos decorativos ou interativos usando os seguintes construtores:

Decoração com um Sprite comum:
```dart
GameDecoration.withSprite(
    FutureOr<Sprite> sprite, {
    required Vector2 position, // Posição inicial no mundo
    required Vector2 size,
  })
```

Decoração com `SpriteAnimation`:
```dart
import 'package:flame/animation.dart' as FlameAnimation;

GameDecoration.withAnimation(
    FutureOr<SpriteAnimation> animation, {
    required Vector2 position, // Posição inicial no mundo
    required Vector2 size,
  })
```

Para adicionar comportamentos personalizados à sua decoração, basta estender de `GameDecoration` e criar sua própria classe:
```dart
class MyCustomDecoration extends GameDecoration {
  MyCustomDecoration(Vector2 position)
      : super.withAnimation(
          SpriteAnimation.load(
            "itens/chest_spritesheet.png",
            SpriteAnimationData.sequenced(
              amount: 8,
              stepTime: 0.1,
              textureSize: Vector2(16, 16),
            ),
          ),
          size: Vector2(32,32),
          position: position,
        );

    @override
    void update(double dt) {
        // do anything
        super.update(dt);
    }

    @override
    void render(Canvas canvas) {
        // do anything
        super.render(canvas);
    }
}
```

Veja mais exemplos de Decorações personalizadas: [tocha (torch)](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/torch.dart) e [baú (chest)](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/chest.dart)
