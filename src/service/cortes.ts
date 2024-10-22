import { query } from "../util/query";

export const _createCorte = async (corte: any) => {
  const {
    lote_id,
    taller_id,
    producto_id,
    cantidad_enviada,
    cantidad_recibida,
    talla,
    metraje_asignado,
    tipo_tela,
  } = corte;

  const queryText = `
        INSERT INTO cortes (lote_id ,taller_id ,producto_id ,cantidad_enviada,cantidad_recibida ,talla ,metraje_asignado ,tipo_tela) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  const result = await query(queryText, [
    lote_id,
    taller_id,
    producto_id,
    cantidad_enviada,
    cantidad_recibida,
    talla,
    metraje_asignado,
    tipo_tela,
  ]);

  return {
    message: "corte creada con éxito.",
    success: true,
    status: 201,
  };
};

export const _UpdateCorte = async (updateCorte: any) => {
  try {
    await query(`CALL SP_UpdateCorte(?,?,?,?,?,?,?)`, [
      updateCorte.corte_id,
      updateCorte.taller_id || null,
      updateCorte.producto_id || null,
      updateCorte.cantidad || null,
      updateCorte.talla || null,
      updateCorte.metraje_asignado || null,
      updateCorte.tipo_tela || null,
    ]);

    return {
      message: "Corte actualizada con éxito.",
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al actualizar el corte.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getCortes = async () => {
  try {
    const queryText = `SELECT * FROM cortes`;
    const result = await query(queryText);

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los cortes.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getCortesPorLote = async (lote_id:number) => {
  try {
    const queryText = `SELECT * FROM cortes where lote_id = ?`;
    const result = await query(queryText,[lote_id]);

    if (result.data && result.data.length === 0) {
      return {
        message: "Cortes no encontrados.",
        success: false,
        status: 404,
      };
    }

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los cortes.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};


export const _getCorte = async (corte_id: number) => {
  try {
    const queryText = `SELECT * FROM cortes WHERE corte_id = ?`;
    const result = await query(queryText, [corte_id]);

    if (result.data && result.data.length === 0) {
      return {
        message: "Corte no encontrado.",
        success: false,
        status: 404,
      };
    }

    return {
      item: result.data[0],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener el corte.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};
