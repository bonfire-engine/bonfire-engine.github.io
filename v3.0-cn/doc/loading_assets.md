# 加载精灵和精灵动画

> 加载您的图像以创建精灵或动画。

要加载任何图像，您需要遵循由以下内容定义的文件夹模式： [flame](https://docs.flame-engine.org/main/flame/rendering/images.html) 

> 重要提示：您图像、地图、精灵表和其他资产的根文件夹是 assets/images/。

```yaml

flutter:
  assets:
    - assets/images/potion.png
    - assets/images/player/runLeft.png
```

## Sprites

要加载您的精灵：

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

它们是形成动画的精灵序列。您可以通过以下方式创建它们：

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


## 合并图像

您可以合并图像来构建动态精灵或精灵动画。这对于将角色的基础形象与特定服装结合起来非常有用。

To do it use the Flame [ImageComposition](https://docs.flame-engine.org/latest/flame/rendering/images.html#imagecomposition)


## FireAtlas

You can use [FireAtlas](https://github.com/flame-engine/fire-atlas).

火焰图集（Fire Atlas）是一个用于为游戏创建纹理图集的工具。