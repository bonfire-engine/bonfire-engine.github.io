# Carregando Sprites e SpriteAnimations

> Carregando suas imagens para criar seu sprite ou animações

Para carregar qualquer imagem você precisa seguir um padrão de pastas definido pelo [flame](https://docs.flame-engine.org/main/flame/rendering/images.html) 

> IMPORTANTE: A pasta raiz das suas imagens, mapas, spritesheets e outros ativos é `assets/images/`.

```yaml
flutter:
  assets:
    - assets/images/potion.png
    - assets/images/player/runLeft.png
```

## Sprites

Para carregar seus Sprites:

```dart
Image image = await Flame.images.load('potion.png');
final potion = Sprite(image,
                  srcPosition: Vector2(0, 0),
                  srcSize: Vector2(0,0)
               );

// ou

Sprite potion = await Sprite.load('potion.png',
                  srcPosition: Vector2(0, 0),
                  srcSize: Vector2(0,0)
               );

// ou 

Image image = await Flame.images.load('potion.png');
final potion = image.getSprite(
                  position: Vector2(0, 0),
                  size: Vector2(0,0)
               );
```

## SpritesAnimation

São sequências de Sprites que formam uma animação. Você pode criar isso desta forma:

```dart
Image imagePlayerRunLeft = await Flame.images.load('player/runLeft.png');
SpriteAnimation runLeft = SpriteAnimation.fromFrameData(
    imagePlayerRunLeft,
    SpriteAnimationData.sequenced(
      amount: 5,
      textureSize: Vector2(16.0, 16.0),
      stepTime: 0.1,
      texturePosition: Vector2.zero(),
    ),
);

// ou

SpriteAnimation runLeft = await SpriteAnimation.load(
      'player/runLeft.png',
      SpriteAnimationData.sequenced(
         amount: 5,
         textureSize: Vector2.all(16),
         stepTime: 0.1,
         texturePosition: Vector2.zero(),
      ),
);

// ou

Image imagePlayerRunLeft = await Flame.images.load('player/runLeft.png');

SpriteAnimation runLeft = imagePlayerRunLeft.getAnimation(
      position: Vector2(),
      size: Vector2(),
      amount: 5,
      stepTime: 0.1,
      loop: true,
    );
```


## Mesclando imagens

Você pode mesclar imagens para construir um Sprite dinâmico ou uma Animação de Sprites dinâmicos.
Isso é muito útil para pegar a base de um personagem e adicionar alguma roupa específica.

Para fazer isso use o [ImageComposition](https://docs.flame-engine.org/latest/flame/rendering/images.html#imagecomposition) do Flame.

## FireAtlas

Você também pode usar o [FireAtlas](https://github.com/flame-engine/fire-atlas).

Fire Atlas é uma ferramenta para criar Atlas de Texturas para jogos.
