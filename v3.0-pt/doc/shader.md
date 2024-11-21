# Shader

> Mixin útil para aplicar shaders em seus componentes.

Para usar shaders em seus componentes, basta utilizar o mixin `UseShader`.  
Feito isso, você terá acesso a três novos parâmetros: `shader`, `shaderComponentStatic` e `shaderCanvasScale`.

**OBS:** Alguns componentes já possuem esse mixin. São eles: `GameMap` e `TileLayerComponent`. Isso torna possível adicionar shaders ao mapa ou a camadas específicas do mapa.

- `shader`: Após carregar seu `FragmentShader`, defina-o aqui.
- `shaderComponentStatic`: Se seu componente for estático (não sofre alterações com o passar do tempo), defina como `true` para obter melhor desempenho. Dessa forma, não será necessário enviar a textura do componente para o shader a cada frame.
- `shaderCanvasScale`: Útil para personalizar ou corrigir a escala.

## Configurando um shader em seu componente:

O primeiro passo é criar seu arquivo `.frag`, colocá-lo na pasta `shaders` e declará-lo no seu `pubspec.yml`:

```dart
flutter:
  shaders:
    - shaders/myshader.frag
```

O arquivo `.frag` deve seguir este modelo básico:

```glsl
#include <flutter/runtime_effect.glsl>

uniform float uTime; // TEMPO
uniform vec2 uSize;  // TAMANHO DO COMPONENTE
uniform sampler2D uTexture; // TEXTURA DO COMPONENTE

out vec4 fragColor;

void main() {
  vec2 uv = FlutterFragCoord().xy / uSize;
  fragColor =  texture(uTexture, uv);
}
```

Carregando e configurando este shader no seu componente:

```dart
class MyComponente extends GameDecoration with UseShader {
  
  Future<void> onLoad() async{
    final program = await FragmentProgram.fromAsset('shaders/myshader.frag');
    shader = progam.fragmentShader();
    return super.onLoad();
  }

}
```

Pronto! Agora seu componente será renderizado pelo arquivo de shader, e você terá todo o poder dos shaders para aplicar efeitos no componente.

Confira nosso exemplo [aqui](https://github.com/RafaelBarbosatec/bonfire/tree/develop/example/lib/pages/shader).

## Definindo valores para o shader

**OBS:** O Bonfire já envia os parâmetros `time`, `size` e `texture` do componente. Portanto, você deve iniciar o índice de `float` em 3 e o índice de `sampler` em 1.

Às vezes, gerenciar esses parâmetros pode ser complicado, pois a ordem dos índices é importante. Veja um exemplo:

```dart
void updateShader(FragmentShader shader, Color color, Image image) {
  shader.setFloat(0, 23);  // uScale
  shader.setFloat(1, 114); // uMagnitude x
  shader.setFloat(2, 83);  // uMagnitude y

  // Converter cor para opacidade pré-multiplicada.
  shader.setFloat(3, color.red / 255 * color.opacity);   // uColor r
  shader.setFloat(4, color.green / 255 * color.opacity); // uColor g
  shader.setFloat(5, color.blue / 255 * color.opacity);  // uColor b
  shader.setFloat(6, color.opacity);                     // uColor a

  // Inicializar sampler uniforme.
  shader.setImageSampler(0, image);
 }
```

Pensando em facilitar essa tarefa, criamos o `ShaderSetter`:

```dart
void updateShader(FragmentShader shader, Color color, Image image) {
  ShaderSetter(
      values: [
        SetterImage(noiseGradiente), // uNoise
        SetterDouble(0.05), // uIntensity
        SetterVector2(Vector2(0.05, 0.05)), // uScroll
        SetterColor(Colors.blue), // uColor
      ],
    ).apply(shader);
 }
```

Isso irá enviar os parâmetros para o shader assim:

```glsl
#include <flutter/runtime_effect.glsl>

uniform float uTime; // TEMPO
uniform vec2 uSize;  // TAMANHO DO COMPONENTE
uniform sampler2D uTexture; // TEXTURA DO COMPONENTE

/// PARÂMETROS RECEBIDOS DO CÓDIGO DART
uniform sampler2D uNoise;
uniform float uIntensity; 
uniform vec2 uScroll;
uniform vec4 uColor;

out vec4 fragColor;

void main() {
  vec2 uv = FlutterFragCoord().xy / uSize;
  fragColor =  texture(uTexture, uv);
}
```
