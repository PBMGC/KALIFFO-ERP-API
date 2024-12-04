import { Lote } from "../interface/lote";
import { query } from "../util/query";

export const _createLote = async (lote: Lote) => {
  try {
    const result = await query(
      `SELECT codigo_lote FROM lotes ORDER BY lote_id DESC LIMIT 1`,
      []
    );

    let codigo;

    if (result && result.data.length > 0) {
      const ultimoLote = result.data[0].codigo_lote;
      const numero = parseInt(ultimoLote.split("-")[1]) + 1;
      codigo = `LT-${numero.toString().padStart(2, "0")}`;
    } else {
      codigo = "LT-01";
    }

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const resultInsert = await query(
      `
        INSERT INTO lotes (codigo_lote, fecha_creacion, tipo_tela, metraje, productos)
        VALUES (?, ?, ?, ?, ?);`,
      [codigo, fechaHoy, lote.tipo_tela, lote.metraje, lote.productos]
    );

    if (!resultInsert.success) {
      console.error("Error al crear el lote:", resultInsert.error);
      return {
        message: "Error al crear el lote. Intente nuevamente más tarde.",
        success: false,
        status: resultInsert.status || 500,
      };
    }

    return {
      message: "Lote creado con éxito.",
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error interno. Intente nuevamente más tarde.",
      success: false,
      status: 500,
    };
  }
};

export const _getLotes = async () => {
  try {
    const result = await query(`select * from lotes where estado !=0`, []);
    return {
      items: result.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "Error _getLotes",
      success: false,
      status: 500,
    };
  }
};

export const _getLote = async (lote_id: number) => {
  try {
    const result = await query(
      `select * from lotes where estado !=0 and lote_id = ?;`,
      [lote_id]
    );
    return {
      item: result.data[0],
      success: true,
      status: 200,
    };
  } catch (error) {
    return {
      msg: "Error _getLotes",
      success: false,
      status: 500,
    };
  }
};

export const _getLoteProductos = async (lote_id: number) => {
  try {
    const resultLote = await query("SELECT * FROM lotes WHERE lote_id = ?", [
      lote_id,
    ]);
    const lote = resultLote.data[0];

    if (!lote || !lote.productos) {
      return {
        msg: "Lote no encontrado o no tiene productos",
        success: false,
        status: 404,
      };
    }

    const productosArray = lote.productos.split(",").map(Number);

    const productos = await query(
      `SELECT * FROM producto WHERE producto_id IN (${productosArray
        .map(() => "?")
        .join(",")})`,
      productosArray
    );

    return {
      items: productos.data,
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error en _getLoteProductos:", error);
    return {
      msg: "Error _getLoteProductos",
      success: false,
      status: 500,
    };
  }
};
