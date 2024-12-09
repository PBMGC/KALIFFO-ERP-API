import { Corte } from "../interface/corte";
import { query } from "../util/query";
import { _createLavanderia } from "./lavanderia";

export const _createCorte = async (corte: Corte) => {
  const { lote_id, taller_id, producto_id, cantidad_enviada, talla } = corte;

  try {
    await query(
      `
        INSERT INTO corte (lote_id ,taller_id ,producto_id ,cantidad_enviada ,talla) 
        VALUES (?, ?, ?, ?, ?)`,
      [lote_id, taller_id, producto_id, cantidad_enviada, talla]
    );

    await query(
      `
      UPDATE lote
      SET cantidad_total = cantidad_total + ?
      WHERE lote_id = ?;
    `,
      [cantidad_enviada, lote_id]
    );

    return {
      message: "corte creada con éxito.",
      success: true,
      status: 201,
    };
  } catch (error) {
    return {
      message: "Error al crear corte.",
      success: false,
      status: 500,
    };
  }
};

export const _createCorteArray = async (corte: any, lote_id: number) => {
  const { detalles, producto_id } = corte;
  const errors: any[] = [];
  const successDetails: any[] = [];

  for (const detalle of detalles) {
    const { taller_id, cantidad_enviada, talla } = detalle;

    try {
      await query(
        `
        INSERT INTO corte (lote_id, taller_id, producto_id, cantidad_enviada, talla) 
        VALUES (?, ?, ?, ?, ?)`,
        [lote_id, taller_id, producto_id, cantidad_enviada, talla]
      );

      await query(
        `
        UPDATE lote
        SET cantidad_total = cantidad_total + ?
        WHERE lote_id = ?;
        `,
        [cantidad_enviada, lote_id]
      );

      successDetails.push({
        lote_id,
        taller_id,
        producto_id,
        cantidad_enviada,
        talla,
      });
    } catch (error: any) {
      errors.push({
        error: error.message,
        detalle: {
          lote_id,
          taller_id,
          producto_id,
          cantidad_enviada,
          talla,
        },
      });
    }
  }

  if (errors.length === 0) {
    return {
      message: "Todos los cortes se crearon con éxito.",
      success: true,
      status: 201,
      data: successDetails,
    };
  } else {
    return {
      message: "Algunos cortes no se pudieron crear.",
      success: false,
      status: 207,
      errors: errors,
      successfulDetails: successDetails,
    };
  }
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
    const queryText = `SELECT * FROM corte`;
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

export const _getCortesPorLote = async (lote_id: number) => {
  try {
    const queryText = `
    SELECT 
                corte.estado, 
                corte.corte_id, 
                corte.taller_id,
                trabajador.nombre AS taller,
                producto.nombre AS producto, 
                corte.cantidad_enviada,
                corte.cantidad_recibida,
                corte.talla,
                CAST(
                    (corte.cantidad_recibida - 
                     COALESCE((SELECT SUM(cantidad_enviada) 
                               FROM lavanderia 
                               WHERE lavanderia.corte_id = corte.corte_id), 0)) 
                    AS SIGNED) AS cantidad_restante
            FROM 
                corte
            LEFT JOIN 
                trabajador ON corte.taller_id = trabajador.trabajador_id
            INNER JOIN 
                producto ON producto.producto_id = corte.producto_id
            WHERE 
                corte.lote_id = 6
                AND corte.estado != 0;
    `;
    const result = await query(queryText, [lote_id]);

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

export const _getTallas = async () => {
  try {
    const queryText = `SELECT corte.talla from corte group by corte.talla`;
    const result = await query(queryText);
    return {
      items: result.data || [],
      success: true,
      status: 200,
    };
  } catch (error: any) {
    return {
      message: "Error al obtener las tallas.",
      success: false,
      error: error.message || error,
      status: 500,
    };
  }
};

export const _getCorte = async (corte_id: number) => {
  try {
    const queryText = `SELECT * FROM corte WHERE corte_id = ?`;
    const result = await query(queryText, [corte_id]);

    return {
      item: result.data,
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

export const _desactivarCorte = async (corte_id: number) => {
  const queryText =
    "UPDATE corte SET estado = 0 WHERE corte_id = ? AND estado != 0;";

  try {
    const result = await query(queryText, [corte_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El corte con ID ${corte_id} ha sido desactivada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró corte con ID ${corte_id} o ya estaba desactivada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al desactivar corte:", error);
    return {
      message: error.message || "Error desconocido al desactivar corte.",
      success: false,
      status: 500,
    };
  }
};

export const _activarCorte = async (corte_id: number) => {
  const queryText =
    "UPDATE corte SET estado = true WHERE corte_id = ? AND estado != true;";

  try {
    const result = await query(queryText, [corte_id]);

    if (result.success && result.affectedRows > 0) {
      return {
        message: `El corte con ID ${corte_id} ha sido activada correctamente.`,
        success: true,
        status: 200,
      };
    } else {
      return {
        message: `No se encontró corte con ID ${corte_id} o ya estaba activada.`,
        success: false,
        status: 400,
      };
    }
  } catch (error: any) {
    console.error("Error al activar corte:", error);
    return {
      message: error.message || "Error desconocido al activar corte.",
      success: false,
      status: 500,
    };
  }
};

export const _sgteEstadoCortesPorLote = async (
  lote_id: number,
  detalles: { corte_id: number; cantidad_recibida: number; taller_id: number }[]
) => {
  try {
    const result = await query("SELECT * FROM corte WHERE lote_id = ?", [
      lote_id,
    ]);
    const cortes = result.data;

    if (!cortes || cortes.length === 0) {
      return {
        message: "No se encontraron corte asociados al lote",
        success: false,
        status: 404,
      };
    }

    const resultados = [];
    let cantidadTotal = 0;

    for (const detalle of detalles) {
      const corte = cortes.find((c: any) => c.corte_id === detalle.corte_id);

      if (!corte) {
        resultados.push({
          corte_id: detalle.corte_id,
          message: "Corte no encontrado en la base de datos",
          success: false,
          status: 404,
        });
        continue;
      }

      switch (corte.estado) {
        case 0:
          resultados.push({
            corte_id: detalle.corte_id,
            message: "Este corte está desactivado",
            success: false,
            status: 400,
          });
          break;

        case 1:
          if (!detalle.taller_id) {
            resultados.push({
              corte_id: detalle.corte_id,
              message: "Campo 'taller_id' obligatorio.",
              success: false,
              status: 400,
            });
            break;
          }

          const updateCorte1 = await query(
            "UPDATE corte SET estado = 2, taller_id = ? WHERE corte_id = ?",
            [detalle.taller_id, detalle.corte_id]
          );

          resultados.push({
            corte_id: detalle.corte_id,
            message: updateCorte1.affectedRows
              ? "El corte ha pasado al estado 2 (en proceso)"
              : "No se pudo actualizar el estado del corte a 2",
            nuevoEstado: 2,
            success: updateCorte1.affectedRows > 0,
            status: updateCorte1.affectedRows ? 200 : 500,
          });
          break;

        case 2:
          if (!detalle.cantidad_recibida) {
            resultados.push({
              corte_id: detalle.corte_id,
              message: "Campo 'cantidad_recibida' obligatorio.",
              success: false,
              status: 400,
            });
            break;
          }

          cantidadTotal += detalle.cantidad_recibida;

          if (detalle.cantidad_recibida > corte.cantidad_enviada) {
            resultados.push({
              corte_id: detalle.corte_id,
              message: "La cantidad_recibida es mayor a la cantidad enviada",
              success: false,
              status: 400,
            });
            break;
          }

          const updateCorte2 = await query(
            "UPDATE corte SET estado = 3, cantidad_recibida = ? WHERE corte_id = ?",
            [detalle.cantidad_recibida, detalle.corte_id]
          );

          const updateLote = await query(
            "UPDATE lote SET estado = 2 where lote_id = ?",
            [lote_id]
          );

          resultados.push({
            corte_id: detalle.corte_id,
            message: updateCorte2.affectedRows
              ? "El corte ha pasado al estado 3 (finalizado)"
              : "No se pudo actualizar el estado del corte a 3",
            nuevoEstado: 3,
            success: updateCorte2.affectedRows > 0,
            status: updateCorte2.affectedRows ? 200 : 500,
          });
          break;

        case 3:
          resultados.push({
            corte_id: detalle.corte_id,
            message: "Este corte está finalizado",
            success: false,
            status: 400,
          });
          break;

        default:
          resultados.push({
            corte_id: detalle.corte_id,
            message: "Estado del corte no reconocido",
            success: false,
            status: 400,
          });
          break;
      }
    }

    // Actualizar cantidad total del lote
    await query("UPDATE lote SET cantidad_total = ? WHERE lote_id = ?", [
      cantidadTotal,
      lote_id,
    ]);

    return {
      message: "Proceso completado para todos los cortes del lote",
      resultados,
      success: true,
      status: 200,
    };
  } catch (error: any) {
    console.error(error);

    return {
      msg: "Error en _sgteEstadoCortesPorLote",
      error: error.message,
      success: false,
      status: 500,
    };
  }
};
