function play(elemento_de_salida) {
  const utils = {
    toRadians: function (angle) {
      return angle * (Math.PI / 180);
    },
    toDegrees: function (angle) {
      return angle * (180 / Math.PI);
    },
    getLastScript: function() {
      try {
        return JSON.parse(localStorage.homactografo_2dtd_script_ultimo);
      } catch(error) {
        return "";
      }
    },
    setLastScript: function(data) {
      try {
        localStorage.homactografo_2dtd_script_ultimo = JSON.stringify(data);
      } catch(error) {
        console.error(error);
      }
    },
    printar: function(msg) {
      elemento_de_salida.textContent += "\n" + msg;
    },
    una_espera: function(callback, secs) {
      return new Promise(ok => {
        setTimeout(() => {
          callback();
          ok();
        }, secs);
      });
    }
  };
  const SETTINGS = {
    width: 500,
    height: 500,
    depth: 4000,
    color_de_palos: "#000",
    color_de_articulaciones: "#CCC",
    color_de_fondo: "#66b7d8",
    color_de_cesped: "#00ba41"
  };
  const canvas = document.getElementById('canvas_for_demo');
  canvas.width = SETTINGS.width;
  canvas.height = SETTINGS.height;
  canvas.style.border = "1px solid #FFF";
  canvas.style.backgroundColor = "#FFF";
  canvas.style.borderRadius = "2pt";
  if (!canvas.getContext) {
    throw new Error("Canvas element has no context");
  }
  const ctx = canvas.getContext('2d');
  const Fondo = class {
    constructor() {
    }
    pintarse(ctx) {
      Pintar_fondo: {
        ctx.beginPath();
        ctx.fillStyle = SETTINGS.color_de_fondo;
        ctx.fillRect(0, 0, SETTINGS.width, SETTINGS.height);
      }
      const altura_de_fuga = 500 - 200;
      Pintar_cesped: {
        ctx.beginPath();
        ctx.moveTo(0, altura_de_fuga - 1);
        ctx.lineTo(SETTINGS.width, altura_de_fuga - 1);
        ctx.strokeStyle = SETTINGS.color_de_palos;
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = SETTINGS.color_de_cesped;
        ctx.fillRect(0, altura_de_fuga, SETTINGS.width, SETTINGS.height);
      }
      Pintar_punto_de_fuga: {
        ctx.beginPath();
        ctx.arc((SETTINGS.width / 2), altura_de_fuga-1, 3, 0, Math.PI * 2, true);
        ctx.fillStyle = "#000";
        ctx.fill();
      }
    }
  };
  const Persona = class {
    constructor(nombre = "persona aleatoria") {
      this.nombre = nombre;
      this.estado_inicial = {
        x: 80,
        y: SETTINGS.height - (250),
        z: 1,
        radio_de_cabeza: 25,
        cabeza_con_cuello: 0,
        cuello_con_columna: 0,
        hombro_izquierdo: 0,
        hombro_derecho: 0,
        codo_izquierdo: 0,
        codo_derecho: 0,
        columna_con_cadera: 0,
        cadera_izquierda: 0,
        cadera_derecha: 0,
        rodilla_izquierda: 0,
        rodilla_derecha: 0,
        largo_de_cuello: 10,
        largo_de_cadera: 20,
        largo_de_espalda: 30,
        largo_de_brazo: 45,
        largo_de_antebrazo: 50,
        largo_de_pierna: 60,
        largo_de_antepierna: 70,
        largo_de_columna: 75,
        apertura_del_hombro_izq: 180,
        apertura_del_hombro_der: 180,
        apertura_del_codo_der: 180,
        apertura_del_codo_izq: 180,
        apertura_de_la_pierna_izq: 180,
        apertura_de_la_pierna_der: 180,
        apertura_de_la_rodilla_izq: 180,
        apertura_de_la_rodilla_der: 180,
      };
      this.restablecer = {
        postura: () => {
          const estado_inicial = Object.assign({}, this.estado_inicial);
          delete estado_inicial.x;
          delete estado_inicial.y;
          delete estado_inicial.z;
          Object.assign(this, estado_inicial);
        },
        estado: () => {
          Object.assign(this, Object.assign({}, this.estado_inicial));
        }
      };
      this.restablecer.estado();
      this.trasladarse = {
        por: {
          eje: {
            x: (diff, secs = 0) => utils.una_espera(() => this.x += diff, secs),
            y: (diff, secs = 0) => utils.una_espera(() => this.y += diff, secs),
            z: (diff, secs = 0) => utils.una_espera(() => this.z += diff, secs)
          }
        }
      };
      this.rotar = {
        hombro: {
          izquierdo: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_hombro_izq += diff, secs),
          derecho: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_hombro_der += diff, secs)
        },
        codo: {
          izquierdo: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_codo_izq += diff, secs),
          derecho: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_codo_der += diff, secs)
        },
        pierna: {
          izquierda: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_pierna_izq += diff, secs),
          derecha: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_pierna_der += diff, secs)
        },
        rodilla: {
          izquierda: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_rodilla_izq += diff, secs),
          derecha: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_rodilla_der += diff, secs)
        }
      };
      this.posicionar = {
        hombro: {
          izquierdo: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_hombro_izq = this.estado_inicial.apertura_del_hombro_izq + diff, secs),
          derecho: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_hombro_der = this.estado_inicial.apertura_del_hombro_der + diff, secs)
        },
        codo: {
          izquierdo: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_codo_izq = this.estado_inicial.apertura_del_codo_izq + diff, secs),
          derecho: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_codo_der = this.estado_inicial.apertura_del_codo_der + diff, secs)
        },
        pierna: {
          izquierda: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_pierna_izq = this.estado_inicial.apertura_del_pierna_izq + diff, secs),
          derecha: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_pierna_der = this.estado_inicial.apertura_del_pierna_der + diff, secs)
        },
        rodilla: {
          izquierda: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_rodilla_izq = this.estado_inicial.apertura_del_rodilla_izq + diff, secs),
          derecha: (diff, secs = 0) => utils.una_espera(() => this.apertura_del_rodilla_der = this.estado_inicial.apertura_del_rodilla_der + diff, secs)
        }
      };
      this.con = {
        cacheo: {},
        profundidad: (id) => {
          console.log("con.profunidad: " + id);
          if(!(id in this.con.cacheo)) {
            this.con.cacheo[id] = this[id];
            //@TODO: recalcular en función de Z
            const valores_originales = {
              largo_de_antebrazo: 50,
              largo_de_antepierna: 70,
              largo_de_brazo: 45,
              largo_de_cadera: 20,
              largo_de_columna: 75,
              largo_de_cuello: 10,
              largo_de_espalda: 30,
              largo_de_pierna: 60,
              radio_de_cabeza: 25,
              x: 180,
              y: 250,
              z: 1
            };
            const valor_original = valores_originales[id];
            if(["x","y","z"].indexOf(id) !== -1) {
              this.con.cacheo[id] = this[id];
            } else {
              const ratio_multiplicativo = (4000 - this.z) / 4000;
              const valor_busco = valor_original * ratio_multiplicativo;
              this.con.cacheo[id] = valor_busco;
            }
          }
          return this.con.cacheo[id];
        }
      };
      this.con.profundidad.reiniciar_computo = () => {
        this.con.cacheo = {};
      };
    }
    decir(mensaje = "...") {
      console.log("Personaje procede a decir algo.");
      utils.printar(`- ${mensaje} — dijo ${this.nombre}.`);
    }
    pintarse(ctx) {
      console.log("Personaje procede a pintarse.");
      let punto_del_cuello_bajo = undefined;
      let punto_del_hombro_izq = undefined;
      let punto_del_hombro_der = undefined;
      let punto_del_codo_der = undefined;
      let punto_del_codo_izq = undefined;
      let punto_de_la_mano_izq = undefined;
      let punto_de_la_mano_der = undefined;
      let punto_del_coxis = undefined;
      let punto_de_la_antepierna_izq = undefined;
      let punto_de_la_antepierna_der = undefined;
      let punto_de_la_rodilla_izq = undefined;
      let punto_de_la_rodilla_der = undefined;
      let punto_del_pie_izq = undefined;
      let punto_del_pie_der = undefined;
      this.con.profundidad.reiniciar_computo();
      Proceso_pintar_cabeza: {
        ctx.beginPath();
        const cabeza_origen_x = this.con.profundidad("x");
        const cabeza_origen_y = this.con.profundidad("y");
        const cabeza_radio = this.con.profundidad("radio_de_cabeza");
        ctx.arc(cabeza_origen_x, cabeza_origen_y, cabeza_radio, 0, Math.PI * 2, true);
        ctx.fillStyle = SETTINGS.color_de_articulaciones;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(cabeza_origen_x, cabeza_origen_y, cabeza_radio, 0, Math.PI * 2, true);
        ctx.strokeStyle = SETTINGS.color_de_palos;
        ctx.stroke();
      }
      Proceso_pintar_cuello: {
        const cuello_origen_x = this.con.profundidad("x");
        const cuello_origen_y = this.con.profundidad("y") + this.con.profundidad("radio_de_cabeza");
        const cuello_destino_x = this.con.profundidad("x");
        const cuello_destino_y = this.con.profundidad("y") + this.con.profundidad("radio_de_cabeza") + this.con.profundidad("largo_de_cuello");
        punto_del_cuello_bajo = [cuello_destino_x, cuello_destino_y];
        ctx.beginPath();
        ctx.moveTo(cuello_origen_x, cuello_origen_y);
        ctx.lineTo(cuello_destino_x, cuello_destino_y);
        ctx.stroke();
      }
      Proceso_pintar_espalda: {
        const espalda_origen_x = punto_del_cuello_bajo[0] - this.con.profundidad("largo_de_espalda");
        const espalda_origen_y = punto_del_cuello_bajo[1];
        const espalda_destino_x = punto_del_cuello_bajo[0] + this.con.profundidad("largo_de_espalda");
        const espalda_destino_y = punto_del_cuello_bajo[1];
        punto_del_hombro_izq = [espalda_origen_x, espalda_origen_y];
        punto_del_hombro_der = [espalda_destino_x, espalda_destino_y];
        ctx.beginPath();
        ctx.moveTo(espalda_origen_x, espalda_origen_y);
        ctx.lineTo(espalda_destino_x, espalda_destino_y);
        ctx.stroke();
      }
      Proceso_pintar_antebrazo_izq: {
        const antebrazo_izq_origen_x = punto_del_hombro_izq[0];
        const antebrazo_izq_origen_y = punto_del_hombro_izq[1];
        let antebrazo_izq_destino_x = punto_del_hombro_izq[0];
        let antebrazo_izq_destino_y = punto_del_hombro_izq[1] + this.con.profundidad("largo_de_antebrazo");
        punto_del_codo_izq = [antebrazo_izq_destino_x, antebrazo_izq_destino_y];
        punto_del_codo_izq = [
          Math.sin(utils.toRadians(this.apertura_del_hombro_izq)) * this.con.profundidad("largo_de_antebrazo") + antebrazo_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_hombro_izq)) * this.con.profundidad("largo_de_antebrazo") + antebrazo_izq_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(antebrazo_izq_origen_x, antebrazo_izq_origen_y);
        ctx.lineTo(punto_del_codo_izq[0], punto_del_codo_izq[1]);
        ctx.stroke();
      }
      Proceso_pintar_antebrazo_der: {
        const antebrazo_der_origen_x = punto_del_hombro_der[0];
        const antebrazo_der_origen_y = punto_del_hombro_der[1];
        let antebrazo_der_destino_x = punto_del_hombro_der[0];
        let antebrazo_der_destino_y = punto_del_hombro_der[1] + this.con.profundidad("largo_de_antebrazo");
        punto_del_codo_der = [antebrazo_der_destino_x, antebrazo_der_destino_y];
        punto_del_codo_der = [
          Math.sin(utils.toRadians(this.apertura_del_hombro_der)) * this.con.profundidad("largo_de_antebrazo") + antebrazo_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_hombro_der)) * this.con.profundidad("largo_de_antebrazo") + antebrazo_der_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(antebrazo_der_origen_x, antebrazo_der_origen_y);
        ctx.lineTo(punto_del_codo_der[0], punto_del_codo_der[1]);
        ctx.stroke();
      }
      Proceso_pintar_brazo_izq: {
        const brazo_izq_origen_x = punto_del_codo_izq[0];
        const brazo_izq_origen_y = punto_del_codo_izq[1];
        let brazo_izq_destino_x = punto_del_hombro_izq[0];
        let brazo_izq_destino_y = punto_del_hombro_izq[1] + this.con.profundidad("largo_de_brazo");
        punto_de_la_mano_izq = [brazo_izq_destino_x, brazo_izq_destino_y];
        punto_de_la_mano_izq = [
          Math.sin(utils.toRadians(this.apertura_del_codo_izq)) * this.con.profundidad("largo_de_brazo") + brazo_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_codo_izq)) * this.con.profundidad("largo_de_brazo") + brazo_izq_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(brazo_izq_origen_x, brazo_izq_origen_y);
        ctx.lineTo(punto_de_la_mano_izq[0], punto_de_la_mano_izq[1]);
        ctx.stroke();
      }
      Proceso_pintar_brazo_der: {
        const brazo_der_origen_x = punto_del_codo_der[0];
        const brazo_der_origen_y = punto_del_codo_der[1];
        let brazo_der_destino_x = punto_del_hombro_der[0];
        let brazo_der_destino_y = punto_del_hombro_der[1] + this.con.profundidad("largo_de_brazo");
        punto_de_la_mano_der = [brazo_der_destino_x, brazo_der_destino_y];
        punto_de_la_mano_der = [
          Math.sin(utils.toRadians(this.apertura_del_codo_der)) * this.con.profundidad("largo_de_brazo") + brazo_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_codo_der)) * this.con.profundidad("largo_de_brazo") + brazo_der_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(brazo_der_origen_x, brazo_der_origen_y);
        ctx.lineTo(punto_de_la_mano_der[0], punto_de_la_mano_der[1]);
        ctx.stroke();
      }
      Proceso_pintar_columna: {
        const brazo_der_origen_x = punto_del_cuello_bajo[0];
        const brazo_der_origen_y = punto_del_cuello_bajo[1];
        const brazo_der_destino_x = punto_del_cuello_bajo[0];
        const brazo_der_destino_y = punto_del_cuello_bajo[1] + this.con.profundidad("largo_de_columna");
        punto_del_coxis = [brazo_der_destino_x, brazo_der_destino_y];
        ctx.beginPath();
        ctx.moveTo(brazo_der_origen_x, brazo_der_origen_y);
        ctx.lineTo(brazo_der_destino_x, brazo_der_destino_y);
        ctx.stroke();
      }
      Proceso_pintar_cadera: {
        const cadera_origen_x = punto_del_coxis[0] - this.con.profundidad("largo_de_cadera");
        const cadera_origen_y = punto_del_coxis[1];
        const cadera_destino_x = punto_del_coxis[0] + this.con.profundidad("largo_de_cadera");
        const cadera_destino_y = punto_del_coxis[1];
        punto_de_la_antepierna_izq = [cadera_origen_x, cadera_origen_y];
        punto_de_la_antepierna_der = [cadera_destino_x, cadera_destino_y];
        ctx.beginPath();
        ctx.moveTo(cadera_origen_x, cadera_origen_y);
        ctx.lineTo(cadera_destino_x, cadera_destino_y);
        ctx.stroke();
      }
      Proceso_pintar_antepierna_izq: {
        const antepierna_izq_origen_x = punto_de_la_antepierna_izq[0];
        const antepierna_izq_origen_y = punto_de_la_antepierna_izq[1];
        let antepierna_izq_destino_x = punto_de_la_antepierna_izq[0];
        let antepierna_izq_destino_y = punto_de_la_antepierna_izq[1] + this.con.profundidad("largo_de_antepierna");
        punto_de_la_rodilla_izq = [antepierna_izq_destino_x, antepierna_izq_destino_y];
        punto_de_la_rodilla_izq = [
          Math.sin(utils.toRadians(this.apertura_de_la_pierna_izq)) * this.con.profundidad("largo_de_antepierna") + antepierna_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_pierna_izq)) * this.con.profundidad("largo_de_antepierna") + antepierna_izq_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(antepierna_izq_origen_x, antepierna_izq_origen_y);
        ctx.lineTo(punto_de_la_rodilla_izq[0], punto_de_la_rodilla_izq[1]);
        ctx.stroke();
      }
      Proceso_pintar_antepierna_der: {
        const antepierna_der_origen_x = punto_de_la_antepierna_der[0];
        const antepierna_der_origen_y = punto_de_la_antepierna_der[1];
        let antepierna_der_destino_x = punto_de_la_antepierna_der[0];
        let antepierna_der_destino_y = punto_de_la_antepierna_der[1] + this.con.profundidad("largo_de_antepierna");
        punto_de_la_rodilla_der = [antepierna_der_destino_x, antepierna_der_destino_y];
        punto_de_la_rodilla_der = [
          Math.sin(utils.toRadians(this.apertura_de_la_pierna_der)) * this.con.profundidad("largo_de_antepierna") + antepierna_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_pierna_der)) * this.con.profundidad("largo_de_antepierna") + antepierna_der_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(antepierna_der_origen_x, antepierna_der_origen_y);
        ctx.lineTo(punto_de_la_rodilla_der[0], punto_de_la_rodilla_der[1]);
        ctx.stroke();
      }
      Proceso_pintar_pierna_izq: {
        const pierna_izq_origen_x = punto_de_la_rodilla_izq[0];
        const pierna_izq_origen_y = punto_de_la_rodilla_izq[1];
        let pierna_izq_destino_x = punto_de_la_rodilla_izq[0];
        let pierna_izq_destino_y = punto_de_la_rodilla_izq[1] + this.con.profundidad("largo_de_pierna");
        punto_del_pie_izq = [pierna_izq_destino_x, pierna_izq_destino_y];
        punto_del_pie_izq = [
          Math.sin(utils.toRadians(this.apertura_de_la_rodilla_izq)) * this.con.profundidad("largo_de_pierna") + pierna_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_rodilla_izq)) * this.con.profundidad("largo_de_pierna") + pierna_izq_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(pierna_izq_origen_x, pierna_izq_origen_y);
        ctx.lineTo(punto_del_pie_izq[0], punto_del_pie_izq[1]);
        ctx.stroke();
      }
      Proceso_pintar_pierna_der: {
        const pierna_der_origen_x = punto_de_la_rodilla_der[0];
        const pierna_der_origen_y = punto_de_la_rodilla_der[1];
        let pierna_der_destino_x = punto_de_la_rodilla_der[0];
        let pierna_der_destino_y = punto_de_la_rodilla_der[1] + this.con.profundidad("largo_de_pierna");
        punto_del_pie_der = [pierna_der_destino_x, pierna_der_destino_y];
        punto_del_pie_der = [
          Math.sin(utils.toRadians(this.apertura_de_la_rodilla_der)) * this.con.profundidad("largo_de_pierna") + pierna_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_rodilla_der)) * this.con.profundidad("largo_de_pierna") + pierna_der_origen_y
        ];
        ctx.beginPath();
        ctx.moveTo(pierna_der_origen_x, pierna_der_origen_y);
        ctx.lineTo(punto_del_pie_der[0], punto_del_pie_der[1]);
        ctx.stroke();
      }

      Proceso_de_pintar_circulos_articulatorios: {
        const puntos = [
          punto_del_cuello_bajo,
          punto_del_hombro_izq,
          punto_del_hombro_der,
          punto_del_codo_der,
          punto_del_codo_izq,
          punto_de_la_mano_izq,
          punto_de_la_mano_der,
          punto_del_coxis,
          punto_de_la_antepierna_izq,
          punto_de_la_antepierna_der,
          punto_de_la_rodilla_izq,
          punto_de_la_rodilla_der,
          punto_del_pie_izq,
          punto_del_pie_der
        ];
        for (let i = 0; i < puntos.length; i++) {
          // console.log(`${i} de ${puntos.length}`);
          const punto = puntos[i];
          const cuarto_profundo = this.z / SETTINGS.depth;
          const radio_de_circulo = (cuarto_profundo > 0.75) ? 1 : 
            cuarto_profundo > 0.50 ? 2 :
            cuarto_profundo > 0.25 ? 3 :
            cuarto_profundo > 0.00 ? 4 : 4;
          ctx.beginPath();
          ctx.arc(punto[0], punto[1], radio_de_circulo, 0, Math.PI * 2, true);
          ctx.fillStyle = SETTINGS.color_de_articulaciones;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(punto[0], punto[1], radio_de_circulo, 0, Math.PI * 2, true);
          ctx.strokeStyle = "#000";
          ctx.stroke();
        }
      }
    }
  }
  class Pantalla {
    constructor(ctx) {
      this.contexto = ctx;
      this.elementos = [];
      this.pintarse = () => {
        for(let i=0; i<this.elementos.length; i++) {
          const elemento = this.elementos[i];
          elemento.pintarse(this.contexto);
        }
      };
      this.pintarse.cada = (secs) => {
        clearTimeout(this.pintarse.timeout_id);
        this.pintarse.timeout_id = setTimeout(() => {
          this.pintarse();
          this.pintarse.cada(secs);
        }, secs);
      };
    }
    incluir(elemento) {
      elemento.pantalla = this;
      this.elementos.push(elemento);
    }
  }
  const pantalla = new Pantalla(ctx);
  const fondo = new Fondo();
  const persona = new Persona();
  pantalla.incluir(fondo);
  pantalla.incluir(persona);
  return { pantalla, fondo, persona, utils };
};

window.play = play;

window.addEventListener("load", play);



