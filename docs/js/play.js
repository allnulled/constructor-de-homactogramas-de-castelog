function play() {
  const utils = {
    toRadians: function (angle) {
      return angle * (Math.PI / 180);
    },
    toDegrees: function (angle) {
      return angle * (180 / Math.PI);
    }
  };
  const SETTINGS = {
    width: 500,
    height: 500,
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
      Pintar_cesped: {
        const altura_de_cesped = 500 - 40;
        ctx.beginPath();
        ctx.moveTo(0, altura_de_cesped - 1);
        ctx.lineTo(SETTINGS.width, altura_de_cesped - 1);
        ctx.strokeStyle = SETTINGS.color_de_palos;
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = SETTINGS.color_de_cesped;
        ctx.fillRect(0, altura_de_cesped, SETTINGS.width, SETTINGS.height);
      }
    }
  };
  const Persona = class {
    constructor() {
      this.x = 80;
      this.y = SETTINGS.height - (250);
      this.escala = 25;
      this.cabeza_con_cuello = 0;
      this.cuello_con_columna = 0;
      this.hombro_izquierdo = 0;
      this.hombro_derecho = 0;
      this.codo_izquierdo = 0;
      this.codo_derecho = 0;
      this.columna_con_cadera = 0;
      this.cadera_izquierda = 0;
      this.cadera_derecha = 0;
      this.rodilla_izquierda = 0;
      this.rodilla_derecha = 0;
      this.largo_de_brazo = 45;
      this.largo_de_antebrazo = 50;
      this.largo_de_pierna = 60;
      this.largo_de_antepierna = 70;
      this.largo_de_columna = 75;
      this.apertura_del_hombro_izq = 180;
      this.apertura_del_hombro_der = 180;
      this.apertura_del_codo_der = 180;
      this.apertura_del_codo_izq = 180;
      this.apertura_de_la_pierna_izq = 180;
      this.apertura_de_la_pierna_der = 180;
      this.apertura_de_la_rodilla_izq = 180;
      this.apertura_de_la_rodilla_der = 180;
      this.rotar = {
        hombro: {
          izquierdo: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_del_hombro_izq += diff;
                ok();
                console.log("Movimiento de hombro izquierdo completado: " + this.apertura_del_hombro_izq);
              }, secs);
            });
          },
          derecho: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_del_hombro_der += diff;
                ok();
                console.log("Movimiento de hombro derecho completado: " + this.apertura_del_hombro_der);
              }, secs);
            });
          }
        },
        codo: {
          izquierdo: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_del_codo_izq += diff;
                ok();
                console.log("Movimiento de codo izquierdo completado: " + this.apertura_del_codo_izq);
              }, secs);
            });
          },
          derecho: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_del_codo_der += diff;
                ok();
                console.log("Movimiento de codo derecho completado: " + this.apertura_del_codo_der);
              }, secs);
            });
          }
        },
        pierna: {
          izquierda: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_de_la_pierna_izq += diff;
                ok();
                console.log("Movimiento de pierna izquierda completado: " + this.apertura_de_la_pierna_izq);
              }, secs);
            });
          },
          derecha: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_de_la_pierna_der += diff;
                ok();
                console.log("Movimiento de pierna derecha completado: " + this.apertura_de_la_pierna_der);
              }, secs);
            });
          }
        },
        rodilla: {
          izquierda: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_de_la_rodilla_izq += diff;
                ok();
                console.log("Movimiento de rodilla izquierda completado: " + this.apertura_de_la_rodilla_izq);
              }, secs);
            });
          },
          derecha: (diff, secs = 0) => {
            return new Promise(ok => {
              setTimeout(() => {
                this.apertura_de_la_rodilla_der += diff;
                ok();
                console.log("Movimiento de rodilla derecha completado: " + this.apertura_de_la_rodilla_der);
              }, secs);
            });
          }
        }
      };
    }
    pintarse(ctx) {
      console.log("Pintandose personaje!");
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
      Proceso_pintar_cabeza: {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.escala, 0, Math.PI * 2, true);
        ctx.fillStyle = SETTINGS.color_de_articulaciones;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.escala, 0, Math.PI * 2, true);
        ctx.strokeStyle = SETTINGS.color_de_palos;
        ctx.stroke();
      }
      Proceso_pintar_cuello: {
        const cuello_origen_x = this.x;
        const cuello_origen_y = this.y + this.escala;
        const cuello_destino_x = this.x;
        const cuello_destino_y = this.y + this.escala + 10;
        punto_del_cuello_bajo = [cuello_destino_x, cuello_destino_y];
        ctx.beginPath();
        ctx.moveTo(cuello_origen_x, cuello_origen_y);
        ctx.lineTo(cuello_destino_x, cuello_destino_y);
        ctx.stroke();
      }
      Proceso_pintar_espalda: {
        const espalda_origen_x = punto_del_cuello_bajo[0] - 30;
        const espalda_origen_y = punto_del_cuello_bajo[1];
        const espalda_destino_x = punto_del_cuello_bajo[0] + 30;
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
        let antebrazo_izq_destino_y = punto_del_hombro_izq[1] + this.largo_de_antebrazo;
        punto_del_codo_izq = [antebrazo_izq_destino_x, antebrazo_izq_destino_y];
        punto_del_codo_izq = [
          Math.sin(utils.toRadians(this.apertura_del_hombro_izq)) * this.largo_de_antebrazo + antebrazo_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_hombro_izq)) * this.largo_de_antebrazo + antebrazo_izq_origen_y
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
        let antebrazo_der_destino_y = punto_del_hombro_der[1] + this.largo_de_antebrazo;
        punto_del_codo_der = [antebrazo_der_destino_x, antebrazo_der_destino_y];
        punto_del_codo_der = [
          Math.sin(utils.toRadians(this.apertura_del_hombro_der)) * this.largo_de_antebrazo + antebrazo_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_hombro_der)) * this.largo_de_antebrazo + antebrazo_der_origen_y
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
        let brazo_izq_destino_y = punto_del_hombro_izq[1] + this.largo_de_brazo;
        punto_de_la_mano_izq = [brazo_izq_destino_x, brazo_izq_destino_y];
        punto_de_la_mano_izq = [
          Math.sin(utils.toRadians(this.apertura_del_codo_izq)) * this.largo_de_brazo + brazo_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_codo_izq)) * this.largo_de_brazo + brazo_izq_origen_y
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
        let brazo_der_destino_y = punto_del_hombro_der[1] + this.largo_de_brazo;
        punto_de_la_mano_der = [brazo_der_destino_x, brazo_der_destino_y];
        punto_de_la_mano_der = [
          Math.sin(utils.toRadians(this.apertura_del_codo_der)) * this.largo_de_brazo + brazo_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_del_codo_der)) * this.largo_de_brazo + brazo_der_origen_y
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
        const brazo_der_destino_y = punto_del_cuello_bajo[1] + this.largo_de_columna;
        punto_del_coxis = [brazo_der_destino_x, brazo_der_destino_y];
        ctx.beginPath();
        ctx.moveTo(brazo_der_origen_x, brazo_der_origen_y);
        ctx.lineTo(brazo_der_destino_x, brazo_der_destino_y);
        ctx.stroke();
      }
      Proceso_pintar_cadera: {
        const cadera_origen_x = punto_del_coxis[0] - 20;
        const cadera_origen_y = punto_del_coxis[1];
        const cadera_destino_x = punto_del_coxis[0] + 20;
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
        let antepierna_izq_destino_y = punto_de_la_antepierna_izq[1] + this.largo_de_antepierna;
        punto_de_la_rodilla_izq = [antepierna_izq_destino_x, antepierna_izq_destino_y];
        punto_de_la_rodilla_izq = [
          Math.sin(utils.toRadians(this.apertura_de_la_pierna_izq)) * this.largo_de_antepierna + antepierna_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_pierna_izq)) * this.largo_de_antepierna + antepierna_izq_origen_y
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
        let antepierna_der_destino_y = punto_de_la_antepierna_der[1] + this.largo_de_antepierna;
        punto_de_la_rodilla_der = [antepierna_der_destino_x, antepierna_der_destino_y];
        punto_de_la_rodilla_der = [
          Math.sin(utils.toRadians(this.apertura_de_la_pierna_der)) * this.largo_de_antepierna + antepierna_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_pierna_der)) * this.largo_de_antepierna + antepierna_der_origen_y
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
        let pierna_izq_destino_y = punto_de_la_rodilla_izq[1] + this.largo_de_pierna;
        punto_del_pie_izq = [pierna_izq_destino_x, pierna_izq_destino_y];
        punto_del_pie_izq = [
          Math.sin(utils.toRadians(this.apertura_de_la_rodilla_izq)) * this.largo_de_pierna + pierna_izq_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_rodilla_izq)) * this.largo_de_pierna + pierna_izq_origen_y
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
        let pierna_der_destino_y = punto_de_la_rodilla_der[1] + this.largo_de_pierna;
        punto_del_pie_der = [pierna_der_destino_x, pierna_der_destino_y];
        punto_del_pie_der = [
          Math.sin(utils.toRadians(this.apertura_de_la_rodilla_der)) * this.largo_de_pierna + pierna_der_origen_x,
          -Math.cos(utils.toRadians(this.apertura_de_la_rodilla_der)) * this.largo_de_pierna + pierna_der_origen_y
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
          ctx.beginPath();
          ctx.arc(punto[0], punto[1], 4, 0, Math.PI * 2, true);
          ctx.fillStyle = SETTINGS.color_de_articulaciones;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(punto[0], punto[1], 4, 0, Math.PI * 2, true);
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
  return { pantalla, fondo, persona };
};

window.play = play;

window.addEventListener("load", play);



