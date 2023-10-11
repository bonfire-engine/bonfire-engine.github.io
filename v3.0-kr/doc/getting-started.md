# 시작하기

> 멋진 Bonfire 프로젝트를 시작해봅시다.

## 설치하기

1. 의존성 패키지 추가

패키지의 pubspec.yaml 파일에 다음을 추가하세요.

```yaml
dependencies:
  bonfire: ^3.x.x
```

2. 설치

명령줄에서도 패키지를 설치할 수 있습니다.

```
$ flutter pub get
```

3. 추가

이제 Dart 코드에서 다음을 사용할 수 있습니다.

```dart
import 'package:bonfire/bonfire.dart';
```

## 사용법

### 맵 만들기
[Tiled](https://www.mapeditor.org/)를 사용하여 지도를 만들어야 합니다. 그런 다음 지도를 json 파일로 내보낼 수 있습니다. [Bonfire에서 Tiled를 사용하는 방법에 대한 자세한 내용을 볼 수 있습니다](tiled_support)
<br>
[json 파일로 맵 내보내기에 대한 튜토리얼 비디오 보기](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

이제 지도를 보기 위해 실행할 수 있습니다:


```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      joystick: Joystick(
        directional: JoystickDirectional(),
      ), // required
      map: WorldMapByTiled('tile/map.json'),
    );
  }
```

이렇게 하면 지도가 렌더링되는 것을 볼 수 있고 방향 조이스틱을 사용하여 탐색할 수 있습니다.


### 플레이어 만들기

플레이어를 생성하려면 SpriteAnimations가 필요합니다. [Flame 문서](https://docs.flame-engine.org/main/flame/rendering/images.html)에서 Sprite를 로드하는 방법을 확인할 수 있습니다.

이 예제에 사용된 이미지는 다음과 같습니다.


[![Idle](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_idle.png)](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_idle.png)

[![Run](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_run.png)](https://raw.githubusercontent.com/RafaelBarbosatec/bonfire/master/example/assets/images/player/knight_run.png)


```dart
class PlayerSpriteSheet {
 
  static Future<SpriteAnimation> get idleRight => SpriteAnimation.load(
        "player/knight_idle.png",
        SpriteAnimationData.sequenced(
          amount: 6,
          stepTime: 0.1,
          textureSize: Vector2(16, 16),
        ),
      );

  static Future<SpriteAnimation> get runRight => SpriteAnimation.load(
        "player/knight_run.png",
        SpriteAnimationData.sequenced(
          amount: 6,
          stepTime: 0.1,
          textureSize: Vector2(16, 16),
        ),
      );

  static SimpleDirectionAnimation get simpleDirectionAnimation =>
      SimpleDirectionAnimation(
        idleRight: idleRight,
        runRight: runRight,
      );
}
```


플레이어를 생성하려면 클래스를 생성하고 `SimplePlayer`로 확장하면 됩니다. [Player in Bonfire 자세히 보기](플레이어)


```dart

class Knight extends SimplePlayer {
    Knight(Vector2 position)
      : super(
          position: position, 
          size: Vector2.all(32),
          animation: PlayerSpriteSheet.simpleDirectionAnimation,
      );
}

```

이제 게임에 플레이어를 추가하기만 하면 됩니다.


```dart
@override
  Widget build(BuildContext context) {
    return BonfireWidget(
      joystick: Joystick(
        directional: JoystickDirectional(),
      ), 
      map: WorldMapByTiled('tile/map.json'),
      player: Knight(Vector2(40,40))
    );
  }
```

그러면 지도에서 플레이어를 볼 수 있고 조이스틱 방향으로 움직일 수 있습니다.

## 다음 단계

Bonfire에서 사용할 수 있는 모든 구성 요소를 알아보세요. [여기 참조](개요)

모든 예시를 볼 수 있습니다
