# Buscar Caminho mais Curto (Path Finding)

> Algoritmo para encontrar o seu caminho em torno de obstáculos

<img src="_media/git_move_along_the_path.gif" width="600"/>

O Bonfire usa o pacote [a_star_algorithm](https://pub.dev/packages/a_star_algorithm) para encontrar o caminho.

Para usar, basta adicionar o Mixin `PathFinding` e chamar o método `moveToPositionWithPathFinding` (nunca use esse método no `update`, apenas uma vez para iniciar).

Para que funcione, o componente deve conter o Mixin `Movement` (por padrão, `Player` e `Enemy` usam esses mixins).

## Configurando 

Você pode configurar o PathFinding chamando o método `setupMoveToPositionAlongThePath`. Veja abaixo:

```dart
class Knight extends SimplePlayer with PathFinding, TapGesture {

    Knight(Vector2 position)
    : super(
        // ...
    );

    @override
    void onTap() {}

    @override
    void onTapDownScreen(GestureEvent event) {
        moveToPositionWithPathFinding(event.worldPosition);
        super.onTapDownScreen(event);
    }
}
```

Você pode então usar o método `setupPathFinding`:

``` dart
setupPathFinding(
    pathLineColor: Colors.lightBlueAccent.withOpacity(0.5),
    barriersCalculatedColor: Colors.blue.withOpacity(0.5),
    pathLineStrokeWidth: 4,
    showBarriersCalculated: false, // Altere para `true` para depurar. Isso permite mostrar no mapa os tiles considerados colisões pelo algoritmo.
    tileSizeIsSizeCollision: false,
)
```
