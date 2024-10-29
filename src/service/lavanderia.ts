import { query } from "../util/query";

export const _createLavanderia = async (lavanderia: any) => {
  const {
    lote_id,
    color_id,
    talla,
    cantidad_recibida,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  } = lavanderia;

  const queryText = `
    INSERT INTO lavanderia (lote_id, color_id, talla, cantidad_recibida, precio_unidad, lavanderia_asignada, fecha_envio, fecha_recepcion) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    await query(queryText, [
      lote_id,
      color_id,
      talla,
      cantidad_recibida,
      precio_unidad,
      lavanderia_asignada,
      fecha_envio,
      fecha_recepcion,
    ]);

    return {
      message: "Lavandería creada con éxito.",
      success: true,
      status: 201,
    };
  } catch (error: any) {
    console.error("Error al crear lavandería:", error);
    return {
      message: "Error al crear lavandería.",
      success: false,
      status: 500,
      error: error.message,
    };
  }
};

export const _getLavanderia = async (lavanderia_id: number) => {
  const queryText = `SELECT * FROM lavanderia WHERE lavanderia_id = ?`;

  try {
    const result = (await query(queryText, [lavanderia_id])) as any;

    if (result.data.length > 0) {
      return {
        message: "Lavandería obtenida con éxito.",
        success: true,
        item: result.data[0],
        status: 200,
      };
    } else {
      return {
        message: "Lavandería no encontrada.",
        success: false,
        status: 404,
      };
    }
  } catch (error: any) {
    console.error("Error al obtener lavandería:", error);
    return {
      message: "Error al obtener lavandería.",
      success: false,
      status: 500,
      error: error.message,
    };
  }
};

export const _getLavanderias = async () => {
  const queryText = `SELECT * FROM lavanderia`;

  try {
    const result = (await query(queryText, [])) as any;

    if (result.data.length > 0) {
      return {
        success: true,
        items: result.data,
        status: 200,
      };
    } else {
      return {
        message: "Lavandería no encontrada.",
        success: false,
        status: 404,
      };
    }
  } catch (error: any) {
    console.error("Error al obtener lavandería:", error);
    return {
      message: "Error al obtener lavandería.",
      success: false,
      status: 500,
      error: error.message,
    };
  }
};

export const _updateLavanderia = async (
  lavanderia_id: number,
  lavanderia: any
) => {
  const {
    lote_id,
    color,
    talla,
    cantidad_enviada,
    cantidad_recibida,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  } = lavanderia;

  const queryText = `
    UPDATE lavanderia 
    SET lote_id = ?, color = ?, talla = ?, cantidad_enviada = ?, cantidad_recibida = ?, precio_unidad = ?, lavanderia_asignada = ?, fecha_envio = ?, fecha_recepcion = ?
    WHERE lavanderia_id = ?`;

  try {
    const result = await query(queryText, [
      lote_id,
      color,
      talla,
      cantidad_enviada,
      cantidad_recibida,
      precio_unidad,
      lavanderia_asignada,
      fecha_envio,
      fecha_recepcion,
      lavanderia_id,
    ]);

    if (result.affectedRows > 0) {
      return {
        message: "Lavandería actualizada con éxito.",
        success: true,
        status: 200,
      };
    } else {
      return {
        message: "Lavandería no encontrada.",
        success: false,
        status: 404,
      };
    }
  } catch (error: any) {
    console.error("Error al actualizar lavandería:", error);
    return {
      message: "Error al actualizar lavandería.",
      success: false,
      status: 500,
      error: error.message,
    };
  }
};

export const _deleteLavanderia = async (lavanderia_id: number) => {
  const queryText = `DELETE FROM lavanderia WHERE lavanderia_id = ?`;

  try {
    const result = await query(queryText, [lavanderia_id]);

    if (result.affectedRows > 0) {
      return {
        message: "Lavandería eliminada con éxito.",
        success: true,
        status: 200,
      };
    } else {
      return {
        message: "Lavandería no encontrada.",
        success: false,
        status: 404,
      };
    }
  } catch (error: any) {
    console.error("Error al eliminar lavandería:", error);
    return {
      message: "Error al eliminar lavandería.",
      success: false,
      status: 500,
      error: error.message,
    };
  }
};

export const _sgteEstadoLavanderia = async (
  lavanderia_id: number,
  cantidad_recibida?: number
) => {
  try {
    const result = await query(
      "SELECT * FROM lavanderia WHERE lavanderia_id = ?",
      [lavanderia_id]
    );

    const lavanderia = result.data[0] as any;

    if (!lavanderia) {
      return {
        message: "No se encontró la lavanderia",
        success: false,
        status: 404,
      };
    }

    switch (lavanderia.estado) {
      case 0:
        return {
          message: "Esta lavanderia esta desactivado",
          success: false,
          status: 404,
        };
      case 1:
        const updateLavanderia1 = await query(
          "UPDATE lavanderia SET estado = 2 WHERE lavanderia_id = ?",
          [lavanderia_id]
        );
        if (updateLavanderia1.affectedRows > 0) {
          return {
            message: "La lavanderia ha pasado al estado 2 (en proceso)",
            success: true,
            status: 200,
          };
        } else {
          return {
            message: "No se pudo actualizar el estado de lavanderia",
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

        const updateLavanderia2 = await query(
          "UPDATE lavanderia SET estado = 3, cantidad_enviada = ? WHERE lavanderia_id = ?",
          [cantidad_recibida, lavanderia_id]
        );

        const updateLote = await query(
          "update lotes set estado = 2, cantidad_total = ? where lote_id = ?",
          [cantidad_recibida, lavanderia.lote_id]
        );

        if (updateLavanderia2.affectedRows > 0 && updateLote.affectedRows > 0) {
          return {
            message: "La lavanderia ha pasado al estado 3 (finalizado)",
            nuevoEstado: 3,
            success: true,
            status: 200,
          };
        } else {
          return {
            message:
              "No se pudo actualizar el estado de la lavanderia a 3 o lote",
            success: false,
            status: 500,
          };
        }
      case 3:
        return {
          message: "Esta lavanderia está finalizado",
          success: false,
          status: 400,
        };
      default:
        return {
          message: "Estado de la lavanderia no reconocido",
          success: false,
          status: 400,
        };
    }
  } catch (error: any) {
    return {
      msg: "Error en _sgtEstadoLavanderia",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};
