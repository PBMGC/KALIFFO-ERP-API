import { query } from "../util/query";

export const _createLavanderia = async (lavanderia: any) => {
  const {
    lote_id,
    color_id,
    talla,
    cantidad_enviada,
    cantidad_recibida,
    precio_unidad,
    lavanderia_asignada,
    fecha_envio,
    fecha_recepcion,
  } = lavanderia;

  const queryText = `
    INSERT INTO lavanderia (lote_id, color_id, talla, cantidad_enviada, cantidad_recibida, precio_unidad, lavanderia_asignada, fecha_envio, fecha_recepcion) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    await query(queryText, [
      lote_id,
      color_id,
      talla,
      cantidad_enviada,
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
