# homactógrafo de castelog

Homactógrafo en 2D con profundidad Z para Castelog.

## Versión online

[https://allnulled.github.io/constructor-de-homactogramas-de-castelog](https://allnulled.github.io/constructor-de-homactogramas-de-castelog)

![Imagen_de_homactografo_1](./docs/img/homactografo-1.png)

## API

### Referencia

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

El script de ejemplo permite a toda instancia de `Persona` la función de `caminar` en una posible versión:

```calo
creo caminar_1 como una función asíncrona con (direccion_arg, largo_arg, tiempo_arg, pasos_arg, distancia_arg) donde {
 creo direccion como direccion_arg o 0.        ### 1 o 2
 creo intensidad como intensidad_arg o 20.     ### grados de 360
 creo tiempo como tiempo_arg o 100.            ### milisegundos
 creo pasos como pasos_arg o 5.                ### pasos en los que se quiere partir
 creo distancia como distancia_arg o 100.      ### distancia total a recorrer
 creo distancia_pasos como distancia/pasos.    ### variable computada: distancia de cada paso
 si direccion es igual que 1 {
  desde 0 hasta pasos {
   hago ~ persona.posicionar.hombro.derecho(   0,tiempo,0).
   hago ~ persona.posicionar.codo.derecho(     0+intensidad,tiempo,0).
   hago ~ persona.posicionar.hombro.izquierdo( 0+intensidad+intensidad,tiempo,0).
   hago ~ persona.posicionar.codo.izquierdo(   0-intensidad+intensidad,tiempo,1).
   hago ~ Promise.all([
    persona.posicionar.pierna.derecha(     0,tiempo,0),
    persona.posicionar.rodilla.derecha(    0+intensidad,tiempo,0),
    persona.trasladarse.por.eje.x(         0+distancia_pasos,tiempo,0)
   ]).
   hago pantalla.pintarse().
   hago ~ Promise.all([
    persona.posicionar.hombro.izquierdo( 0+intensidad,tiempo,0),
    persona.posicionar.codo.izquierdo(   0-intensidad,tiempo,0),
    persona.posicionar.hombro.derecho(   0-intensidad,tiempo,0)
   ]).
   hago ~ persona.posicionar.pierna.izquierda(   0+0,tiempo,1).
   hago ~ persona.posicionar.rodilla.izquierda(  0+intensidad,tiempo,1).
   hago ~ Promise.all([
    persona.posicionar.pierna.derecha(     0-intensidad,tiempo,1),
    persona.posicionar.rodilla.derecha(    0+intensidad,tiempo,1),
    persona.trasladarse.por.eje.x(         0+distancia_pasos,tiempo,0)
   ]).
   hago ~ persona.posicionar.pierna.izquierda(   0+intensidad,tiempo,1).
   hago ~ persona.posicionar.rodilla.izquierda(  0+intensidad+intensidad,tiempo,1).
  }.
  hago persona.restablecer.postura(1).
 } pero si direccion es igual que 0 {
  desde 0 hasta pasos {
   hago ~ persona.posicionar.hombro.izquierdo(   0,tiempo,0).
   hago ~ persona.posicionar.codo.izquierdo(     0-intensidad,tiempo,0).
   hago ~ persona.posicionar.hombro.derecho( 0-intensidad-intensidad,tiempo,0).
   hago ~ persona.posicionar.codo.derecho(   0+intensidad-intensidad,tiempo,1).
   hago ~ Promise.all([
    persona.posicionar.pierna.izquierda(     0,tiempo,0),
    persona.posicionar.rodilla.izquierda(    0-intensidad,tiempo,0),
    persona.trasladarse.por.eje.x(           0-distancia_pasos,tiempo,0)
   ]).
   hago pantalla.pintarse().
   hago ~ Promise.all([
    persona.posicionar.hombro.derecho(     0-intensidad,tiempo,0),
    persona.posicionar.codo.derecho(       0+intensidad,tiempo,0),
    persona.posicionar.hombro.izquierdo(   0+intensidad,tiempo,0)
   ]).
   hago ~ persona.posicionar.pierna.derecha(   0-0,tiempo,1).
   hago ~ persona.posicionar.rodilla.derecha(  0-intensidad,tiempo,1).
   hago ~ Promise.all([
    persona.posicionar.pierna.izquierda(     0+intensidad,tiempo,1),
    persona.posicionar.rodilla.izquierda(    0-intensidad,tiempo,1),
    persona.trasladarse.por.eje.x(           0-distancia_pasos,tiempo,0)
   ]).
   hago ~ persona.posicionar.pierna.derecha(   0-intensidad,tiempo,1).
   hago ~ persona.posicionar.rodilla.derecha(  0-intensidad-largo,tiempo,1).
  }.
  hago persona.restablecer.postura(1).
 } y si no lanzo un nuevo Error("Solo se soporta direccion 0 o 1").
}.
asigno persona.prototype.caminar como caminar_1.
```

Esto se puede envolver en una función, y llamar desde ella a todo el proceso. Así, podemos hacer directamente:

```calo
hago ~ persona.caminar(1,10,500,5,200).
```

Y de esa forma, conseguimos mover el monigote escribiendo solo 1 línea.

Y así se pueden ir añadiendo métodos, y ampliar las capacidades de la `persona`.

### Referencia

| Propiedad de persona | Tipo | Unidad | Valor por defecto | Descripción |
|----|----|----|----|----|
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

| Métodos de persona | Descripción |
| ---- | ---- | 
| `persona.decir("Mensaje")` | Método para escribir por pantalla texto. | 
| `persona.pintarse()` | Método que pinta a la persona. Se debería usar solo el método `pantalla.pintarse`, y él llama a los `pintarse` de los demás objetos. | 
| `persona.trasladarse.por.eje.x(pixels,milisegundos=0,pintar_despues=0)` | Incremento en el eje x. | 
| `persona.trasladarse.por.eje.y(pixels,milisegundos=0,pintar_despues=0)` | Incremento en el eje y. | 
| `persona.trasladarse.por.eje.z(pixels,milisegundos=0,pintar_despues=0)` | Incremento en el eje z. |
| `persona.posicionarse.por.eje.x(pixels,milisegundos=0,pintar_despues=0)` | Asignación del eje x. | 
| `persona.posicionarse.por.eje.y(pixels,milisegundos=0,pintar_despues=0)` | Asignación del eje y. | 
| `persona.posicionarse.por.eje.z(pixels,milisegundos=0,pintar_despues=0)` | Asignación del eje z. |
| `persona.rotar.hombro.derecho(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.hombro.izquierdo(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.codo.derecho(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.codo.izquierdo(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.rodilla.derecha(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.rodilla.izquierda(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.pierna.derecha(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.rotar.pierna.izquierda(grados,milisegundos=0,pintar_despues=0)` | Incremento del ángulo de la articulación específica. | 
| `persona.posicionar.hombro.derecho(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.hombro.izquierdo(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.codo.derecho(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.codo.izquierdo(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.rodilla.derecha(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.rodilla.izquierda(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.pierna.derecha(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 
| `persona.posicionar.pierna.izquierda(grados,milisegundos=0,pintar_despues=0)` | Asignación del ángulo de la articulación específica. | 

Los métodos `rotar` y `posicionar` hacen lo mismo, al igual que `trasladarse` y `posicionarse`: pero el primero de cada par incrementa el valor relativamente al actual, mientras que el segundo se basa en el valor directamente.

Las unidades siempre son:

  - o `pixels` (en el caso del eje z, píxels imaginarios que el homactógrafo se cuida de proyectar)
  - o `grados` de los de 360º
  - o `milisegundos` de los de 1000 = 1 segundo
  - o `pintar_despues` que es un `boolean` que en `true` pintará la pantalla.

