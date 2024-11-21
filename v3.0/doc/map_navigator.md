# Map Navigator

This widget can help you navigate between maps.

Just wrap your `BonfireWidget` with `MapNavigator`:

```dart

class MyGameWidget extends StatelessWidget {
  const MultiScenario({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MapNavigator(
      // initialMap: '/map1', By default, if you do not pass these parameters, it will use the first map.
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
            position: map.properties['player_position'], // Here is an example of using properties.
          ),
        );
      },
    );
  }
}

```

Now when you need to navigate to some map just get the `MapNavigator` by context and call the `toNamed` method.

```dart

MapNavigator.of(context).toNamed(
    '/map2',
  //  arguments:true // Here you can pass some arguments if needed.
)

```

Full example [here](https://github.com/RafaelBarbosatec/bonfire/tree/master/example/lib/pages/mini_games/multi_scenario).