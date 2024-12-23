import { _createCorte } from "../service/cortes";
import { query } from "../util/query";

const cortes: any = [
  {
    lote_id: 1,
    taller_id: 2,
    producto_id: 1,
    cantidad_enviada: 5,
    cantidad_recibida: 4,
    talla: "M",
    metraje_asignado: 12.5,
    tipo_tela: "Algodón",
  },
  {
    lote_id: 1,
    taller_id: 2,
    producto_id: 2,
    cantidad_enviada: 30,
    cantidad_recibida: 30,
    talla: "L",
    metraje_asignado: 10.0,
    tipo_tela: "Poliéster",
  },
  {
    lote_id: 1,
    taller_id: 3,
    producto_id: 3,
    cantidad_enviada: 60,
    cantidad_recibida: 55,
    talla: "S",
    metraje_asignado: 15.0,
    tipo_tela: "Seda",
  },
  {
    lote_id: 2,
    taller_id: 1,
    producto_id: 4,
    cantidad_enviada: 45,
    cantidad_recibida: 40,
    talla: "M",
    metraje_asignado: 8.5,
    tipo_tela: "Lino",
  },
  {
    lote_id: 2,
    taller_id: 3,
    producto_id: 5,
    cantidad_enviada: 20,
    cantidad_recibida: 18,
    talla: "XL",
    metraje_asignado: 7.0,
    tipo_tela: "Rayón",
  },
  {
    lote_id: 3,
    taller_id: 2,
    producto_id: 6,
    cantidad_enviada: 70,
    cantidad_recibida: 68,
    talla: "L",
    metraje_asignado: 11.5,
    tipo_tela: "Denim",
  },
  {
    lote_id: 3,
    taller_id: 3,
    producto_id: 7,
    cantidad_enviada: 25,
    cantidad_recibida: 20,
    talla: "S",
    metraje_asignado: 9.0,
    tipo_tela: "Canvas",
  },
  {
    lote_id: 4,
    taller_id: 2,
    producto_id: 8,
    cantidad_enviada: 50,
    cantidad_recibida: 45,
    talla: "M",
    metraje_asignado: 12.0,
    tipo_tela: "Algodón",
  },
  {
    lote_id: 4,
    taller_id: 2,
    producto_id: 1,
    cantidad_enviada: 15,
    cantidad_recibida: 10,
    talla: "M",
    metraje_asignado: 5.5,
    tipo_tela: "Lino",
  },
  {
    lote_id: 5,
    taller_id: 3,
    producto_id: 2,
    cantidad_enviada: 30,
    cantidad_recibida: 25,
    talla: "S",
    metraje_asignado: 6.0,
    tipo_tela: "Seda",
  },
  {
    lote_id: 5,
    taller_id: 2,
    producto_id: 1,
    cantidad_enviada: 40,
    cantidad_recibida: 35,
    talla: "L",
    metraje_asignado: 10.0,
    tipo_tela: "Poliéster",
  },
  {
    lote_id: 1,
    taller_id: 2,
    producto_id: 2,
    cantidad_enviada: 60,
    cantidad_recibida: 58,
    talla: "XL",
    metraje_asignado: 14.0,
    tipo_tela: "Denim",
  },
  {
    lote_id: 1,
    taller_id: 3,
    producto_id: 3,
    cantidad_enviada: 35,
    cantidad_recibida: 32,
    talla: "M",
    metraje_asignado: 8.0,
    tipo_tela: "Canvas",
  },
  {
    lote_id: 2,
    taller_id: 2,
    producto_id: 4,
    cantidad_enviada: 50,
    cantidad_recibida: 48,
    talla: "S",
    metraje_asignado: 11.0,
    tipo_tela: "Rayón",
  },
  {
    lote_id: 2,
    taller_id: 1,
    producto_id: 5,
    cantidad_enviada: 20,
    cantidad_recibida: 20,
    talla: "M",
    metraje_asignado: 6.5,
    tipo_tela: "Algodón",
  },
  {
    lote_id: 3,
    taller_id: 3,
    producto_id: 6,
    cantidad_enviada: 75,
    cantidad_recibida: 70,
    talla: "L",
    metraje_asignado: 13.0,
    tipo_tela: "Seda",
  },
  {
    lote_id: 3,
    taller_id: 2,
    producto_id: 7,
    cantidad_enviada: 90,
    cantidad_recibida: 85,
    talla: "XL",
    metraje_asignado: 18.0,
    tipo_tela: "Poliéster",
  },
  {
    lote_id: 4,
    taller_id: 1,
    producto_id: 8,
    cantidad_enviada: 40,
    cantidad_recibida: 36,
    talla: "S",
    metraje_asignado: 7.5,
    tipo_tela: "Denim",
  },
  {
    lote_id: 4,
    taller_id: 3,
    producto_id: 1,
    cantidad_enviada: 25,
    cantidad_recibida: 20,
    talla: "M",
    metraje_asignado: 9.0,
    tipo_tela: "Canvas",
  },
  {
    lote_id: 5,
    taller_id: 2,
    producto_id: 2,
    cantidad_enviada: 55,
    cantidad_recibida: 50,
    talla: "L",
    metraje_asignado: 12.0,
    tipo_tela: "Rayón",
  },
];

export const createCortes = async () => {
  for (const corte of cortes) {
    try {
      const result = await query(
        "select * from corte where lote_id = ? and taller_id = ? and producto_id = ?",
        [corte.lote_id, corte.taller_id, corte.producto_id]
      );

      if (result.data.length === 0) {
        await _createCorte(corte);
      }
    } catch (error) {
      console.log("error al crear colores");
    }
  }
};
