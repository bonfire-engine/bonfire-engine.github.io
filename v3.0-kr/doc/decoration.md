# 꾸미기

> <small>이것은 [AnimatedGameObject](objects#AnimatedGameObject)입니다.</small>

풍경에 추가하고 싶은 모든 것. 예를 들어 간단한 통이나 플레이어와 상호 작용하는 NPC가 있습니다.

다음 빌더를 사용하여 장식적이거나 대화형 개체를 만들 수 있습니다.

일반적인 스프라이트로 꾸미기:
```dart
GameDecoration.withSprite(
    FutureOr<Sprite> sprite, {
    required Vector2 position, // 세계의 초기 위치 초기화
    required Vector2 size,
  })
```

스프라이트 애니메이션으로 꾸미기:
```dart
import 'package:flame/animation.dart' as FlameAnimation;

GameDecoration.withAnimation(
    FutureOr<SpriteAnimation> animation, {
    required Vector2 position, // 세계의 초기 위치 초기화
    required Vector2 size,
  })
```

꾸미기에 사용자 정의 동작을 추가하려면 `GameDecoration`에서 확장하고 자신만의 클래스를 만드세요.
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
        // 필요한 로직을 작성하세요.
        super.update(dt);
    }

    @override
    void render(Canvas canvas) {
        // 필요한 로직을 작성하세요.
        super.render(canvas);
    }
}
```

커스텀 꾸미기의 더 많은 예시 보기: [torch](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/torch.dart) & [chest](https://github.com/RafaelBarbosatec/bonfire/blob/master/example/lib/shared/decoration/chest.dart)
