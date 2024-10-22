import { _createLote } from "../service/lotes";
import { query } from "../util/query";
import { createCortes } from "./corte";

const lotes: any = [
  {
    lote_id: 1,
    codigo_lote: "LT-01",
    fecha_creacion: "2023-09-01",
    cantidad_total: 1,
    estado: 1,
  },
  {
    lote_id: 2,
    codigo_lote: "LT-02",
    fecha_creacion: "2023-09-10",
    cantidad_total: 2,
    estado: 1,
  },
  {
    lote_id: 3,
    codigo_lote: "LT-03",
    fecha_creacion: "2023-09-20",
    cantidad_total: 3,
    estado: 1,
  },
  {
    lote_id: 4,
    codigo_lote: "LT-04",
    fecha_creacion: "2023-10-05",
    cantidad_total: 4,
    estado: 1,
  },
  {
    lote_id: 5,
    codigo_lote: "LT-05",
    fecha_creacion: "2023-10-15",
    cantidad_total: 5,
    estado: 1,
  },
];

export const createLotes = async () => {
  try {
    for (const lote of lotes) {
      const result = await query("select * from lotes where codigo_lote = ?", [
        lote.codigo_lote,
      ]);
      if (result.data.length === 0) {
        await _createLote();
      }
    }
    await createCortes();
  } catch (error) {
    console.log("Error en createLote:", error);
  }
};
