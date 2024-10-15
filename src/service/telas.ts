import { query } from "../util/query";

export const _createTela = async (tela: any) => {
  const { tipo, metraje, articulo, empresa_compra, fecha_compra } = tela;

  const queryText = `
      INSERT INTO almacen_telas (tipo,metraje,articulo,empresa_compra,fecha_compra) 
      VALUES (?, ?, ?, ?, ?)`;

  const result = await query(queryText, [
    tipo,
    metraje,
    articulo,
    empresa_compra,
    fecha_compra,
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
    message: "tela creada con éxito.",
    success: true,
    status: 201,
  };
};

export const _UpdateTela = async (updateTela: any) => {
  try {
    await query(`CALL SP_UpdateTela(?,?,?,?,?,?,?)`, [
      updateTela.tela_id,
      updateTela.tipo || null,
      updateTela.metraje || null,
      updateTela.articulo || null,
      updateTela.estado||null,
      updateTela.empresa_compra || null,
      updateTela.fecha_compra || null,
    ]);

    return {
      message: "Tela actualizada con éxito.",
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al actualizar la tela.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _desactivarTela = async (tela_id: number) => {
  const queryS = `UPDATE almacen_telas SET estado = 0 WHERE tela_id = ?`;

  try {
    const result = (await query(queryS, [tela_id])) as any;

    if (result.affectedRows === 0) {
      return {
        msg: "No se encontró la tela",
        success: false,
        status: 404,
      };
    }

    return {
      msg: "tela eliminada",
      success: true,
      status: 200,
    };
  } catch (error) {
    console.error("Error al eliminar la tela:", error);
    return {
      msg: "Error al eliminar la tela",
      success: false,
      status: 500,
    };
  }
};
