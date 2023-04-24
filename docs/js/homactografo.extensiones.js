
window.extender_persona_prototipo = function( persona,
pantalla ) {try {
persona.caminar = async function( direccion_arg,
distancia_arg,
tiempo_arg,
pasos_arg,
intensidad_arg ) {try {
const direccion = ( (!(typeof direccion_arg === 'undefined')) ? direccion_arg : 0 );
const intensidad = ( (!(typeof intensidad_arg === 'undefined')) ? intensidad_arg : 20 );
const pasos = ( (!(typeof pasos_arg === 'undefined')) ? pasos_arg : 5 );
const tiempo = ( (!(typeof tiempo_arg === 'undefined')) ? ( tiempo_arg / ( 10 * pasos ) ) : 100 );
const distancia = ( (!(typeof distancia_arg === 'undefined')) ? distancia_arg : 100 );
const distancia_pasos = distancia / pasos;
if(direccion === 1) {
for(let index = 0; index < pasos; index++) {(await this.posicionar.hombro.derecho( 0,
tiempo,
0 ));
(await this.posicionar.codo.derecho( 0 + intensidad,
tiempo,
0 ));
(await this.posicionar.hombro.izquierdo( 0 + intensidad + intensidad,
tiempo,
0 ));
(await this.posicionar.codo.izquierdo( 0 - intensidad + intensidad,
tiempo,
1 ));
(await Promise.all( [ this.posicionar.pierna.derecha( 0,
tiempo,
0 ),
this.posicionar.rodilla.derecha( 0 + intensidad,
tiempo,
0 ),
this.trasladarse.por.eje.x( 0 + distancia_pasos,
tiempo,
0 ) ] ));
pantalla.pintarse(  );
(await Promise.all( [ this.posicionar.hombro.izquierdo( 0 + intensidad,
tiempo,
0 ),
this.posicionar.codo.izquierdo( 0 - intensidad,
tiempo,
0 ),
this.posicionar.hombro.derecho( 0 - intensidad,
tiempo,
0 ) ] ));
(await this.posicionar.pierna.izquierda( 0 + 0,
tiempo,
1 ));
(await this.posicionar.rodilla.izquierda( 0 + intensidad,
tiempo,
1 ));
(await Promise.all( [ this.posicionar.pierna.derecha( 0 - intensidad,
tiempo,
1 ),
this.posicionar.rodilla.derecha( 0 + intensidad,
tiempo,
1 ),
this.trasladarse.por.eje.x( 0 + distancia_pasos,
tiempo,
0 ) ] ));
(await this.posicionar.pierna.izquierda( 0 + intensidad,
tiempo,
1 ));
(await this.posicionar.rodilla.izquierda( 0 + intensidad + intensidad,
tiempo,
1 ));}
this.restablecer.postura( 1 );
}
else if(direccion === 0) {
for(let index = 0; index < pasos; index++) {(await this.posicionar.hombro.izquierdo( 0,
tiempo,
0 ));
(await this.posicionar.codo.izquierdo( 0 - intensidad,
tiempo,
0 ));
(await this.posicionar.hombro.derecho( 0 - intensidad - intensidad,
tiempo,
0 ));
(await this.posicionar.codo.derecho( 0 + intensidad - intensidad,
tiempo,
1 ));
(await Promise.all( [ this.posicionar.pierna.izquierda( 0,
tiempo,
0 ),
this.posicionar.rodilla.izquierda( 0 - intensidad,
tiempo,
0 ),
this.trasladarse.por.eje.x( 0 - distancia_pasos,
tiempo,
0 ) ] ));
pantalla.pintarse(  );
(await Promise.all( [ this.posicionar.hombro.derecho( 0 - intensidad,
tiempo,
0 ),
this.posicionar.codo.derecho( 0 + intensidad,
tiempo,
0 ),
this.posicionar.hombro.izquierdo( 0 + intensidad,
tiempo,
0 ) ] ));
(await this.posicionar.pierna.derecha( 0 - 0,
tiempo,
1 ));
(await this.posicionar.rodilla.derecha( 0 - intensidad,
tiempo,
1 ));
(await Promise.all( [ this.posicionar.pierna.izquierda( 0 + intensidad,
tiempo,
1 ),
this.posicionar.rodilla.izquierda( 0 - intensidad,
tiempo,
1 ),
this.trasladarse.por.eje.x( 0 - distancia_pasos,
tiempo,
0 ) ] ));
(await this.posicionar.pierna.derecha( 0 - intensidad,
tiempo,
1 ));
(await this.posicionar.rodilla.derecha( 0 - intensidad - intensidad,
tiempo,
1 ));}
this.restablecer.postura( 1 );
}
else {
throw new Error( "Solo se soporta direccion 0 o 1" );
}
} catch(error) {
console.log(error);
throw error;
}

};
} catch(error) {
console.log(error);
throw error;
}

};