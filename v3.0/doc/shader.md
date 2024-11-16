# Shader

> Mixin useful to apply shader in your component.

To use shader in your component just use the mixin `UseShader`.
Did this, you can access to 3 new params: `shader`,`shaderComponentStatic`,`shaderCanvasScale`.

OBS: Some componente already have this mixin. They are `GameMap` and `TileLayerComponent`. This turn possible add shader in the map or in specific layer of map.


- `shader` : After load yout `FragmentShader` set it here;
- `shaderComponentStatic`: If your componente is static (don't have changes in the course of time) set this `true` to better performance. This way is not necessary send to the shader the component texture every frame.
- `shaderCanvasScale`: This is useful to customize, or to correct scale.

## Setting a shader in your component:

The fist step is create your `.frag` file, put in the `shaders` folder and declarate it in your `pubspec.yml`:

```dart

flutter:
  shaders:
    - shaders/myshader.frag

```

The file should be this base:


```glsl

#include <flutter/runtime_effect.glsl>

uniform float uTime; // TIME
uniform vec2 uSize;  // COMPONETE SIZE
uniform sampler2D uTexture; // COMPONETE TEXTURE

out vec4 fragColor;

void main() {
  vec2 uv = FlutterFragCoord().xy / uSize;
  fragColor =  texture(uTexture, uv);
}


```

Loading and set this shader in your component:


```dart

class MyComponente extends GameDecoration with UseShader {
  
  Future<void> onLoad() async{
    final program = await FragmentProgram.fromAsset('shaders/myshader.frag');
    shader = progam.fragmentShader();
    return super.onLoad();
  }

}
```

Done, Now your component will be rendered by your shader file and your will have all of powers os shaders to apply effects at the component.

Take a look at the our example [here](https://github.com/RafaelBarbosatec/bonfire/tree/develop/example/lib/pages/shader).

## Setting values to the shader.

OBS: The Bonfire already send the `time`,`size` and `texture` of componente. then you must start the `float` index in 3 and `sampler` index in 1.


Some time it's so hard manager this params because is important the order of index. Take a look:

```dart

void updateShader(FragmentShader shader, Color color, Image image) {
  shader.setFloat(0, 23);  // uScale
  shader.setFloat(1, 114); // uMagnitude x
  shader.setFloat(2, 83);  // uMagnitude y

  // Convert color to premultiplied opacity.
  shader.setFloat(3, color.red / 255 * color.opacity);   // uColor r
  shader.setFloat(4, color.green / 255 * color.opacity); // uColor g
  shader.setFloat(5, color.blue / 255 * color.opacity);  // uColor b
  shader.setFloat(6, color.opacity);                     // uColor a

  // Initialize sampler uniform.
  shader.setImageSampler(0, image);
 }

```

Thinking in help you with this task we created the `ShaderSetter`.

```dart
 
 void updateShader(FragmentShader shader, Color color, Image image) {
  ShaderSetter(
      values: [
        SetterImage(noiseGradiente), // uNoise
        SetterDouble(0.05), // uIntensity
        SetterVector2(Vector2(0.05,0.05), // uScroll
        SetterColor(Colors.blue), // uColor
      ],
    ).apply(shader);
 }

```

It will send the params to shader like this:

```glsl

#include <flutter/runtime_effect.glsl>

uniform float uTime; // TIME
uniform vec2 uSize;  // COMPONETE SIZE
uniform sampler2D uTexture; // COMPONETE TEXTURE

/// PARAMS RECEIVED BY DART CODE
uniform sampler2D uNoise;
uniform float uIntensity; 
uniform vec2 uScroll;
uniform vec4 uColor;

out vec4 fragColor;

void main() {
  vec2 uv = FlutterFragCoord().xy / uSize
  fragColor =  texture(uTexture, uv);
}

```


