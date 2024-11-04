import { query } from "../util/query";

export const _createLote = async () => {
  const queryText = `SELECT codigo_lote FROM lotes ORDER BY lote_id DESC LIMIT 1`;

  try {
    const result = await query(queryText);

    let codigo;

    if (result && result.data.length > 0) {
      const ultimoLote = result.data[0].codigo_lote;
      const numero = parseInt(ultimoLote.split("-")[1]) + 1;
      codigo = `LT-${numero.toString().padStart(2, "0")}`;
    } else {
      codigo = "LT-01";
    }

    const fechaHoy = new Date().toISOString().slice(0, 10);

    const queryInsert = `
        INSERT INTO lotes (codigo_lote, fecha_creacion) 
        VALUES (?, ?)`;

    const resultInsert = await query(queryInsert, [codigo, fechaHoy]);

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
  const queryText = `select * from lotes where estado !=0`;

  try {
    const result = await query(queryText, []);
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
  const queryText = `select * from lotes where estado !=0 and lote_id = ?;`;

  try {
    const result = await query(queryText, [lote_id]);
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
