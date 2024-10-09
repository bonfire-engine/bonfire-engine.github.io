# TalkDialog

Bonfire 提供了基本的实现来在您的游戏中显示对话框。


![](../../_media/talk_dialog.gif)


```dart

  TalkDialog.show(
    BuildContext context,
    List<Say> sayList, {
    VoidCallback? onFinish,
    VoidCallback? onClose,
    ValueChanged<int>? onChangeTalk,
    Color? backgroundColor,
    double boxTextHeight = 100,
    List<LogicalKeyboardKey> logicalKeyboardKeysToNext = const [],
    EdgeInsetsGeometry? padding,
    bool dismissible = false,
    Alignment talkAlignment = Alignment.bottomCenter,
    TextStyle? style,
    int speed = 50,
  });

```

#### Say

```dart

  Say({
    required this.text,
    this.personSayDirection = PersonSayDirection.LEFT,
    this.boxDecoration,
    this.padding,
    this.margin,
    this.person,
    this.background,
    this.header,
    this.bottom,
    this.speed,
  })

```