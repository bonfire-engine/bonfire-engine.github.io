# Visão Geral

Bonfire é basicamente um widget onde você passa os parâmetros e o configura de acordo com o tipo de jogo que você quer construir.

## BonfireWidget

```dart
  @override
  Widget build(BuildContext context) {
    return BonfireWidget(
      map: WorldMapByTiled('tile/map.json'), // required
      joystick: Joystick(), 
      player: Knight(), // Caso o jogador seja omitido, o direcional do joystick controlará a visualização do mapa, sendo muito útil no processo de construção de mapas
      interface: KnightInterface(),
      background: GameComponent(), // Você pode criar seu próprio plano de fundo (para usar parallax, por exemplo) estendendo-se de `GameComponent`
      backgroundColor: Colors.black,
      debugMode: false, // Se verdadeiro, desenha a grade de componentes
      showCollisionArea: false, // Se verdadeiro, desenha a área de colisão dos elementos
      collisionAreaColor: Colors.blue, // Se você quiser personalizar a cor da área de colisão.
      lightingColorGame: Colors.black.withOpacity(0.4), // Se você quiser adicionar iluminação geral para o jogo
      colorFilter: GameColorFilter(), // Você pode adicionar um filtro de cor ao seu jogo para dar um toque especial.
      components: [], // Aqui você pode adicionar qualquer GameComponent que precisar.
      overlayBuilderMap: { // Aqui você pode adicionar widgets do Flutter para criar a interface do seu jogo.
        'barLife':(game)=> MyBarLifeWidget(),
      },
      initialActiveOverlays:['barLife'], // Aqui você define quais interfaces, passadas em `overlayBuilderMap`, serão mostradas ao iniciar o jogo.
      cameraConfig: CameraConfig(), // Aqui você pode configurar a câmera do jogo. Você pode definir zoom, velocidade, etc.
      globalForces: [] // Aqui você pode adicionar forças como acelerações (AccelerationForce2D), resistências (ResistenceForce2D) ou lineares (LinearForce2D) que afetarão todos os GameComponents que estão usando o mixin `HandleForces`
      onReady: (game) {} // Ligue para notificar quando o jogo estiver pronto.
      focusNode: FocusNode(),
      autofocus:true,
      mouseCursor: MouseCursor.uncontrolled, // Define o cursor do mouse.
      progress: ProgressWidget() // Progresso mostrado ao carregar o mapa.
    );
  }
```

### Adicionando elementos de jogo dinamicamente

Se for necessário adicionar componentes dinamicamente no jogo. Dentro de qualquer componente, você pode usar:

```dart
  gameRef.add(MyComponent())
```

ou você pode adicionar componentes dentro de outros componentes, como um filho, usando apenas isto:

```dart
  add(MyComponent())
```

---

### Camada de Componentes

O Bonfire é composto de vários componentes que são renderizados de acordo com este diagrama de camadas:

<img src="_media/layers.png" width="600"/>

Cada camada será renderizada de acordo com a prioridade definida no componente. Quanto menor a prioridade, mais cedo ela será renderizada.

## Fundo (Background)

> render_priority = 10

Você pode adicionar um componente que representa um plano de fundo. É útil para criar planos de fundo parallax e interativos.

## Mapa

> render_priority = 20

Representa um mapa (ou mundo) onde o jogo ocorre.

Para mais detalhes [clique aqui](doc/map?id=map).

## Decoração

> render_priority = Dynamic ( 30 + Axis Y)

Qualquer coisa que você possa adicionar à cena, por exemplo, um Barril no caminho ou até mesmo um NPC, que pode interagir com seu jogador.

Para mais detalhes [clique aqui](doc/decoration?id=decoration).

## Inimigo

> render_priority = Dynamic ( 30 + Axis Y)

Representa personagens inimigos no jogo. Instâncias desta classe têm ações e movimentos prontos para serem usados ​​e configurados sempre que você quiser. Ao mesmo tempo, você pode personalizar todas as ações e movimentos de uma forma que se ajuste às suas necessidades.

Para mais detalhes [clique aqui](doc/enemy?id=enemy).

## Jogador

> render_priority = Dynamic (30 + Axis Y)

Representa o personagem controlado pelo usuário no jogo. Instâncias desta classe possuem ações e movimentos prontos para serem usados ​​e configurados.

Para mais detalhes [clique aqui](doc/player?id=player).

## Objetos

> render_priority = Dynamic (30 +  Axis Y)

Esta camada inclui todos os `GameComponent` adicionados no jogo, como um `GameComponent` personalizado ou objetos utilitários já disponíveis para uso, como `AnimatedGameObject`.

Para mais detalhes [clique aqui](doc/util?id=gameobject).

## Iluminação

> render_priority = (highestPriority + 10)

Camada responsável por adicionar iluminação ao jogo.

Para mais detalhes [clique aqui](doc/lighting?id=lighting).

## Interface do jogo

> render_priority = (highestPriority + 30)

A maneira como você pode desenhar coisas como barras de vida, stamina e configurações. Em outras palavras, qualquer coisa que você possa adicionar à interface do jogo.

É recomendado usar widgets Flutter para criá-lo, você pode configurá-lo usando `overlayBuilderMap` e `initialActiveOverlays` em seu `BonfireWidget`

## Controle

> render_priority = highestPriority + 40

O componente de controle do jogador.

Para mais detalhes [clique aqui](doc/joystick?id=joystick).
