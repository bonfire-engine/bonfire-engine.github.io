# 타일
> Tiled 버전 `1.9.0`에서 테스트되었습니다.

[Video example](https://www.youtube.com/watch?v=hVCmLqZ0JVw)

.json 확장자를 사용하여 Tiled로 구축된 지도를 지원합니다.

- [x] 다중 타일 레이어
- [x] 다중 ObjectLayer
- [x] 타일세트
- [x] 타일 애니메이션
- [x] URL에서 지도 로드
- [x] 텍스트
- [x] 이미지 레이어

충돌
   - [x] 다중 충돌
   - [x] 직사각형 충돌
   - [x] 원 충돌
   - [x] 다각형 충돌
   - [ ] 점 충돌


## 사용법

기본 `assets/images/`에 따라 Tiled가 생성한 파일을 프로젝트에 추가합니다.

```yaml
flutter:
  assets:
    - assets/images/tiled/map.json
    - assets/images/tiled/tile_set.json
    - assets/images/tiled/img_tile_set.png
```

Tiled로 제작된 지도의 경우 위젯 'BonfireWidget'을 사용해야 합니다(예: [여기](https://bonfire-engine.github.io/#/get-started?id=creating-your-map)):

```dart
  WorldMapByTiled map = WorldMapByTiled(
    'tiled/map.json', // 기본 파일 경로 또는 URL(예: http://rafaelbarbosatec.github.io/tiled/my_map.json)
    forceTileSize: DungeonMap.tileSize, // 타일의 크기를 원본보다 크거나 작게 강제로 설정하려는 경우
    objectsBuilder: {
        'goblin': (TiledObjectProperties properties) => Goblin(properties.position),
        'torch': (TiledObjectProperties properties) => Torch(properties.position),
        'barrel': (TiledObjectProperties properties) => BarrelDraggable(properties.position,),
    },
  );

  return BonfireWidget(
    joystick: Joystick(
      directional: JoystickDirectional()
    ),
    map: map,
    lightingColorGame: Colors.black.withOpacity(0.5),
  );
```

## 타일 맵 예시

플레이어 위에 타일을 그리려면 타일 세트에 `above` 유형을 추가하세요.

![](../../_media/print_exemplo_tiled.png)

결과:

![](../../_media/print_result_tiled.png)


## 유용한 정보

타일의 클래스를 `above`로 설정하여 게임의 모든 구성 요소 위에 이 타일을 렌더링할 수 있습니다.
레이어의 모든 타일을 모든 구성 요소 위에 렌더링해야 하는 경우 레이어에 사용자 정의 속성을 만들고 값이 `above`인 클래스라는 속성을 만들 수 있습니다.

타일의 클래스를 `dynamicAbove`로 설정하여 이 타일을 Y축을 기준으로 동적으로 렌더링할 수 있습니다.

개체의 클래스를 `collision`로 설정할 수 있습니다. 이 개체는 투명도와 충돌을 통해 게임에 추가됩니다.
