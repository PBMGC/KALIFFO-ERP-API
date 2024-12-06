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
    return {
      message: "Error al crear lavandería.",
      success: false,
      status: 500,
      error: error.message,
    };
  }
};

export const _createLavanderiaArray = async (
  lote_id: string,
  detalles: any
) => {
  const errors: any[] = [];
  const successDetails: any[] = [];

  for (const detalle of detalles) {
    const {
      corte_id,
      talla,
      color_id,
      precio_unidad,
      lavanderia_asignada,
      cantidad_enviada,
    } = detalle;

    const resultCorte = await query("SELECT * FROM corte WHERE corte_id = ?", [
      color_id,
    ]);

    const now = new Date();
    const fecha = now.toLocaleDateString("en-CA");

    try {
      await query(
        `
        INSERT INTO lavanderia (lote_id, corte_id, cantidad_enviada, talla, color_id, precio_unidad, lavanderia_asignada, fecha_envio) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          lote_id,
          corte_id,
          cantidad_enviada,
          talla,
          color_id,
          precio_unidad,
          lavanderia_asignada,
          fecha,
        ]
      );

      successDetails.push({
        corte_id,
        talla,
        color_id,
        precio_unidad,
        lavanderia_asignada,
      });
    } catch (error: any) {
      errors.push({
        error: error.message,
        detalle: {
          corte_id,
          talla,
          color_id,
          precio_unidad,
          lavanderia_asignada,
        },
      });
    }
  }

  if (errors.length === 0) {
    return {
      message: "Todas las lavanderias se crearon con éxito.",
      success: true,
      status: 201,
      data: successDetails,
    };
  } else {
    return {
      message: "Algunas lavanderias no se pudieron crear.",
      success: false,
      status: 207,
      errors: errors,
      successfulDetails: successDetails,
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

export const _sgteEstadoLavanderiaPorLote = async (
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
        message: "No se encontraron lavanderías asociadas al lote",
        success: false,
        status: 404,
      };
    }

    const resultados = [];
    let cantidadTotal = 0;

    for (const detalle of detalles) {
      const lavanderia = lavanderias.find(
        (c: any) => c.lavanderia_id === detalle.lavanderia_id
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
          // Actualizar al estado 2
          const updateLavanderia1 = await query(
            "UPDATE lavanderia SET estado = 2 WHERE lavanderia_id = ?",
            [detalle.lavanderia_id]
          );
          resultados.push({
            lavanderia_id: detalle.lavanderia_id,
            message: updateLavanderia1.affectedRows
              ? "La lavandería ha pasado al estado 2 (en proceso)"
              : "No se pudo actualizar la lavandería al estado 2",
            nuevoEstado: 2,
            success: updateLavanderia1.affectedRows > 0,
            status: updateLavanderia1.affectedRows ? 200 : 500,
          });
          break;

        case 2:
          if (!detalle.cantidad_recibida) {
            resultados.push({
              lavanderia_id: detalle.lavanderia_id,
              message: "Campo 'cantidad_recibida' obligatorio.",
              success: false,
              status: 400,
            });
            break;
          }

          if (detalle.cantidad_recibida > lavanderia.cantidad_enviada) {
            resultados.push({
              lavanderia_id: detalle.lavanderia_id,
              message: "La cantidad recibida es mayor a la cantidad enviada",
              success: false,
              status: 400,
            });
            break;
          }

          cantidadTotal += detalle.cantidad_recibida;
          const now = new Date();
          const fecha = now.toLocaleDateString("en-CA");

          const updateLavanderia2 = await query(
            "UPDATE lavanderia SET estado = 3, cantidad_recibida = ?, fecha_recepcion = ? WHERE lavanderia_id = ?",
            [detalle.cantidad_recibida, fecha, detalle.lavanderia_id]
          );

          if (updateLavanderia2.affectedRows > 0) {
            const insertAcabado = await query(
              `INSERT INTO taller_acabado (lote_id, lavanderia_id, color_id, talla, cantidad_enviada, fecha_inicio)
                VALUES (?, ?, ?, ?, ?, ?)`,
              [
                lote_id,
                lavanderia.lavanderia_id,
                lavanderia.color_id,
                lavanderia.talla,
                detalle.cantidad_recibida,
                fecha,
              ]
            );

            const updateLote = await query(
              "UPDATE lote SET estado = 3 where lote_id = ?",
              [lote_id]
            );

            resultados.push({
              lavanderia_id: detalle.lavanderia_id,
              message: insertAcabado.affectedRows
                ? "Lavandería finalizada y registro creado en taller_acabados"
                : "Lavandería finalizada, pero no se pudo crear el registro en taller_acabados",
              nuevoEstado: 3,
              success: insertAcabado.affectedRows > 0,
              status: insertAcabado.affectedRows ? 200 : 500,
            });
          } else {
            resultados.push({
              lavanderia_id: detalle.lavanderia_id,
              message: "No se pudo actualizar la lavandería al estado 3",
              success: false,
              status: 500,
            });
          }
          break;

        case 3:
          resultados.push({
            lavanderia_id: detalle.lavanderia_id,
            message: "Esta lavandería ya está finalizada",
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

    await query("UPDATE lote SET cantidad_total = ? WHERE lote_id = ?", [
      cantidadTotal,
      lote_id,
    ]);

    return {
      message: "Proceso completado para todas las lavanderías del lote",
      resultados,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      msg: "Error en _sgteEstadoLavanderiaPorLote",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};

export const _getLavanderiaPorLote = async (lote_id: number) => {
  try {
    const queryText = `
    SELECT
      l.*, 
      c.nombre, 
      c.codigo, 
      (SELECT p.nombre FROM producto p WHERE p.producto_id = co.producto_id) AS producto_nombre
    FROM lavanderia l
    INNER JOIN corte co ON co.corte_id = l.corte_id
    INNER JOIN color c ON c.color_id = l.color_id
    WHERE l.lote_id = ? AND l.estado != 0;
    `;

    const result = await query(queryText, [lote_id]);

    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener los lavanderia.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};
