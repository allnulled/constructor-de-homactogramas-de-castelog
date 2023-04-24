
// [castelog:html5izable] ACTIVADO con: {"autor":"allnulled","nombre":"app","version":"dos-por-la-calle-saludar","contenido":{"head":"<head>\n    <title>Homactógrafo Z</title>\n    <meta charset=\"utf8\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <style>\n      .canvas_box {\n        background-color: #222;\n        box-shadow: 0 0 4px black;\n        text-align: center;\n        padding-top: 20px;\n        padding-bottom: 20px;\n      }\n      .w_100 {\n        width: 100%;\n      }\n      .win7 pre.salida_del_canvas {\n        min-height: 100px;\n        padding: 2px;\n        font-size: 10px;\n        border: 6px double #333;\n        background-color: #CCF;\n        color: #333;\n        text-shadow: 0 0 1px black;\n        font-family: Arial;\n        margin-top: 2px;\n        margin-bottom: 2px;\n      }\n    </style>\n    <script src=\"js/calo.js\"></script>\n    <script src=\"js/castelog-parser.js\"></script>\n    <script src=\"js/homactografo.js\"></script>\n    <script src=\"js/homactografo.extensiones.js\"></script>\n</head>","body":"<body>\n    <h5>Homactograma de dos por la calle que se encuentran y se saludan</h5>\n    <div class=\"canvas_box\">\n      <canvas id=\"canvas_for_demo\"></canvas>\n    </div>\n    <div id=\"app\"></div>\n</body>"}}

window.codigo_de_ejemplo = "\n  hago ~ persona.caminar(1, 20, 2888, 28, 100).\n".trim(  );
const ConstructorDeHomactogramasDeCastelog = Castelog.metodos.un_componente_vue2("ConstructorDeHomactogramasDeCastelog",
  "<div class=\"ConstructorDeHomactogramasDeCastelog Component win7\">"
 + "    <div class=\"editor_box\">"
 + "      <div v-if=\"exito_de_compilacion\">"
 + "        <span>✔ La compilación fue exitosa.</span>"
 + "        <details>"
 + "          <summary>Mostrar código</summary>"
 + "          <div>"
 + "            <textarea class=\"w_100\" style=\"min-height: 300px;\" disabled=\"true\" :value=\"codigo_actual_js\"></textarea>"
 + "          </div>"
 + "        </details>"
 + "      </div>"
 + "      <div v-if=\"exito_de_ejecucion\">"
 + "        <span>✔ La ejecución fue exitosa.</span>"
 + "        <pre>{{ JSON.stringify(exito_de_ejecucion, null, 2) }}</pre>"
 + "      </div>"
 + "      <div v-if=\"error\">"
 + "        <span>✘ Error: {{ error.message }}</span>"
 + "      </div>"
 + "      <pre class=\"salida_del_canvas\" ref=\"salida_del_canvas\"></pre>"
 + "      <div style=\"position: relative;\">"
 + "        <textarea style=\"font-family: monospace; font-size: 9px; resize: vertical; min-height: 900px;\" class=\"w_100\" v-model=\"codigo_actual\"></textarea>"
 + "        <div style=\"position: absolute; top: 5px; right: 5px; left: auto; bottom: auto;\">"
 + "          <button v-on:click=\"() => compilar(true)\">Compilar</button>"
 + "          <button v-on:click=\"() => aplicar()\">Aplicar</button>"
 + "        </div>"
 + "      </div>"
 + "    </div>"
 + "  </div>",
  function(component) {return { data() {try {
return { codigo_actual_js:"",
codigo_actual:this.$window.codigo_de_ejemplo,
persona:undefined,
fondo:undefined,
pantalla:undefined,
exito_de_ejecucion:undefined,
exito_de_compilacion:undefined,
error:undefined
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ mostrar_exito_de_ejecucion:function( resultado ) {try {
this.error = undefined;
this.exito_de_compilacion = undefined;
this.exito_de_ejecucion = resultado;
this.exito_de_ejecucion_timeout_id = setTimeout( () => {try {
this.exito_de_ejecucion = undefined;
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
1000 * 10 );
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
mostrar_exito_de_compilacion:function(  ) {try {
this.error = undefined;
this.exito_de_ejecucion = undefined;
this.exito_de_compilacion = true;
this.exito_timeout_id = setTimeout( () => {try {
this.exito_de_compilacion = undefined;
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
1000 * 10 );
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
mostrar_error:function( error ) {try {
this.exito_de_ejecucion = undefined;
this.exito_de_compilacion = undefined;
this.error = error;
this.error_timeout_id = setTimeout( () => {try {
this.error = undefined;
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
1000 * 10 );
this.$forceUpdate( true );
} catch(error) {
console.log(error);
throw error;
}

},
compilar:function( mostrar_exito ) {try {
const codigo_calo = this.codigo_actual;
console.log(codigo_calo);
const codigo_js = Castelog_parser.parse( codigo_calo );
const codigo_temporal = `(async function(persona, pantalla, fondo, componente, juego, utils) {\n  try {\n    console.log(this);\n\n${codigo_js}\n\n  } catch(error) {\n    console.log(error);\n    this.mostrar_error(error);\n  }\n})`;
const codigo_js_final = codigo_temporal;
console.log(codigo_js_final);
this.codigo_actual_js = codigo_js_final;
if(mostrar_exito) {
this.mostrar_exito_de_compilacion(  );
}
return codigo_js_final;
} catch(error) {
this.mostrar_error( error );}
},
aplicar:async function() {try {
const codigo_js = this.compilar(  );
console.log(codigo_js);
const funcion_js = this.$window.eval( codigo_js );
console.log(funcion_js);
const resultado = (await funcion_js.call( this,
this.persona,
this.pantalla,
this.pantalla.fondo,
this,
this.juego,
this.juego.utils ));
this.juego.utils.setLastScript( this.codigo_actual );
if((!(typeof resultado === 'undefined'))) {
this.mostrar_exito_de_ejecucion( resultado );
}
} catch(error) {
this.mostrar_error( error );}
}
},
mounted() {try {
console.log("Montada página de inicio.");
const juego = this.$window.homactografo( this.$refs.salida_del_canvas );
this.juego = juego;
this.$window.extender_persona_prototipo( juego.utils.clases.Persona.prototype,
juego.pantalla );
this.persona = this.juego.persona;
this.fondo = this.juego.fondo;
this.pantalla = this.juego.pantalla;
const ultimo_script_aplicado = this.juego.utils.getLastScript(  );
this.codigo_actual = ultimo_script_aplicado || this.$window.codigo_de_ejemplo;
setTimeout( () => {try {
this.pantalla.pintarse(  );
} catch(error) {
console.log(error);
throw error;
}

},
1000 );
} catch(error) {
console.log(error);
throw error;
}

}
};},
  null);
const App = Castelog.metodos.una_aplicacion_vue2(
  "App",
  "<div class=\"App Component Castelog-app\">"
 + "    <router-view></router-view>"
 + "  </div>",
  function(component) {return { data() {try {
return { 
};
} catch(error) {
console.log(error);
throw error;
}

},
methods:{ 
},
watch:{ 
},
beforeMount() {
},
mounted() {
}
};},
  "html {}\n    body {}\n    .Component {}\n    .App {}\n",
  {},
  [ { path:"/",
name:"Home",
component:ConstructorDeHomactogramasDeCastelog,
props:{ 
}
} ],
  { es:{ 
},
en:{ 
},
ca:{ 
}
},
  "#app");