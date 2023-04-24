# homactógrafo de castelog

Homactógrafo en 2D con profundidad Z para Castelog.

## Versión online

[https://allnulled.github.io/constructor-de-homactogramas-de-castelog](https://allnulled.github.io/constructor-de-homactogramas-de-castelog)

![Imagen_de_homactografo_1](./docs/img/homactografo-1.png)

## API


### Ficheros

 - El `src/www/js/homactografo.js` contiene la API del homectógrafo. Depués de cargarlo podrás encontrarlo en `window.homactografo`.
 - El `src/www/app.default.calo` contiene el código fuente de una implementación del `homactografo` de JavaScript en HTML mediante Castelog/Vue2 y su (futuro componente): `<ConstructorDeHomactogramasDeCastelog />`.

### Introducción

Desde scripts con `javascript`:

```js
const {
  utils: {
    Persona,
    Fondo,
    Pantalla
  },
  persona,
  fondo,
  pantalla
} = window.homactografo(document.getElementById("pre#salida"));
```

Desde el homactógrafo de `castelog` puedes acceder a estas variables directamente: `persona`, `fondo`, `pantalla` y `utils`.

Los métodos de persona de bajo nivel engloban las funciones que dan la orden de mover una articulación o mover el PaloMan por alguno de los ejes dimensionales (`x`, `y` y `z`).

Los métodos de persona de alto nivel engloban las funciones que dan la orden de hacer alguna acción, y que probablemente usen los métodos de persona de bajo nivel. Como métodos de alto nivel, de ejemplo, hay:

```calo
hago ~ persona.decir("Un diálogo anunciará esta acción.").
hago ~ persona.caminar(1,10,500,5,200).
```

Y de esa forma, conseguimos hacer hablar al PaloMan o moverlo, pero escribiendo solo 1 línea. Y así se pueden ir añadiendo métodos, y ampliar las capacidades de la `persona`: ampliando el `utils.clases.Persona.prototype` con métodos tipo prototipo. Para ello, puedes leer más en la sección de [extender la API](#extender-la-api).

### Referencia

#### Métodos del `fondo` y de la `pantalla`

| Método | Parámetros | Descripción |
| ------ | ---------- | ----------- |
| `fondo.pintarse` | `-` | Pinta el fondo. Debería usarse directamente el método de `pantalla.pintarse()` y él se encarga de pintar todos los elementos por el orden adecuado. |
| `pantalla.pintarse` | `-` | Pinta todos los elementos de la pantalla. |
| `pantalla.pintarse.cada` | `Number:milisegundos` | Reinicia una llamada autoconcatenada y temporizada al método `pantalla.pintarse` automáticamente. |
| `pantalla.incluir` | `Objeto:pintable` | Incluye un objeto en el pintado de la pantalla. Se usará el método `pintarse` del objeto para ello. |

#### Propiedades de bajo nivel de `persona`:

| Propiedad de persona | Tipo | Unidad | Valor por defecto | Descripción |
|----|----|----|----|----|
| `pantalla` | `Object` | Instancia de `utils.Pantalla` | `{...}` | Pantalla principal vinculada. |
| `nombre` | `String` | Texto | `"persona aleatoria"` | Nombre representativo de la persona. |
| `estado_inicial` | `Object` | Objeto | `{...}` | Estado inicial de la instancia. |
| `restablecer` | `Object` | Objeto | `{...}` | Métodos de restablecimiento. |
| `restablecer.postura` | `Function` | Método | `function` | Restablece los valores respectivos a la postura. |
| `restablecer.estado` | `Function` | Método | `function` | Restablece todos los valores: de postura y de localización. |
| `x` | `Number` | Píxels | `80` | Píxels en el eje x. |
| `y` | `Number` | Píxels | `250` | Píxels en el eje y. |
| `z` | `Number` | Píxels de profundidad | `0` | Píxels en el eje z. |
| `largo_de_radio_de_cabeza` | `Number` | Píxels | `10` | Radio de la cabeza |
| `largo_de_cuello` | `Number` | Píxels | `10` | Largo del cuello |
| `largo_de_cadera` | `Number` | Píxels | `20` | Largo de cadera |
| `largo_de_espalda` | `Number` | Píxels | `30` | Largo de espalda |
| `largo_de_brazo` | `Number` | Píxels | `45` | Largo de brazo |
| `largo_de_antebrazo` | `Number` | Píxels | `50` | Largo de antebrazo |
| `largo_de_pierna` | `Number` | Píxels | `60` | Largo de pierna |
| `largo_de_antepierna` | `Number` | Píxels | `70` | Largo de antepierna |
| `largo_de_columna` | `Number` | Píxels | `75` | Largo de columna |
| `apertura_del_hombro_izq` | `Number` | Grados/360º | `0` | Apertura del hombro izquierdo |
| `apertura_del_hombro_der` | `Number` | Grados/360º | `0` | Apertura del hombro derecho |
| `apertura_del_codo_der` | `Number` | Grados/360º | `0` | Apertura del codo derecho |
| `apertura_del_codo_izq` | `Number` | Grados/360º | `0` | Apertura del codo izquierdo |
| `apertura_de_la_pierna_izq` | `Number` | Grados/360º | `0` | Apertura de la pierna izquierda |
| `apertura_de_la_pierna_der` | `Number` | Grados/360º | `0` | Apertura de la pierna derecha |
| `apertura_de_la_rodilla_izq` | `Number` | Grados/360º | `0` | Apertura de la rodilla izquierda |
| `apertura_de_la_rodilla_der` | `Number` | Grados/360º | `0` | Apertura de la rodilla derecha |

#### Métodos de bajo nivel de `persona`:

| Métodos de persona de bajo nivel | Parámetros | Descripción |
| ---- | ---- | ---- | 
| `persona.pintarse` | `-` | Método que pinta a la persona. Se debería usar solo el método `pantalla.pintarse`, y él llama a los `pintarse` de los demás objetos. | 
| `persona.trasladarse.por.eje.x` | `pixels, milisegundos=0, pintar_despues=0` | Incremento en el eje x. | 
| `persona.trasladarse.por.eje.y` | `pixels, milisegundos=0, pintar_despues=0` | Incremento en el eje y. | 
| `persona.trasladarse.por.eje.z` | `pixels, milisegundos=0, pintar_despues=0` | Incremento en el eje z. |
| `persona.posicionarse.por.eje.x` | `pixels, milisegundos=0, pintar_despues=0` | Asignación del eje x. | 
| `persona.posicionarse.por.eje.y` | `pixels, milisegundos=0, pintar_despues=0` | Asignación del eje y. | 
| `persona.posicionarse.por.eje.z` | `pixels, milisegundos=0, pintar_despues=0` | Asignación del eje z. |
| `persona.rotar.hombro.derecho` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.hombro.izquierdo` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.codo.derecho` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.codo.izquierdo` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.rodilla.derecha` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.rodilla.izquierda` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.pierna.derecha` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.pierna.izquierda` | `grados, milisegundos=0, pintar_despues=0` | Incremento del ángulo de la articulación específica. | 
| `persona.posicionar.hombro.derecho` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.hombro.izquierdo` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.codo.derecho` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.codo.izquierdo` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.rodilla.derecha` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.rodilla.izquierda` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.pierna.derecha` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.pierna.izquierda` | `grados, milisegundos=0, pintar_despues=0` | Asignación del ángulo de la articulación específica. | 

Los métodos `rotar` y `posicionar` hacen lo mismo, al igual que `trasladarse` y `posicionarse`: pero el primero de cada par incrementa el valor relativamente al actual, mientras que el segundo se basa en el valor directamente.

Las unidades siempre son:

  - o `pixels` (en el caso del eje z, píxels imaginarios que el homactógrafo se cuida de proyectar)
  - o `grados` de los de 360º
  - o `milisegundos` de los de 1000 = 1 segundo
  - o `pintar_despues` que es un `boolean` que en `true` pintará la pantalla.

#### Métodos de alto nivel de `persona`:

| Métodos de persona de alto nivel | Parámetros | Descripción |
| ---- | ---- | ---- | 
| `persona.decir` | `String:mensaje` | Método para escribir por pantalla texto. | 
| `persona.caminar` | `Number:direccion=1, Number:distancia=50, Number:milisegundos=1000, Number:pasos=10, Number:intensidad=20` | Método para desplazar simulando movimiento. Si `direccion` vale `0` va a la izquierda, si vale `1` va a la derecha. La `distancia` son los píxeles del eje x. Los `milisegundos` es lo que quieres que dure todo el movimiento de caminar. Los `pasos` son el número de pasos que quieres que dé. La `intensidad` son los grados de ángulo que quieres que tenga al caminar. Un ángulo entre `10` y `45` será el razonable. | 

## Extender la API

Hasta aquí, sólo podrías:
  - crear personas
  - añadir y quitar personas de la pantalla

Si quieres ir más allá, tienes que extender la API nativa del homactógrafo y así:
  - poder ampliar las capacidades de cualquier `persona`
  - cambiar las configuraciones del `fondo`
  - poder crear distintos tipos de objetos a parte de la `persona`

Para extender la API:
  - extiende `utils.clases.Persona.prototype` para dotar a toda persona de nuevos métodos.
  - extiende `persona` para dotar a la persona principal de nuevos métodos.
  - crea  una clase `Objeto` que extienda de `Persona` y en ella:
    - sobreescribe el método `pintarse` para personalizar el pintado.
    - sobreescribe las propiedades de bajo nivel de `Persona` para personalizar los datos del objeto.
    - crea instancias de la clase `Objeto` y hazlas incluir por la `pantalla`
      - y así, podrás incluir nuevos objetos.

Más adelante, se proporcionarán más ejemplos de cómo hacer esto. Por ahora, puedes ver el ejemplo del método `caminar`, implementado desde el `src/www/app.default.calo`.

## Ejemplos de scripts para el homactógrafo de Castelog

En esta sección puedes encontrar ejemplos de homactogramas.

  - [Dos por la calle que se saludan](https://allnulled.github.io/constructor-de-homactogramas-de-castelog/app.dos-por-la-calle-saludar.html#/).