# Navegar entre Mapas

Este widget vai ajudar você a navegar entre mapas.

Basta envolver seu `BonfireWidget` com o `MapNavigator`:

```dart
class MyGameWidget extends StatelessWidget {
  const MultiScenario({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MapNavigator(
      // initialMap: '/map1', Por padrão, se você não passar esse parâmetro, ele usará o primeiro mapa.
      maps: {
        '/map1':(context,args) => MapItem(
            id: 'map1',
            map: WorldMapByTiled(
                'maps/map1.json',
            ),
            properties:{
                'player_position': Vector2(2,2),
            }
        ),
        '/map2':(context,args) => MapItem(
            id: 'map2',
            map: WorldMapByTiled(
                'maps/map2.json',
            ),
            properties:{
                'player_position': Vector2(10,5),
            }
        )
      },
      builder: (context, arguments, map) {
        return BonfireWidget(
          map: map.map,
          player: MyPlayer(
            position: map.properties['player_position'], // Aqui está um exemplo de uso de propriedades.
          ),
        );
      },
    );
  }
}
```

Agora, quando você precisar navegar para algum mapa, basta obter o `MapNavigator` pelo contexto e chamar o método `toNamed`.

```dart

MapNavigator.of(context).toNamed(
  '/map2',
  // arguments: true // Aqui você pode passar alguns argumentos, se necessário.
)

```

Exemplo completo [aqui](https://github.com/RafaelBarbosatec/bonfire/tree/master/example/lib/pages/mini_games/multi_scenario).
