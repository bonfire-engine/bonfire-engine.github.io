# 照明

> <small>This is a [GameComponent](https://github.com/RafaelBarbosatec/bonfire/blob/master/lib/base/game_component.dart)</small>

负责为游戏添加照明的层。

<img width=400 src="../../_media/example_lighting.jpg"></img>

通过在 BonfireWidget 上设置 lightingColorGame 属性，您可以自动启用此照明系统。

要为对象添加光照，只需将 Lighting 混入添加到组件中，并使用 setupLighting() 方法进行配置：

```dart
class MyCustomDecoration extends GameDecoration with Lighting {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2(32,32),
          position: position,
        ){
          setupLighting(
            LightingConfig(
              radius: width * 1.5,
              color: Colors.transparent,
              // blurBorder: 20, // this is a default value
              // type: LightingType.circle, // this is a default value
              // useComponentAngle: false, // this is a default value. When true, light rotates together when component changes it's `angle` param.
            ),
          );
        }

}
```

您可以通过以下方式访问游戏照明并进行更改：

```dart
  gameRef.lighting.animateToColor(Colors.blue.withOpacity(0.7));
```

## GameColorFilter

您可以以编程方式在游戏中应用颜色滤镜。

### BlendMode and Color

```dart
  gameRef.colorFilter.animateTo(Colors.blue, BlendMode.colorBurn);
```

