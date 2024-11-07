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

export const _sgteEstadoLavanderiasPorLote = async (
  lote_id: number,
  detalles: { lavanderia_id: number; cantidad_recibida: number }[]
) => {
  try {
    const result = await query("SELECT * FROM lavanderia WHERE lote_id = ?", [
      lote_id,
    ]);
    const lavanderias = result.data;

    if (!lavanderias || lavanderias.length === 0) {
      return {
        message: "No se encontraron registros de lavandería asociados al lote",
        success: false,
        status: 404,
      };
    }

    const resultados = [];

    for (const detalle of detalles) {
      const lavanderia = lavanderias.find(
        (l: any) => l.lavanderia_id === detalle.lavanderia_id
      );

      if (!lavanderia) {
        resultados.push({
          lavanderia_id: detalle.lavanderia_id,
          message: "Lavandería no encontrada en la base de datos",
          success: false,
          status: 404,
        });
        continue;
      }

      switch (lavanderia.estado) {
        case 0:
          resultados.push({
            lavanderia_id: detalle.lavanderia_id,
            message: "Esta lavandería está desactivada",
            success: false,
            status: 400,
          });
          break;

        case 1:
          const updateLavanderia1 = await query(
            "UPDATE lavanderia SET estado = 2 WHERE lavanderia_id = ?",
            [detalle.lavanderia_id]
          );
          if (updateLavanderia1.affectedRows > 0) {
            resultados.push({
              lavanderia_id: detalle.lavanderia_id,
              message: "La lavandería ha pasado al estado 2 (en proceso)",
              nuevoEstado: 2,
              success: true,
              status: 200,
            });
          } else {
            resultados.push({
              lavanderia_id: detalle.lavanderia_id,
              message: "No se pudo actualizar el estado de la lavandería a 2",
              success: false,
              status: 500,
            });
          }
          break;

        case 2:
          if (detalle.cantidad_recibida === undefined) {
            return {
              lavanderia_id: detalle.lavanderia_id,
              message: "Campo 'cantidad_recibida' obligatorio.",
              success: false,
              status: 400,
            };
          }

          const updateLavanderia2 = await query(
            "UPDATE lavanderia SET estado = 3, cantidad_enviada = ? WHERE lavanderia_id = ?",
            [detalle.cantidad_recibida, detalle.lavanderia_id]
          );

          const updateLote = await query(
            "UPDATE lotes SET estado = 2 WHERE lote_id = ?",
            [lote_id]
          );

          if (
            updateLavanderia2.affectedRows > 0 &&
            updateLote.affectedRows > 0
          ) {
            // Insertar un nuevo registro en la tabla taller_acabados
            const insertAcabado = await query(
              "INSERT INTO taller_acabados (lote_id, color_id, talla, cantidad_recibida, cantidad_enviada, estado, fecha_inicio, fecha_final) VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW())",
              [
                lote_id,
                lavanderia.color_id,
                lavanderia.talla,
                detalle.cantidad_recibida,
                lavanderia.cantidad_enviada,
              ]
            );

            if (insertAcabado.affectedRows > 0) {
              resultados.push({
                lavanderia_id: detalle.lavanderia_id,
                message:
                  "La lavandería ha pasado al estado 3 (finalizado) y se creó un registro en taller_acabados",
                nuevoEstado: 3,
                success: true,
                status: 200,
              });
            } else {
              resultados.push({
                lavanderia_id: detalle.lavanderia_id,
                message: "No se pudo crear el registro en taller_acabados",
                success: false,
                status: 500,
              });
            }
          } else {
            resultados.push({
              lavanderia_id: detalle.lavanderia_id,
              message:
                "No se pudo actualizar el estado de la lavandería a 3 o lote",
              success: false,
              status: 500,
            });
          }
          break;

        case 3:
          resultados.push({
            lavanderia_id: detalle.lavanderia_id,
            message: "Esta lavandería está finalizada",
            success: false,
            status: 400,
          });
          break;

        default:
          resultados.push({
            lavanderia_id: detalle.lavanderia_id,
            message: "Estado de la lavandería no reconocido",
            success: false,
            status: 400,
          });
          break;
      }
    }

    return {
      message:
        "Proceso completado para todos los registros de lavandería del lote",
      resultados,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      msg: "Error en _sgteEstadoLavanderiasPorLote",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};
