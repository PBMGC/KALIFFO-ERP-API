import { query } from "../util/query";

export const _createCorte = async (corte: any) => {
  const {
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tipo_tela,
  } = corte;

  const queryText = `
        INSERT INTO cortes (lote_id ,taller_id ,producto_id ,cantidad ,talla ,metraje_asignado ,tipo_tela) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const result = await query(queryText, [
    lote_id,
    taller_id,
    producto_id,
    cantidad,
    talla,
    metraje_asignado,
    tipo_tela,
  ]);

  // if (!result.success) {
  //   console.error("Error al crear la compra:", result.error);
  //   return {
  //     message: "Error al crear el compra. Intente nuevamente más tarde.",
  //     success: false,
  //     status: result.status || 500,
  //   };
  // }

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
        updateCorte.talla||null,
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
  