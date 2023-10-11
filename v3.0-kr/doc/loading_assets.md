# 스프라이트 및 스프라이트 애니메이션 로드

> 이미지를 로드하여 스프라이트나 애니메이션 만들기

이미지를 로드하려면 [flame](https://docs.flame-engine.org/main/flame/rendering/images.html)(기본 `assets/images/`)에 정의된 폴더 패턴을 따라야 합니다.

```yaml

flutter:
  assets:
    - assets/images/potion.png
    - assets/images/player/runLeft.png
```

## Sprites

스프라이트를 로드하려면:

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

이는 애니메이션을 형성하는 일련의 Sprite입니다. 다음과 같은 방법으로 만들 수 있습니다.

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


## 이미지 병합

이미지를 병합하여 동적 Sprite 또는 SpriteAnimation을 구축할 수 있습니다.
이는 캐릭터의 베이스를 가져오고 특정 의상을 추가할지 여부에 매우 유용합니다.

이를 수행하려면 Flame [ImageComposition](https://docs.flame-engine.org/1.0.0/images.html#imagecomposition)을 사용하십시오.


## Fire Atlas

[FireAtlas](https://github.com/flame-engine/fire-atlas)를 사용할 수 있습니다.

Fire Atlas는 게임용 Texture Atlas를 생성하는 도구입니다.
