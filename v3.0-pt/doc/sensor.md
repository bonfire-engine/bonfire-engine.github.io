# Sensores

> Mixin é útil para detectar se algum objeto entrou em contato, mas sem bloquear sua passagem.

Exemplos: Fogo no chão, espinhos, etc. Coisas pelas quais o personagem ou inimigo pode passar e sofrer dano ou ativar qualquer outro tipo de comportamento.

<img src="../../_media/sensor.gif" width="600"/>

```dart
class Spikes extends GameDecoration with Sensor<Myplayer> {
  MyCustomDecoration(Position position)
      : super.withAnimation(
          Future<SpriteAnimation>(),
          size: Vector2.all(32),
          position: position,
        ){
            // Chame este método para configurar o intervalo de verificação do sensor de contato. Padrão: 100 milissegundos.
            setSensorInterval(100);
        }

    @override
    void onContact(Myplayer component) {
        // do anything with the Myplayer that take contact
        super.onContact(component);
    }

    void onContactExit(Myplayer component) {
         // do anything with the Myplayer that exit contact
         super.onContactExit(component);
    }

}
```


Por padrão, o sensor usa o tamanho do seu componente. Se você quiser usar um tamanho personalizado, basta adicionar seu `ShapeHitbox`:

```dart
    @override
    Future<void> onLoad() {
        add(RectangleHitbox(size:Vector2()));
        return super.onLoad();
    }
```
