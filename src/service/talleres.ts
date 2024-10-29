import { query } from "../util/query";

export const _createAcabado = async (acabado: any) => {
  const {
    lote_id,
    color_id,
    talla,
    cantidad_recibida,
    fecha_inicio,
    fecha_final,
  } = acabado;

  const queryText = `
    INSERT INTO taller_acabados (lote_id, color_id, talla, cantidad_recibida, fecha_inicio, fecha_final)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  try {
    const result = await query(queryText, [
      lote_id,
      color_id,
      talla,
      cantidad_recibida,
      fecha_inicio,
      fecha_final,
    ]);

    return {
      message: "Acabado creado con éxito.",
      success: true,
      status: 201,
    };
  } catch (error: any) {
    return {
      message: "Error al crear el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

// export const _updateAcabado = async (updateAcabado: any) => {
//   try {
//     const queryText = `CALL SP_UpdateAcabado(?,?,?,?,?,?,?,?)`;

//     await query(queryText, [
//       updateAcabado.acabado_id,
//       updateAcabado.lote_id || null,
//       updateAcabado.color_id || null,
//       updateAcabado.talla || null,
//       updateAcabado.cantidad_recibida || null,
//       updateAcabado.cantidad_enviada || null,
//       updateAcabado.fecha_inicio || null,
//       updateAcabado.fecha_final || null,
//     ]);

//     return {
//       message: "Acabado actualizado con éxito.",
//       success: true,
//       status: 200,
//     };
//   } catch (error: any) {
//     return {
//       message: "Error al actualizar el acabado.",
//       success: false,
//       error: error.message || error,
//       status: 500,
//     };
//   }
// };

export const _getAcabados = async () => {
  try {
    const queryText = `SELECT * FROM taller_acabados`;
    const result = await query(queryText);

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los acabados.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getAcabado = async (acabado_id: number) => {
  try {
    const queryText = `SELECT * FROM taller_acabados WHERE acabado_id = ?`;
    const result = await query(queryText, [acabado_id]);

    if (result.data && result.data.length === 0) {
      return {
        message: "Acabado no encontrado.",
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
      message: "Error al obtener el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _activarAcabado = async (acabado_id: number) => {
  const queryText =
    "UPDATE taller_acabados SET estado = 1 WHERE acabado_id = ? AND estado != 1";

  try {
    const result = await query(queryText, [acabado_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El acabado con ID ${acabado_id} ha sido activado correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró acabado con ID ${acabado_id} o ya estaba activado.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    return {
      message: "Error al activar el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _desactivarAcabado = async (acabado_id: number) => {
  const queryText =
    "UPDATE taller_acabados SET estado = 0 WHERE acabado_id = ? AND estado != 0";

  try {
    const result = await query(queryText, [acabado_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El acabado con ID ${acabado_id} ha sido desactivado correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró acabado con ID ${acabado_id} o ya estaba desactivado.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    return {
      message: "Error al desactivar el acabado.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _sgteEstadoTallerAcabados = async (
  acabado_id: number,
  cantidad_recibida?: number
) => {
  try {
    const result = await query(
      "SELECT * FROM taller_acabados WHERE acabado_id = ?",
      [acabado_id]
    );

    const acabado = result.data[0] as any;

    if (!acabado) {
      return {
        message: "No se encontró el acabado",
        success: false,
        status: 404,
      };
    }

    switch (acabado.estado) {
      case 0:
        return {
          message: "Este acabado está desactivado",
          success: false,
          status: 404,
        };
      case 1:
        const updateAcabado1 = await query(
          "UPDATE taller_acabados SET estado = 2 WHERE acabado_id = ?",
          [acabado_id]
        );
        if (updateAcabado1.affectedRows > 0) {
          return {
            message: "El acabado ha pasado al estado 2 (en proceso)",
            success: true,
            status: 200,
          };
        } else {
          return {
            message: "No se pudo actualizar el estado del acabado",
            success: false,
            status: 500,
          };
        }
      case 2:
        if (cantidad_recibida === undefined) {
          return {
            message: "Campo 'cantidad_recibida' obligatorio.",
            success: false,
            status: 500,
          };
        }

        const updateAcabado2 = await query(
          "UPDATE taller_acabados SET estado = 3, cantidad_recibida = ? WHERE acabado_id = ?",
          [cantidad_recibida, acabado_id]
        );

        const updateLote = await query(
          "UPDATE lotes SET estado = 4, cantidad_total = ? WHERE lote_id = ?",
          [cantidad_recibida, acabado.lote_id]
        );

        if (updateAcabado2.affectedRows > 0 && updateLote.affectedRows > 0) {
          return {
            message: "El acabado ha pasado al estado 3 (finalizado)",
            nuevoEstado: 3,
            success: true,
            status: 200,
          };
        } else {
          return {
            message: "No se pudo actualizar el estado del acabado a 3 o lote",
            success: false,
            status: 500,
          };
        }
      case 3:
        return {
          message: "Este acabado está finalizado",
          success: false,
          status: 400,
        };
      default:
        return {
          message: "Estado del acabado no reconocido",
          success: false,
          status: 400,
        };
    }
  } catch (error: any) {
    return {
      msg: "Error en _sgteEstadoTallerAcabados",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};
