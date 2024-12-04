import { Lote } from "../interface/lote";
import { _createLote } from "../service/lotes";
import { query } from "../util/query";

const lotes: Lote[] = [
  {
    lote_id: 1,
    tipo_tela: "licra",
    metraje: 160,
    productos: "1,3,4",
  },
  {
    lote_id: 2,
    tipo_tela: "algodón",
    metraje: 200,
    productos: "2,5,6",
  },
  {
    lote_id: 3,
    tipo_tela: "denim",
    metraje: 180,
    productos: "4,7,8",
  },
  {
    lote_id: 4,
    tipo_tela: "poliéster",
    metraje: 150,
    productos: "4,6",
  },
  {
    lote_id: 5,
    tipo_tela: "seda",
    metraje: 120,
    productos: "3,4,5",
  },
];

export const createLotes = async () => {
  try {
    for (const lote of lotes) {
      const result = await query("select * from lotes where lote_id = ?", [
        lote.lote_id,
      ]);
      if (result.data.length === 0) {
        await _createLote(lote);
      }
    }
  } catch (error) {
    console.log("Error en createLote:", error);
  }
};
