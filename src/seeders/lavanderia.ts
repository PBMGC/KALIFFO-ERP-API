import { _createLavanderia } from "../service/lavanderia";
import { query } from "../util/query";

const lavanderias: any = [
  {
    lote_id: 1,
    color_id: 11,
    talla: "M",
    cantidad_enviada: 50,
    cantidad_recibida: 48,
    precio_unidad: 12.5,
    lavanderia_asignada: "Lavandería Los Andes",
    fecha_envio: "2024-10-01",
    fecha_recepcion: "2024-10-05",
  },
  {
    lote_id: 2,
    color_id: 12,
    talla: "L",
    cantidad_enviada: 60,
    cantidad_recibida: 60,
    precio_unidad: 11.0,
    lavanderia_asignada: "Lavandería Sol",
    fecha_envio: "2024-10-02",
    fecha_recepcion: "2024-10-07",
  },
  {
    lote_id: 3,
    color_id: 13,
    talla: "S",
    cantidad_enviada: 40,
    cantidad_recibida: 39,
    precio_unidad: 13.0,
    lavanderia_asignada: "Lavandería Mar",
    fecha_envio: "2024-10-03",
    fecha_recepcion: "2024-10-06",
  },
  {
    lote_id: 4,
    color_id: 14,
    talla: "XL",
    cantidad_enviada: 30,
    cantidad_recibida: 30,
    precio_unidad: 15.0,
    lavanderia_asignada: "Lavandería Nube",
    fecha_envio: "2024-10-04",
    fecha_recepcion: "2024-10-08",
  },
  {
    lote_id: 5,
    color_id: 15,
    talla: "M",
    cantidad_enviada: 70,
    cantidad_recibida: 68,
    precio_unidad: 10.5,
    lavanderia_asignada: "Lavandería Estrella",
    fecha_envio: "2024-10-05",
    fecha_recepcion: "2024-10-09",
  },
  {
    lote_id: 1,
    color_id: 16,
    talla: "L",
    cantidad_enviada: 80,
    cantidad_recibida: 80,
    precio_unidad: 9.8,
    lavanderia_asignada: "Lavandería Luna",
    fecha_envio: "2024-10-06",
    fecha_recepcion: "2024-10-10",
  },
  {
    lote_id: 2,
    color_id: 17,
    talla: "S",
    cantidad_enviada: 90,
    cantidad_recibida: 88,
    precio_unidad: 14.0,
    lavanderia_asignada: "Lavandería Arcoiris",
    fecha_envio: "2024-10-07",
    fecha_recepcion: "2024-10-11",
  },
  {
    lote_id: 3,
    color_id: 18,
    talla: "M",
    cantidad_enviada: 50,
    cantidad_recibida: 50,
    precio_unidad: 12.0,
    lavanderia_asignada: "Lavandería Sol y Mar",
    fecha_envio: "2024-10-08",
    fecha_recepcion: "2024-10-12",
  },
  {
    lote_id: 4,
    color_id: 19,
    talla: "XL",
    cantidad_enviada: 40,
    cantidad_recibida: 40,
    precio_unidad: 16.0,
    lavanderia_asignada: "Lavandería Montaña",
    fecha_envio: "2024-10-09",
    fecha_recepcion: "2024-10-13",
  },
  {
    lote_id: 5,
    color_id: 10,
    talla: "L",
    cantidad_enviada: 60,
    cantidad_recibida: 60,
    precio_unidad: 11.5,
    lavanderia_asignada: "Lavandería Río",
    fecha_envio: "2024-10-10",
    fecha_recepcion: "2024-10-14",
  },
];

export const createLavanderia = async () => {
  try {
    for (const lavanderia of lavanderias) {
      const result = await query("select * from lavanderia where lote_id = ?", [
        lavanderia.lote_id,
      ]);
      if (result.data.length === 0) {
        await _createLavanderia(lavanderia);
      }
    }
  } catch (error) {
    console.log("Error en createLote:", error);
  }
};
