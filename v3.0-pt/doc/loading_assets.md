# Loading Sprites and SpriteAnimations

> Loading your images to create your sprite or animations

To load any images you need to follow a pattern of folders defined by [flame](https://docs.flame-engine.org/main/flame/rendering/images.html) (base `assets/images/`).

```yaml

flutter:
  assets:
    - assets/images/potion.png
    - assets/images/player/runLeft.png
```

## Sprites

To load yours Sprites:

```dart

Image image = await Flame.images.load('potion.png');
final potion = Sprite(image,
                  srcPosition: Vector2(0, 0),
                  srcSize: Vector2(0,0)
               );

// or

Sprite potion = await Sprite.load('potion.png',
                  srcPosition: Vector2(0, 0),
                  srcSize: Vector2(0,0)
               );

// or 

Image image = await Flame.images.load('potion.png');
final potion = image.getSprite(
                  position: Vector2(0, 0),
                  size: Vector2(0,0)
               );

```

## SpritesAnimation

They are sequences of Sprites that form an animation. You can create this in this way:

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

// or

SpriteAnimation runLeft = await SpriteAnimation.load(
      'player/runLeft.png',
      SpriteAnimationData.sequenced(
         amount: 5,
         textureSize: Vector2.all(16),
         stepTime: 0.1,
         texturePosition: Vector2.zero(),
      ),
);

// or

Image imagePlayerRunLeft = await Flame.images.load('player/runLeft.png');

SpriteAnimation runLeft = imagePlayerRunLeft.getAnimation(
      position: Vector2(),
      size: Vector2(),
      amount: 5,
      stepTime: 0.1,
      loop: true,
    );

```


## Merging images

You can merging images to build a dynamic Sprite or SpriteAnimation.
This is very useful for taking a character's base and whether or not to add a specific outfit to it.

To do it use the Flame [ImageComposition](https://docs.flame-engine.org/1.0.0/images.html#imagecomposition)


## FireAtlas

You can use [FireAtlas](https://github.com/flame-engine/fire-atlas).

Fire Atlas is a tool to create Texture Atlases for games.